import QRCode from 'qrcode'

/**
 * Generates a high-contrast, scannable QR code data URL.
 * Encodes only fictional demo UUID and sample verification schema.
 * Never encodes real government identifiers or private personal records.
 */
export const createQRCodeDataURL = async (uuid, cardDetails = {}, options = {}) => {
  const {
    errorCorrectionLevel = 'M',
    margin = 2,
    color = { dark: '#000000', light: '#ffffff' },
    format = 'schema' // 'uuid' | 'url' | 'schema'
  } = options

  let payload = ''

  if (format === 'uuid') {
    payload = `DEMO-CARD-UUID:${uuid}`
  } else if (format === 'url') {
    // Local / sample preview URL that can be scanned by a phone
    payload = `https://cardcraft.fictional/verify?id=${uuid}&demo=sample_only`
  } else {
    // Standard structured demo verification payload (fictional)
    payload = JSON.stringify({
      schema: 'FictionalCardSample/1.0',
      uuid: uuid,
      ref: cardDetails.cardReferenceNumber || 'SAMPLE-0000',
      issuer: cardDetails.orgName || 'CardCraft AI Demo',
      name: cardDetails.fullName || 'Demo Cardholder',
      legalDisclaimer: 'FICTIONAL SAMPLE ONLY - NOT A REAL IDENTITY DOCUMENT'
    })
  }

  try {
    const dataUrl = await QRCode.toDataURL(payload, {
      errorCorrectionLevel,
      margin,
      width: 400,
      color
    })
    return { dataUrl, payload, success: true }
  } catch (err) {
    console.error('QR Code generation failed:', err)
    return { dataUrl: '', payload: '', success: false, error: err.message }
  }
}
