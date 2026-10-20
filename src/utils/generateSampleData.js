// Verified Postal Dataset for Indian States
// Contains genuine PIN codes and main Post Offices (GPO/Head Post Offices) mapped to their authentic District and State.
// localities / colonies are fictionalized demonstration areas.

export const POSTAL_DATA = [
  // Uttar Pradesh
  {
    state: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' },
    district: { en: 'Lucknow', hi: 'लखनऊ' },
    city: { en: 'Lucknow', hi: 'लखनऊ' },
    pin: '226001',
    po: { en: 'Lucknow GPO', hi: 'लखनऊ प्रधान डाकघर' },
    places: [
      { en: 'Hazratganj Fictional Block', hi: 'हजरतगंज डेमो ब्लॉक' },
      { en: 'Gomti Model Enclave', hi: 'गोमती मॉडल एन्क्लेव' },
      { en: 'Aliganj Sample Sector', hi: 'अलीगंज नमूना सेक्टर' },
      { en: 'Indira Nagar Civic Ward', hi: 'इंदिरा नगर नागरिक वार्ड' }
    ]
  },
  {
    state: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' },
    district: { en: 'Kanpur Nagar', hi: 'कानपुर नगर' },
    city: { en: 'Kanpur', hi: 'कानपुर' },
    pin: '208001',
    po: { en: 'Kanpur Head Post Office', hi: 'कानपुर मुख्य डाकघर' },
    places: [
      { en: 'Civil Lines Sample Colony', hi: 'सिविल लाइन्स सैंपल कॉलोनी' },
      { en: 'Swaroop Nagar Demo Ward', hi: 'स्वरूप नगर डेमो वार्ड' },
      { en: 'Govind Nagar Model Block', hi: 'गोविंद नगर मॉडल ब्लॉक' }
    ]
  },
  {
    state: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' },
    district: { en: 'Varanasi', hi: 'वाराणसी' },
    city: { en: 'Varanasi', hi: 'वाराणसी' },
    pin: '221001',
    po: { en: 'Varanasi Cantt HPO', hi: 'वाराणसी कैंट मुख्य डाकघर' },
    places: [
      { en: 'Bhelupur Demo Vihar', hi: 'भेलूपुर डेमो विहार' },
      { en: 'Lanka Fictional Complex', hi: 'लंका काल्पनिक परिसर' },
      { en: 'Sigra Model Nagar', hi: 'सिगरा मॉडल नगर' }
    ]
  },
  {
    state: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' },
    district: { en: 'Gautam Buddha Nagar', hi: 'गौतम बुद्ध नगर' },
    city: { en: 'Noida', hi: 'नोएडा' },
    pin: '201301',
    po: { en: 'Noida Sector 1 Post Office', hi: 'नोएडा सेक्टर १ डाकघर' },
    places: [
      { en: 'Sector 62 Tech Enclave', hi: 'सेक्टर ६२ टेक एन्क्लेव' },
      { en: 'Sector 18 Model Market', hi: 'सेक्टर १८ मॉडल मार्केट' },
      { en: 'Sector 50 Fictional Greens', hi: 'सेक्टर ५० फिक्शनल ग्रीन्स' }
    ]
  },

  // Gujarat
  {
    state: { en: 'Gujarat', hi: 'गुजरात' },
    district: { en: 'Ahmedabad', hi: 'अहमदाबाद' },
    city: { en: 'Ahmedabad', hi: 'अहमदाबाद' },
    pin: '380001',
    po: { en: 'Ahmedabad GPO', hi: 'अहमदाबाद प्रधान डाकघर' },
    places: [
      { en: 'Navrangpura Sample Colony', hi: 'नवरंगपुरा सैंपल कॉलोनी' },
      { en: 'Bodakdev Model Heights', hi: 'बोडकदेव मॉडल हाइट्स' },
      { en: 'Vastrapur Civic Vihar', hi: 'वस्त्रापुर नागरिक विहार' },
      { en: 'Satellite Demo Enclave', hi: 'सैटेलाइट डेमो एन्क्लेव' }
    ]
  },
  {
    state: { en: 'Gujarat', hi: 'गुजरात' },
    district: { en: 'Surat', hi: 'सूरत' },
    city: { en: 'Surat', hi: 'सूरत' },
    pin: '395001',
    po: { en: 'Surat Head Post Office', hi: 'सूरत मुख्य डाकघर' },
    places: [
      { en: 'Athwa Lines Demo Nagar', hi: 'अथवा लाइन्स डेमो नगर' },
      { en: 'Adajan Model Enclave', hi: 'अडाजण मॉडल एन्क्लेव' },
      { en: 'Vesu Sample Park', hi: 'वेसू सैंपल पार्क' }
    ]
  },
  {
    state: { en: 'Gujarat', hi: 'गुजरात' },
    district: { en: 'Vadodara', hi: 'वडोदरा' },
    city: { en: 'Vadodara', hi: 'वडोदरा' },
    pin: '390001',
    po: { en: 'Vadodara GPO', hi: 'वडोदरा प्रधान डाकघर' },
    places: [
      { en: 'Alkapuri Model Society', hi: 'अलकापुरी मॉडल सोसायटी' },
      { en: 'Fatehgunj Demo Sector', hi: 'फतेहगंज डेमो सेक्टर' }
    ]
  },

  // Madhya Pradesh
  {
    state: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' },
    district: { en: 'Bhopal', hi: 'भोपाल' },
    city: { en: 'Bhopal', hi: 'भोपाल' },
    pin: '462001',
    po: { en: 'Bhopal GPO', hi: 'भोपाल प्रधान डाकघर' },
    places: [
      { en: 'Arera Colony Demo Block', hi: 'अरेरा कॉलोनी डेमो ब्लॉक' },
      { en: 'MP Nagar Model Zone', hi: 'एमपी नगर मॉडल जोन' },
      { en: 'Shahpura Civic Enclave', hi: 'शाहपुरा नागरिक एन्क्लेव' }
    ]
  },
  {
    state: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' },
    district: { en: 'Indore', hi: 'इंदौर' },
    city: { en: 'Indore', hi: 'इंदौर' },
    pin: '452001',
    po: { en: 'Indore GPO', hi: 'इंदौर प्रधान डाकघर' },
    places: [
      { en: 'Vijay Nagar Sample Square', hi: 'विजय नगर सैंपल चौराहा' },
      { en: 'Palasia Model Avenue', hi: 'पलास्या मॉडल एवेन्यू' },
      { en: 'Rajendra Nagar Demo Vihar', hi: 'राजेन्द्र नगर डेमो विहार' }
    ]
  },
  {
    state: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' },
    district: { en: 'Jabalpur', hi: 'जबलपुर' },
    city: { en: 'Jabalpur', hi: 'जबलपुर' },
    pin: '482001',
    po: { en: 'Jabalpur Head Post Office', hi: 'जबलपुर मुख्य डाकघर' },
    places: [
      { en: 'Civil Lines Fictional Ward', hi: 'सिविल लाइन्स काल्पनिक वार्ड' },
      { en: 'Napier Town Model Area', hi: 'नेपियर टाउन मॉडल एरिया' }
    ]
  },

  // Bihar
  {
    state: { en: 'Bihar', hi: 'बिहार' },
    district: { en: 'Patna', hi: 'पटना' },
    city: { en: 'Patna', hi: 'पटना' },
    pin: '800001',
    po: { en: 'Patna GPO', hi: 'पटना प्रधान डाकघर' },
    places: [
      { en: 'Kankarbagh Demo Sector', hi: 'कंकड़बाग डेमो सेक्टर' },
      { en: 'Bailey Road Model Vihar', hi: 'बेली रोड मॉडल विहार' },
      { en: 'Boring Road Sample Nagar', hi: 'बोरिंग रोड सैंपल नगर' },
      { en: 'Rajendra Nagar Civic Ward', hi: 'राजेन्द्र नगर नागरिक वार्ड' }
    ]
  },
  {
    state: { en: 'Bihar', hi: 'बिहार' },
    district: { en: 'Gaya', hi: 'गया' },
    city: { en: 'Gaya', hi: 'गया' },
    pin: '823001',
    po: { en: 'Gaya Head Post Office', hi: 'गया मुख्य डाकघर' },
    places: [
      { en: 'Rampur Model Colony', hi: 'रामपुर मॉडल कॉलोनी' },
      { en: 'Civil Lines Sample Sector', hi: 'सिविल लाइन्स सैंपल सेक्टर' }
    ]
  },
  {
    state: { en: 'Bihar', hi: 'बिहार' },
    district: { en: 'Muzaffarpur', hi: 'मुजफ्फरपुर' },
    city: { en: 'Muzaffarpur', hi: 'मुजफ्फरपुर' },
    pin: '842001',
    po: { en: 'Muzaffarpur Head Post Office', hi: 'मुजफ्फरपुर मुख्य डाकघर' },
    places: [
      { en: 'Mithanpura Demo Block', hi: 'मिठनपुरा डेमो ब्लॉक' },
      { en: 'Brahmpura Sample Vihar', hi: 'ब्रह्मपुरा सैंपल विहार' }
    ]
  },

  // Rajasthan
  {
    state: { en: 'Rajasthan', hi: 'राजस्थान' },
    district: { en: 'Jaipur', hi: 'जयपुर' },
    city: { en: 'Jaipur', hi: 'जयपुर' },
    pin: '302001',
    po: { en: 'Jaipur GPO', hi: 'जयपुर प्रधान डाकघर' },
    places: [
      { en: 'C-Scheme Model Block', hi: 'सी-स्कीम मॉडल ब्लॉक' },
      { en: 'Malviya Nagar Demo Sector', hi: 'मालवीय नगर डेमो सेक्टर' },
      { en: 'Vaishali Nagar Sample Enclave', hi: 'वैशाली नगर सैंपल एन्क्लेव' },
      { en: 'Mansarovar Civic Ward', hi: 'मानसरोवर नागरिक वार्ड' }
    ]
  },
  {
    state: { en: 'Rajasthan', hi: 'राजस्थान' },
    district: { en: 'Jodhpur', hi: 'जोधपुर' },
    city: { en: 'Jodhpur', hi: 'जोधपुर' },
    pin: '342001',
    po: { en: 'Jodhpur Head Post Office', hi: 'जोधपुर मुख्य डाकघर' },
    places: [
      { en: 'Shastri Nagar Sample Colony', hi: 'शास्त्री नगर सैंपल कॉलोनी' },
      { en: 'Ratanada Demo Heights', hi: 'रातानाडा डेमो हाइट्स' },
      { en: 'Sardarpura Model Ward', hi: 'सरदारपुरा मॉडल वार्ड' }
    ]
  },
  {
    state: { en: 'Rajasthan', hi: 'राजस्थान' },
    district: { en: 'Udaipur', hi: 'उदयपुर' },
    city: { en: 'Udaipur', hi: 'उदयपुर' },
    pin: '313001',
    po: { en: 'Udaipur Head Post Office', hi: 'उदयपुर मुख्य डाकघर' },
    places: [
      { en: 'Fatehpura Demo Enclave', hi: 'फतेहपुरा डेमो एन्क्लेव' },
      { en: 'Hiran Magri Sector 4 Sample', hi: 'हिरण मगरी सेक्टर ४ सैंपल' }
    ]
  },

  // Maharashtra
  {
    state: { en: 'Maharashtra', hi: 'महाराष्ट्र' },
    district: { en: 'Mumbai', hi: 'मुंबई' },
    city: { en: 'Mumbai', hi: 'मुंबई' },
    pin: '400001',
    po: { en: 'Mumbai GPO', hi: 'मुंबई प्रधान डाकघर' },
    places: [
      { en: 'Fort Heritage Demo Sector', hi: 'फोर्ट हेरिटेज डेमो सेक्टर' },
      { en: 'Colaba Fictional Enclave', hi: 'कोलाबा काल्पनिक एन्क्लेव' },
      { en: 'Marine Lines Sample Block', hi: 'मरीन लाइन्स सैंपल ब्लॉक' }
    ]
  },
  {
    state: { en: 'Maharashtra', hi: 'महाराष्ट्र' },
    district: { en: 'Pune', hi: 'पुणे' },
    city: { en: 'Pune', hi: 'पुणे' },
    pin: '411001',
    po: { en: 'Pune Head Post Office', hi: 'पुणे मुख्य डाकघर' },
    places: [
      { en: 'Shivaji Nagar Sample Block', hi: 'शिवाजी नगर सैंपल ब्लॉक' },
      { en: 'Kothrud Model Enclave', hi: 'कोथरुड मॉडल एन्क्लेव' },
      { en: 'Baner Tech Demo Ward', hi: 'बानेर टेक डेमो वार्ड' }
    ]
  },

  // Delhi
  {
    state: { en: 'Delhi', hi: 'दिल्ली' },
    district: { en: 'New Delhi', hi: 'नई दिल्ली' },
    city: { en: 'New Delhi', hi: 'नई दिल्ली' },
    pin: '110001',
    po: { en: 'Connaught Place Post Office', hi: 'कनॉट प्लेस डाकघर' },
    places: [
      { en: 'Barakhamba Demo Lane', hi: 'बाराखंबा डेमो लेन' },
      { en: 'Janpath Sample Area', hi: 'जनपथ सैंपल एरिया' },
      { en: 'Parliament Street Model Zone', hi: 'संसद मार्ग मॉडल ज़ोन' }
    ]
  }
]

export const STATES_LIST = [
  'Uttar Pradesh',
  'Gujarat',
  'Madhya Pradesh',
  'Bihar',
  'Rajasthan',
  'Maharashtra',
  'Delhi'
]

// Names pools
export const FIRST_NAMES_MALE = [
  { en: 'Aarav', hi: 'आरव' },
  { en: 'Rohan', hi: 'रोहन' },
  { en: 'Vikram', hi: 'विक्रम' },
  { en: 'Aditya', hi: 'आदित्य' },
  { en: 'Arjun', hi: 'अर्जुन' },
  { en: 'Karan', hi: 'करण' },
  { en: 'Manish', hi: 'मनीष' },
  { en: 'Sandeep', hi: 'संदीप' },
  { en: 'Pranav', hi: 'प्रणव' },
  { en: 'Kabir', hi: 'कबीर' },
  { en: 'Harsh', hi: 'हर्ष' },
  { en: 'Naveen', hi: 'नवीन' }
]

export const FIRST_NAMES_FEMALE = [
  { en: 'Ananya', hi: 'अनन्या' },
  { en: 'Priya', hi: 'प्रिया' },
  { en: 'Sneha', hi: 'स्नेहा' },
  { en: 'Kavita', hi: 'कविता' },
  { en: 'Sunita', hi: 'सुनीता' },
  { en: 'Neha', hi: 'नेहा' },
  { en: 'Pooja', hi: 'पूजा' },
  { en: 'Riya', hi: 'रिया' },
  { en: 'Divya', hi: 'दिव्या' },
  { en: 'Tanvi', hi: 'तन्वी' },
  { en: 'Meera', hi: 'मीरा' },
  { en: 'Isha', hi: 'ईशा' }
]

export const SURNAMES = [
  { en: 'Sharma', hi: 'शर्मा' },
  { en: 'Verma', hi: 'वर्मा' },
  { en: 'Patel', hi: 'पटेल' },
  { en: 'Singh', hi: 'सिंह' },
  { en: 'Yadav', hi: 'यादव' },
  { en: 'Mehta', hi: 'मेहता' },
  { en: 'Joshi', hi: 'जोशी' },
  { en: 'Gupta', hi: 'गुप्ता' },
  { en: 'Mishra', hi: 'मिश्रा' },
  { en: 'Chauhan', hi: 'चौहान' },
  { en: 'Rathore', hi: 'राठौड़' },
  { en: 'Shukla', hi: 'शुक्ला' }
]

export const FATHER_NAMES = [
  { en: 'Ramesh', hi: 'रमेश' },
  { en: 'Suresh', hi: 'सुरेश' },
  { en: 'Mahesh', hi: 'महेश' },
  { en: 'Dinesh', hi: 'दिनेश' },
  { en: 'Rajendra', hi: 'राजेन्द्र' },
  { en: 'Mukesh', hi: 'मुकेश' },
  { en: 'Ashok', hi: 'अशोक' },
  { en: 'Vinod', hi: 'विनोद' },
  { en: 'Harish', hi: 'हरीश' },
  { en: 'Santosh', hi: 'संतोष' }
]

export const FICTIONAL_ORGS = [
  'Apex Technology Consortium (Fictional)',
  'National Innovation Institute (Demo)',
  'Metro Civic Membership Forum',
  'Global Developers Guild',
  'Unified Research Council (Fictional)',
  'Creative Arts & Design Alliance',
  'Metropolitan Sports & Health Club'
]

export const pick = arr => arr[Math.floor(Math.random() * arr.length)]
export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Generates an SVG data URL portrait avatar
export const generateAvatar = (gender = 'Male', seed = Math.random()) => {
  const backgrounds = [
    ['#38bdf8', '#0284c7'],
    ['#a78bfa', '#7c3aed'],
    ['#34d399', '#059669'],
    ['#fbbf24', '#d97706'],
    ['#f472b6', '#db2777'],
    ['#94a3b8', '#475569'],
    ['#818cf8', '#4338ca']
  ]
  const skinTones = ['#f5d0b5', '#eac0a2', '#dfaa8b', '#c98a65', '#a56743']
  const hairColors = ['#1e1b18', '#2d1e18', '#382319', '#111827']
  const clothesColors = ['#1e293b', '#0f766e', '#1d4ed8', '#7e22ce', '#b91c1c', '#374151']

  const bg = backgrounds[Math.floor(seed * 70) % backgrounds.length]
  const skin = skinTones[Math.floor(seed * 50) % skinTones.length]
  const hair = hairColors[Math.floor(seed * 40) % hairColors.length]
  const cloth = clothesColors[Math.floor(seed * 60) % clothesColors.length]
  const hasGlasses = (Math.floor(seed * 100) % 3) === 0

  const isFemale = gender === 'Female'

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg[0]}"/>
        <stop offset="100%" stop-color="${bg[1]}"/>
      </linearGradient>
      <linearGradient id="clothGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${cloth}"/>
        <stop offset="100%" stop-color="#090d16"/>
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect width="320" height="400" fill="url(#bgGrad)"/>
    
    <!-- Long hair back for female -->
    ${isFemale ? `<path d="M70,180 Q60,330 90,360 L230,360 Q260,330 250,180 Z" fill="${hair}"/>` : ''}

    <!-- Shoulders / Torso / Suit -->
    <path d="M40,400 Q80,290 160,290 Q240,290 280,400 Z" fill="url(#clothGrad)"/>
    <!-- Collar / Shirt -->
    <path d="M130,290 L160,350 L190,290 Z" fill="#ffffff"/>
    <path d="M152,320 L160,380 L168,320 Z" fill="${isFemale ? '#ec4899' : '#dc2626'}"/>
    <!-- Neck -->
    <rect x="140" y="225" width="40" height="70" rx="8" fill="${skin}"/>

    <!-- Head / Face -->
    <ellipse cx="160" cy="180" rx="65" ry="78" fill="${skin}"/>
    <!-- Ears -->
    <ellipse cx="94" cy="180" rx="10" ry="16" fill="${skin}"/>
    <ellipse cx="226" cy="180" rx="10" ry="16" fill="${skin}"/>

    <!-- Hair Front -->
    ${isFemale ? `
      <path d="M95,170 Q105,95 160,95 Q215,95 225,170 Q195,120 160,125 Q125,120 95,170 Z" fill="${hair}"/>
      <path d="M96,160 Q85,210 100,240 Q105,190 115,165 Z" fill="${hair}"/>
      <path d="M224,160 Q235,210 220,240 Q215,190 205,165 Z" fill="${hair}"/>
    ` : `
      <path d="M95,170 Q100,100 160,100 Q220,100 225,170 Q195,135 160,135 Q125,135 95,170 Z" fill="${hair}"/>
      <path d="M96,155 Q92,120 115,115 Q160,110 205,115 Q228,120 224,155 Q210,128 160,130 Q110,128 96,155 Z" fill="${hair}"/>
    `}

    <!-- Eyebrows -->
    <path d="M120,155 Q135,150 148,155" stroke="${hair}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M172,155 Q185,150 200,155" stroke="${hair}" stroke-width="3.5" fill="none" stroke-linecap="round"/>

    <!-- Eyes -->
    <circle cx="134" cy="172" r="5" fill="#1e1b18"/>
    <circle cx="186" cy="172" r="5" fill="#1e1b18"/>
    <circle cx="132" cy="170" r="1.5" fill="#ffffff"/>
    <circle cx="184" cy="170" r="1.5" fill="#ffffff"/>

    <!-- Glasses (Optional) -->
    ${hasGlasses ? `
      <rect x="116" y="160" width="36" height="24" rx="6" fill="none" stroke="#334155" stroke-width="3"/>
      <rect x="168" y="160" width="36" height="24" rx="6" fill="none" stroke="#334155" stroke-width="3"/>
      <line x1="152" y1="172" x2="168" y2="172" stroke="#334155" stroke-width="3"/>
    ` : ''}

    <!-- Nose -->
    <path d="M157,175 Q160,195 164,195 Q160,198 154,198" stroke="#b2734a" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Mouth / Smile -->
    <path d="M145,215 Q160,226 175,215" stroke="#b91c1c" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

// 8 Pre-generated fictional vector demo portraits
export const DEMO_PORTRAITS = [
  { id: 'm1', name: 'Aarav (Corporate)', gender: 'Male', src: generateAvatar('Male', 0.12) },
  { id: 'f1', name: 'Ananya (Design)', gender: 'Female', src: generateAvatar('Female', 0.35) },
  { id: 'm2', name: 'Vikram (Engineer)', gender: 'Male', src: generateAvatar('Male', 0.67) },
  { id: 'f2', name: 'Priya (Executive)', gender: 'Female', src: generateAvatar('Female', 0.88) },
  { id: 'm3', name: 'Karan (Research)', gender: 'Male', src: generateAvatar('Male', 0.44) },
  { id: 'f3', name: 'Sneha (Academic)', gender: 'Female', src: generateAvatar('Female', 0.19) },
  { id: 'm4', name: 'Aditya (Analyst)', gender: 'Male', src: generateAvatar('Male', 0.91) },
  { id: 'f4', name: 'Kavita (Consultant)', gender: 'Female', src: generateAvatar('Female', 0.52) },
]

// Generates a coherent fictional profile with verified Indian postal data
export const generateRandomProfile = (targetState = null) => {
  // Filter postal locations by state if specified
  const filteredPostal = targetState
    ? POSTAL_DATA.filter(p => p.state.en.toLowerCase() === targetState.toLowerCase())
    : POSTAL_DATA

  const postalEntry = filteredPostal.length > 0 ? pick(filteredPostal) : pick(POSTAL_DATA)
  const place = pick(postalEntry.places)
  const gender = Math.random() > 0.5 ? 'Male' : 'Female'
  const firstName = pick(gender === 'Male' ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE)
  const surname = pick(SURNAMES)
  const fatherFirst = pick(FATHER_NAMES)

  const fullNameEn = `${firstName.en} ${surname.en}`
  const fullNameHi = `${firstName.hi} ${surname.hi}`
  const fatherNameEn = `${fatherFirst.en} ${surname.en}`
  const fatherNameHi = `${fatherFirst.hi} ${surname.hi}`

  // Birth date between 1970 and 2004
  const birthYear = randInt(1972, 2003)
  const birthMonth = String(randInt(1, 12)).padStart(2, '0')
  const birthDay = String(randInt(1, 28)).padStart(2, '0')
  const dob = `${birthYear}-${birthMonth}-${birthDay}`

  const houseNumber = String(randInt(12, 845))
  const demoUuid = crypto.randomUUID ? crypto.randomUUID() : `sample-${Date.now()}-${randInt(1000, 9999)}`
  
  // 12-digit formatted card reference number (#### #### ####)
  const g1 = randInt(2000, 9999)
  const g2 = randInt(1000, 9999)
  const g3 = randInt(1000, 9999)
  const cardReferenceNumber = `${g1} ${g2} ${g3}`
  
  // Fictional Enrolment & VID numbers
  const enrolmentNo = `${randInt(2000, 2999)}/${randInt(40000, 49999)}/${String(randInt(100, 99999)).padStart(5, '0')}`
  const vid = `${randInt(9000, 9999)} ${randInt(4000, 4999)} ${randInt(2000, 2999)} ${randInt(4000, 4999)}`
  const issueDate = `${String(randInt(1, 28)).padStart(2, '0')}/${String(randInt(1, 12)).padStart(2, '0')}/${randInt(2018, 2025)}`
  const mobile = `${pick(['74', '88', '98', '91', '94'])}${randInt(10000000, 99999999)}`

  // Bilingual coherent address
  const addrEn = `H.No. ${houseNumber}, ${place.en}, PO: ${postalEntry.po.en}, ${postalEntry.city.en}, ${postalEntry.district.en}, ${postalEntry.state.en} - ${postalEntry.pin}`
  const addrHi = `मकान नं. ${houseNumber}, ${place.hi}, डाकघर: ${postalEntry.po.hi}, ${postalEntry.city.hi}, ${postalEntry.district.hi}, ${postalEntry.state.hi} - ${postalEntry.pin}`

  return {
    fullName: fullNameEn,
    fullNameHi: fullNameHi,
    fatherName: fatherNameEn,
    fatherNameHi: fatherNameHi,
    dob,
    gender,
    state: postalEntry.state.en,
    district: postalEntry.district.en,
    city: postalEntry.city.en,
    houseNumber,
    wardVillage: place.en,
    postOffice: postalEntry.po.en,
    subDistrict: `${postalEntry.city.en} Tehsil`,
    pinCode: postalEntry.pin,
    mobile,
    enrolmentNo,
    issueDate,
    vid,
    addressEn: addrEn,
    addressHi: addrHi,
    slogan: 'मेरा कार्ड, मेरी पहचान',
    orgName: 'सार्वजनिक नागरिक सेवा / Civic Identity Authority (Fictional)',
    orgNameHi: 'सार्वजनिक नागरिक सेवा',
    orgNameEn: 'Civic Identity Authority (Fictional)',
    noticeTextHi: 'पहचान का प्रमाण है, नागरिकता या जन्मतिथि का नहीं।',
    noticeTextEn: 'Proof of identity for demonstration purposes only. Not valid for official government authentication.',
    cardReferenceNumber,
    uuid: demoUuid,
    portraitPhoto: generateAvatar(gender, Math.random()),
    isVerifiedPostal: true,
    verifiedLocation: postalEntry
  }
}

