import React, { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ReferenceUploader from './components/ReferenceUploader'
import PersonalDetailsForm from './components/PersonalDetailsForm'
import AddressForm from './components/AddressForm'
import PortraitUploader from './components/PortraitUploader'
import QRGenerator from './components/QRGenerator'
import CardPreview from './components/CardPreview'
import CardEditor from './components/CardEditor'
import PhotoEffectEditor from './components/PhotoEffectEditor'
import ExportPanel from './components/ExportPanel'
import { generateRandomProfile } from './utils/generateSampleData'
import { createQRCodeDataURL } from './utils/generateQR'

// Initial Default Styling
const DEFAULT_STYLING = {
  w: 1012,
  h: 638,
  bg: '#ffffff',
  accent: '#1e293b',
  secondaryStripe: '#dc2626',
  border: '#1e293b',
  bw: 2,
  borderRadius: 12,
  font: '"Noto Sans Devanagari", Inter, Roboto, Arial, sans-serif',
  fontHindi: '"Noto Sans Devanagari", "Tiro Devanagari Hindi", Mangal, sans-serif',
  fontEnglish: '"Times New Roman", Georgia, "Roboto Slab", serif',
  textColor: '#0f172a',
  labelColor: '#334155',
  pattern: 'none',
  shape: 'rect',
  headerAlign: 'center',
  headerHeight: 90,
  watermarkOpacity: 0.32,
  photoZoom: 1,
  photoPanX: 0,
  photoPanY: 0,
  frontTextOffsetX: 0,
  frontTextOffsetY: 0,
  backTextOffsetX: 0,
  backTextOffsetY: 0
}

export default function App() {
  // Main Card Details State initialized with authentic reference defaults
  const [cardData, setCardData] = useState(() => {
    const base = generateRandomProfile('Uttar Pradesh')
    return {
      ...base,
      fullName: 'Mangesh Sahani',
      fullNameHi: 'मंगेश सहानी',
      fatherName: 'Radheshyam Sahani',
      fatherNameHi: 'राधेश्याम सहानी',
      dob: '1999-04-27',
      gender: 'Male',
      houseNumber: 'mohali purawa',
      wardVillage: 'Thakur Nagar',
      postOffice: 'Thakurnagar',
      subDistrict: 'Campierganj',
      district: 'Gorakhpur',
      state: 'Uttar Pradesh',
      pinCode: '273158',
      mobile: '7498777042',
      cardReferenceNumber: '2078 9828 8141',
      enrolmentNo: '2906/48436/00676',
      issueDate: '01/03/2015',
      vid: '9143 4320 2353 4672',
      slogan: 'मेरा आधार, मेरी पहचान',
      orgName: 'सार्वजनिक नागरिक सेवा / Civic Identity Authority (Fictional)',
      orgNameHi: 'सार्वजनिक नागरिक सेवा',
      orgNameEn: 'Civic Identity Authority (Fictional)',
      addressEn: 'To Mangesh Sahani, S/O: Radheshyam Sahani, mohali purawa, VTC: Thakur Nagar, PO: Thakurnagar, Sub District: Campierganj, District: Gorakhpur, State: Uttar Pradesh, PIN Code: 273158, Mobile: 7498777042',
      addressHi: 'मंगेश सहानी, पिता: राधेश्याम सहानी, मोहाली पुरवा, ठाकुर नगर, डाकघर: ठाकुरनगर, कैम्पियरगंज, जिला: गोरखपुर, उत्तर प्रदेश - 273158'
    }
  })


  // Styling State
  const [cardStyling, setCardStyling] = useState(DEFAULT_STYLING)

  // Reference Upload State
  const [referenceState, setReferenceState] = useState({
    src: '',
    fileName: '',
    zoom: 1,
    rotation: 0
  })

  // Side-by-Side Reference Preview Toggle
  const [showSideBySide, setShowSideBySide] = useState(false)

  // QR Code State
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [qrPayload, setQrPayload] = useState('')
  const [qrOptions, setQrOptions] = useState({
    format: 'schema',
    errorCorrectionLevel: 'M'
  })

  // Active Tab in Left Sidebar
  const [activeSidebarTab, setActiveSidebarTab] = useState('details')

  // Filter for random generation
  const [selectedStateFilter, setSelectedStateFilter] = useState('Uttar Pradesh')

  // Local Storage Save State
  const [savedTimestamp, setSavedTimestamp] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  // DOM node references for front and back cards (for canvas capture / export)
  const frontNodeRef = useRef(null)
  const backNodeRef = useRef(null)

  // Re-generate QR Code whenever UUID or QR options change
  useEffect(() => {
    let active = true
    const updateQR = async () => {
      const res = await createQRCodeDataURL(cardData.uuid, cardData, qrOptions)
      if (active && res.success) {
        setQrCodeUrl(res.dataUrl)
        setQrPayload(res.payload)
      }
    }
    updateQR()
    return () => {
      active = false
    }
  }, [cardData.uuid, cardData.cardReferenceNumber, cardData.orgName, cardData.fullName, qrOptions])

  // Show temporary toast message
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Random Data Generator Trigger
  const handleGenerateRandom = (state = null) => {
    const profile = generateRandomProfile(state)
    setCardData((prev) => ({
      ...prev,
      ...profile,
      portraitPhoto: profile.portraitPhoto
    }))
    setCardStyling((prev) => ({
      ...prev,
      photoZoom: 1,
      photoPanX: 0,
      photoPanY: 0
    }))
    showToast(`Generated new fictional profile for ${profile.state}!`)
  }

  // Project Reset Trigger
  const handleResetData = () => {
    if (window.confirm('Reset this project to fresh demo defaults?')) {
      const fresh = generateRandomProfile()
      setCardData(fresh)
      setCardStyling(DEFAULT_STYLING)
      setReferenceState({ src: '', fileName: '', zoom: 1, rotation: 0 })
      setShowSideBySide(false)
      showToast('Project reset to demo state.')
    }
  }

  // Save to LocalStorage
  const handleSaveDraft = () => {
    try {
      const draft = {
        cardData,
        cardStyling,
        savedAt: new Date().toLocaleTimeString()
      }
      localStorage.setItem('cardcraft_ai_draft', JSON.stringify(draft))
      setSavedTimestamp(draft.savedAt)
      showToast(`Draft successfully saved at ${draft.savedAt}`)
    } catch (e) {
      console.error('Save failed:', e)
      showToast('Could not save draft to LocalStorage.')
    }
  }

  // Restore from LocalStorage
  const handleLoadDraft = () => {
    try {
      const saved = localStorage.getItem('cardcraft_ai_draft')
      if (!saved) {
        showToast('No saved draft found in local storage.')
        return
      }
      const draft = JSON.parse(saved)
      if (draft.cardData) setCardData(draft.cardData)
      if (draft.cardStyling) setCardStyling(draft.cardStyling)
      setSavedTimestamp(draft.savedAt || '')
      showToast(`Draft restored from ${draft.savedAt || 'saved state'}!`)
    } catch (e) {
      console.error('Load failed:', e)
      showToast('Error restoring draft.')
    }
  }

  // Apply Preset Template
  const handleApplyPreset = (preset) => {
    if (preset.styling) {
      setCardStyling((prev) => ({
        ...prev,
        ...preset.styling
      }))
    }
    if (preset.orgName) {
      setCardData((prev) => ({
        ...prev,
        orgName: preset.orgName
      }))
    }
    showToast(`Applied preset: ${preset.name}`)
  }

  // Regenerate only QR code & UUID
  const handleRegenerateQR = () => {
    const newUuid = crypto.randomUUID ? crypto.randomUUID() : `sample-${Date.now()}`
    setCardData((prev) => ({ ...prev, uuid: newUuid }))
    showToast('Regenerated new unique demo UUID and QR code.')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl border border-indigo-400 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Top Application Header */}
      <Header
        onSaveDraft={handleSaveDraft}
        onLoadDraft={handleLoadDraft}
        onResetProject={handleResetData}
        onApplyPreset={handleApplyPreset}
        onOpenExportModal={() => setActiveSidebarTab('export')}
        savedTimestamp={savedTimestamp}
      />

      {/* Main Studio 3-Column Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar: Data & Feature Tabs */}
        <Sidebar activeTab={activeSidebarTab} setActiveTab={setActiveSidebarTab}>
          {activeSidebarTab === 'reference' && (
            <ReferenceUploader
              referenceState={referenceState}
              setReferenceState={setReferenceState}
              cardStyling={cardStyling}
              setCardStyling={setCardStyling}
              showSideBySide={showSideBySide}
              setShowSideBySide={setShowSideBySide}
            />
          )}

          {activeSidebarTab === 'details' && (
            <PersonalDetailsForm
              cardData={cardData}
              setCardData={setCardData}
              onGenerateRandom={handleGenerateRandom}
              onResetData={handleResetData}
              selectedStateFilter={selectedStateFilter}
              setSelectedStateFilter={setSelectedStateFilter}
            />
          )}

          {activeSidebarTab === 'address' && (
            <AddressForm cardData={cardData} setCardData={setCardData} />
          )}

          {activeSidebarTab === 'portrait' && (
            <PortraitUploader
              portraitPhoto={cardData.portraitPhoto}
              setPortraitPhoto={(p) => setCardData((prev) => ({ ...prev, portraitPhoto: p }))}
              cardStyling={cardStyling}
              setCardStyling={setCardStyling}
            />
          )}

          {activeSidebarTab === 'qr' && (
            <QRGenerator
              cardData={cardData}
              qrCodeUrl={qrCodeUrl}
              qrPayload={qrPayload}
              onRegenerateQR={handleRegenerateQR}
              qrOptions={qrOptions}
              setQrOptions={setQrOptions}
            />
          )}

          {activeSidebarTab === 'photo_effect' && (
            <PhotoEffectEditor
              frontNodeRef={frontNodeRef}
              backNodeRef={backNodeRef}
              cardData={cardData}
              onOpenExportModal={() => setActiveSidebarTab('export')}
            />
          )}

          {activeSidebarTab === 'export' && (
            <ExportPanel
              frontNodeRef={frontNodeRef}
              backNodeRef={backNodeRef}
              cardData={cardData}
              setActiveSidebarTab={setActiveSidebarTab}
            />
          )}
        </Sidebar>

        {/* Center Workspace: Live Card Preview & Canvas */}
        <CardPreview
          cardData={cardData}
          cardStyling={cardStyling}
          setCardStyling={setCardStyling}
          qrCodeUrl={qrCodeUrl}
          frontNodeRef={frontNodeRef}
          backNodeRef={backNodeRef}
          referenceState={referenceState}
          showSideBySide={showSideBySide}
          setShowSideBySide={setShowSideBySide}
        />


        {/* Right Sidebar: Styling & Layout Controls */}
        <CardEditor
          cardStyling={cardStyling}
          setCardStyling={setCardStyling}
          onResetStyling={() => setCardStyling(DEFAULT_STYLING)}
        />
      </div>
    </div>
  )
}
