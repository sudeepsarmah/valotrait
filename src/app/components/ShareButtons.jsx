"use client"

import { useState } from "react"

export default function ShareButtons({ resultsDetails }) {

    const [iscopied, setIsCopied] = useState(false)


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

    const handleShareText = async () => {

        const url = window.location.href
        const cta = "Take the quiz and find your Valorant Personality."
        const text = `I got the ${resultsDetails.title}. My role is ${resultsDetails.role}, and my recommended agent is ${resultsDetails.agent}.`

        const shareMessage = `${text} 
        
        ${cta} ${url}`
        // console.log("ShareMessage : ", shareMessage)

        console.log(text)
        console.log(resultsDetails.agent)

        // checking navigator.share first if the browser supports it
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "My ValoTraits Result",
                    text: `${text} ${cta}`,
                    url: window.location.href
                })
                console.log("navigator.share worked")
            } else {
                await navigator.clipboard.writeText(shareMessage)
                console.log("ShareMessage : ", shareMessage)
                console.log("navigator.share unavailable, copied to clipboard")
            }
        } catch (err) {
            if (err.name === "AbortError") {
                console.log("User cancelled sharing")
            } else {
                console.log("Sharing Cancelled or failed:", err)
            }
        }
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