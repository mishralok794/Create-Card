import { toPng, toJpeg } from 'html-to-image'

/**
 * Triggers a browser download of a dataUrl
 */
export const downloadDataUrl = (dataUrl, filename) => {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Captures a single DOM element (front or back card) at high resolution (default 3x)
 */
export const renderCardToDataUrl = async (node, pixelRatio = 3) => {
  if (!node) throw new Error('Card DOM node not available for export')

  // Use html-to-image with high pixelRatio and embedded fonts
  const dataUrl = await toPng(node, {
    pixelRatio,
    cacheBust: true,
    filter: (domNode) => {
      // Exclude interactive drag handles or UI hover buttons during export
      if (domNode.classList && domNode.classList.contains('no-export')) {
        return false
      }
      return true
    }
  })

  return dataUrl
}

/**
 * Creates a combined image with both Front and Back sides on a professional presentation sheet
 */
export const renderCombinedSheet = async (frontNode, backNode, cardMeta = {}) => {
  if (!frontNode || !backNode) throw new Error('Both front and back card elements are required')

  // Capture both sides at high resolution
  const [frontPng, backPng] = await Promise.all([
    renderCardToDataUrl(frontNode, 2),
    renderCardToDataUrl(backNode, 2)
  ])

  // Load both into HTML Image elements
  const loadImg = (src) => new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

  const [frontImg, backImg] = await Promise.all([loadImg(frontPng), loadImg(backPng)])

  // Create combined presentation canvas
  const canvas = document.createElement('canvas')
  const cardW = frontImg.width
  const cardH = frontImg.height

  // Sheet layout: Header (180px), Cards side-by-side with padding, Footer (140px)
  const padding = 80
  const gap = 80
  const headerHeight = 220
  const footerHeight = 160

  const totalWidth = padding * 2 + cardW * 2 + gap
  const totalHeight = headerHeight + cardH + footerHeight + padding

  canvas.width = totalWidth
  canvas.height = totalHeight
  const ctx = canvas.getContext('2d')

  // Background: Elegant subtle light grid / studio canvas
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, totalWidth, totalHeight)

  // Decorative border
  ctx.strokeStyle = '#334155'
  ctx.lineWidth = 2
  ctx.strokeRect(30, 30, totalWidth - 60, totalHeight - 60)

  // Header Title
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 44px Inter, Outfit, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('CardCraft AI — Fictional Sample Card Proof Sheet', padding, 90)

  ctx.fillStyle = '#94a3b8'
  ctx.font = '22px Inter, sans-serif'
  ctx.fillText(`Project: ${cardMeta.orgName || 'Fictional Demo'}  •  Ref: ${cardMeta.cardReferenceNumber || 'SAMPLE-0000'}  •  Date: ${new Date().toLocaleDateString()}`, padding, 130)

  // Prominent Red Caution Stamp
  ctx.save()
  ctx.fillStyle = '#ef4444'
  ctx.font = 'bold 24px Inter, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('⚠️ SAMPLE DEMONSTRATION ONLY — NOT AN OFFICIAL IDENTITY CARD', totalWidth - padding, 100)
  ctx.fillStyle = '#f87171'
  ctx.font = '18px Inter, sans-serif'
  ctx.fillText('Strictly for fictional design, UI testing, and film/theatrical prop generation', totalWidth - padding, 130)
  ctx.restore()

  // Separator line
  ctx.strokeStyle = '#1e293b'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(padding, headerHeight - 30)
  ctx.lineTo(totalWidth - padding, headerHeight - 30)
  ctx.stroke()

  // Label: Front Side
  const frontX = padding
  const cardY = headerHeight
  ctx.fillStyle = '#38bdf8'
  ctx.font = 'bold 22px Inter, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('▲ FRONT SIDE', frontX, cardY - 15)

  // Draw Card Shadow & Front Image
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
  ctx.shadowBlur = 35
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 15
  ctx.drawImage(frontImg, frontX, cardY, cardW, cardH)
  ctx.shadowColor = 'transparent'

  // Label: Back Side
  const backX = padding + cardW + gap
  ctx.fillStyle = '#38bdf8'
  ctx.font = 'bold 22px Inter, sans-serif'
  ctx.fillText('▲ BACK SIDE', backX, cardY - 15)

  // Draw Back Image
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
  ctx.shadowBlur = 35
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 15
  ctx.drawImage(backImg, backX, cardY, cardW, cardH)
  ctx.shadowColor = 'transparent'

  // Footer Disclaimer & Tech metadata
  const footerY = cardY + cardH + 70
  ctx.strokeStyle = '#1e293b'
  ctx.beginPath()
  ctx.moveTo(padding, footerY - 25)
  ctx.lineTo(totalWidth - padding, footerY - 25)
  ctx.stroke()

  ctx.fillStyle = '#64748b'
  ctx.font = '18px Inter, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(`UUID: ${cardMeta.uuid || 'DEMO-UUID'} | Standard CR80 Ratio (85.6mm × 53.98mm) | Client-Side Render`, padding, footerY + 15)

  ctx.textAlign = 'right'
  ctx.fillText('Generated locally with CardCraft AI Studio • Safe & Private', totalWidth - padding, footerY + 15)

  return canvas.toDataURL('image/png')
}
