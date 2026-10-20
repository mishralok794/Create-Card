import React, { useState } from 'react'
import {
  QrCode,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Info,
  ExternalLink,
  Code2
} from 'lucide-react'

export default function QRGenerator({
  cardData,
  qrCodeUrl,
  qrPayload,
  onRegenerateQR,
  qrOptions,
  setQrOptions
}) {
  const [copied, setCopied] = useState(false)
  const [showPayload, setShowPayload] = useState(false)

  const handleCopy = (text) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* QR Code Preview & UUID Display */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5 text-indigo-400" />
            Fictional Sample QR Code
          </h3>
          <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Scannable
          </span>
        </div>

        {/* Visual QR Code Display */}
        <div className="flex items-center justify-center py-2">
          <div className="p-3 bg-white rounded-xl shadow-lg border border-slate-700 inline-block">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="Demo Card QR Code"
                className="w-36 h-36 object-contain"
              />
            ) : (
              <div className="w-36 h-36 flex items-center justify-center text-slate-400 text-xs">
                Generating QR...
              </div>
            )}
          </div>
        </div>

        {/* Unique Demo UUID */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Demo Card UUID:</span>
            <button
              onClick={() => handleCopy(cardData.uuid)}
              className="text-indigo-400 hover:text-indigo-300 text-[11px] flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy UUID'}</span>
            </button>
          </div>
          <div className="bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 font-mono text-[11px] text-slate-300 break-all select-all">
            {cardData.uuid || 'sample-uuid-0000'}
          </div>
        </div>

        {/* Regenerate Button */}
        <button
          onClick={onRegenerateQR}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Regenerate Unique UUID & QR</span>
        </button>
      </div>

      {/* QR Payload Format Selector */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          Encoded Payload Schema
        </h3>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setQrOptions((p) => ({ ...p, format: 'schema' }))}
            className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition ${
              qrOptions.format === 'schema'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-300 border-slate-700'
            }`}
          >
            JSON Schema
          </button>

          <button
            onClick={() => setQrOptions((p) => ({ ...p, format: 'url' }))}
            className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition ${
              qrOptions.format === 'url'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-300 border-slate-700'
            }`}
          >
            Demo URL
          </button>

          <button
            onClick={() => setQrOptions((p) => ({ ...p, format: 'uuid' }))}
            className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition ${
              qrOptions.format === 'uuid'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-300 border-slate-700'
            }`}
          >
            Raw UUID
          </button>
        </div>

        {/* View Decoded Payload */}
        <div>
          <button
            onClick={() => setShowPayload(!showPayload)}
            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
          >
            <Info className="w-3 h-3 text-indigo-400" />
            <span>{showPayload ? 'Hide Encoded Text' : 'Inspect Encoded Text'}</span>
          </button>

          {showPayload && (
            <pre className="mt-2 p-2.5 rounded-lg bg-slate-900 text-[10px] text-slate-300 font-mono whitespace-pre-wrap break-all border border-slate-800">
              {qrPayload || 'Loading...'}
            </pre>
          )}
        </div>
      </div>

      {/* Safety & Demonstration Notice */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Fictional Demonstration Code</span>
        </div>
        <p className="leading-relaxed">
          This QR code encodes purely fictional sample reference numbers. It is intended for UI preview, design proofs, and theatrical mockups. It is <strong>not</strong> an authentic identity verification mechanism.
        </p>
      </div>
    </div>
  )
}
