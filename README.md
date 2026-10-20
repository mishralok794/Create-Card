# CardCraft AI — Fictional Sample Card Designer & Mobile Studio

**CardCraft AI** is a modern, privacy-first web application designed for filmmakers, theatrical prop designers, UI/UX developers, and software testers to design, customize, preview, and export high-resolution fictional sample identity cards, club passes, and conference badges.

The application generates real, production-quality outputs (not static mockups) directly inside the browser using HTML5 Canvas, high-dpi rasterization, and vector synthesis.

---

## 🌟 Key Features

### 1. 🖼️ Reference Image Upload & Local Vision Analysis
- Drag-and-drop reference sample card images (`JPG`, `PNG`, `WEBP` up to 10 MB).
- Interactive adjustments: zoom (`0.5x` to `2.5x`), rotate (`-180°` to `+180°`), and pan.
- **Local Vision Palette Extraction**: Analyzes uploaded reference cards on an in-browser canvas to detect aspect ratio (CR80 landscape vs vertical badge) and extract dominant header accent and background colors.
- **Split Comparison Mode**: Compare your uploaded reference sample side-by-side with your live generated card.
- **Ethical Safeguards**: Rejects copying official security holograms, government seals, or authentic national emblems.

### 2. 👤 Editable Personal Details & Coherent Fictional Generator
- Full Name, Father's Name, Date of Birth, Gender, Fictional Organization Name, and Demo Reference Number.
- **"Generate Random Sample"**: Synthesizes authentic-sounding fictional Indian names and geographically aligned demographic records.
- **Multi-State Filter**: Select states including **Uttar Pradesh, Gujarat, Madhya Pradesh, Bihar, Rajasthan, Maharashtra, and Delhi**.
- Instant live preview synchronization on every keystroke.
- Fictional logo presets (Shield Emblem, Hex Tech, Star Academy, Metro Crest) and custom logo uploader.

### 3. 📍 Verified Postal Dataset & Bilingual Address Engine
- Built-in authentic India Post Head Post Office (GPO/HPO) index mapping authentic PIN codes to their verified districts, cities, and states.
- **Strict Verification Badge**:
  - Green Badge: `✓ Verified PIN: City, State` (confirmed against India Post GPO directory).
  - Amber Badge: `⚠️ Unverified PIN (Fictional Demo)`. *Never labels an unverified PIN code as verified.*
  - Warning Alert: Notifies if the PIN code zone does not match the chosen state.
- **Bilingual Address Formatting**: Composes English and Devanagari Hindi addresses (`मकान नं., डाकघर, जिला, राज्य, पिन`).

### 4. 📸 Passport Portrait Studio & Vector Avatars
- Device portrait photo upload with zoom (`0.6x` to `2.5x`), horizontal pan (`-40%` to `+40%`), and vertical pan (`-40%` to `+40%`).
- Customizable frame shapes: **Rectangle**, **Rounded**, and **Circle / Oval**.
- **Fictional Vector Avatar Gallery**: 8 diverse pre-generated vector demo portraits + procedural synthetic avatar generator.
- 100% private: Never performs automated reverse image lookups or retrieves real people's photos.

### 5. 🏁 Scannable QR Code Generator
- Generates a unique UUID (`crypto.randomUUID`) for each card sample.
- Formats: JSON Schema, local preview URL, or raw UUID.
- High-contrast, error-corrected scannable QR code embedded on the front side.
- Clear demonstration label: strictly flags that the QR is for UI testing, not authentic identification.

### 6. 🎴 Front & Back Card Designer
- **Front Side**: Organization crest, cardholder name, father's name, DOB, gender, demo reference tag, passport portrait, and QR code.
- **Back Side**: Devanagari Hindi address, English address, locality breakdown (State, District, Post Office, PIN), and demo UUID.
- **Smooth 3D Flip Card Animation**: Flip between front and back with realistic perspective.
- **Side-by-Side Dual View**: Inspect both front and back sides simultaneously.
- Standard credit card **CR80 dimensions** (85.6mm × 53.98mm ratio / 1012 × 638 px), vertical badges, and square cards.
- **Permanent Watermark**: Prominent `SAMPLE — NOT VALID ID` watermark and legal demo banner permanently stamped across both sides.

### 7. 📱 Mobile Photography Studio ("Phone Photo Effect")
- Simulates a casual photo of the card lying on a tabletop taken with a smartphone camera.
- **Canvas-based 3D Perspective Distortion**: Real-time trapezoidal slice rendering with adjustable tilt and rotation angles.
- **Tabletop Background Textures**:
  - 🪵 Warm Oak Wood Desk
  - 🏛️ White Italian Carrara Marble
  - 🌑 Dark Slate / Charcoal Granite
  - 💼 Navy Office Desk Mat
  - ⬜ Studio Neutral Gray
- Specular lighting glare, phone flash reflection, and natural drop shadows with ambient occlusion.
- Camera sensor grain (film noise) and lens softness.
- Direct export as high-quality **JPG**.

### 8. 💾 High-Resolution Export & Download
- Download **Front Side as PNG** (super-sampled 3x resolution).
- Download **Back Side as PNG** (crisp Devanagari Hindi rendering with embedded Noto Sans font).
- Download **Combined Dual-Side Proof Sheet** (arranged side-by-side with cut marks, project metadata, and legal disclaimers).
- Download **Phone Photo Shot as JPG**.
- Interactive **Proof Preview Modal** before saving.
- Celebratory confetti on successful export.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **QR Engine**: `qrcode` (Vector/Canvas rasterization)
- **Image Rasterization**: `html-to-image` + HTML5 Canvas
- **Typography**: Google Fonts (`Outfit`, `Inter`, `Noto Sans Devanagari`, `JetBrains Mono`)
- **Animations**: `canvas-confetti` + Tailwind transitions

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure Node.js (v18+) and npm are installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🛡️ Privacy & Offline Architecture

| Feature | Execution Environment | External Network Needed? |
| :--- | :--- | :--- |
| **Personal Details & Addresses** | 100% In-Browser (Local State) | ❌ No (Zero external calls) |
| **Photo Upload & Cropping** | Client-Side FileReader & Canvas | ❌ No |
| **Random Profile Generation** | Bundled Local Postal Dataset | ❌ No |
| **Postal PIN Code Verification** | Bundled India Post Index | ❌ No |
| **QR Code Generation** | Local JavaScript QR Matrix Engine | ❌ No |
| **Phone Photo Effect 3D Canvas** | Local HTML5 2D Canvas Engine | ❌ No |
| **High-Res PNG/JPG Rendering** | Local DOM to Canvas Rasterizer | ❌ No |
| **Draft Persistence** | Browser `localStorage` | ❌ No |

---

## ⚖️ Ethical Demonstration Notice
CardCraft AI is strictly designed for fictional prototypes, UI demonstrations, software mockups, and film prop assets. The application will never reproduce authentic government seals, security holograms, or legal identification credentials.
