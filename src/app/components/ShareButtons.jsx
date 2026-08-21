"use client"

import { useState } from "react"

export default function ShareButtons({ resultsDetails }) {

    const [iscopied, setIsCopied] = useState(false)
    const [shareText, setShareText] = useState("")

    const handleCopy = async () => {
        try {
            const url = window.location.href
            await navigator.clipboard.writeText(url)
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, 5000);
            console.log("URL copied successfully.", url)
        } catch (err) {
            console.log("Failed to copy URL: ", err)
        }

    }

    const handleShareText = () => {

        const text = `I got the ${resultsDetails.title}. My role is ${resultsDetails.role}, and my recommended agent is ${resultsDetails.agent}. Take the quiz and find your Valorant Personality`
        setShareText(text)
        console.log(text)
        console.log(resultsDetails.agent)
    }

    return (
        <>
            <button
                onClick={handleCopy}>{iscopied ? "Copied" : "Copy Link"}
            </button>
            <button onClick={handleShareText}>Share</button>
        </>
    )
}