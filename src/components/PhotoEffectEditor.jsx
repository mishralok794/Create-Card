import React, { useRef, useEffect, useState } from 'react'
import {
  Smartphone,
  Download,
  Sparkles,
  Layers,
  Sun,
  Eye,
  RefreshCw,
  Camera,
  RotateCcw,
  ShieldCheck
} from 'lucide-react'
import { renderCardToDataUrl, downloadDataUrl } from '../utils/exportCard'

export const BACKGROUND_SURFACES = [
  { id: 'wood', name: 'Warm Oak Desk', icon: '🪵' },
  { id: 'marble', name: 'White Carrara Marble', icon: '🏛️' },
  { id: 'slate', name: 'Dark Slate Granite', icon: '🌑' },
  { id: 'leather', name: 'Navy Office Desk Mat', icon: '💼' },
  { id: 'neutral', name: 'Studio Neutral Gray', icon: '⬜' }
]

export const CAMERA_PRESETS = [
  {
    name: 'Top-Down Casual Snapshot',
    settings: { rot: -4, tilt: 10, shadow: 45, light: 35, blur: 0, grain: 22, bg: 'wood' }
  },
  {
    name: 'Angled Desk Perspective',
    settings: { rot: -12, tilt: 24, shadow: 65, light: 45, blur: 0.4, grain: 25, bg: 'leather' }
  },
  {
    name: 'Dramatic Studio Shot',
    settings: { rot: 8, tilt: 18, shadow: 55, light: 50, blur: 0.2, grain: 18, bg: 'slate' }
  }
]

export default function PhotoEffectEditor({
  frontNodeRef,
  backNodeRef,
  cardData,
  onOpenExportModal
}) {
  const canvasRef = useRef(null)
  const [targetSide, setTargetSide] = useState('front') // 'front' | 'back'
  const [rendering, setRendering] = useState(false)

  // Photo effect parameters
  const [params, setParams] = useState({
    rot: -5,
    tilt: 14,
    shadow: 50,
    light: 40,
    blur: 0,
    grain: 20,
    bg: 'wood',
    zoom: 1
  })

  // Re-draw canvas whenever params or targetSide change
  useEffect(() => {
    let active = true
    const draw = async () => {
      setRendering(true)
      const targetNode = targetSide === 'front' ? frontNodeRef.current : backNodeRef.current
      if (!targetNode || !canvasRef.current) {
        setRendering(false)
        return
      }

      try {
        // Capture crisp image of the card with watermark included
        const dataUrl = await renderCardToDataUrl(targetNode, 2)
        if (!active) return

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          if (!active || !canvasRef.current) return
          renderPhonePhotoCanvas(canvasRef.current, img, params)
          setRendering(false)
        }
        img.src = dataUrl
      } catch (err) {
        console.warn('Phone effect capture error:', err)
        setRendering(false)
      }
    }

    const timer = setTimeout(draw, 100)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [targetSide, params, frontNodeRef, backNodeRef])

  // Canvas drawing routine
  const renderPhonePhotoCanvas = (cv, img, o) => {
    const W = 1600
    const H = 1100
    cv.width = W
    cv.height = H
    const ctx = cv.getContext('2d')

    // 1. Draw Tabletop Background
    drawTabletop(ctx, W, H, o.bg)

    // Off-screen canvas for card rendering with transformation
    const offCanvas = document.createElement('canvas')
    offCanvas.width = W
    offCanvas.height = H
    const offCtx = offCanvas.getContext('2d')

    // Card dimensions scaled on canvas
    const baseW = W * 0.62 * (o.zoom || 1)
    const baseH = (baseW * img.height) / img.width

    // Perspective distortion factor
    const tiltFactor = (o.tilt / 100) * 0.38
    const widthAtY = (yRel) => baseW * (1 - tiltFactor * (1 - (yRel + baseH / 2) / baseH))

    offCtx.save()
    offCtx.translate(W / 2, H / 2 + 30)
    offCtx.rotate((o.rot * Math.PI) / 180)

    // 2. Realistic Soft Drop Shadow
    const shadowAlpha = (o.shadow / 100) * 0.45
    offCtx.shadowColor = `rgba(15, 23, 42, ${shadowAlpha})`
    offCtx.shadowBlur = 25 + o.shadow * 0.7
    offCtx.shadowOffsetX = 12 + (o.tilt / 100) * 15
    offCtx.shadowOffsetY = 24 + o.shadow * 0.5

    // Shadow polygon path
    const buildPath = (c) => {
      c.beginPath()
      const topW = widthAtY(-baseH / 2)
      const botW = widthAtY(baseH / 2)
      c.moveTo(-topW / 2, -baseH / 2)
      c.lineTo(topW / 2, -baseH / 2)
      c.lineTo(botW / 2, baseH / 2)
      c.lineTo(-botW / 2, baseH / 2)
      c.closePath()
    }

    buildPath(offCtx)
    offCtx.fillStyle = '#ffffff'
    offCtx.fill()
    offCtx.shadowColor = 'transparent' // Reset shadow for card content

    // 3. Perspective trapezoid image slicing
    const slices = 200
    const sliceH = baseH / slices
    const srcSliceH = img.height / slices

    for (let i = 0; i < slices; i++) {
      const yRel = -baseH / 2 + i * sliceH
      const curW = widthAtY(yRel)
      offCtx.drawImage(
        img,
        0,
        i * srcSliceH,
        img.width,
        srcSliceH + 0.5,
        -curW / 2,
        yRel,
        curW,
        sliceH + 0.5
      )
    }

    // 4. Specular Lighting / Glare Gradient Overlay
    offCtx.save()
    buildPath(offCtx)
    offCtx.clip()

    const glareGrad = offCtx.createLinearGradient(
      -baseW / 2,
      -baseH / 2,
      baseW / 2,
      baseH / 2
    )
    const glareIntensity = (o.light / 100) * 0.5
    glareGrad.addColorStop(0, `rgba(255, 255, 255, ${glareIntensity})`)
    glareGrad.addColorStop(0.4, `rgba(255, 255, 255, ${glareIntensity * 0.3})`)
    glareGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0)')
    glareGrad.addColorStop(1, `rgba(0, 0, 0, ${(o.light / 100) * 0.25})`)

    offCtx.fillStyle = glareGrad
    offCtx.fillRect(-baseW / 2 - 20, -baseH / 2 - 20, baseW + 40, baseH + 40)
    offCtx.restore()

    offCtx.restore()

    // 5. Transfer to main canvas with optional camera lens blur
    ctx.save()
    if (o.blur > 0) {
      ctx.filter = `blur(${o.blur}px)`
    }
    ctx.drawImage(offCanvas, 0, 0)
    ctx.restore()

    // 6. Camera Sensor Noise / Grain
    if (o.grain > 0) {
      applyFilmGrain(ctx, W, H, o.grain)
    }

    // 7. Subtle camera lens vignette
    const vigGrad = ctx.createRadialGradient(W / 2, H / 2, W * 0.35, W / 2, H / 2, W * 0.72)
    vigGrad.addColorStop(0, 'rgba(0,0,0,0)')
    vigGrad.addColorStop(1, 'rgba(0,0,0,0.32)')
    ctx.fillStyle = vigGrad
    ctx.fillRect(0, 0, W, H)
  }

  // Draw natural tabletop surfaces
  const drawTabletop = (ctx, W, H, type) => {
    if (type === 'wood') {
      // Warm oak wood texture
      const grad = ctx.createLinearGradient(0, 0, W, H)
      grad.addColorStop(0, '#9c734e')
      grad.addColorStop(0.5, '#855b38')
      grad.addColorStop(1, '#694324')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Wood grain lines
      ctx.strokeStyle = 'rgba(40, 20, 5, 0.08)'
      ctx.lineWidth = 1.5
      for (let y = 0; y < H; y += 10) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x < W; x += 60) {
          ctx.quadraticCurveTo(
            x + 30,
            y + Math.sin(x * 0.015 + y * 0.02) * 5,
            x + 60,
            y + Math.cos(x * 0.01) * 3
          )
        }
        ctx.stroke()
      }
    } else if (type === 'marble') {
      // White Italian Marble
      const grad = ctx.createLinearGradient(0, 0, W, H)
      grad.addColorStop(0, '#f8fafc')
      grad.addColorStop(0.6, '#f1f5f9')
      grad.addColorStop(1, '#e2e8f0')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Marble grey veins
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)'
      ctx.lineWidth = 2.5
      for (let i = 0; i < 6; i++) {
        ctx.beginPath()
        ctx.moveTo(0, 150 * i)
        ctx.bezierCurveTo(W * 0.3, 150 * i + 80, W * 0.6, 150 * i - 50, W, 150 * i + 120)
        ctx.stroke()
      }
    } else if (type === 'slate') {
      // Dark Slate Granite
      const grad = ctx.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, W * 0.7)
      grad.addColorStop(0, '#27272a')
      grad.addColorStop(1, '#18181b')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)
    } else if (type === 'leather') {
      // Navy desk mat
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, W, H)

      // Desk mat rectangle with subtle stitch
      ctx.fillStyle = '#1e293b'
      ctx.roundRect(80, 80, W - 160, H - 160, 24)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'
      ctx.setLineDash([8, 6])
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.setLineDash([])
    } else {
      // Neutral Studio Gray
      const grad = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, W * 0.7)
      grad.addColorStop(0, '#f1f5f9')
      grad.addColorStop(1, '#cbd5e1')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)
    }
  }

  // Camera sensor noise
  const applyFilmGrain = (ctx, W, H, grainVal) => {
    const imgData = ctx.getImageData(0, 0, W, H)
    const data = imgData.data
    const factor = grainVal * 0.9

    for (let i = 0; i < data.length; i += 16) {
      const noise = (Math.random() - 0.5) * factor
      data[i] = Math.min(255, Math.max(0, data[i] + noise))
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise))
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise))
    }
    ctx.putImageData(imgData, 0, 0)
  }

  // Export as high quality JPEG
  const handleDownloadPhoto = () => {
    if (!canvasRef.current) return
    const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.95)
    downloadDataUrl(dataUrl, `CardCraft-PhonePhoto-${targetSide}-${Date.now()}.jpg`)
  }

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>Mobile Photography Studio</span>
          </h2>
          <p className="text-xs text-slate-400">
            Simulate a realistic casual phone camera shot on a tabletop
          </p>
        </div>

        {/* Side selector */}
        <div className="bg-slate-950 p-0.5 rounded-lg border border-slate-800 flex items-center">
          <button
            onClick={() => setTargetSide('front')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition ${
              targetSide === 'front' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Front Side
          </button>
          <button
            onClick={() => setTargetSide('back')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition ${
              targetSide === 'back' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Back Side
          </button>
        </div>
      </div>

      {/* Real-time Studio Canvas Preview */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl aspect-[16/11] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
          style={{ maxHeight: '340px' }}
        />

        {rendering && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center text-xs text-white gap-2">
            <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Rendering 3D Mobile Photography...</span>
          </div>
        )}
      </div>

      {/* Download Action Bar */}
      <button
        onClick={handleDownloadPhoto}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition"
      >
        <Download className="w-4 h-4" />
        <span>Download Phone Photo (JPG)</span>
      </button>

      {/* Preset Camera Angles */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Camera Angle Presets
        </span>
        <div className="grid grid-cols-3 gap-2">
          {CAMERA_PRESETS.map((cp, i) => (
            <button
              key={i}
              onClick={() => setParams((prev) => ({ ...prev, ...cp.settings }))}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500 text-[11px] text-slate-300 font-medium transition text-center leading-tight"
            >
              {cp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Surface Texture Picker */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Tabletop Background Surface
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BACKGROUND_SURFACES.map((surf) => (
            <button
              key={surf.id}
              onClick={() => setParams((prev) => ({ ...prev, bg: surf.id }))}
              className={`p-2 rounded-lg border text-xs font-medium transition flex items-center gap-1.5 ${
                params.bg === surf.id
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <span>{surf.icon}</span>
              <span className="truncate">{surf.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders: Perspective, Shadow, Glare, Grain */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Perspective & Lighting Controls
        </span>

        {/* 3D Perspective Tilt */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Camera Perspective Tilt: {params.tilt}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="35"
            step="1"
            value={params.tilt}
            onChange={(e) => setParams((p) => ({ ...p, tilt: parseInt(e.target.value) }))}
            className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Surface Rotation */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Card Rotation Angle: {params.rot}°</span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            step="1"
            value={params.rot}
            onChange={(e) => setParams((p) => ({ ...p, rot: parseInt(e.target.value) }))}
            className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Shadow Softness & Intensity */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Tabletop Drop Shadow: {params.shadow}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            step="5"
            value={params.shadow}
            onChange={(e) => setParams((p) => ({ ...p, shadow: parseInt(e.target.value) }))}
            className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Specular Glare / Flash */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Lighting & Glare Reflection: {params.light}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="5"
            value={params.light}
            onChange={(e) => setParams((p) => ({ ...p, light: parseInt(e.target.value) }))}
            className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Film Sensor Grain */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Camera Sensor Noise (Grain): {params.grain}</span>
          </div>
          <input
            type="range"
            min="0"
            max="45"
            step="2"
            value={params.grain}
            onChange={(e) => setParams((p) => ({ ...p, grain: parseInt(e.target.value) }))}
            className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <span>
          <strong>Watermark Guaranteed:</strong> The phone photography rendering operates on the already-watermarked card render. The <code className="text-red-400">SAMPLE — NOT VALID ID</code> watermark remains fully intact and visible in the exported photograph.
        </span>
      </div>
    </div>
  )
}
