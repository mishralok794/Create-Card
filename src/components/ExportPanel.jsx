import React, { useState } from 'react'
import {
  Download,
  Eye,
  FileCheck,
  Smartphone,
  Layers,
  Sparkles,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  X
} from 'lucide-react'
import confetti from 'canvas-confetti'
import {
  renderCardToDataUrl,
  renderCombinedSheet,
  downloadDataUrl
} from '../utils/exportCard'

export default function ExportPanel({
  frontNodeRef,
  backNodeRef,
  cardData,
  setActiveSidebarTab
}) {
  const [exporting, setExporting] = useState(false)
  const [exportStatus, setExportStatus] = useState('')
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    title: '',
    dataUrl: '',
    filename: '',
    format: 'png'
  })

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      })
    } catch (e) {
      // Ignore if canvas-confetti is not loaded
    }
  }

  // Generate high-res image and open preview modal
  const handleExport = async (type) => {
    setExporting(true)
    setExportStatus(`Preparing high-resolution ${type} render...`)

    try {
      if (type === 'front') {
        const node = frontNodeRef.current
        if (!node) throw new Error('Front card node not available')
        const dataUrl = await renderCardToDataUrl(node, 3)
        const filename = `CardCraft-${cardData.fullName?.replace(/\s+/g, '_') || 'Sample'}-Front.png`

        setPreviewModal({
          isOpen: true,
          title: 'Front Side Card Proof (PNG - 300 DPI)',
          dataUrl,
          filename,
          format: 'png'
        })
      } else if (type === 'back') {
        const node = backNodeRef.current
        if (!node) throw new Error('Back card node not available')
        const dataUrl = await renderCardToDataUrl(node, 3)
        const filename = `CardCraft-${cardData.fullName?.replace(/\s+/g, '_') || 'Sample'}-Back.png`

        setPreviewModal({
          isOpen: true,
          title: 'Back Side Card Proof (PNG - 300 DPI)',
          dataUrl,
          filename,
          format: 'png'
        })
      } else if (type === 'combined') {
        const front = frontNodeRef.current
        const back = backNodeRef.current
        if (!front || !back) throw new Error('Both card sides must be rendered')
        const dataUrl = await renderCombinedSheet(front, back, cardData)
        const filename = `CardCraft-${cardData.fullName?.replace(/\s+/g, '_') || 'Sample'}-CombinedProof.png`

        setPreviewModal({
          isOpen: true,
          title: 'Complete Dual-Side Presentation Proof Sheet',
          dataUrl,
          filename,
          format: 'png'
        })
      }
    } catch (err) {
      console.error('Export error:', err)
      alert(`Export failed: ${err.message}`)
    } finally {
      setExporting(false)
      setExportStatus('')
    }
  }

  // Trigger download from modal
  const handleConfirmDownload = () => {
    downloadDataUrl(previewModal.dataUrl, previewModal.filename)
    triggerConfetti()
    setPreviewModal({ ...previewModal, isOpen: false })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
          <Download className="w-4 h-4 text-indigo-400" />
          <span>High-Resolution Export & Download</span>
        </h2>
        <p className="text-xs text-slate-400">
          Export client-side high-fidelity PNG or presentation proof sheets with embedded fonts
        </p>
      </div>

      {/* Export Options Grid */}
      <div className="space-y-3">
        {/* Option 1: Front Side PNG */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <h3 className="text-xs font-bold text-slate-200">Front Side (PNG)</h3>
            </div>
            <p className="text-[11px] text-slate-400">
              High-res 3x rasterization with portrait, org crest, and demo QR
            </p>
          </div>

          <button
            disabled={exporting}
            onClick={() => handleExport('front')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>

        {/* Option 2: Back Side PNG */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              <h3 className="text-xs font-bold text-slate-200">Back Side (PNG)</h3>
            </div>
            <p className="text-[11px] text-slate-400">
              Includes full Hindi Devanagari text, English address, and verified postal PIN
            </p>
          </div>

          <button
            disabled={exporting}
            onClick={() => handleExport('back')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>

        {/* Option 3: Combined Sheet */}
        <div className="bg-gradient-to-r from-indigo-950/70 to-slate-900 p-4 rounded-xl border border-indigo-500/40 transition flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <h3 className="text-xs font-bold text-white">Dual-Side Combined Proof (PNG)</h3>
            </div>
            <p className="text-[11px] text-slate-300">
              Front and Back arranged side-by-side on a presentation sheet with cut marks
            </p>
          </div>

          <button
            disabled={exporting}
            onClick={() => handleExport('combined')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Combined</span>
          </button>
        </div>

        {/* Option 4: Phone Photo Studio Shortcut */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-200">Phone Photography Shot (JPG)</h3>
            </div>
            <p className="text-[11px] text-slate-400">
              Realistic 3D casual smartphone camera shot on oak desk or marble
            </p>
          </div>

          <button
            onClick={() => setActiveSidebarTab('photo_effect')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition"
          >
            <span>Open Studio</span>
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {exporting && (
        <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/40 flex items-center gap-3 text-xs text-indigo-300">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-400 shrink-0" />
          <span>{exportStatus || 'Generating high-resolution raster graphic...'}</span>
        </div>
      )}

      {/* Export Specifications & Notice */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Rendering Quality Specs:
        </h4>
        <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
          <li>Super-sampled 3x resolution for razor-sharp typography</li>
          <li>Embedded Google Fonts & Noto Sans Devanagari Hindi font</li>
          <li>Scannable high-contrast vector QR code inclusion</li>
          <li>Permanent <span className="text-red-400 font-semibold">SAMPLE — NOT VALID ID</span> safety stamp</li>
        </ul>
      </div>

      {/* High-Resolution Preview Modal */}
      {previewModal.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-5 shadow-2xl space-y-4 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">{previewModal.title}</h3>
              </div>
              <button
                onClick={() => setPreviewModal({ ...previewModal, isOpen: false })}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Preview Area */}
            <div className="flex-1 overflow-auto bg-slate-950 rounded-xl p-4 flex items-center justify-center border border-slate-800 min-h-[300px]">
              <img
                src={previewModal.dataUrl}
                alt="Export Preview"
                className="max-w-full max-h-[500px] object-contain shadow-2xl rounded-lg"
              />
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-mono">
                {previewModal.filename}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewModal({ ...previewModal, isOpen: false })}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmDownload}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Image Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
