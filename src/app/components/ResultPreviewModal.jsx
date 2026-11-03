export default function ResultPreviewModal({ dataUrl, download, onClose }) {
  return (
    <div className="modal-overlay fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-6">
      <div className="modal-content flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-[#263341] bg-[#0F1923] p-4 shadow-2xl sm:p-6">
        <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00F5D4]">
              ValoTraits
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#ECE8E1]">
              Result card preview
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close preview"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#263341] text-lg text-[#A5ADB7] transition-colors hover:border-[#FF4655] hover:text-[#FF4655]"
          >
            ×
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto rounded-xl bg-[#080B10] p-2 sm:p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUrl}
            className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain"
            alt="result image"
          />
        </div>

        <div className="mt-4 grid shrink-0 grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="min-h-11 rounded-lg border border-[#263341] bg-[#080B10] px-4 py-3 text-sm font-semibold text-[#ECE8E1] transition-colors hover:border-[#A5ADB7]"
          >
            Cancel
          </button>

          <button
            onClick={download}
            className="min-h-11 rounded-lg bg-[#FF4655] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E83B49]"
          >
            Download ↓
          </button>
        </div>
      </div>
    </div>
  );
}
