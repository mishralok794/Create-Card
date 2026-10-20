import React from 'react'
import {
  Palette,
  Type,
  Maximize2,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  Layers,
  RotateCcw
} from 'lucide-react'

export const FONT_OPTIONS = [
  { name: 'Noto Sans Devanagari + Inter (Clean Standard)', value: '"Noto Sans Devanagari", Inter, Roboto, Arial, sans-serif' },
  { name: 'Inter (Modern Standard)', value: 'Inter, system-ui, sans-serif' },
  { name: 'Roboto (Clean Document)', value: 'Roboto, Arial, sans-serif' },
  { name: 'Outfit (Modern Sans)', value: 'Outfit, sans-serif' },
  { name: 'JetBrains Mono (Monospace)', value: '"JetBrains Mono", monospace' }
]


export const DIMENSION_PRESETS = [
  { name: 'Standard CR80 (85.6 × 53.98mm)', w: 1012, h: 638 },
  { name: 'Vertical Badge (53.98 × 85.6mm)', w: 638, h: 1012 },
  { name: 'Square Member Pass (80 × 80mm)', w: 800, h: 800 }
]

export const PATTERN_OPTIONS = [
  { id: 'dots', name: 'Micro Dots' },
  { id: 'grid', name: 'Security Grid' },
  { id: 'waves', name: 'Geometric Waves' },
  { id: 'mesh', name: 'Cross Mesh' },
  { id: 'none', name: 'Solid Clean' }
]

export default function CardEditor({ cardStyling, setCardStyling, onResetStyling }) {
  const updateStyle = (key, val) => {
    setCardStyling((prev) => ({
      ...prev,
      [key]: val
    }))
  }

  return (
    <aside className="w-full lg:w-[360px] xl:w-[380px] flex-shrink-0 bg-slate-900/90 border-l border-slate-800 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span>Styling & Layout</span>
        </h2>
        <button
          onClick={onResetStyling}
          className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1"
          title="Reset styling to default"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Card Dimensions Preset */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Card Aspect & Dimensions</span>
        </label>
        <div className="space-y-1.5">
          {DIMENSION_PRESETS.map((dp, i) => (
            <button
              key={i}
              onClick={() => {
                updateStyle('w', dp.w)
                updateStyle('h', dp.h)
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium border transition flex items-center justify-between ${
                cardStyling.w === dp.w && cardStyling.h === dp.h
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <span>{dp.name}</span>
              <span className="font-mono text-[10px] opacity-70">
                {dp.w}×{dp.h}px
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette Controls */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-indigo-400" />
          <span>Color Palette</span>
        </label>

        {/* Header Accent Color */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300">Header Accent Color:</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={cardStyling.accent || '#4f46e5'}
              onChange={(e) => updateStyle('accent', e.target.value)}
              className="w-7 h-7 rounded border border-slate-600 bg-transparent cursor-pointer"
            />
            <span className="font-mono text-[11px] text-slate-400 w-16">
              {cardStyling.accent}
            </span>
          </div>
        </div>

        {/* Sub-Stripe Accent Color */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300">Secondary Stripe Accent:</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={cardStyling.secondaryStripe || '#06b6d4'}
              onChange={(e) => updateStyle('secondaryStripe', e.target.value)}
              className="w-7 h-7 rounded border border-slate-600 bg-transparent cursor-pointer"
            />
            <span className="font-mono text-[11px] text-slate-400 w-16">
              {cardStyling.secondaryStripe}
            </span>
          </div>
        </div>

        {/* Card Body Background */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300">Card Body Background:</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={cardStyling.bg || '#ffffff'}
              onChange={(e) => updateStyle('bg', e.target.value)}
              className="w-7 h-7 rounded border border-slate-600 bg-transparent cursor-pointer"
            />
            <span className="font-mono text-[11px] text-slate-400 w-16">
              {cardStyling.bg}
            </span>
          </div>
        </div>

        {/* Primary Text Color */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300">Primary Text Color:</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={cardStyling.textColor || '#0f172a'}
              onChange={(e) => updateStyle('textColor', e.target.value)}
              className="w-7 h-7 rounded border border-slate-600 bg-transparent cursor-pointer"
            />
            <span className="font-mono text-[11px] text-slate-400 w-16">
              {cardStyling.textColor}
            </span>
          </div>
        </div>

        {/* Secondary Label Color */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300">Field Labels Color:</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={cardStyling.labelColor || '#64748b'}
              onChange={(e) => updateStyle('labelColor', e.target.value)}
              className="w-7 h-7 rounded border border-slate-600 bg-transparent cursor-pointer"
            />
            <span className="font-mono text-[11px] text-slate-400 w-16">
              {cardStyling.labelColor}
            </span>
          </div>
        </div>
      </div>

      {/* Background Texture Patterns */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>Card Security Pattern Overlay</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {PATTERN_OPTIONS.map((pat) => (
            <button
              key={pat.id}
              onClick={() => updateStyle('pattern', pat.id)}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border text-center transition truncate ${
                cardStyling.pattern === pat.id
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              {pat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Typography & Alignment */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-indigo-400" />
          <span>Typography & Alignment</span>
        </label>

        {/* Font Family */}
        <div>
          <span className="block text-xs text-slate-400 mb-1">Card Font Family:</span>
          <select
            value={cardStyling.font || FONT_OPTIONS[0].value}
            onChange={(e) => updateStyle('font', e.target.value)}
            className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            {FONT_OPTIONS.map((f, i) => (
              <option key={i} value={f.value}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Header Alignment */}
        <div>
          <span className="block text-xs text-slate-400 mb-1.5">Header Banner Alignment:</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => updateStyle('headerAlign', 'left')}
              className={`py-1.5 rounded-lg flex items-center justify-center border transition ${
                cardStyling.headerAlign === 'left'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              <AlignLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => updateStyle('headerAlign', 'center')}
              className={`py-1.5 rounded-lg flex items-center justify-center border transition ${
                cardStyling.headerAlign === 'center'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              <AlignCenter className="w-4 h-4" />
            </button>

            <button
              onClick={() => updateStyle('headerAlign', 'right')}
              className={`py-1.5 rounded-lg flex items-center justify-center border transition ${
                cardStyling.headerAlign === 'right'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Borders & Geometry */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Border & Geometry
        </label>

        {/* Corner Radius */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Corner Radius: {cardStyling.borderRadius || 24}px</span>
            <span className="text-[10px] text-slate-500">CR80: 24px</span>
          </div>
          <input
            type="range"
            min="4"
            max="48"
            step="2"
            value={cardStyling.borderRadius || 24}
            onChange={(e) => updateStyle('borderRadius', parseInt(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Border Width */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Outer Border Width: {cardStyling.bw || 3}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="8"
            step="1"
            value={cardStyling.bw ?? 3}
            onChange={(e) => updateStyle('bw', parseInt(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Border Color */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300">Border Color:</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={cardStyling.border || '#334155'}
              onChange={(e) => updateStyle('border', e.target.value)}
              className="w-7 h-7 rounded border border-slate-600 bg-transparent cursor-pointer"
            />
            <span className="font-mono text-[11px] text-slate-400 w-16">
              {cardStyling.border}
            </span>
          </div>
        </div>
      </div>

      {/* Front Side Position Offset Controls */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
            Front Side Position (पहला वाला)
          </label>
          <button
            onClick={() => {
              updateStyle('frontTextOffsetX', 0)
              updateStyle('frontTextOffsetY', 0)
            }}
            className="text-[10px] text-indigo-400 hover:underline"
          >
            Center
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="block text-[11px] text-slate-400 mb-1">
              Horizontal: {cardStyling.frontTextOffsetX || 0}px
            </span>
            <input
              type="range"
              min="-60"
              max="60"
              step="2"
              value={cardStyling.frontTextOffsetX || 0}
              onChange={(e) => updateStyle('frontTextOffsetX', parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
            />
          </div>

          <div>
            <span className="block text-[11px] text-slate-400 mb-1">
              Vertical: {cardStyling.frontTextOffsetY || 0}px
            </span>
            <input
              type="range"
              min="-40"
              max="40"
              step="2"
              value={cardStyling.frontTextOffsetY || 0}
              onChange={(e) => updateStyle('frontTextOffsetY', parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Back Side Position Offset Controls */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span>
            Back Side Position (दूसरा वाला)
          </label>
          <button
            onClick={() => {
              updateStyle('backTextOffsetX', 0)
              updateStyle('backTextOffsetY', 0)
            }}
            className="text-[10px] text-indigo-400 hover:underline"
          >
            Center
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="block text-[11px] text-slate-400 mb-1">
              Horizontal: {cardStyling.backTextOffsetX || 0}px
            </span>
            <input
              type="range"
              min="-60"
              max="60"
              step="2"
              value={cardStyling.backTextOffsetX || 0}
              onChange={(e) => updateStyle('backTextOffsetX', parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
            />
          </div>

          <div>
            <span className="block text-[11px] text-slate-400 mb-1">
              Vertical: {cardStyling.backTextOffsetY || 0}px
            </span>
            <input
              type="range"
              min="-40"
              max="40"
              step="2"
              value={cardStyling.backTextOffsetY || 0}
              onChange={(e) => updateStyle('backTextOffsetY', parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Custom Watermark Controls */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Custom Watermark (वाटरमार्क)
          </label>
          <span className="text-[10px] text-slate-400">
            {cardStyling.watermarkOpacity === 0 ? 'Hidden / बन्द' : `${Math.round((cardStyling.watermarkOpacity ?? 0.32) * 100)}% Opacity`}
          </span>
        </div>

        {/* Custom Text Input */}
        <div>
          <label className="block text-[11px] text-slate-400 mb-1">
            Watermark Text (अपने हिसाब से लिखें):
          </label>
          <input
            type="text"
            value={cardStyling.watermarkText !== undefined ? cardStyling.watermarkText : 'SAMPLE — NOT VALID ID'}
            onChange={(e) => updateStyle('watermarkText', e.target.value)}
            placeholder="e.g. SAMPLE, SPECIMEN, or leave empty"
            className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500 font-bold tracking-wider"
          />
        </div>

        {/* Quick Presets */}
        <div>
          <span className="block text-[10px] text-slate-400 mb-1">Quick Presets:</span>
          <div className="flex flex-wrap gap-1.5">
            {['SAMPLE — NOT VALID ID', 'SPECIMEN', 'DEMO ONLY', 'MOCKUP', 'PROP USE'].map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  updateStyle('watermarkText', preset)
                  if ((cardStyling.watermarkOpacity ?? 0.32) === 0) {
                    updateStyle('watermarkOpacity', 0.32)
                  }
                }}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
              >
                {preset.split(' ')[0]}
              </button>
            ))}
            <button
              onClick={() => {
                updateStyle('watermarkText', '')
                updateStyle('watermarkOpacity', 0)
              }}
              className="text-[10px] px-2 py-0.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 transition"
              title="Remove watermark completely"
            >
              Clear (हटाएं)
            </button>
          </div>
        </div>

        {/* Opacity Slider (0 to 0.40) */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Visibility / Opacity: {Math.round((cardStyling.watermarkOpacity ?? 0.32) * 100)}%</span>
            <span className="text-[10px] text-slate-500">(0% = Completely Hidden)</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.40"
            step="0.02"
            value={cardStyling.watermarkOpacity ?? 0.32}
            onChange={(e) => updateStyle('watermarkOpacity', parseFloat(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Watermark Color Picker */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-400">Watermark Color:</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={cardStyling.watermarkColor || '#dc2626'}
              onChange={(e) => updateStyle('watermarkColor', e.target.value)}
              className="w-6 h-6 rounded border border-slate-600 bg-transparent cursor-pointer"
            />
            <span className="font-mono text-[11px] text-slate-400">
              {cardStyling.watermarkColor || '#dc2626'}
            </span>
          </div>
        </div>
      </div>
    </aside>


  )
}
