"use server"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import fs from "fs/promises"
import path from "path"
import { revalidatePath } from "next/cache"
import { connectToDatabase } from "@/app/lib/mongodb"
import User from "@/app/models/User"
import { cookies } from "next/headers"
import Character from "../models/Character"
import Forum from "../models/Forum"
import SpecificForum from "../models/SpecificForum"
import Comment from "../models/Comment"
import Item from "../models/Item"
import Order from "../models/Order"
import { handleError } from "../utils/errorHandler"
import { ObjectId } from "mongoose"
import { IItemCart, IReply, ITopCharacters } from "../../../types"
import Stripe from "stripe"

const ACCESS_SECRET = process.env.ACCESS_SECRET!.trim()
const REFRESH_SECRET = process.env.REFRESH_SECRET!.trim()
const stripe = new Stripe(process.env.STRIPE_SECRET!.trim())

if (!ACCESS_SECRET || !REFRESH_SECRET || !stripe) {
    throw new Error(
        "ACCESS_SECRET, REFRESH_SECRET or STRIPE_SECRET is not set in environment variables",
    )
}

//Loading Carousel Images On Homepage
export async function favorite() {
    try {
        const connection = await connectToDatabase()
        if (!connection.success)
            throw new Error("Could not connect to database")

        const topCharacters = await Character.find({}, "name image _id likes")
            .sort({ likes: -1 })
            .limit(3)
        if (!Array.isArray(topCharacters) || topCharacters.length === 0)
            throw new Error("Could not get characters from Database")
        const returnObj: ITopCharacters[] = topCharacters.map((character) => ({
            name: character.name,
            likes: character.likes,
            image: character.image,
            _id: (character._id as ObjectId).toString(),
        }))
        return returnObj
    } catch (error) {
        handleError(error)
        return null
    }
}

//Used To Force a Revalidation on Paths
export async function revalidate(value: string) {
    try {
        if (!value)
            throw new Error("Did not recieve info on what path to revalidate")
        revalidatePath(value)
    } catch (error) {
        handleError(error)
    }
}

//Gets A UserProfile
export async function getUserFromParams(name: string) {
    try {
        if (!name) throw new Error("Did not get a name from client")

        const connection = await connectToDatabase()
        if (!connection.success) throw new Error(connection.message)

        const storedCookies = await cookies()
        const accessToken = storedCookies.get("accessToken")?.value
        let visitingUser = null

        if (accessToken) {
            let decoded
            try {
                decoded = jwt.verify(accessToken, ACCESS_SECRET)

                if (
                    typeof decoded !== "object" ||
                    decoded === null ||
                    !("userId" in decoded)
                ) {
                    throw new Error(
                        "Invalid accessToken or no id connected to it",
                    )
                }

                visitingUser = await User.findById(decoded.userId)
                if (!visitingUser)
                    throw new Error(
                        "No user with that ID found in the database",
                    )
            } catch (error) {
                handleError(error)
            }
        }

        let user = null
        try {
            user = await User.findOne({
                username: new RegExp(`^${name}$`, "i"),
            }) // Case-insensitive search
            if (!user) throw new Error("Could not find user in database")

            return {
                visitingUser: visitingUser
                    ? {
                          ...visitingUser.toObject(),
                          username: visitingUser.username.toLowerCase(),
                      }
                    : null,
                user: {
                    ...user.toObject(),
                    username: user.username.toLowerCase(),
                },
            }
        } catch (error) {
            handleError(error)
        }
    } catch (error) {
        handleError(error)
    }
}

//Edit Profile Information
export async function updateUserInfo(updatedData: {
    gender: string
    fighting: string
    age: string
    weight: string
    about: string
    imageFile: File
    imagePath: string
}) {
    if (!updatedData)
        throw new Error("Did not recieve all information needed to update")
    const { gender, fighting, age, weight, about, imageFile, imagePath } =
        updatedData

    const storedCookies = await cookies()

    const accessToken = (await storedCookies).get("accessToken")?.value
    if (!accessToken) throw new Error("No accessToken active")

    let decoded
    try {
        decoded = jwt.verify(accessToken, ACCESS_SECRET)
    } catch (error) {
        handleError(error)
    }

    if (
        typeof decoded !== "object" ||
        decoded === null ||
        !("userId" in decoded)
    ) {
        throw new Error("Invalid accessToken or no id connected to it")
    }

    const connection = await connectToDatabase()
    if (!connection.success) throw new Error(connection.message)

    try {
        const user = await User.findById(decoded.userId)
        if (!user) throw new Error("Could not find user in database")

        const uploadDir = path.join(process.cwd(), "public/images/profilepic")
        const filePath = path.join(uploadDir, imageFile.name)
        const fileBuffer = await imageFile.arrayBuffer()
        await fs.writeFile(filePath, Buffer.from(fileBuffer))

        user.imgPath = imagePath
        user.gender = gender
        user.style = fighting
        user.weight = weight
        user.age = age
        user.about = about
        await user.save()
        const data = user.username
        return data
    } catch (error) {
        handleError(error)
    }
}

//Fetches Characters
export async function fetchCharacters() {
    const connection = await connectToDatabase()
    if (!connection.success) throw new Error(connection.message)

    try {
        const characters = await Character.find()
        if (!characters || characters.length === 0)
            throw new Error("Could not find any characters in db")
        return characters
    } catch (error) {
        handleError(error)
    }
}

//Fetches Specific Character Info
export async function getCharacter(characterId: string) {
    try {
        if (!characterId || !mongoose.Types.ObjectId.isValid(characterId))
            throw new Error(
                "Did not receive Character Id or it's not a valid id",
            )

        const connection = await connectToDatabase()
        if (!connection.success) throw new Error(connection.message)

        const storedCookies = cookies()

        const accessToken = (await storedCookies).get("accessToken")?.value
        let visitingUser = null
        if (accessToken) {
            let decoded = null
            try {
                decoded = jwt.verify(accessToken, ACCESS_SECRET)
                if (
                    typeof decoded !== "object" ||
                    decoded === null ||
                    !("userId" in decoded)
                ) {
                    throw new Error(
                        "Invalid accessToken or no id connected to it",
                    )
                }

                visitingUser = await User.findOne({
                    _id: decoded.userId,
                }).select("username")

                if (!visitingUser)
                    throw new Error(
                        "No user with that ID matching from Database",
                    )
            } catch (error) {
                handleError(error)
            }
        }

        let character = null
        try {
            character = await Character.findById(characterId)
            if (!character)
                throw new Error("Could not find character in database")
            return { character, visitingUser }
        } catch (error) {
            handleError(error)
        }
    } catch (error) {
        handleError(error)
    }
}

//Fetches The Categories For The Forum
export async function fetchFrontForum() {
    const connection = await connectToDatabase()
    if (!connection.success) throw new Error(connection.message)

    try {
        const forum = await Forum.find()

        if (!forum || forum.length === 0)
            throw new Error("No forum sections found in database")

        const forumSectionsWithData = await Promise.all(
            forum.map(async (forumSection) => {
                const specificForumPosts = await SpecificForum.aggregate([
                    { $match: { categoryId: forumSection._id } },
                    {
                        $group: {
                            _id: "$categoryId",
                            totalPosts: { $sum: 1 },
                            latestPost: { $max: "$createdAt" },
                            postsToday: {
                                $sum: {
                                    $cond: [
                                        {
                                            $gte: [
                                                {
                                                    $subtract: [
                                                        new Date(),
                                                        "$createdAt",
                                                    ],
                                                },
                                                1000 * 60 * 60 * 24,
                                            ],
                                        },
                                        1,
                                        0,
                                    ],
                                },
                            },
                        },
                    },
                ])

                const postCount = specificForumPosts[0]?.totalPosts || 0
                const latestPost = specificForumPosts[0]?.latestPost || null
                const postsToday = specificForumPosts[0]?.postsToday || 0

                return {
                    ...forumSection.toObject(),
                    amount: postCount,
                    latest: latestPost,
                    perday: postsToday,
                }
            }),
        )

        return forumSectionsWithData
    } catch (error) {
        handleError(error)
    }
}

//Fetches The Specific Forum Posts For a Category In Forum
export async function fetchSpecificForum(categoryId: string) {
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
        throw new Error("Ogiltigt categoryId")
    }

    const connection = await connectToDatabase()
    if (!connection.success) throw new Error(connection.message)

    try {
        const response = await SpecificForum.find({ categoryId })

        if (!response || response.length === 0) {
            throw new Error("Inga forum hittades")
        }

        return response
    } catch (error) {
        handleError(error)
    }
}

//Fetches The Specific Post In Forum
export async function fetchSpecificPost(postId: string) {
    if (!postId || !mongoose.Types.ObjectId.isValid(postId))
        throw new Error("Did not receive an id for post or it's not a valid id")

    const connection = await connectToDatabase()
    if (!connection.success) throw new Error(connection.message)

    try {
        const actualPost = await SpecificForum.findById(postId)
            .populate({
                path: "userId",
                select: "username imgPath",
            })
            .select("title content createdAt userId categoryId")

        if (!actualPost) throw new Error("Post with that id not found")
        return actualPost
    } catch (error) {
        handleError(error)
    }
}

//Loads Replies On A Specific Post
export async function loadReplies(postId: string) {
    const connection = await connectToDatabase()
    if (!connection.success) throw new Error(connection.message)

    try {
        const postItself = await SpecificForum.findById(postId)
        if (!postItself) throw new Error("Could not find post in database")
        const replies = await Comment.find({ postId: postItself._id })
            .populate({
                path: "userId",
                select: "username imgPath",
            })
            .lean()

        const filteredReplies = replies.filter(
            (reply) => reply.userId && reply.userId.username,
        )

        const formattedReplies: IReply[] = filteredReplies.map((reply) => ({
            _id: (reply._id as ObjectId).toString(),
            commentContent: reply.commentContent,
            commentUsername: reply.userId.username,
            commentImg:
                reply.userId?.imgPath || "/images/profilepic/default.webp",
        }))

        return formattedReplies
    } catch (error) {
        handleError(error)
    }
}

//Loading Shop Items To Shop
export async function loadShopItems() {
    try {
        const connection = await connectToDatabase()
        if (!connection.success)
            throw new Error("Could not connect to database")

        const items = await Item.find()
        if (!Array.isArray(items) || items.length === 0)
            throw new Error("Could not get shop items from Database")

        const returnObject: IItemCart[] = items.map((item) => ({
            _id: (item._id as ObjectId).toString(),
            name: item.name,
            image: item.image,
            price: item.price,
            bgimage: item.bgimage,
            amount: item.amount,
            storage: item.storage,
        }))
        return returnObject
    } catch (error) {
        handleError(error)
    }
}

//Get Customer Name After Order Success To Display Thier Name On The Page
export async function getCustomerName(session_id: string) {
    try {
        if (!session_id) throw new Error("Did not recieve an id from client")

        const session = await stripe.checkout.sessions.retrieve(session_id)

        if (!session.metadata || !session.metadata.orderId)
            throw new Error("Order ID is missing in Stripe session metadata")

        const orderId = session.metadata.orderId

        const connection = await connectToDatabase()
        if (!connection.success)
            throw new Error("Could not connect to database")

        const order = await Order.findById(orderId)
        if (!order) throw new Error("Could not Order with that id in database")

        const firstname = order.shipping.firstname
        if (!firstname) throw new Error("Could not find name property on order")

        return firstname
    } catch (error) {
        handleError(error)
    }
}

//Load Posts To Logged In User "My Posts" Page
export async function getMyPosts() {
    try {
        const storedCookies = await cookies()
        const refreshToken = (await storedCookies).get("refreshToken")?.value
        if (!refreshToken)
            throw new Error("User is not logged in, cannot fetch posts")

        const decoded = jwt.verify(refreshToken, REFRESH_SECRET)
        if (
            decoded === undefined ||
            typeof decoded !== "object" ||
            !("userId" in decoded)
        )
            throw new Error("Invalid refreshToken")

        let posts = []
        posts = await SpecificForum.find({ userId: decoded.userId })

        return posts
    } catch (error) {
        handleError(error)
    }
}
