import React, { useRef } from 'react'
import {
  Camera,
  Upload,
  ZoomIn,
  Move,
  RotateCw,
  Sparkles,
  UserCheck,
  ShieldAlert,
  Trash2
} from 'lucide-react'
import { DEMO_PORTRAITS, generateAvatar } from '../utils/generateSampleData'

export default function PortraitUploader({
  portraitPhoto,
  setPortraitPhoto,
  cardStyling,
  setCardStyling
}) {
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Only JPG, PNG or WEBP photos are supported.')
      return
    }

    if (file.size > 8 * 1024 * 1024) {
      alert('Photo file size exceeds 8MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setPortraitPhoto(event.target.result)
      // Reset zoom and pan
      setCardStyling((prev) => ({
        ...prev,
        photoZoom: 1,
        photoPanX: 0,
        photoPanY: 0
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleGenerateNewAvatar = (gender = 'Male') => {
    const newAvatar = generateAvatar(gender, Math.random())
    setPortraitPhoto(newAvatar)
    setCardStyling((prev) => ({
      ...prev,
      photoZoom: 1,
      photoPanX: 0,
      photoPanY: 0
    }))
  }

  return (
    <div className="space-y-4">
      {/* Photo Preview & Live Framing Adjustments */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-indigo-400" />
            Passport-Style Portrait
          </h3>

          {portraitPhoto && (
            <button
              onClick={() => setPortraitPhoto('')}
              className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Remove</span>
            </button>
          )}
        </div>

        {/* Live Frame Preview with Mask */}
        <div className="flex items-center justify-center py-2">
          <div
            className="w-36 h-44 bg-slate-900 border-2 overflow-hidden flex items-center justify-center relative shadow-inner"
            style={{
              borderColor: cardStyling.accent || '#4f46e5',
              borderRadius:
                cardStyling.shape === 'circle'
                  ? '50%'
                  : cardStyling.shape === 'rounded'
                  ? '16px'
                  : '6px'
            }}
          >
            {portraitPhoto ? (
              <img
                src={portraitPhoto}
                alt="Portrait Preview"
                className="w-full h-full object-cover transition-transform"
                style={{
                  transform: `scale(${cardStyling.photoZoom || 1}) translate(${cardStyling.photoPanX || 0}%, ${cardStyling.photoPanY || 0}%)`
                }}
              />
            ) : (
              <div className="text-center p-3 text-slate-500">
                <Camera className="w-8 h-8 mx-auto mb-1 opacity-50" />
                <span className="text-[10px]">No Photo Selected</span>
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Portrait from Device</span>
          </button>
        </div>

        {/* Frame Shape Toggle */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => setCardStyling((p) => ({ ...p, shape: 'rect' }))}
            className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition ${
              cardStyling.shape === 'rect'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-300 border-slate-700'
            }`}
          >
            Rectangle
          </button>

          <button
            onClick={() => setCardStyling((p) => ({ ...p, shape: 'rounded' }))}
            className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition ${
              cardStyling.shape === 'rounded'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-300 border-slate-700'
            }`}
          >
            Rounded
          </button>

          <button
            onClick={() => setCardStyling((p) => ({ ...p, shape: 'circle' }))}
            className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition ${
              cardStyling.shape === 'circle'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-300 border-slate-700'
            }`}
          >
            Circle / Oval
          </button>
        </div>

        {/* Repositioning & Zoom Sliders */}
        <div className="space-y-2.5 pt-2 border-t border-slate-800">
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <ZoomIn className="w-3 h-3" />
                <span>Zoom: {(cardStyling.photoZoom || 1).toFixed(2)}x</span>
              </span>
              <button
                onClick={() => setCardStyling((p) => ({ ...p, photoZoom: 1 }))}
                className="text-[10px] text-indigo-400 hover:underline"
              >
                Reset
              </button>
            </div>
            <input
              type="range"
              min="0.6"
              max="2.5"
              step="0.05"
              value={cardStyling.photoZoom || 1}
              onChange={(e) =>
                setCardStyling((p) => ({ ...p, photoZoom: parseFloat(e.target.value) }))
              }
              className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="block text-[11px] text-slate-400 mb-1">
                Pan X: {cardStyling.photoPanX || 0}%
              </span>
              <input
                type="range"
                min="-40"
                max="40"
                step="2"
                value={cardStyling.photoPanX || 0}
                onChange={(e) =>
                  setCardStyling((p) => ({ ...p, photoPanX: parseInt(e.target.value) }))
                }
                className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
              />
            </div>

            <div>
              <span className="block text-[11px] text-slate-400 mb-1">
                Pan Y: {cardStyling.photoPanY || 0}%
              </span>
              <input
                type="range"
                min="-40"
                max="40"
                step="2"
                value={cardStyling.photoPanY || 0}
                onChange={(e) =>
                  setCardStyling((p) => ({ ...p, photoPanY: parseInt(e.target.value) }))
                }
                className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fictional AI Avatar Gallery */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Fictional Vector Avatar Gallery
          </h3>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            Safe Fictional Demo
          </span>
        </div>

        <p className="text-[11px] text-slate-400">
          Click any preset avatar or click generate to synthesize a fresh vector identity:
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-4 gap-2.5">
          {DEMO_PORTRAITS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPortraitPhoto(p.src)
                setCardStyling((prev) => ({
                  ...prev,
                  photoZoom: 1,
                  photoPanX: 0,
                  photoPanY: 0
                }))
              }}
              className="group relative rounded-xl overflow-hidden border-2 border-slate-800 hover:border-indigo-500 transition aspect-[3/4] bg-slate-900"
              title={p.name}
            >
              <img src={p.src} alt={p.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-1">
                <span className="text-[8px] text-white font-medium truncate w-full">
                  {p.name.split(' ')[0]}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Synthesis Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => handleGenerateNewAvatar('Male')}
            className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>New Male Avatar</span>
          </button>

          <button
            onClick={() => handleGenerateNewAvatar('Female')}
            className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition"
          >
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>New Female Avatar</span>
          </button>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Privacy Safeguard:</strong> This tool never searches or retrieves photos of real individuals based on names or personal details.
        </span>
      </div>
    </div>
  )
}
