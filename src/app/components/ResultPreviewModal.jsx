
export default function ResultPreviewModal({ dataUrl, download, onClose }) {
    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={dataUrl}
                        className="max-h-[70vh] max-w-full w-auto h-auto object-contain rounded-lg"
                        alt="result image"
                    />

                    <div className="flex justify-center gap-4 mt-5">
                        <button
                            onClick={onClose}
                            className="border-2 border-neutral-700 bg-neutral-800 text-white cursor-pointer transition-all duration-200 hover:bg-neutral-600 py-2 px-5 rounded-xl"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={download}
                            className="border-2 border-blue-600 bg-blue-600 text-white cursor-pointer transition-all duration-200 hover:bg-blue-400 py-2 px-5 rounded-xl"
                        >
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}