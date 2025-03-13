"use client"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../store/store";
import { revalidateTop } from "../actions/userActions"; // Assuming this is an async action

const TopRevalidation = () => {
  const toggleStatus = useSelector((state: RootState) => state.likes.toggleStatus);

  useEffect(() => {
    let listener: NodeJS.Timeout

    const startInterval = () => {
        clearInterval(listener);

        listener = setInterval(async() => {
        console.log('Triggered');
        console.log('Updated Top Characters');
        await revalidateTop(); // Call your revalidation function here
        }, 120000)
    };

    startInterval()
}, [toggleStatus])

  return null; // This component does not need to render anything
};

export default TopRevalidation;
