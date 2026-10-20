import React from 'react'
import {
  FileImage,
  User,
  MapPin,
  Camera,
  QrCode,
  Sliders,
  Download,
  Smartphone
} from 'lucide-react'

export const SIDEBAR_TABS = [
  { id: 'details', label: 'Details', icon: User, desc: 'Personal details & sample data' },
  { id: 'address', label: 'Address', icon: MapPin, desc: 'Verified postal address & Hindi' },
  { id: 'portrait', label: 'Portrait', icon: Camera, desc: 'Photo upload & avatar picker' },
  { id: 'reference', label: 'Reference', icon: FileImage, desc: 'Upload & analyze sample card' },
  { id: 'qr', label: 'QR Code', icon: QrCode, desc: 'Unique demo UUID & QR config' },
  { id: 'photo_effect', label: 'Phone Studio', icon: Smartphone, desc: 'Mobile tabletop 3D photography' },
  { id: 'export', label: 'Export', icon: Download, desc: 'Download high-res PNG & JPG' }
]

export default function Sidebar({ activeTab, setActiveTab, children }) {
  return (
    <aside className="w-full lg:w-[440px] xl:w-[460px] flex-shrink-0 bg-slate-900/90 border-r border-slate-800 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* Top Tab Bar */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto no-scrollbar p-1.5 gap-1 shrink-0">
        {SIDEBAR_TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {children}
      </div>
    </aside>
  )
}
