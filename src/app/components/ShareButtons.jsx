"use client"

import { useState } from "react"

export default function ShareButtons() {

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

    return (
        <>
            <button
                onClick={handleCopy}>{iscopied ? "Copied" : "Copy Link"}
            </button>
        </>
    )
}