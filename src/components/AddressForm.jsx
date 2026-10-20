import React, { useMemo } from 'react'
import {
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Languages,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react'
import { STATES_LIST, POSTAL_DATA } from '../utils/generateSampleData'
import { validatePostalCode, composeBilingualAddress } from '../utils/validateAddress'

export default function AddressForm({ cardData, setCardData }) {
  const handleChange = (field, value) => {
    setCardData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  // Real-time postal verification check
  const postalValidation = useMemo(() => {
    return validatePostalCode(cardData.pinCode, cardData.state, cardData.district)
  }, [cardData.pinCode, cardData.state, cardData.district])

  // Quick auto-compose bilingual address from structured fields
  const handleAutoComposeAddresses = () => {
    const { en, hi } = composeBilingualAddress(cardData)
    setCardData((prev) => ({
      ...prev,
      addressEn: en,
      addressHi: hi
    }))
  }

  // When state changes, we can offer quick popular cities/districts from verified dataset
  const availableDistricts = useMemo(() => {
    if (!cardData.state) return []
    const matching = POSTAL_DATA.filter(
      p => p.state.en.toLowerCase() === (cardData.state || '').toLowerCase()
    )
    return matching
  }, [cardData.state])

  const handleSelectVerifiedDistrict = (entry) => {
    const place = entry.places[0]
    setCardData((prev) => {
      const updated = {
        ...prev,
        state: entry.state.en,
        district: entry.district.en,
        city: entry.city.en,
        postOffice: entry.po.en,
        pinCode: entry.pin,
        wardVillage: place ? place.en : prev.wardVillage
      }
      const { en, hi } = composeBilingualAddress(updated)
      return {
        ...updated,
        addressEn: en,
        addressHi: hi
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* Postal Verification Status Banner */}
      <div
        className={`p-3.5 rounded-xl border transition-all ${
          postalValidation.status === 'verified'
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
            : postalValidation.status === 'state_mismatch'
            ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            : 'bg-slate-950/60 border-slate-800 text-slate-300'
        }`}
      >
        <div className="flex items-start gap-2.5">
          {postalValidation.status === 'verified' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                {postalValidation.badgeText}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 border border-white/10 font-mono">
                PIN: {cardData.pinCode || 'None'}
              </span>
            </div>
            <p className="text-[11px] mt-1 text-slate-300 leading-relaxed">
              {postalValidation.message}
            </p>
          </div>
        </div>
      </div>

      {/* Structured Address Fields */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            Postal Location Details
          </h3>

          <button
            onClick={handleAutoComposeAddresses}
            className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
            title="Update English and Hindi address strings from these fields"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Format Addresses</span>
          </button>
        </div>

        {/* State Selection */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">State</label>
          <select
            value={cardData.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select State</option>
            {STATES_LIST.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Verified District Shortcut */}
        {availableDistricts.length > 0 && (
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">
              Verified Districts in {cardData.state}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {availableDistricts.map((d, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectVerifiedDistrict(d)}
                  className={`text-[10px] px-2.5 py-1 rounded-md border transition ${
                    cardData.district === d.district.en
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {d.city.en} ({d.pin})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* District & City */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">District</label>
            <input
              type="text"
              value={cardData.district || ''}
              onChange={(e) => handleChange('district', e.target.value)}
              placeholder="e.g. Lucknow"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">City / Town</label>
            <input
              type="text"
              value={cardData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="e.g. Lucknow"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* House No & Ward / Village */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">House Number</label>
            <input
              type="text"
              value={cardData.houseNumber || ''}
              onChange={(e) => handleChange('houseNumber', e.target.value)}
              placeholder="e.g. 142/B"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Ward / Village / Colony</label>
            <input
              type="text"
              value={cardData.wardVillage || ''}
              onChange={(e) => handleChange('wardVillage', e.target.value)}
              placeholder="e.g. Hazratganj Demo Block"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Post Office & PIN Code */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Post Office</label>
            <input
              type="text"
              value={cardData.postOffice || ''}
              onChange={(e) => handleChange('postOffice', e.target.value)}
              placeholder="e.g. Thakurnagar"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              PIN Code (6 digits)
            </label>
            <input
              type="text"
              maxLength={6}
              value={cardData.pinCode || ''}
              onChange={(e) => handleChange('pinCode', e.target.value)}
              placeholder="e.g. 273158"
              className="w-full bg-slate-900 text-slate-100 font-mono text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Sub-District / Tehsil & Mobile */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Sub District / Tehsil</label>
            <input
              type="text"
              value={cardData.subDistrict || ''}
              onChange={(e) => handleChange('subDistrict', e.target.value)}
              placeholder="e.g. Campierganj"
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Mobile Number (Back Side)</label>
            <input
              type="text"
              value={cardData.mobile || ''}
              onChange={(e) => handleChange('mobile', e.target.value)}
              placeholder="e.g. 7498777042"
              className="w-full bg-slate-900 text-slate-100 font-mono text-xs rounded-lg border border-slate-700 px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>


      {/* Bilingual Formatted Address Blocks */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-indigo-400" />
          Bilingual Back-Side Address
        </h3>

        {/* English Address */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Complete Address in English
          </label>
          <textarea
            rows={2}
            value={cardData.addressEn || ''}
            onChange={(e) => handleChange('addressEn', e.target.value)}
            className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 p-2.5 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
          />
        </div>

        {/* Hindi Address */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            पूरा पता हिन्दी में (Complete Address in Hindi)
          </label>
          <textarea
            rows={2}
            value={cardData.addressHi || ''}
            onChange={(e) => handleChange('addressHi', e.target.value)}
            className="w-full bg-slate-900 text-slate-100 text-xs rounded-lg border border-slate-700 p-2.5 focus:outline-none focus:border-indigo-500 leading-relaxed font-devanagari"
          />
        </div>
      </div>
    </div>
  )
}
