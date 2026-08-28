"use client"
import { toPng } from "html-to-image"
import { useState, useCallback } from "react"
import ResultPreviewModal from "./ResultPreviewModal"

export default function ShareButtons({ resultsDetails, cardRef }) {

    const [iscopied, setIsCopied] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [previewImg, setPreviewImg] = useState(null)


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


    const generatePreview = () => {
        if (cardRef.current === null) {
            return
        }
        toPng(cardRef.current, { skipFonts: true })
            .then((dataUrl) => {
                setPreviewImg(dataUrl)
                setIsOpen(true)

            })
            .catch((err) => {
                console.log(err)
            })
    }


    const resultImageDownload = () => {
        if (!previewImg) {
            return
        }
        const link = document.createElement('a')
        link.download = "my-valotraits-result.png"
        link.href = previewImg
        link.click()

    }

    return (
        <>
            <button
                onClick={handleCopy}>{iscopied ? "Copied" : "Copy Link"}
            </button>
            <button onClick={handleShareText}>Share</button>
            <button onClick={generatePreview}>Download Result Card</button>
            {isOpen && <ResultPreviewModal onClose={() => setIsOpen(false)} download={resultImageDownload} dataUrl={previewImg} />}
        </>
    )
}