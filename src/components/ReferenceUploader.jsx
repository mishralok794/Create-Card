import React, { useRef, useState } from 'react'
import {
  Upload,
  ZoomIn,
  RotateCw,
  Sparkles,
  Info,
  ShieldCheck,
  Check,
  Eye,
  Trash2,
  FileImage,
  ArrowRight
} from 'lucide-react'

export default function ReferenceUploader({
  referenceState,
  setReferenceState,
  cardStyling,
  setCardStyling,
  showSideBySide,
  setShowSideBySide
}) {
  const frontInputRef = useRef(null)
  const backInputRef = useRef(null)
  const [activeRefSide, setActiveRefSide] = useState('front') // 'front' | 'back'
  const [errorMsg, setErrorMsg] = useState('')

  const handleFileUpload = (file, side) => {
    if (!file) return
    setErrorMsg('')

    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Invalid format. Please upload JPG, PNG, or WEBP.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 10 MB limit.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target.result
      setReferenceState((prev) => {
        const updated = {
          ...prev,
          src: side === 'front' ? dataUrl : (prev.src || dataUrl),
          [side === 'front' ? 'frontSrc' : 'backSrc']: dataUrl,
          [side === 'front' ? 'frontName' : 'backName']: file.name,
          zoom: 1,
          rotation: 0
        }
        return updated
      })
      setShowSideBySide(true)
    }
    reader.onerror = () => setErrorMsg('Failed to read image file.')
    reader.readAsDataURL(file)
  }

  const currentSrc =
    activeRefSide === 'front'
      ? referenceState.frontSrc || referenceState.src
      : referenceState.backSrc

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Reference Card Uploader (Front & Back)
          </h2>
          <p className="text-xs text-slate-400">
            Upload your front and back reference images to align layout and typography
          </p>
        </div>

        {currentSrc && (
          <button
            onClick={() => setShowSideBySide(!showSideBySide)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition ${
              showSideBySide
                ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title="Toggle Side-by-Side Reference Preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showSideBySide ? 'Hide Compare' : 'Split Compare'}</span>
          </button>
        )}
      </div>

      {/* Side Selector Tabs (Front Reference vs Back Reference) */}
      <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => {
            setActiveRefSide('front')
            if (referenceState.frontSrc) {
              setReferenceState(p => ({ ...p, src: p.frontSrc }))
            }
          }}
          className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeRefSide === 'front'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileImage className="w-3.5 h-3.5" />
          <span>Front Reference {referenceState.frontSrc ? '✓' : ''}</span>
        </button>

        <button
          onClick={() => {
            setActiveRefSide('back')
            if (referenceState.backSrc) {
              setReferenceState(p => ({ ...p, src: p.backSrc }))
            }
          }}
          className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeRefSide === 'back'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileImage className="w-3.5 h-3.5" />
          <span>Back Reference {referenceState.backSrc ? '✓' : ''}</span>
        </button>
      </div>

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={frontInputRef}
        className="hidden"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => handleFileUpload(e.target.files?.[0], 'front')}
      />
      <input
        type="file"
        ref={backInputRef}
        className="hidden"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => handleFileUpload(e.target.files?.[0], 'back')}
      />

      {/* Upload Zone or Preview */}
      {!currentSrc ? (
        <div
          onClick={() =>
            activeRefSide === 'front'
              ? frontInputRef.current?.click()
              : backInputRef.current?.click()
          }
          className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-950/40 rounded-xl p-6 text-center cursor-pointer transition"
        >
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold text-slate-200">
            Click to upload {activeRefSide === 'front' ? 'Front Side' : 'Back Side'} Reference
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Supports JPG, PNG, WEBP (Max 10MB)
          </p>
        </div>
      ) : (
        <div className="space-y-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
            <span className="truncate max-w-[200px] font-medium">
              {activeRefSide === 'front'
                ? referenceState.frontName || 'Front Reference'
                : referenceState.backName || 'Back Reference'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  activeRefSide === 'front'
                    ? frontInputRef.current?.click()
                    : backInputRef.current?.click()
                }
                className="text-indigo-400 hover:text-indigo-300 text-xs"
              >
                Change
              </button>
              <button
                onClick={() => {
                  setReferenceState(prev => ({
                    ...prev,
                    [activeRefSide === 'front' ? 'frontSrc' : 'backSrc']: '',
                    [activeRefSide === 'front' ? 'frontName' : 'backName']: '',
                    src: activeRefSide === 'front' ? prev.backSrc || '' : prev.frontSrc || ''
                  }))
                }}
                className="text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* Image Viewport */}
          <div className="relative w-full h-48 rounded-lg bg-slate-900 overflow-hidden flex items-center justify-center border border-slate-800">
            <img
              src={currentSrc}
              alt="Reference Preview"
              className="max-w-full max-h-full object-contain transition-transform"
              style={{
                transform: `scale(${referenceState.zoom || 1}) rotate(${referenceState.rotation || 0}deg)`
              }}
            />
          </div>

          {/* Zoom & Rotation Sliders */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[11px] text-slate-400 flex items-center justify-between mb-1">
                <span>Zoom: {(referenceState.zoom || 1).toFixed(1)}x</span>
                <ZoomIn className="w-3 h-3 text-slate-400" />
              </label>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={referenceState.zoom || 1}
                onChange={(e) =>
                  setReferenceState(prev => ({ ...prev, zoom: parseFloat(e.target.value) }))
                }
                className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 flex items-center justify-between mb-1">
                <span>Rotation: {referenceState.rotation || 0}°</span>
                <RotateCw className="w-3 h-3 text-slate-400" />
              </label>
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={referenceState.rotation || 0}
                onChange={(e) =>
                  setReferenceState(prev => ({ ...prev, rotation: parseInt(e.target.value) }))
                }
                className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
          {errorMsg}
        </div>
      )}

      {/* Safety Compliance Notice */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <span>
          <strong>Ethical Practice:</strong> Reference cards are used strictly for comparing layout alignment and font sizes. Official government seals or holographic security marks are not replicated.
        </span>
      </div>
    </div>
  )
}
