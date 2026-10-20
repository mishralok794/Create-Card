import React, { useRef, useState, useEffect } from 'react'
import {
  RotateCw,
  Columns,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  ShieldAlert,
  Scissors,
  Eye,
  Type,
  Stamp,
  CheckCircle2
} from 'lucide-react'

export const FONT_OPTIONS = [
  { name: 'Noto Sans Devanagari + Inter (Clean Standard)', value: '"Noto Sans Devanagari", Inter, Roboto, Arial, sans-serif' },
  { name: 'Inter (Modern Standard)', value: 'Inter, system-ui, -apple-system, sans-serif' },
  { name: 'Roboto (Clean Document)', value: 'Roboto, Arial, sans-serif' },
  { name: 'Arial / System (Classic Clean)', value: 'Arial, Helvetica, sans-serif' },
  { name: 'Outfit (Modern Sans)', value: 'Outfit, sans-serif' },
  { name: 'JetBrains Mono (Monospace)', value: '"JetBrains Mono", monospace' },
  { name: 'Georgia / Times (Formal Serif)', value: 'Georgia, "Times New Roman", serif' }
]

// Watermark component: Fully customizable by the user (custom text, opacity, color)
export function CardWatermark({
  text = 'SAMPLE — NOT VALID ID',
  opacity = 0.16,
  color = '#dc2626',
  width = 1012,
  height = 638
}) {
  // If user sets opacity to 0 or leaves text empty, watermark is completely hidden
  if (opacity <= 0 || !text || !text.trim()) return null

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden">
      <div
        style={{
          transform: 'rotate(-24deg)',
          fontSize: `${height * 0.088}px`,
          color: color,
          opacity: opacity,
          borderColor: color,
          borderWidth: `${Math.max(2, height * 0.005)}px`,
          padding: `${height * 0.012}px ${height * 0.05}px`,
          letterSpacing: '0.12em',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
        className="whitespace-nowrap font-black uppercase select-none border-dashed rounded-lg"
      >
        {text}
      </div>
    </div>
  )
}

// Single Card Face (Front or Back)
export function CardFace({
  side = 'front',
  cardData,
  styling,
  qrCodeUrl,
  containerRef
}) {
  const {
    w = 1012,
    h = 638,
    bg = '#ffffff',
    border = '#1e293b',
    bw = 2,
    borderRadius = 12,
    font = '"Noto Sans Devanagari", Inter, Roboto, Arial, sans-serif',
    watermarkText = 'SAMPLE — NOT VALID ID',
    watermarkOpacity = 0.32,
    watermarkColor = '#dc2626',
    frontTextOffsetX = 0,
    frontTextOffsetY = 0,
    backTextOffsetX = 0,
    backTextOffsetY = 0
  } = styling

  // Pick the correct offset based on which side we're rendering
  const textOffsetX = side === 'front' ? frontTextOffsetX : backTextOffsetX
  const textOffsetY = side === 'front' ? frontTextOffsetY : backTextOffsetY

  // Photo frame dimensions
  const photoW = h * 0.38 * (7 / 9)
  const photoH = h * 0.44

  // Date formatting (DD/MM/YYYY)
  const formattedDob = cardData.dob
    ? cardData.dob.split('-').reverse().join('/')
    : '27/04/1999'

  const formattedGender =
    cardData.gender === 'Female' ? 'महिला / FEMALE' : 'पुरुष / MALE'

  return (
    <div
      ref={containerRef}
      id={`card-${side}`}
      style={{
        width: `${w}px`,
        height: `${h}px`,
        backgroundColor: bg,
        borderColor: border,
        borderWidth: `${bw}px`,
        borderRadius: `${borderRadius}px`,
        fontFamily: font,
        color: '#000000'
      }}
      className="relative overflow-hidden shadow-2xl flex flex-col select-none box-border bg-white"
    >
      {/* Top Scissor Cut Guide Line */}
      <div className="w-full flex items-center justify-between px-4 pt-1.5 pb-1 border-b border-dashed border-slate-400 text-slate-500 select-none">
        <div className="flex-1 border-b border-dashed border-slate-400 mr-2" />
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <Scissors className="w-3.5 h-3.5 rotate-90" />
          <span>CUT HERE</span>
        </div>
        <div className="flex-1 border-b border-dashed border-slate-400 ml-2" />
      </div>

      {side === 'front' ? (
        /* ======================== FRONT SIDE ======================== */
        <div className="flex-1 flex flex-col justify-between px-6 py-2 relative z-10">
          {/* Header Banner: Tricolor Brush with Bilingual Authority Title */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            {/* Left Civic Crest / Logo */}
            <div className="w-14 h-14 flex items-center justify-center shrink-0">
              {cardData.logo ? (
                <img
                  src={cardData.logo}
                  alt="Logo"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-amber-600/60 bg-amber-50 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-amber-500 flex items-center justify-center text-amber-700 font-bold text-xs">
                    सत्य
                  </div>
                </div>
              )}
            </div>

            {/* Center: Tricolor Brush Effect & Bilingual Authority */}
            <div className="flex-1 mx-4 text-center py-1 rounded-lg relative overflow-hidden bg-gradient-to-r from-orange-100/70 via-white to-emerald-100/70 border border-slate-200">
              <div
                style={{ fontSize: `${h * 0.042}px` }}
                className="font-bold text-slate-900 leading-tight font-devanagari"
              >
                {cardData.orgNameHi || 'सार्वजनिक नागरिक सेवा'}
              </div>
              <div
                style={{ fontSize: `${h * 0.034}px` }}
                className="font-semibold text-slate-800 tracking-wide"
              >
                {cardData.orgNameEn || 'Civic Identity Authority (Fictional)'}
              </div>
            </div>

            {/* Right Side Emblem / Logo */}
            <div className="w-14 h-14 flex items-center justify-center shrink-0">
              <div className="w-11 h-11 rounded-full bg-red-50 border border-red-300 flex flex-col items-center justify-center p-0.5">
                <div className="w-6 h-4 bg-gradient-to-b from-orange-500 via-white to-emerald-600 rounded-sm mb-0.5" />
                <span className="text-[9px] font-bold text-red-600 font-devanagari">पहचान</span>
              </div>
            </div>
          </div>

          {/* Front Body: Photo on Left, Details & Notice Box on Right */}
          <div
            className="flex items-start gap-5 my-auto"
            style={{ transform: `translate(${textOffsetX}px, ${textOffsetY}px)` }}
          >
            {/* Left: Issue Date (Vertical) + Passport Photo */}
            <div className="flex items-center gap-2 shrink-0">
              <div
                style={{ fontSize: `${h * 0.024}px` }}
                className="font-mono text-slate-700 -rotate-90 whitespace-nowrap origin-center tracking-wider font-semibold select-none py-1"
              >
                Issued: {cardData.issueDate || '01/03/2015'}
              </div>

              <div
                style={{
                  width: `${photoW}px`,
                  height: `${photoH}px`
                }}
                className="border-2 border-slate-800 rounded bg-slate-100 overflow-hidden shadow-sm shrink-0"
              >
                {cardData.portraitPhoto ? (
                  <img
                    src={cardData.portraitPhoto}
                    alt="Cardholder"
                    className="w-full h-full object-cover"
                    style={{
                      transform: `scale(${styling.photoZoom || 1}) translate(${styling.photoPanX || 0}%, ${styling.photoPanY || 0}%)`
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    No Photo
                  </div>
                )}
              </div>
            </div>

            {/* Right: Personal Details & Guidance Notice Box */}
            <div className="flex-1 space-y-2.5">
              {/* Name in Hindi and English */}
              <div>
                <div
                  style={{ fontSize: `${h * 0.046}px` }}
                  className="font-bold text-slate-950 font-devanagari leading-snug"
                >
                  {cardData.fullNameHi || 'मंगेश सहानी'}
                </div>
                <div
                  style={{ fontSize: `${h * 0.040}px` }}
                  className="font-semibold text-slate-900 leading-snug"
                >
                  {cardData.fullName || 'Mangesh Sahani'}
                </div>
              </div>

              {/* DOB & Gender */}
              <div className="space-y-0.5">
                <div
                  style={{ fontSize: `${h * 0.035}px` }}
                  className="font-semibold text-slate-900"
                >
                  जन्म तिथि / DOB: <span className="font-bold">{formattedDob}</span>
                </div>
                <div
                  style={{ fontSize: `${h * 0.035}px` }}
                  className="font-semibold text-slate-900"
                >
                  लिंग / Gender: <span className="font-bold">{formattedGender}</span>
                </div>
              </div>

              {/* Red-Bordered Official-Style Guidance Notice Box */}
              <div className="border border-red-700 rounded p-2 bg-red-50/20 space-y-1">
                <p
                  style={{ fontSize: `${h * 0.024}px` }}
                  className="font-bold text-slate-900 font-devanagari leading-relaxed"
                >
                  {cardData.noticeTextHi ||
                    'पहचान का प्रमाण है, नागरिकता या जन्मतिथि का नहीं। इसका उपयोग सत्यापन (ऑनलाइन प्रमाणीकरण या क्यूआर कोड स्कैनिंग) के साथ किया जाना चाहिए।'}
                </p>
                <p
                  style={{ fontSize: `${h * 0.022}px` }}
                  className="font-medium text-slate-800 leading-relaxed"
                >
                  {cardData.noticeTextEn ||
                    'Proof of identity, not of citizenship or date of birth. It should be used with verification (online authentication, or scanning of QR code).'}
                </p>
              </div>
            </div>
          </div>

          {/* Front Bottom: 12-Digit Card ID & Bilingual Slogan */}
          <div className="pt-2 border-t border-slate-200">
            {/* 12-Digit Bold Card ID Number */}
            <div
              style={{ fontSize: `${h * 0.066}px`, letterSpacing: '0.18em' }}
              className="font-black text-center text-slate-950 leading-none select-all"
            >
              {cardData.cardReferenceNumber || '2078 9828 8141'}
            </div>

            {/* Red Divider & Slogan */}
            <div className="mt-2 pt-1 border-t-2 border-red-600 flex items-center justify-center">
              <span
                style={{ fontSize: `${h * 0.036}px` }}
                className="font-black tracking-wider text-slate-900 font-devanagari text-center"
              >
                {cardData.slogan || 'मेरा कार्ड, मेरी पहचान'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ======================== BACK SIDE ======================== */
        <div className="flex-1 flex flex-col justify-between px-6 py-2 relative z-10">
          {/* Top Enrolment Header */}
          <div className="border-b border-slate-200 pb-1.5 flex items-center justify-between">
            <div
              style={{ fontSize: `${h * 0.034}px` }}
              className="font-bold text-slate-900 font-mono tracking-tight"
            >
              नामांकन क्रम / Enrolment No.:{' '}
              <span className="font-extrabold">{cardData.enrolmentNo || '2906/48436/00676'}</span>
            </div>
            <span
              style={{ fontSize: `${h * 0.024}px` }}
              className="text-slate-500 font-mono"
            >
              BACK SIDE
            </span>
          </div>

          {/* Back Body: Left Address Details & Right Large QR Code */}
          <div
            className="flex items-start justify-between gap-6 my-auto"
            style={{ transform: `translate(${textOffsetX}px, ${textOffsetY}px)` }}
          >
            {/* Left Address Breakdown Column */}
            <div className="flex-1 space-y-1.5">
              <div
                style={{ fontSize: `${h * 0.030}px` }}
                className="font-bold text-slate-800"
              >
                To
              </div>

              {/* Recipient Name in Hindi and English */}
              <div className="space-y-0.5">
                <div
                  style={{ fontSize: `${h * 0.036}px` }}
                  className="font-bold text-slate-950 font-devanagari"
                >
                  {cardData.fullNameHi || 'मंगेश सहानी'}
                </div>
                <div
                  style={{ fontSize: `${h * 0.034}px` }}
                  className="font-semibold text-slate-900"
                >
                  {cardData.fullName || 'Mangesh Sahani'}
                </div>
              </div>

              {/* Detailed Breakdown Rows */}
              <div
                style={{ fontSize: `${h * 0.030}px`, lineHeight: 1.45 }}
                className="font-medium text-slate-900 space-y-0.5"
              >
                <div>
                  <span className="font-bold">S/O:</span> {cardData.fatherName || 'Radheshyam Sahani'}
                </div>
                <div>
                  <span className="font-bold">H.No / Mohalla:</span> {cardData.houseNumber || 'mohali purawa'}
                </div>
                <div>
                  <span className="font-bold">VTC / Town:</span> {cardData.wardVillage || 'Thakur Nagar'}
                </div>
                <div>
                  <span className="font-bold">PO:</span> {cardData.postOffice || 'Thakurnagar'}
                </div>
                <div>
                  <span className="font-bold">Sub District:</span> {cardData.subDistrict || 'Campierganj'}
                </div>
                <div>
                  <span className="font-bold">District:</span> {cardData.district || 'Gorakhpur'},{' '}
                  <span className="font-bold">State:</span> {cardData.state || 'Uttar Pradesh'}
                </div>
                <div className="font-mono">
                  <span className="font-bold">PIN Code:</span>{' '}
                  <span className="font-black text-slate-950">{cardData.pinCode || '273158'}</span>
                </div>
                <div className="font-mono">
                  <span className="font-bold">Mobile:</span> {cardData.mobile || '7498777042'}
                </div>
              </div>
            </div>

            {/* Right: Large Scannable QR Code */}
            <div className="shrink-0 flex flex-col items-center justify-center p-2 bg-white border border-slate-300 rounded-lg shadow-sm">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="Scannable QR"
                  style={{
                    width: `${h * 0.44}px`,
                    height: `${h * 0.44}px`
                  }}
                  className="object-contain"
                />
              ) : (
                <div
                  style={{ width: `${h * 0.44}px`, height: `${h * 0.44}px` }}
                  className="flex items-center justify-center text-xs text-slate-400"
                >
                  QR Code
                </div>
              )}
              <span
                style={{ fontSize: `${h * 0.020}px` }}
                className="text-slate-500 font-mono mt-1"
              >
                VERIFICATION QR
              </span>
            </div>
          </div>

          {/* Back Bottom: 12-Digit Card ID, VID, and Slogan */}
          <div className="pt-2 border-t border-slate-200">
            <div
              style={{ fontSize: `${h * 0.034}px` }}
              className="text-center font-bold text-slate-900 font-devanagari mb-1"
            >
              आपका पहचान क्रमांक / Your ID No. :
            </div>

            {/* 12-Digit Bold Card ID */}
            <div
              style={{ fontSize: `${h * 0.066}px`, letterSpacing: '0.18em' }}
              className="font-black text-center text-slate-950 leading-none select-all"
            >
              {cardData.cardReferenceNumber || '2078 9828 8141'}
            </div>

            {/* Virtual ID (VID) */}
            <div
              style={{ fontSize: `${h * 0.028}px`, letterSpacing: '0.12em' }}
              className="text-center font-mono font-bold text-slate-700 mt-1 select-all"
            >
              VID : {cardData.vid || '9143 4320 2353 4672'}
            </div>

            {/* Red Divider & Slogan */}
            <div className="mt-1.5 pt-1 border-t-2 border-red-600 flex items-center justify-center">
              <span
                style={{ fontSize: `${h * 0.036}px` }}
                className="font-black tracking-wider text-slate-900 font-devanagari text-center"
              >
                {cardData.slogan || 'मेरा कार्ड, मेरी पहचान'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Specimen Watermark (Customizable text and opacity) */}
      <CardWatermark
        text={watermarkText}
        opacity={watermarkOpacity}
        color={watermarkColor}
        width={w}
        height={h}
      />
    </div>
  )
}

// Main Workspace Component
export default function CardPreview({
  cardData,
  cardStyling,
  setCardStyling,
  qrCodeUrl,
  frontNodeRef,
  backNodeRef,
  referenceState,
  showSideBySide,
  setShowSideBySide
}) {
  // View mode: 'dual' (both sides), 'front' (front side only), 'back' (back side only)
  const [viewMode, setViewMode] = useState('dual')
  const [zoomLevel, setZoomLevel] = useState(0.65)
  const containerRef = useRef(null)

  // Auto-fit zoom based on container width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const availableW = containerRef.current.clientWidth - 48
        const targetW = viewMode === 'dual' ? cardStyling.w * 2 + 60 : cardStyling.w
        const optimalZoom = Math.min(0.85, Math.max(0.38, availableW / targetW))
        setZoomLevel(optimalZoom)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [viewMode, cardStyling.w])

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
      {/* Top Workspace Toolbar */}
      <div className="h-14 bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center justify-between flex-wrap gap-2 z-20">
        {/* Prominent View Mode Switcher: Dual View / Front Only / Back Only */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setViewMode('dual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'dual'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Both Sides (Front & Back)</span>
            </button>

            <button
              onClick={() => setViewMode('front')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'front'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Front Side Only
            </button>

            <button
              onClick={() => setViewMode('back')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'back'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Back Side Only
            </button>
          </div>

          {/* Quick Flip Button */}
          {viewMode !== 'dual' && (
            <button
              onClick={() => setViewMode((prev) => (prev === 'front' ? 'back' : 'front'))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
              title="Flip to other side"
            >
              <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
              <span>Flip Card</span>
            </button>
          )}
        </div>

        {/* Font Selector Right On The Toolbar */}
        <div className="flex items-center gap-2">
          {setCardStyling && (
            <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 shadow-inner">
              <Type className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-xs text-slate-400 font-medium hidden lg:inline">Font:</span>
              <select
                value={cardStyling.font || FONT_OPTIONS[0].value}
                onChange={(e) => setCardStyling((p) => ({ ...p, font: e.target.value }))}
                className="bg-transparent text-slate-100 text-xs font-semibold focus:outline-none cursor-pointer max-w-[200px] truncate"
                title="Select Card Font"
              >
                {FONT_OPTIONS.map((f, i) => (
                  <option key={i} value={f.value} className="bg-slate-900 text-white">
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Viewport Zoom & Reference Compare Controls */}
          {referenceState.src && (
            <button
              onClick={() => setShowSideBySide(!showSideBySide)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                showSideBySide
                  ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showSideBySide ? 'Close Reference' : 'Split Reference'}</span>
            </button>
          )}

          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.3, z - 0.08))}
              className="p-1.5 text-slate-400 hover:text-slate-200 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 px-2 select-none">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.2, z + 0.08))}
              className="p-1.5 text-slate-400 hover:text-slate-200 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-grid-pattern p-8 flex items-center justify-center relative min-h-[480px]"
      >
        {/* Split View with Reference Sample if enabled */}
        {showSideBySide && referenceState.src ? (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-7xl">
            {/* Reference Image Container */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Original Reference Image
              </span>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl max-w-md max-h-[460px] overflow-hidden flex items-center justify-center">
                <img
                  src={referenceState.src}
                  alt="Reference"
                  className="max-w-full max-h-[420px] object-contain rounded-lg"
                  style={{
                    transform: `scale(${referenceState.zoom || 1}) rotate(${referenceState.rotation || 0}deg)`
                  }}
                />
              </div>
            </div>

            {/* Live Generated Card */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Live CardCraft Output
              </span>
              <div
                style={{
                  width: `${cardStyling.w * zoomLevel}px`,
                  height: `${cardStyling.h * zoomLevel}px`
                }}
                className="relative"
              >
                <div
                  style={{
                    width: `${cardStyling.w}px`,
                    height: `${cardStyling.h}px`,
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left'
                  }}
                >
                  <CardFace
                    side={viewMode === 'back' ? 'back' : 'front'}
                    cardData={cardData}
                    styling={cardStyling}
                    qrCodeUrl={qrCodeUrl}
                    containerRef={viewMode === 'back' ? backNodeRef : frontNodeRef}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : viewMode === 'dual' ? (
          /* ================= DUAL VIEW (BOTH SIDES SHOWN SIDE-BY-SIDE) ================= */
          <div className="flex flex-col xl:flex-row items-center justify-center gap-8 py-6">
            {/* Front Side */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  ▲ Front Side (पहला वाला)
                </span>
              </div>
              <div
                style={{
                  width: `${cardStyling.w * zoomLevel}px`,
                  height: `${cardStyling.h * zoomLevel}px`
                }}
                className="relative"
              >
                <div
                  style={{
                    width: `${cardStyling.w}px`,
                    height: `${cardStyling.h}px`,
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left'
                  }}
                >
                  <CardFace
                    side="front"
                    cardData={cardData}
                    styling={cardStyling}
                    qrCodeUrl={qrCodeUrl}
                    containerRef={frontNodeRef}
                  />
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  ▲ Back Side (दूसरा वाला)
                </span>
              </div>
              <div
                style={{
                  width: `${cardStyling.w * zoomLevel}px`,
                  height: `${cardStyling.h * zoomLevel}px`
                }}
                className="relative"
              >
                <div
                  style={{
                    width: `${cardStyling.w}px`,
                    height: `${cardStyling.h}px`,
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left'
                  }}
                >
                  <CardFace
                    side="back"
                    cardData={cardData}
                    styling={cardStyling}
                    qrCodeUrl={qrCodeUrl}
                    containerRef={backNodeRef}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : viewMode === 'back' ? (
          /* ================= BACK SIDE ONLY ================= */
          <div className="flex flex-col items-center gap-2 py-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                ▲ Back Side Only (दूसरा वाला)
              </span>
            </div>
            <div
              style={{
                width: `${cardStyling.w * zoomLevel}px`,
                height: `${cardStyling.h * zoomLevel}px`
              }}
              className="relative"
            >
              <div
                style={{
                  width: `${cardStyling.w}px`,
                  height: `${cardStyling.h}px`,
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top left'
                }}
              >
                <CardFace
                  side="back"
                  cardData={cardData}
                  styling={cardStyling}
                  qrCodeUrl={qrCodeUrl}
                  containerRef={backNodeRef}
                />
              </div>
            </div>
          </div>
        ) : (
          /* ================= FRONT SIDE ONLY ================= */
          <div className="flex flex-col items-center gap-2 py-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                ▲ Front Side Only (पहला वाला)
              </span>
            </div>
            <div
              style={{
                width: `${cardStyling.w * zoomLevel}px`,
                height: `${cardStyling.h * zoomLevel}px`
              }}
              className="relative"
            >
              <div
                style={{
                  width: `${cardStyling.w}px`,
                  height: `${cardStyling.h}px`,
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top left'
                }}
              >
                <CardFace
                  side="front"
                  cardData={cardData}
                  styling={cardStyling}
                  qrCodeUrl={qrCodeUrl}
                  containerRef={frontNodeRef}
                />
              </div>
            </div>
          </div>
        )}

        {/* Hidden Render Targets: Keeps opposite side mounted off-screen so PNG exports capture both */}
        {viewMode !== 'dual' && (
          <div className="absolute left-[-9999px] top-[-9999px] pointer-events-none opacity-0">
            {viewMode === 'front' ? (
              <CardFace
                side="back"
                cardData={cardData}
                styling={cardStyling}
                qrCodeUrl={qrCodeUrl}
                containerRef={backNodeRef}
              />
            ) : (
              <CardFace
                side="front"
                cardData={cardData}
                styling={cardStyling}
                qrCodeUrl={qrCodeUrl}
                containerRef={frontNodeRef}
              />
            )}
          </div>
        )}
      </div>

      {/* Bottom Status Ribbon */}
      <div className="h-9 bg-slate-950 border-t border-slate-900 px-4 flex items-center justify-between text-[11px] text-slate-400 z-10">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>CardCraft AI Live Canvas • Instant Updates</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Stamp className="w-3.5 h-3.5 text-indigo-400" />
          <span>
            Watermark: {cardStyling.watermarkOpacity > 0 ? (cardStyling.watermarkText || 'SAMPLE') : 'Hidden (Opacity 0%)'}
          </span>
        </div>
      </div>
    </div>
  )
}
