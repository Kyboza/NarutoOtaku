"use client"
import React, { useEffect } from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { loadReplies } from "../actions/serverActions"
import axiosAPI from "../lib/axios"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../store/store"
import Link from "next/link"
import { toast } from "sonner"
import { TiDeleteOutline } from "react-icons/ti"
import { fetchUserStatus } from "../store/statusSlice"
import { revalidate } from "../actions/serverActions"

type IComment = {
    _id: string
    commentContent: string
    commentUsername: string
    commentImg?: string
}

const Reply = ({ postId }: { postId: string }) => {
    const dispatch = useDispatch<AppDispatch>()
    const ref = useRef<HTMLFormElement>(null)
    const { active, userName } = useSelector((state: RootState) => state.status)
    const [comment, setComment] = useState<IComment[]>([])
    const [replyContent, setReplyContent] = useState<string>("")
    const [replyActive, setReplyActive] = useState<boolean>(false)

    const replyRegex = /^[a-zA-Z0-9!-_&\s]{2,120}$/

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (!replyRegex.test(replyContent)) {
                toast.error("Comment Contains Non Allowed Characters", {
                    id: "comment",
                })
                throw new Error("Reply content does not match required format.")
            }
            const response = await axiosAPI.post("/api/forum/submit-reply", {
                postId,
                replyContent,
            })
            if (response.status === 200) {
                toast.success("Successfully Posted Comment", {
                    id: "comment",
                })
                setReplyActive(false)
                setReplyContent("")
            } else {
                console.error("Failed to post reply")
                toast.error("Error Occured Creating Comment", {
                    id: "comment",
                })
            }
        } catch (error) {
            handleErrorWithAxios(error)
            toast.error("Error Occured Creating Comment", {
                id: "comment",
            })
        }
    }

    const deleteComment = async (commentId: string) => {
        try {
            const response = await axiosAPI.delete("/api/forum/deleteReply", {
                params: { commentId },
            })
            if (response.status === 200) {
                toast.success("Successfully Deleted Comment", {
                    id: "actual-delete",
                })
                setComment(
                    (prevComments) =>
                        prevComments?.filter(
                            (comment) => comment._id !== commentId,
                        ) || null,
                )
                const path = `/forum/${response.data.path}/${response.data.path}`
                await revalidate(path)
            } else {
                throw new Error("Error occured while deleting comment")
            }
        } catch (error) {
            toast.error("Error Occurred While Deleting Comment", {
                id: "actual-delete",
            })
            handleErrorWithAxios(error)
        }
    }

    const areYouSure = (commentId: string) => {
        toast("Delete Comment?", {
            id: "delete-comment",
            action: {
                label: "Yes",
                onClick: () => deleteComment(commentId),
            },
            cancel: {
                label: "No",
                onClick: () => toast.message("Comment Was No Deleted"),
            },
        })
    }

    useEffect(() => {
        const loadRepliesFromAction = async () => {
            try {
                const replies = await loadReplies(postId)
                setComment(replies || [])
            } catch (error) {
                console.error("Failed to load replies:", error)
                setComment([])
            }
        }

        loadRepliesFromAction()

        const refHandler = (e: MouseEvent) => {
            if (
                replyActive &&
                ref.current &&
                !ref.current.contains(e.target as Node)
            ) {
                setReplyActive(false)
            }
        }
        document.addEventListener("click", refHandler)

        return () => {
            document.removeEventListener("click", refHandler)
        }
    }, [replyActive, postId])

    useEffect(() => {
        dispatch(fetchUserStatus())
    }, [dispatch])

    return (
        <>
            <div className="justify-top scrollbar-hide relative flex h-auto flex-col items-center overflow-y-scroll">
                <h2 className="text-stroke-p mb-4 mt-4 font-rock text-xl text-white text-shadow-xl sm:text-2xl md:text-5xl lg:text-5xl">
                    Replies
                </h2>
                <article className="mb-4 mt-4 flex h-auto w-[80vw] flex-col rounded-md border border-black bg-[#A5A5A5] bg-opacity-[75%]">
                    <div className="flex w-full flex-row items-center justify-between border-b border-black py-1">
                        {active ? (
                            <button
                                onClick={() => {
                                    setReplyActive(true)
                                }}
                                className="text-stroke w-1/8 m-1 transform rounded-md border border-black bg-[#E19B1A] px-2 py-1 text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95"
                            >
                                Create a Reply
                            </button>
                        ) : (
                            <Link href="/login">
                                <button className="text-stroke w-1/8 m-1 transform rounded-md border border-black bg-[#E19B1A] px-2 py-1 text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95">
                                    Login To Reply
                                </button>
                            </Link>
                        )}
                    </div>

                    {comment.length > 0 ? (
                        comment.map((comment) => (
                            <div key={comment._id}>
                                <div className="flex h-auto w-full flex-row items-center">
                                    <div className="flex w-full flex-row items-center justify-between">
                                        <div className="flex flex-row">
                                            <Link
                                                href={`/users/${comment.commentUsername}`}
                                            >
                                                <div className="relative ml-2 aspect-square h-[8vh] w-[8vh] overflow-hidden rounded-full border border-[#505050]">
                                                    <Image
                                                        className="object-cover"
                                                        src={comment.commentImg || '/images/profilepic/default.webp'}
                                                        alt="Profile picture"
                                                        fill
                                                        priority
                                                        sizes="(max-width: 640px) 20vh, (max-width: 1024px) 10vh, (min-width: 1280px) 20vh"
                                                    />
                                                </div>
                                            </Link>
                                            <h2 className="text-stroke mb-4 ml-4 mt-4 font-rock text-xl text-white text-shadow-xl sm:text-xl md:text-4xl lg:text-4xl">
                                                {comment.commentUsername}
                                            </h2>
                                        </div>
                                        {userName &&
                                        active &&
                                        userName === comment.commentUsername ? (
                                            <div>
                                                <TiDeleteOutline
                                                    onClick={() =>
                                                        areYouSure(comment._id)
                                                    }
                                                    className="mr-4 transform cursor-pointer text-3xl text-white transition-all duration-100 ease-in-out hover:scale-105 active:scale-95"
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="scrollbar-hide flex w-full flex-col overflow-y-scroll border-b border-[#505050]">
                                    <p className="text-stroke mt-1 break-words p-2 font-notojp text-sm leading-5 text-white text-shadow-xl md:text-xl">
                                        {comment.commentContent}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-row justify-center">
                            <h2 className="text-stroke mb-4 ml-4 mt-4 font-rock text-xl text-white text-shadow-xl sm:text-xl md:text-4xl lg:text-4xl">
                                No Reply Yet
                            </h2>
                        </div>
                    )}
                </article>
            </div>

            <div
                className={`scrollbar-hide absolute z-20 mt-2 flex h-screen w-full flex-col items-center justify-center overflow-y-scroll transition-all duration-300 ease-out ${replyActive ? "max-h-[500px] opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
            >
                <form
                    onSubmit={(e) => handleReply(e)}
                    ref={ref}
                    className="flex h-[50%] w-[50%] flex-col items-center rounded-md border border-black bg-[#A5A5A5] bg-opacity-[95%]"
                >
                    <h2 className="text-stroke-p mb-4 mt-4 flex justify-center font-rock text-base text-white text-shadow-xl sm:text-xl md:text-2xl lg:text-3xl">
                        Create a Reply
                    </h2>
                    <label htmlFor="createReply" className="sr-only">
                        Create a Reply
                    </label>
                    <textarea
                        className="placeholder:text-stroke-p text-stroke w-[80%] resize-none rounded-md border border-black bg-transparent p-2 text-white outline-none text-shadow-lg placeholder:text-white placeholder:text-shadow-xl"
                        name="createReply"
                        id="createReply"
                        required
                        minLength={2}
                        maxLength={120}
                        aria-label="Post Content"
                        aria-required="true"
                        rows={10}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <div className="flex h-auto w-[80%] flex-row items-center justify-end">
                        <button
                            type="submit"
                            className="text-stroke mb-2 mt-2 flex w-[40%] transform items-center justify-center rounded-md border border-black bg-[#E19B1A] px-2 py-0.5 text-sm text-white transition-all duration-100 ease-in-out text-shadow-xl hover:scale-105 active:scale-95"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Reply
