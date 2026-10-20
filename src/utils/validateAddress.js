import { POSTAL_DATA } from './generateSampleData'

/**
 * Validates a PIN code and address components against verified India Post Head Post Office dataset.
 * Adheres strictly to the rule: "Never label an unverified PIN code or address as verified."
 */
export const validatePostalCode = (pinCode, selectedState = '', district = '') => {
  const cleanPin = String(pinCode || '').trim()

  if (!cleanPin) {
    return {
      status: 'empty',
      isVerified: false,
      badgeText: 'No PIN Code Entered',
      badgeColor: 'gray',
      message: 'Enter a 6-digit Indian Postal PIN code.'
    }
  }

  // Check 6 digits format
  if (!/^\d{6}$/.test(cleanPin)) {
    return {
      status: 'format_error',
      isVerified: false,
      badgeText: 'Invalid Format (Must be 6 digits)',
      badgeColor: 'red',
      message: 'Indian PIN codes consist of exactly 6 digits.'
    }
  }

  // Look for exact match in our verified postal dataset
  const match = POSTAL_DATA.find(p => p.pin === cleanPin)

  if (match) {
    // If user specified a state, check if it matches the authentic state of this PIN
    if (selectedState && selectedState.trim() && match.state.en.toLowerCase() !== selectedState.trim().toLowerCase()) {
      return {
        status: 'state_mismatch',
        isVerified: false,
        badgeText: `PIN Mismatch (${match.state.en})`,
        badgeColor: 'amber',
        matchedData: match,
        message: `PIN ${cleanPin} is registered in ${match.state.en} (${match.district.en}), which does not match your selected state (${selectedState}).`
      }
    }

    return {
      status: 'verified',
      isVerified: true,
      badgeText: `✓ Verified PIN: ${match.city.en}, ${match.state.en}`,
      badgeColor: 'emerald',
      matchedData: match,
      message: `Verified against official Postal Index (GPO: ${match.po.en}, District: ${match.district.en}, ${match.state.en}).`
    }
  }

  // Check known first digit state zones according to India Post zone allocation:
  // 1: Delhi, Haryana, Punjab, HP, J&K
  // 2: UP, Uttarakhand
  // 3: Rajasthan, Gujarat
  // 4: Maharashtra, MP, Chhattisgarh, Goa
  // 8: Bihar, Jharkhand
  const firstDigit = cleanPin[0]
  let expectedZone = ''
  if (firstDigit === '1') expectedZone = 'Northern Zone (Delhi/Punjab/Haryana)'
  else if (firstDigit === '2') expectedZone = 'Uttar Pradesh & Uttarakhand Zone'
  else if (firstDigit === '3') expectedZone = 'Western Zone (Rajasthan & Gujarat)'
  else if (firstDigit === '4') expectedZone = 'Western/Central Zone (Maharashtra & MP)'
  else if (firstDigit === '8') expectedZone = 'Eastern Zone (Bihar & Jharkhand)'

  return {
    status: 'unverified',
    isVerified: false,
    badgeText: '⚠️ Unverified PIN (Fictional Demo)',
    badgeColor: 'amber',
    message: `PIN ${cleanPin} is not in the verified city-center GPO directory (${expectedZone || 'Unknown Zone'}). Marked strictly as demonstration fictional data.`
  }
}

/**
 * Generates bilingual address string from structured fields
 */
export const composeBilingualAddress = (fields) => {
  const { houseNumber, wardVillage, postOffice, city, district, state, pinCode } = fields

  const en = `H.No. ${houseNumber || '—'}, ${wardVillage || '—'}, PO: ${postOffice || '—'}, ${city || '—'}, ${district || '—'}, ${state || '—'} - ${pinCode || '—'}`

  // For Hindi, if there's a verified match or fallback transliteration
  const match = POSTAL_DATA.find(p => p.pin === (pinCode || '').trim())
  const stateHi = match?.state?.hi || state
  const districtHi = match?.district?.hi || district
  const cityHi = match?.city?.hi || city
  const poHi = match?.po?.hi || postOffice

  const hi = `मकान नं. ${houseNumber || '—'}, ${wardVillage || '—'}, डाकघर: ${poHi || '—'}, ${cityHi || '—'}, ${districtHi || '—'}, ${stateHi || '—'} - ${pinCode || '—'}`

  return { en, hi }
}
