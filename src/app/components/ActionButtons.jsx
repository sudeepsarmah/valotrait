"use client";
import { toPng } from "html-to-image";
import { useState } from "react";
import ResultPreviewModal from "./ResultPreviewModal";
import { useRouter } from "next/navigation";

export default function ActionButtons({ results, cardRef }) {
  const [iscopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    } catch (err) {
      console.log("Failed to copy URL: ", err);
    }
  };

  const handleShareText = async () => {
    const url = window.location.href;
    const cta = "Take the quiz and find your Valorant Personality.";
    const text = `I got the ${results.personality_name}. My role is ${results.top_role}, and my recommended agent is ${results.top_agent}.`;

    const shareMessage = `${text} 
        
        ${cta} ${url}`;
    // checking navigator.share first if the browser supports it
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My ValoTraits Result",
          text: `${text} ${cta}`,
          url: window.location.href,
        });
        console.log("navigator.share worked");
      } else {
        await navigator.clipboard.writeText(shareMessage);
        console.log("ShareMessage : ", shareMessage);
        console.log("navigator.share unavailable, copied to clipboard");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("User cancelled sharing");
      } else {
        console.log("Sharing Cancelled or failed:", err);
      }
    }
  };

  const generatePreview = () => {
    if (cardRef.current === null) {
      return;
    }
    toPng(cardRef.current, { skipFonts: true })
      .then((dataUrl) => {
        setPreviewImg(dataUrl);
        setIsOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resultImageDownload = () => {
    if (!previewImg) {
      return;
    }
    const link = document.createElement("a");
    link.download = "my-valotraits-result.png";
    link.href = previewImg;
    link.click();
  };

  const handleRetake = () => {
    router.push("/quiz");
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 mt-4">
      <button
        onClick={handleCopy}
        className="min-h-11 w-full rounded-lg border border-[#263341] bg-[#0F1923] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#ECE8E1] transition-all duration-200 hover:border-[#00F5D4] hover:text-[#00F5D4] sm:w-auto"
      >
        {iscopied ? "Copied" : "Copy Link"}
      </button>

      <button
        onClick={handleShareText}
        className="min-h-11 w-full rounded-lg border border-[#263341] bg-[#0F1923] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#ECE8E1] transition-all duration-200 hover:border-[#00F5D4] hover:text-[#00F5D4] sm:w-auto"
      >
        Share
      </button>

      <button
        onClick={generatePreview}
        className="min-h-11 w-full rounded-lg bg-[#FF4655] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#E83B49] sm:w-auto"
      >
        Download Result Card
      </button>

      {isOpen && (
        <ResultPreviewModal
          onClose={() => setIsOpen(false)}
          download={resultImageDownload}
          dataUrl={previewImg}
        />
      )}

      <button
        onClick={handleRetake}
        className="min-h-11 w-full rounded-lg border border-[#263341] bg-transparent px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#A5ADB7] transition-all duration-200 hover:border-[#FF4655] hover:text-[#FF4655] sm:ml-auto sm:w-auto"
      >
        Retake Quiz
      </button>
    </div>
  );
}
