import React, { useRef } from 'react'
import {
  Shuffle,
  RotateCcw,
  Sparkles,
  User,
  Building,
  Image as ImageIcon,
  Trash2,
  Calendar,
  Layers,
  Info
} from 'lucide-react'
import { STATES_LIST } from '../utils/generateSampleData'

export const LOGO_PRESETS = [
  {
    name: 'Shield Emblem',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><path d="M50 10L80 25V55C80 75 50 90 50 90C50 90 20 75 20 55V25L50 10Z" fill="#6366f1" stroke="#ffffff" stroke-width="4"/><path d="M50 25L68 35V52C68 66 50 78 50 78C50 78 32 66 32 52V35L50 25Z" fill="#4338ca"/><circle cx="50" cy="50" r="10" fill="#38bdf8"/></svg>`
  },
  {
    name: 'Hex Tech',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><polygon points="50,12 85,32 85,72 50,92 15,72 15,32" fill="#0f766e" stroke="#14b8a6" stroke-width="4"/><circle cx="50" cy="52" r="16" fill="#2dd4bf"/><path d="M50 36V68M34 52H66" stroke="#ffffff" stroke-width="3"/></svg>`
  },
  {
    name: 'Star Academy',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" fill="#1e293b" stroke="#f59e0b" stroke-width="4"/><polygon points="50,22 58,40 78,41 62,54 68,73 50,61 32,73 38,54 22,41 42,40" fill="#fbbf24"/></svg>`
  },
  {
    name: 'Metro Crest',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect x="15" y="15" width="70" height="70" rx="16" fill="#9333ea" stroke="#ffffff" stroke-width="4"/><circle cx="50" cy="50" r="22" fill="#ec4899"/><path d="M38 50H62M50 38V62" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/></svg>`
  }
]

export default function PersonalDetailsForm({
  cardData,
  setCardData,
  onGenerateRandom,
  onResetData,
  selectedStateFilter,
  setSelectedStateFilter
}) {
  const logoInputRef = useRef(null)

  const handleChange = (field, value) => {
    setCardData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      handleChange('logo', event.target.result)
    }
    reader.readAsDataURL(file)
  }

  const applyPresetLogo = (svgStr) => {
    const dataUri = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgStr)
    handleChange('logo', dataUri)
  }

  return (
    <div className="space-y-4">
      {/* Random Sample Generator Bar */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-indigo-950/70 p-3.5 rounded-xl border border-indigo-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Fictional Profile Generator</span>
          </div>
          <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            100% Demonstration Data
          </span>
        </div>

        {/* State Selection */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 whitespace-nowrap">State Filter:</label>
          <select
            value={selectedStateFilter}
            onChange={(e) => setSelectedStateFilter(e.target.value)}
            className="flex-1 bg-slate-900 text-slate-200 text-xs rounded-lg border border-slate-700 px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Any State (Random)</option>
            {STATES_LIST.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onGenerateRandom(selectedStateFilter)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Generate Random Sample</span>
          </button>

          <button
            onClick={onResetData}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
            title="Reset to blank or default profile"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Details Form */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3.5">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-400" />
          Identity & Cardholder Details
        </h3>

        {/* Full Name Bilingual */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Full Name (English)
            </label>
            <input
              type="text"
              value={cardData.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Mangesh Sahani"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 font-devanagari">
              पूरा नाम (हिन्दी में)
            </label>
            <input
              type="text"
              value={cardData.fullNameHi || ''}
              onChange={(e) => handleChange('fullNameHi', e.target.value)}
              placeholder="उदा. मंगेश सहानी"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500 font-devanagari"
            />
          </div>
        </div>

        {/* Father's Name Bilingual */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Father's Name (English)
            </label>
            <input
              type="text"
              value={cardData.fatherName || ''}
              onChange={(e) => handleChange('fatherName', e.target.value)}
              placeholder="e.g. Radheshyam Sahani"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 font-devanagari">
              पिता का नाम (हिन्दी में)
            </label>
            <input
              type="text"
              value={cardData.fatherNameHi || ''}
              onChange={(e) => handleChange('fatherNameHi', e.target.value)}
              placeholder="उदा. राधेश्याम सहानी"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500 font-devanagari"
            />
          </div>
        </div>

        {/* DOB & Gender */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span>Date of Birth</span>
            </label>
            <input
              type="date"
              value={cardData.dob || ''}
              onChange={(e) => handleChange('dob', e.target.value)}
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Gender</label>
            <select
              value={cardData.gender || 'Male'}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="Male">Male / पुरुष</option>
              <option value="Female">Female / महिला</option>
              <option value="Other">Other / अन्य</option>
            </select>
          </div>
        </div>

        {/* 12-Digit Card Number (#### #### ####) */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            12-Digit Card ID Number (#### #### ####)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={cardData.cardReferenceNumber || ''}
              onChange={(e) => handleChange('cardReferenceNumber', e.target.value)}
              placeholder="e.g. 2078 9828 8141"
              className="flex-1 bg-slate-900 text-slate-100 font-mono text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500 tracking-wider font-bold"
            />
            <button
              onClick={() => {
                const g1 = Math.floor(2000 + Math.random() * 8000)
                const g2 = Math.floor(1000 + Math.random() * 9000)
                const g3 = Math.floor(1000 + Math.random() * 9000)
                handleChange('cardReferenceNumber', `${g1} ${g2} ${g3}`)
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700"
              title="Generate new 12-digit number"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Enrolment Number & VID */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Enrolment No. / नामांकन क्रम
            </label>
            <input
              type="text"
              value={cardData.enrolmentNo || ''}
              onChange={(e) => handleChange('enrolmentNo', e.target.value)}
              placeholder="2906/48436/00676"
              className="w-full bg-slate-900 text-slate-100 font-mono text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Virtual ID (VID - 16 Digits)
            </label>
            <input
              type="text"
              value={cardData.vid || ''}
              onChange={(e) => handleChange('vid', e.target.value)}
              placeholder="9143 4320 2353 4672"
              className="w-full bg-slate-900 text-slate-100 font-mono text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Issue Date & Mobile Number */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Card Issue Date (DD/MM/YYYY)
            </label>
            <input
              type="text"
              value={cardData.issueDate || ''}
              onChange={(e) => handleChange('issueDate', e.target.value)}
              placeholder="01/03/2015"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Mobile Number (Phone)
            </label>
            <input
              type="text"
              value={cardData.mobile || ''}
              onChange={(e) => handleChange('mobile', e.target.value)}
              placeholder="7498777042"
              className="w-full bg-slate-900 text-slate-100 font-mono text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Card Slogan & Fictional Organization */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 font-devanagari">
              कार्ड स्लोगन / Slogan (Bottom Bar)
            </label>
            <input
              type="text"
              value={cardData.slogan || ''}
              onChange={(e) => handleChange('slogan', e.target.value)}
              placeholder="मेरा कार्ड, मेरी पहचान"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500 font-devanagari font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Authority Header (Bilingual)
            </label>
            <input
              type="text"
              value={cardData.orgName || ''}
              onChange={(e) => handleChange('orgName', e.target.value)}
              placeholder="सार्वजनिक नागरिक सेवा / Civic Authority"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

      </div>

      {/* Fictional Logo Customization */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
            Card Header Logo (Optional)
          </h3>
          {cardData.logo && (
            <button
              onClick={() => handleChange('logo', '')}
              className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Logo Presets */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-1.5">Choose Fictional Crest Preset:</span>
          <div className="grid grid-cols-4 gap-2">
            {LOGO_PRESETS.map((lp, idx) => (
              <button
                key={idx}
                onClick={() => applyPresetLogo(lp.svg)}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500 transition flex flex-col items-center gap-1 group"
                title={lp.name}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: lp.svg }}
                />
                <span className="text-[9px] text-slate-400 group-hover:text-slate-200 truncate w-full text-center">
                  {lp.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Logo Upload */}
        <div>
          <input
            type="file"
            ref={logoInputRef}
            className="hidden"
            accept="image/png,image/jpeg,image/svg+xml"
            onChange={handleLogoUpload}
          />
          <button
            onClick={() => logoInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Upload Custom Logo / Symbol</span>
          </button>
        </div>
      </div>
    </div>
  )
}
