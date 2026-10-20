import React, { useState } from 'react'
import {
  CreditCard,
  Download,
  FolderDown,
  RotateCcw,
  Save,
  Sparkles,
  ShieldAlert,
  Layers,
  CheckCircle,
  HelpCircle
} from 'lucide-react'

export const PRESET_TEMPLATES = [
  {
    id: 'tech_summit',
    name: 'Tech Summit Badge',
    styling: {
      bg: '#0f172a',
      accent: '#4f46e5',
      secondaryStripe: '#06b6d4',
      border: '#334155',
      bw: 3,
      textColor: '#f8fafc',
      labelColor: '#94a3b8',
      font: 'Outfit, sans-serif',
      pattern: 'dots',
      shape: 'rect',
      headerAlign: 'center',
      watermarkOpacity: 0.28
    },
    orgName: 'Global Developers Summit 2026'
  },
  {
    id: 'corporate_club',
    name: 'Executive Club Pass',
    styling: {
      bg: '#ffffff',
      accent: '#1e293b',
      secondaryStripe: '#d97706',
      border: '#e2e8f0',
      bw: 2,
      textColor: '#0f172a',
      labelColor: '#64748b',
      font: 'Inter, sans-serif',
      pattern: 'mesh',
      shape: 'rounded',
      headerAlign: 'left',
      watermarkOpacity: 0.24
    },
    orgName: 'Metropolitan Executive Guild (Fictional)'
  },
  {
    id: 'academic_institute',
    name: 'Academic Fellowship Pass',
    styling: {
      bg: '#f8fafc',
      accent: '#0f766e',
      secondaryStripe: '#14b8a6',
      border: '#cbd5e1',
      bw: 4,
      textColor: '#134e4a',
      labelColor: '#475569',
      font: 'Noto Sans Devanagari, Inter, sans-serif',
      pattern: 'waves',
      shape: 'circle',
      headerAlign: 'left',
      watermarkOpacity: 0.25
    },
    orgName: 'National Innovation Institute (Demo)'
  },
  {
    id: 'metro_transit',
    name: 'Metro Transit Smart Card',
    styling: {
      bg: '#18181b',
      accent: '#9333ea',
      secondaryStripe: '#ec4899',
      border: '#3f3f46',
      bw: 2,
      textColor: '#fafafa',
      labelColor: '#a1a1aa',
      font: 'JetBrains Mono, monospace',
      pattern: 'grid',
      shape: 'rect',
      headerAlign: 'left',
      watermarkOpacity: 0.26
    },
    orgName: 'Metro Civic Mobility Network'
  }
]

export default function Header({
  onSaveDraft,
  onLoadDraft,
  onResetProject,
  onApplyPreset,
  onOpenExportModal,
  savedTimestamp
}) {
  const [showPresets, setShowPresets] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-50">
      {/* Brand & Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-indigo-400" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              CardCraft <span className="text-indigo-400 font-extrabold">AI</span>
            </h1>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Studio v1.0
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">
            Fictional Sample Card Designer & Mobile Photo Simulator
          </p>
        </div>
      </div>

      {/* Safety Notice Banner Button */}
      <button
        onClick={() => setShowDisclaimer(!showDisclaimer)}
        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 text-xs transition"
        title="View Safety & Demo Policy"
      >
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Fictional Demonstration Use Only</span>
      </button>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Preset Templates */}
        <div className="relative">
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Templates</span>
          </button>

          {showPresets && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50">
              <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                Select Design Preset
              </div>
              {PRESET_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    onApplyPreset(tmpl)
                    setShowPresets(false)
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-600/20 hover:text-indigo-200 text-slate-300 text-xs transition flex items-center justify-between group"
                >
                  <span className="font-medium">{tmpl.name}</span>
                  <div
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ background: tmpl.styling.accent }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Save Draft */}
        <button
          onClick={onSaveDraft}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
          title={savedTimestamp ? `Last saved: ${savedTimestamp}` : 'Save draft to local storage'}
        >
          <Save className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Save Draft</span>
        </button>

        {/* Load Saved */}
        <button
          onClick={onLoadDraft}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
          title="Restore draft from local storage"
        >
          <FolderDown className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Restore</span>
        </button>

        {/* Reset Project */}
        <button
          onClick={onResetProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-red-500/20 text-slate-300 hover:text-red-300 text-xs font-medium border border-slate-700/80 transition"
          title="Reset project to default fictional profile"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-400" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        {/* Main Export Button */}
        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition ml-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Card</span>
        </button>
      </div>

      {/* Safety Policy Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Ethical Design & Demonstration Policy</h3>
                <p className="text-xs text-slate-400">CardCraft AI Safety Guidelines</p>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-2.5 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              <p>
                <strong>1. Fictional Samples Only:</strong> This application is engineered exclusively for creative design mockups, film/theatre prop generation, and UI prototyping.
              </p>
              <p>
                <strong>2. Permanent Watermarks:</strong> All exported cards carry high-contrast, permanent <code className="text-red-400 font-mono">SAMPLE — NOT VALID ID</code> watermarks that cannot be removed.
              </p>
              <p>
                <strong>3. Anti-Forgery Protection:</strong> This software strictly prohibits and refuses the reproduction of authentic government security features, national emblems, holographic overlays, or genuine biometric seals.
              </p>
              <p>
                <strong>4. Privacy Guaranteed:</strong> All rendering happens 100% locally on your computer inside your web browser. No portraits, personal names, or addresses are ever transmitted to any external server.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowDisclaimer(false)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Understood & Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
