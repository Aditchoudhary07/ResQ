/* ═══════════════════════════════════════════════════════
   ResQ — Right Hospital. Right Time.
   script.js — Complete application logic
   Version: 1.0 | Demo Frontend (localStorage-backed)
═══════════════════════════════════════════════════════ */

'use strict';

/* ─── TRANSLATION DICTIONARY ─────────────────────────── */
const i18n = {
  en: {
    demoNotice: "DEMO MODE — Not connected to real emergency services. For real emergencies, call 112 or follow your organisation's approved protocols. Do not delay care to troubleshoot this demo.",
    navTagline: "Right Hospital. Right Time.",
    navAmbulance: "🚑 Ambulance", navHospital: "🏥 Hospital",
    navCases: "📋 Cases", navDirectory: "🔍 Directory",
    navPassport: "📄 Passport", navNetwork: "📡 Network", navAnalytics: "📊 Stats",
    navSettings: "⚙️ Settings",
    roleLabel: "Role:",
    ambTitle: "Ambulance Dashboard", ambSubtitle: "Ready",
    statusReady: "Ready",
    btnStartEmergency: "🚨 START EMERGENCY",
    startHint: "Tap to create a new emergency case",
    badgeActive: "ACTIVE", viewCase: "View Case",
    statTotal: "Total Cases", statAccepted: "Accepted",
    statPending: "Pending", statComplete: "Complete",
    recentCases: "Recent Cases", viewAll: "View All",
    noCases: "No cases yet. Tap START EMERGENCY to begin.",
    hospTitle: "Hospital Dashboard",
    hospSubtitle: "City General Hospital — Emergency Coordination",
    hospDemoNote: "This is a demonstration. Real hospital systems require backend integration and authentication.",
    incomingRequests: "Incoming Requests", noRequests: "No incoming requests at this time.",
    resourceStatus: "Resource Status", demoData: "Demo Data",
    edBays: "ED Bays", cathLab: "Cath Lab",
    strokeTeam: "Stroke Team", traumaBay: "Trauma Bay",
    statusAvailable: "Available", statusLimited: "Limited",
    statusFull: "Full", statusInUse: "In Use",
    statusUnavailable: "Unavailable", statusBusy: "Busy",
    statusOccupied: "Occupied",
    handoversToday: "Handovers Today", noHandovers: "No completed handovers yet.",
    casesTitle: "All Cases", btnNewCase: "+ New Case",
    searchCases: "Search cases...", filterAll: "All Status",
    filterActive: "Active", filterAccepted: "Accepted",
    filterPending: "Pending", filterComplete: "Complete",
    filterDeclined: "Declined",
    directoryTitle: "Hospital Directory",
    passportTitle: "Arrival Passport", btnPrint: "🖨️ Print / Save PDF",
    selectCase: "Select a case above to generate the Arrival Passport.",
    analyticsTitle: "Demo Statistics",
    analyticsNote: "Statistics calculated from saved demo records only. Not real operational data.",
    settingsTitle: "Settings", demoConfig: "Demo Configuration",
    setAmbId: "Ambulance Unit ID", setCrewName: "Crew Name",
    setOrg: "Organisation", btnSave: "Save Settings",
    dataManagement: "Data Management",
    dataNote: "Hospitals, bed counts and sent emergency requests are stored in the shared ResQ database (Supabase, simulated data). Settings and unsent cases stay in your browser.",
    btnRestoreData: "↩️ Restore Sample Data",
    btnResetData: "🗑️ Reset All Demo Data",
    about: "About ResQ",
    aboutNote: "This is a frontend demonstration of emergency-response coordination concepts. It is not connected to real emergency services, hospitals, or dispatch systems. All hospital data, recommendations, and acceptance responses are simulated.",
    aboutSafety: "For real emergencies: call 112 (India), 999 (UK), 911 (US), or your regional emergency number.",
    formTitle: "New Emergency",
    lblCategory: "Emergency Type", selectType: "— Select type —",
    catCardiac: "❤️ Cardiac Emergency", catStroke: "🧠 Suspected Stroke",
    catTrauma: "🩹 Accident / Trauma", catFracture: "🦴 Suspected Fracture",
    catRespiratory: "🫁 Respiratory Emergency", catObstetric: "🤰 Obstetric Emergency",
    catPaediatric: "👶 Paediatric Emergency", catBurns: "🔥 Burns",
    catPoisoning: "☠️ Poisoning", catMedical: "🏥 General Medical",
    catOther: "❓ Other",
    lblLocation: "Incident Location", btnGPS: "📍 GPS",
    lblAge: "Patient Age (approximate)", lblNotes: "Key Observations / Notes",
    lblPriority: "Priority",
    priCritical: "Critical", priUrgent: "Urgent", priStandard: "Standard",
    lblAmbId: "Ambulance ID", lblCrew: "Crew", lblOrg: "Organisation",
    btnCancel: "Cancel", btnFindHospital: "Find Suitable Hospital →",
    recTitle: "Recommended Hospitals",
    recDemoNote: "Hospital data is simulated for demonstration. Distance is approximate. Readiness data is not real.",
    respTitle: "Respond to Request",
    handoverTitle: "Patient Handover",
    btnBack: "← Back",
  },
  hi: {
    demoNotice: "डेमो मोड — यह वास्तविक आपातकालीन सेवाओं से नहीं जुड़ा है। असली आपातकाल के लिए 112 पर कॉल करें या अपने संगठन के अनुमोदित प्रोटोकॉल का पालन करें।",
    navTagline: "सही अस्पताल। सही समय।",
    navAmbulance: "🚑 एम्बुलेंस", navHospital: "🏥 अस्पताल",
    navCases: "📋 केस", navDirectory: "🔍 सूची",
    navPassport: "📄 पासपोर्ट", navNetwork: "📡 नेटवर्क", navAnalytics: "📊 आँकड़े",
    navSettings: "⚙️ सेटिंग",
    roleLabel: "भूमिका:",
    ambTitle: "एम्बुलेंस डैशबोर्ड", ambSubtitle: "तैयार",
    statusReady: "तैयार",
    btnStartEmergency: "🚨 आपातकाल शुरू करें",
    startHint: "नया आपातकाल केस बनाने के लिए दबाएं",
    badgeActive: "सक्रिय", viewCase: "केस देखें",
    statTotal: "कुल केस", statAccepted: "स्वीकृत",
    statPending: "प्रतीक्षारत", statComplete: "पूर्ण",
    recentCases: "हाल के केस", viewAll: "सभी देखें",
    noCases: "अभी कोई केस नहीं। आपातकाल शुरू करने के लिए दबाएं।",
    hospTitle: "अस्पताल डैशबोर्ड",
    hospSubtitle: "सिटी जनरल अस्पताल — आपातकालीन समन्वय",
    hospDemoNote: "यह एक प्रदर्शन है। वास्तविक अस्पताल प्रणालियों में बैकएंड एकीकरण आवश्यक है।",
    incomingRequests: "आने वाले अनुरोध", noRequests: "अभी कोई आने वाला अनुरोध नहीं।",
    resourceStatus: "संसाधन स्थिति", demoData: "डेमो डेटा",
    edBays: "आपातकालीन विभाग बेड", cathLab: "कैथ लैब",
    strokeTeam: "स्ट्रोक टीम", traumaBay: "ट्रॉमा बे",
    statusAvailable: "उपलब्ध", statusLimited: "सीमित",
    statusFull: "भरा हुआ", statusInUse: "उपयोग में",
    statusUnavailable: "अनुपलब्ध", statusBusy: "व्यस्त",
    statusOccupied: "व्यस्त",
    handoversToday: "आज के हैंडओवर", noHandovers: "अभी कोई पूर्ण हैंडओवर नहीं।",
    casesTitle: "सभी केस", btnNewCase: "+ नया केस",
    searchCases: "केस खोजें...", filterAll: "सभी स्थिति",
    filterActive: "सक्रिय", filterAccepted: "स्वीकृत",
    filterPending: "प्रतीक्षारत", filterComplete: "पूर्ण",
    filterDeclined: "अस्वीकृत",
    directoryTitle: "अस्पताल सूची",
    passportTitle: "आगमन पासपोर्ट", btnPrint: "🖨️ प्रिंट / PDF",
    selectCase: "आगमन पासपोर्ट देखने के लिए ऊपर केस चुनें।",
    analyticsTitle: "डेमो आँकड़े",
    analyticsNote: "आँकड़े केवल सहेजे गए डेमो रिकॉर्ड से हैं। यह वास्तविक परिचालन डेटा नहीं है।",
    settingsTitle: "सेटिंग", demoConfig: "डेमो कॉन्फ़िगरेशन",
    setAmbId: "एम्बुलेंस आईडी", setCrewName: "क्रू का नाम",
    setOrg: "संगठन", btnSave: "सेटिंग सहेजें",
    dataManagement: "डेटा प्रबंधन",
    dataNote: "अस्पताल, बेड संख्या और भेजे गए आपातकालीन अनुरोध साझा ResQ डेटाबेस (Supabase, नकली डेटा) में संग्रहीत हैं। सेटिंग्स आपके ब्राउज़र में रहती हैं।",
    btnRestoreData: "↩️ नमूना डेटा पुनर्स्थापित करें",
    btnResetData: "🗑️ सभी डेमो डेटा हटाएं",
    about: "ResQ के बारे में",
    aboutNote: "यह आपातकालीन-प्रतिक्रिया समन्वय अवधारणाओं का एक फ्रंटएंड प्रदर्शन है। यह वास्तविक आपातकालीन सेवाओं, अस्पतालों या डिस्पैच प्रणालियों से जुड़ा नहीं है।",
    aboutSafety: "वास्तविक आपातकाल के लिए: 112 (भारत), 999 (UK), 911 (US) पर कॉल करें।",
    formTitle: "नया आपातकाल",
    lblCategory: "आपातकाल का प्रकार", selectType: "— प्रकार चुनें —",
    catCardiac: "❤️ हृदय आपातकाल", catStroke: "🧠 संदिग्ध स्ट्रोक",
    catTrauma: "🩹 दुर्घटना / आघात", catFracture: "🦴 संदिग्ध फ्रैक्चर",
    catRespiratory: "🫁 श्वसन आपातकाल", catObstetric: "🤰 प्रसूति आपातकाल",
    catPaediatric: "👶 बाल चिकित्सा आपातकाल", catBurns: "🔥 जलन",
    catPoisoning: "☠️ विषाक्तता", catMedical: "🏥 सामान्य चिकित्सा",
    catOther: "❓ अन्य",
    lblLocation: "घटना स्थान", btnGPS: "📍 GPS",
    lblAge: "रोगी की आयु (अनुमानित)", lblNotes: "मुख्य अवलोकन / नोट्स",
    lblPriority: "प्राथमिकता",
    priCritical: "गंभीर", priUrgent: "तत्काल", priStandard: "सामान्य",
    lblAmbId: "एम्बुलेंस आईडी", lblCrew: "क्रू", lblOrg: "संगठन",
    btnCancel: "रद्द करें", btnFindHospital: "उपयुक्त अस्पताल खोजें →",
    recTitle: "अनुशंसित अस्पताल",
    recDemoNote: "अस्पताल डेटा प्रदर्शन के लिए अनुकरण किया गया है। दूरी अनुमानित है।",
    respTitle: "अनुरोध का जवाब दें",
    handoverTitle: "रोगी हैंडओवर",
    btnBack: "← वापस",
  }
};

/* ─── DEMO HOSPITAL DATA ──────────────────────────────── */
const DEMO_HOSPITALS = [
  {
    id: "H001",
    name: "City General Hospital",
    address: "12, Station Road, Sector 14, New Delhi",
    region: "delhi_central",
    lat: 28.6139, lng: 77.2090,
    capabilities: ["cardiac","stroke","trauma","paediatric","obstetric","icu"],
    specialties: ["Cardiology","Neurology","Trauma Surgery","Paediatrics","Obstetrics & Gynaecology","ICU"],
    hasCathLab: true, hasStrokeUnit: true, hasTraumaBay: true,
    hasBurns: false, hasPaeds: true, hasObs: true,
    edStatus: "available", lastUpdated: "2 min ago",
    contactNumber: "011-2345-6789",
    reportedPressure: "Normal",
    notes: "Level I Trauma Centre. 24/7 cardiac team."
  },
  {
    id: "H002",
    name: "Metro Heart Institute",
    address: "45, Ring Road, Lajpat Nagar, New Delhi",
    region: "delhi_south",
    lat: 28.5672, lng: 77.2434,
    capabilities: ["cardiac","icu"],
    specialties: ["Cardiology","Cardiac Surgery","Electrophysiology","ICU"],
    hasCathLab: true, hasStrokeUnit: false, hasTraumaBay: false,
    hasBurns: false, hasPaeds: false, hasObs: false,
    edStatus: "available", lastUpdated: "5 min ago",
    contactNumber: "011-3456-7890",
    reportedPressure: "Normal",
    notes: "Specialist cardiac hospital. PCI available 24/7."
  },
  {
    id: "H003",
    name: "District Trauma Centre",
    address: "78, NH-8, Gurugram, Haryana",
    region: "gurugram",
    lat: 28.4595, lng: 77.0266,
    capabilities: ["trauma","fracture","burns","icu"],
    specialties: ["Trauma Surgery","Orthopaedics","Burns","Critical Care","ICU"],
    hasCathLab: false, hasStrokeUnit: false, hasTraumaBay: true,
    hasBurns: true, hasPaeds: false, hasObs: false,
    edStatus: "limited", lastUpdated: "8 min ago",
    contactNumber: "0124-4567-8901",
    reportedPressure: "High (Trauma Surge)",
    notes: "Level II Trauma Centre. Burns unit available. Limited cardiac capability."
  },
  {
    id: "H004",
    name: "Sunrise Neurology Hospital",
    address: "23, MG Road, Bengaluru, Karnataka",
    region: "bengaluru",
    lat: 12.9716, lng: 77.5946,
    capabilities: ["stroke","neurology","icu"],
    specialties: ["Neurology","Neurosurgery","Stroke","Interventional Radiology","ICU"],
    hasCathLab: false, hasStrokeUnit: true, hasTraumaBay: false,
    hasBurns: false, hasPaeds: false, hasObs: false,
    edStatus: "available", lastUpdated: "3 min ago",
    contactNumber: "080-5678-9012",
    reportedPressure: "Normal",
    notes: "Designated Stroke Centre. tPA available 24/7. CT angio on call."
  },
  {
    id: "H005",
    name: "Mother & Child Hospital",
    address: "56, Park Street, Central NCR, New Delhi",
    region: "delhi_central",
    lat: 28.6300, lng: 77.2150,
    capabilities: ["obstetric","paediatric","neonatal"],
    specialties: ["Obstetrics & Gynaecology","Paediatrics","Neonatal ICU","Maternal-Fetal Medicine"],
    hasCathLab: false, hasStrokeUnit: false, hasTraumaBay: false,
    hasBurns: false, hasPaeds: true, hasObs: true,
    edStatus: "available", lastUpdated: "10 min ago",
    contactNumber: "011-6789-0123",
    reportedPressure: "Normal",
    notes: "Specialist maternity and paediatric hospital. NICU level III."
  },
  {
    id: "H006",
    name: "Apollo Multispecialty Hospital",
    address: "11, Greams Road, Chennai, Tamil Nadu",
    region: "chennai",
    lat: 13.0827, lng: 80.2707,
    capabilities: ["cardiac","stroke","trauma","paediatric","obstetric","burns","icu"],
    specialties: ["Cardiology","Neurology","Trauma","Paediatrics","Obstetrics","Burns","Multi-organ"],
    hasCathLab: true, hasStrokeUnit: true, hasTraumaBay: true,
    hasBurns: true, hasPaeds: true, hasObs: true,
    edStatus: "available", lastUpdated: "1 min ago",
    contactNumber: "044-7890-1234",
    reportedPressure: "Normal",
    notes: "Full-service tertiary care hospital. All major emergencies accepted."
  },
  {
    id: "H007",
    name: "AIIMS Apex Trauma Center",
    address: "Ring Road, Safdarjung Enclave, New Delhi",
    region: "delhi_south",
    lat: 28.5685, lng: 77.2066,
    capabilities: ["cardiac","stroke","trauma","fracture","paediatric","obstetric","burns","poisoning","icu"],
    specialties: ["All Major Specialties","Trauma","Burns","Toxicology","Paediatrics"],
    hasCathLab: true, hasStrokeUnit: true, hasTraumaBay: true,
    hasBurns: true, hasPaeds: true, hasObs: true,
    edStatus: "limited", lastUpdated: "15 min ago",
    contactNumber: "011-2658-8500",
    reportedPressure: "High (Queue Active)",
    notes: "Government tertiary care. All specialties. High acuity emergency admissions."
  }
];

/* ─── EMERGENCY CATEGORY CONFIG ──────────────────────── */
const CATEGORY_CONFIG = {
  cardiac:     { icon: "❤️", label: "Cardiac Emergency",      requires: ["cardiac"],     color: "red"   },
  stroke:      { icon: "🧠", label: "Suspected Stroke",        requires: ["stroke"],      color: "red"   },
  trauma:      { icon: "🩹", label: "Accident / Trauma",       requires: ["trauma"],      color: "amber" },
  fracture:    { icon: "🦴", label: "Suspected Fracture",      requires: ["fracture","trauma"], color: "amber" },
  respiratory: { icon: "🫁", label: "Respiratory Emergency",   requires: [],              color: "amber" },
  obstetric:   { icon: "🤰", label: "Obstetric Emergency",     requires: ["obstetric"],   color: "red"   },
  paediatric:  { icon: "👶", label: "Paediatric Emergency",    requires: ["paediatric"],  color: "amber" },
  burns:       { icon: "🔥", label: "Burns",                   requires: ["burns"],       color: "red"   },
  poisoning:   { icon: "☠️", label: "Poisoning",               requires: ["poisoning"],   color: "amber" },
  medical:     { icon: "🏥", label: "General Medical",         requires: [],              color: "blue"  },
  other:       { icon: "❓", label: "Other",                   requires: [],              color: "grey"  }
};

/* ─── APPLICATION STATE ───────────────────────────────── */
let state = {
  lang:        "en",
  role:        "ambulance",
  cases:       [],
  settings: {
    ambId:     "AMB-001",
    crewName:  "Demo Crew",
    org:       "Demo Ambulance Service"
  },
  currentFormData: null
};

/* ─── STORAGE ─────────────────────────────────────────── */
function saveState() {
  try {
    localStorage.setItem("resq_cases",    JSON.stringify(state.cases));
    localStorage.setItem("resq_settings", JSON.stringify(state.settings));
    localStorage.setItem("resq_lang",     state.lang);
    localStorage.setItem("resq_role",     state.role);
  } catch(e) {
    showToast("Storage error — data may not be saved.", "error");
  }
  syncPush();
}

/* ─── SHARED DATABASE SYNC (Supabase) ─────────────────── */
const _pushed = {};
let _lastLocalWrite = 0;
let _lastPullSig = "";

function syncPush() {
  if (!window.ResQDB?.connected) return;
  state.cases.filter(c => c.shared).forEach(c => {
    const { __ts, ...rest } = c;
    const json = JSON.stringify(rest);
    if (_pushed[c.id] === json) return;
    _pushed[c.id] = json;
    c.__ts = Date.now();
    _lastLocalWrite = Date.now();
    ResQDB.pushCase(c).catch(err => { delete _pushed[c.id]; console.warn("DB push failed:", err); });
  });
}

function timeAgo(iso) {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  return m < 1 ? "just now" : m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`;
}

function deriveCaps(specs) {
  const s = specs.join(" ").toLowerCase(), caps = [];
  if (/cardi|heart/.test(s)) caps.push("cardiac");
  if (/neuro|stroke/.test(s)) caps.push("stroke");
  if (/trauma|ortho|all major/.test(s)) caps.push("trauma");
  if (/ortho|fracture/.test(s)) caps.push("fracture");
  if (/paed|child/.test(s)) caps.push("paediatric");
  if (/obstet|gynae|maternal/.test(s)) caps.push("obstetric");
  if (/burn/.test(s)) caps.push("burns");
  if (/toxic|poison/.test(s)) caps.push("poisoning");
  if (/icu|critical/.test(s)) caps.push("icu");
  return caps;
}

function applyHospitalRows(rows) {
  const ids = new Set(rows.map(r => r.hospital_id));
  for (let i = DEMO_HOSPITALS.length - 1; i >= 0; i--) {
    if (!ids.has(DEMO_HOSPITALS[i].id)) DEMO_HOSPITALS.splice(i, 1);
  }
  rows.forEach(r => {
    const specs = (r.specialty || "").split(",").map(s => s.trim()).filter(Boolean);
    let h = DEMO_HOSPITALS.find(x => x.id === r.hospital_id);
    if (!h) {
      const caps = deriveCaps(specs);
      h = {
        id: r.hospital_id, region: "", lat: null, lng: null, capabilities: caps,
        hasCathLab: caps.includes("cardiac"), hasStrokeUnit: caps.includes("stroke"),
        hasTraumaBay: caps.includes("trauma"), hasBurns: caps.includes("burns"),
        hasPaeds: caps.includes("paediatric"), hasObs: caps.includes("obstetric"),
        edStatus: "available", contactNumber: "—", reportedPressure: "Normal",
        notes: "Added via ResQ Admin (demonstration data)."
      };
      DEMO_HOSPITALS.push(h);
    }
    h.name = r.hospital_name;
    h.address = r.location;
    h.specialties = specs;
    h.totalBeds = r.total_beds;
    h.availableBeds = r.available_beds;
    h.lastUpdated = timeAgo(r.last_updated);
    if (h._origEd === undefined) h._origEd = h.edStatus;
    h.edStatus = r.available_beds === 0 ? "full" : h._origEd;
  });
}

function applyRequestRows(rows) {
  const recentWrite = Date.now() - _lastLocalWrite < 2500;
  const byCase = {};
  rows.forEach(r => { if (r.case_id && r.case_data) (byCase[r.case_id] = byCase[r.case_id] || []).push(r); });

  Object.entries(byCase).forEach(([cid, rs]) => {
    const remote = rs[0].case_data;
    const idx = state.cases.findIndex(x => x.id === cid);
    if (idx === -1 || (!recentWrite && (remote.__ts || 0) > (state.cases[idx].__ts || 0))) {
      if (idx === -1) state.cases.unshift(remote); else state.cases[idx] = remote;
      const { __ts, ...rest } = remote;
      _pushed[cid] = JSON.stringify(rest);
    }
    const c = state.cases.find(x => x.id === cid);
    // Database request status is authoritative (e.g. accepted/rejected from the Admin page)
    rs.forEach(r => {
      const req = c.acceptanceRequests?.find(q => q.id === r.request_id);
      if (!req) return;
      req.bedAllocated = r.bed_allocated;
      const open = ["requested", "pending", "acknowledged"].includes(c.status);
      if (r.request_status === "Accepted" && req.status !== "accepted") {
        req.status = "accepted"; req.respondedAt = req.respondedAt || now();
        if (open) c.status = "accepted";
      } else if (r.request_status === "Rejected" && req.status !== "declined") {
        req.status = "declined"; req.respondedAt = req.respondedAt || now();
        if (open) c.status = "alternative";
      } else if (r.request_status === "Cancelled" && req.status !== "cancelled") {
        req.status = "cancelled";
        if (!["complete", "closed"].includes(c.status)) c.status = "cancelled";
      }
    });
  });
}

async function syncPull() {
  if (!window.ResQDB?.connected) return;
  try {
    const [hosps, reqs] = await Promise.all([ResQDB.listHospitals(), ResQDB.listRequests()]);
    const sig = JSON.stringify([hosps, reqs.map(r => [r.request_id, r.request_status, r.bed_allocated, r.case_data?.__ts])]);
    if (sig === _lastPullSig) return;
    _lastPullSig = sig;
    applyHospitalRows(hosps);
    applyRequestRows(reqs);
    saveState();
    if (!document.querySelector(".modal-overlay.open")) refreshCurrentPage();
  } catch (err) {
    console.warn("DB pull failed:", err);
  }
}

/* Hospital confirms the bed allocation for an accepted request (beds − 1 in the database) */
function confirmBedAllocation(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  const req = c?.acceptanceRequests?.find(r => r.status === "accepted" && !r.bedAllocated);
  if (!c || !req) return;
  ResQDB.confirmAllocation(req.id).then(left => {
    req.bedAllocated = true;
    const h = DEMO_HOSPITALS.find(x => x.id === req.hospId);
    if (h) h.availableBeds = left;
    addTimeline(caseId, "accepted", `Bed allocation confirmed at ${h?.name || req.hospName}. Beds now available: ${left}.`);
    showToast(`🛏️ Bed allocated. ${h?.name || "Hospital"} now has ${left} available beds.`, "success", 5000);
    refreshCurrentPage();
    syncPull();
  }).catch(err => { showToast("Database: " + err.message, "error", 6000); syncPull(); });
}

/* Ambulance cancels the case; releases the bed if one was allocated */
function cancelSharedCase(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  const req = c?.acceptanceRequests?.slice().reverse().find(r => ["pending", "acknowledged", "accepted"].includes(r.status));
  if (!c || !req) return;
  ResQDB.cancelRequest(req.id).then(left => {
    const released = req.bedAllocated;
    req.status = "cancelled"; req.bedAllocated = false;
    c.status = "cancelled";
    addTimeline(caseId, "cancelled", released ? `Case cancelled. Bed released (beds now available: ${left}).` : "Case cancelled by ambulance crew.");
    showToast(released ? `Case cancelled. Bed released — ${left} beds now available.` : "Case cancelled.", "info", 5000);
    refreshCurrentPage();
    syncPull();
  }).catch(err => { showToast("Database: " + err.message, "error", 6000); syncPull(); });
}

function startSync() {
  if (!window.ResQDB?.connected) {
    console.warn("ResQ: database not configured (config.js) — running on local demo data only.");
    return;
  }
  syncPull();
  setInterval(syncPull, 3000);
}

function loadState() {
  try {
    const cases    = localStorage.getItem("resq_cases");
    const settings = localStorage.getItem("resq_settings");
    const lang     = localStorage.getItem("resq_lang");
    const role     = localStorage.getItem("resq_role");

    if (cases)    state.cases    = JSON.parse(cases);
    if (settings) state.settings = JSON.parse(settings);
    if (lang)     state.lang     = lang;
    if (role)     state.role     = role;
  } catch(e) {
    console.warn("Failed to load state:", e);
  }
}

/* ─── UTILITIES ───────────────────────────────────────── */
function generateCaseId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "RESQ-";
  for (let i = 0; i < 5; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function normalizePlate(plate) {
  if (!plate) return "";
  return plate.trim().toUpperCase().replace(/\s+/g, " ");
}

function setPlate(plate) {
  const el = document.getElementById("fldAmbPlate");
  if (el) el.value = plate;
}

function generatePatientRef() {
  return "PT-" + Math.floor(1000 + Math.random() * 9000);
}

/* ─── GATE PASS STATUS RESOLVER ──────────────────────── */
function getGatePassStatus(c) {
  if (!c) return { key: "not_issued", label: "NOT ISSUED", class: "status-not-issued", icon: "⛔", desc: "No hospital coordination record active." };
  
  if (c.handover && (c.handover.careTransferredAt || c.status === "complete")) {
    return {
      key: "handover_completed",
      label: "HANDOVER COMPLETED",
      class: "status-handover",
      icon: "🤝",
      desc: "Patient care formally transferred to authorized receiving team."
    };
  }
  if (c.gatePass && c.gatePass.status === "arrival_verified" || c.status === "arrived") {
    return {
      key: "arrival_verified",
      label: "ARRIVAL VERIFIED",
      class: "status-verified",
      icon: "🏁",
      desc: "Ambulance registration plate and case verified at receiving entrance."
    };
  }
  if (c.hospitalReadiness && c.hospitalReadiness.reconfirmationNeeded) {
    return {
      key: "reconfirmation_required",
      label: "UPDATED / RECONFIRMATION REQUIRED",
      class: "status-reconfirm",
      icon: "⚠️",
      desc: "Patient condition changed in transit or resources updated. Reconfirmation required."
    };
  }
  if (c.hospitalReadiness && c.hospitalReadiness.status === "ready") {
    return {
      key: "ready",
      label: "READY FOR ARRIVAL",
      class: "status-ready",
      icon: "✅",
      desc: "Authorized hospital team has explicitly confirmed required resources and reception."
    };
  }
  if (c.status === "accepted" || c.acceptanceRequests?.some(r => r.status === "accepted")) {
    return {
      key: "prep_in_progress",
      label: "ACCEPTED — PREPARATION IN PROGRESS",
      class: "status-prep",
      icon: "⏳",
      desc: "Hospital has accepted the case. Department preparations underway."
    };
  }
  if (c.status === "requested" || c.status === "pending" || c.status === "acknowledged") {
    return {
      key: "pending",
      label: "PENDING HOSPITAL CONFIRMATION",
      class: "status-pending",
      icon: "📡",
      desc: "Coordination alert transmitted. Acceptance and clinical readiness unverified."
    };
  }
  return {
    key: "not_issued",
    label: "NOT ISSUED",
    class: "status-not-issued",
    icon: "⛔",
    desc: "Hospital acceptance required before gate entry clearance is issued."
  };
}

/* ─── DYNAMIC SVG QR CODE GENERATOR ───────────────────── */
function generateQrSvg(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }
  const size = 21;
  let rects = "";
  const isCorner = (r, c) => {
    if (r < 7 && c < 7) return true;
    if (r < 7 && c >= size - 7) return true;
    if (r >= size - 7 && c < 7) return true;
    return false;
  };
  const drawCorner = (startR, startC) => {
    let out = "";
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          out += `<rect x="${(startC + c) * 6}" y="${(startR + r) * 6}" width="6" height="6" fill="#0B2545"/>`;
        }
      }
    }
    return out;
  };
  rects += drawCorner(0, 0);
  rects += drawCorner(0, size - 7);
  rects += drawCorner(size - 7, 0);

  let seed = Math.abs(hash);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isCorner(r, c)) continue;
      if (r === 6 || c === 6) {
        if ((r + c) % 2 === 0) rects += `<rect x="${c * 6}" y="${r * 6}" width="6" height="6" fill="#0B2545"/>`;
        continue;
      }
      seed = (seed * 9301 + 49297) % 233280;
      if (seed % 3 === 0) rects += `<rect x="${c * 6}" y="${r * 6}" width="6" height="6" fill="#0B2545"/>`;
    }
  }
  return `<svg viewBox="0 0 ${size * 6} ${size * 6}" width="120" height="120" xmlns="http://www.w3.org/2000/svg" style="background:#FFF;border-radius:6px;display:block;">${rects}</svg>`;
}

/* ─── CONDITION-BASED HOSPITAL PREPARATION GENERATOR ─── */
function generatePreparationRequirements(category, notes) {
  const reqs = [];
  const ts = now();
  const notesLower = (notes || "").toLowerCase();

  if (category === "cardiac") {
    reqs.push(
      { id: "req_cath", name: "24/7 Primary PCI Cath Lab Activation", category: "Facility", status: "pending", confirmedBy: null, confirmedAt: null, notes: "Requires interventional cardiologist on standby" },
      { id: "req_ecg", name: "Continuous 12-Lead Cardiac Telemetry & Defibrillator", category: "Equipment", status: "confirmed", confirmedBy: "System Protocol", confirmedAt: ts, notes: "Available in Resus Bay 1" },
      { id: "req_heparin", name: "Anticoagulation / Antiplatelet Resus Cart", category: "Medication", status: "pending", confirmedBy: null, confirmedAt: null, notes: "Heparin / Ticagrelor standby" },
      { id: "req_ccu", name: "Coronary Care Unit (CCU) Post-PCI Bed", category: "Bed", status: "review", confirmedBy: null, confirmedAt: null, notes: "Bed census verification needed" }
    );
  } else if (category === "trauma" || category === "fracture") {
    reqs.push(
      { id: "req_trauma_team", name: "Full Trauma Surgical Team Assembly", category: "Staff", status: "pending", confirmedBy: null, confirmedAt: null, notes: "Trauma surgeon, anesthetist, ortho on call" },
      { id: "req_trauma_bay", name: "Designated Resuscitation Trauma Bay", category: "Facility", status: "confirmed", confirmedBy: "ED Charge", confirmedAt: ts, notes: "Trauma Bay 1 cleared" },
      { id: "req_blood_mtp", name: "Massive Transfusion Protocol (MTP) Standby", category: "Blood Bank", status: "review", confirmedBy: null, confirmedAt: null, notes: "4 units O-Neg PRBC on hold" },
      { id: "req_imaging", name: "Urgent Trauma CT Scanner & FAST Ultrasound", category: "Diagnostic", status: "pending", confirmedBy: null, confirmedAt: null, notes: "Queue priority clearance required" }
    );
  } else if (category === "stroke") {
    reqs.push(
      { id: "req_stroke_team", name: "Acute Stroke Code & Neurologist Standby", category: "Staff", status: "pending", confirmedBy: null, confirmedAt: null, notes: "Stroke coordinator alerted" },
      { id: "req_ct_angio", name: "Priority CT Angiography / Perfusion Slot", category: "Diagnostic", status: "pending", confirmedBy: null, confirmedAt: null, notes: "Clear gantry upon ambulance arrival" },
      { id: "req_tpa", name: "IV Thrombolysis (tPA / TNK) Drug Pre-Check", category: "Medication", status: "confirmed", confirmedBy: "Pharmacy", confirmedAt: ts, notes: "Stock verified in ED Pyxis" },
      { id: "req_neuro_icu", name: "Comprehensive Neuro-ICU Stroke Bed", category: "Bed", status: "review", confirmedBy: null, confirmedAt: null, notes: "Monitoring bay availability pending" }
    );
  } else if (category === "respiratory") {
    reqs.push(
      { id: "req_airway", name: "Advanced Airway Team & Anesthetist Standby", category: "Staff", status: "pending", confirmedBy: null, confirmedAt: null, notes: "Rapid sequence intubation ready" },
      { id: "req_vent", name: "High-Flow Oxygen & Critical Care Ventilator", category: "Equipment", status: "confirmed", confirmedBy: "Resp Therapy", confirmedAt: ts, notes: "Ventilator tested and calibrated" },
      { id: "req_abg", name: "Point-of-Care Arterial Blood Gas (ABG)", category: "Diagnostic", status: "confirmed", confirmedBy: "ED Lab", confirmedAt: ts, notes: "Cartridge installed" }
    );
  } else if (category === "burns") {
    reqs.push(
      { id: "req_burns_unit", name: "Specialist Burns Intensive Care Bay", category: "Facility", status: "pending", confirmedBy: null, confirmedAt: null, notes: "Warming blankets & sterile isolation" },
      { id: "req_fluids", name: "Parkland Formula IV Fluid Resuscitation Cart", category: "Medication", status: "confirmed", confirmedBy: "Nursing", confirmedAt: ts, notes: "Warm Ringer's Lactate ready" },
      { id: "req_airway_burns", name: "Inhalation Injury Fiberoptic Airway Support", category: "Equipment", status: "pending", confirmedBy: null, confirmedAt: null, notes: "ENT / Anesthesia consult" }
    );
  } else if (category === "paediatric") {
    reqs.push(
      { id: "req_paeds_team", name: "Pediatric Emergency Specialist Standby", category: "Staff", status: "pending", confirmedBy: null, confirmedAt: null, notes: "On-duty pediatrician alerted" },
      { id: "req_paeds_cart", name: "Length-Based (Broselow) Resus Cart", category: "Equipment", status: "confirmed", confirmedBy: "Nursing", confirmedAt: ts, notes: "Pediatric airway blades & cuffs checked" },
      { id: "req_picu", name: "Pediatric ICU (PICU) Escalation Bed", category: "Bed", status: "review", confirmedBy: null, confirmedAt: null, notes: "PICU census check required" }
    );
  } else if (category === "obstetric") {
    reqs.push(
      { id: "req_obs_team", name: "Obstetrician & Neonatal Resus Team Standby", category: "Staff", status: "pending", confirmedBy: null, confirmedAt: null, notes: "Emergency delivery bay" },
      { id: "req_nicu", name: "Level III Neonatal Resuscitation Warmer (NICU)", category: "Equipment", status: "confirmed", confirmedBy: "NICU Lead", confirmedAt: ts, notes: "Warmer preheated" },
      { id: "req_blood_obs", name: "Emergency Postpartum Hemorrhage Kit", category: "Medication", status: "confirmed", confirmedBy: "Pharmacy", confirmedAt: ts, notes: "Oxytocin / Tranexamic acid ready" }
    );
  } else {
    reqs.push(
      { id: "req_general_bay", name: "Acute Medical Assessment Bay", category: "Facility", status: "confirmed", confirmedBy: "Triage", confirmedAt: ts, notes: "Standard ED cubicle" },
      { id: "req_general_monitor", name: "Vital Signs Multi-Parameter Monitor", category: "Equipment", status: "confirmed", confirmedBy: "ED Tech", confirmedAt: ts, notes: "Ready at bedside" }
    );
  }

  if (notesLower.includes("bleed") || notesLower.includes("hemorrhage") || notesLower.includes("blood")) {
    if (!reqs.some(r => r.id === "req_blood_mtp")) {
      reqs.push({
        id: "req_hemorrhage",
        name: "Urgent Hemorrhage Control & Blood Bank Standby",
        category: "Blood Bank",
        status: "pending",
        confirmedBy: null,
        confirmedAt: null,
        notes: "Severe bleeding reported in paramedic observations"
      });
    }
  }

  return reqs;
}

function formatTime(isoStr) {
  if (!isoStr) return "—";
  const d = new Date(isoStr);
  return d.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
}

function formatDateTime(isoStr) {
  if (!isoStr) return "—";
  const d = new Date(isoStr);
  return d.toLocaleString([], {day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit"});
}

function now() { return new Date().toISOString(); }

function t(key) {
  return (i18n[state.lang] && i18n[state.lang][key]) || (i18n.en[key]) || key;
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function escHtml(str) {
  return String(str || "")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}

function statusBadge(status) {
  const map = {
    draft:         ["grey",   "Draft"],
    created:       ["blue",   "Created"],
    recommended:   ["blue",   "Recommended"],
    requested:     ["amber",  "Request Sent"],
    pending:       ["amber",  "Pending Response"],
    acknowledged:  ["blue",   "Acknowledged"],
    accepted:      ["green",  "Accepted ✓"],
    declined:      ["red",    "Declined"],
    alternative:   ["amber",  "Alternative Needed"],
    enroute:       ["blue",   "En Route"],
    ready:         ["green",  "Ready for Arrival"],
    reconfirm:     ["red",    "Reconfirmation Required"],
    arrived:       ["green",  "Arrived"],
    verified:      ["blue",   "Arrival Verified"],
    handover:      ["amber",  "Handover In Progress"],
    complete:      ["green",  "Handover Complete"],
    closed:        ["grey",   "Closed"],
    cancelled:     ["grey",   "Cancelled"]
  };
  const [col, label] = map[status] || ["grey", status];
  return `<span class="badge badge-${col}">${label}</span>`;
}

function categoryIcon(cat) {
  return CATEGORY_CONFIG[cat]?.icon || "🏥";
}

function categoryLabel(cat) {
  return CATEGORY_CONFIG[cat]?.label || cat;
}

/* ─── LANGUAGE ────────────────────────────────────────── */
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (i18n[state.lang] && i18n[state.lang][key]) {
      el.textContent = i18n[state.lang][key];
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (i18n[state.lang] && i18n[state.lang][key]) {
      el.placeholder = i18n[state.lang][key];
    }
  });
  document.body.classList.toggle("lang-hi", state.lang === "hi");
  document.getElementById("langLabel").textContent = state.lang === "en" ? "हिंदी" : "English";
}

function toggleLanguage() {
  state.lang = state.lang === "en" ? "hi" : "en";
  applyTranslations();
  saveState();
  refreshCurrentPage();
}

/* ─── NAVIGATION ─────────────────────────────────────── */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(l => {
    l.classList.toggle("active", l.dataset.page === pageId);
  });
  const page = document.getElementById("page-" + pageId);
  if (page) page.classList.add("active");
  closeMobileMenu();
  refreshCurrentPage(pageId);
}

function refreshCurrentPage(pageId) {
  const active = pageId || document.querySelector(".page.active")?.id?.replace("page-", "");
  if (!active) return;
  if (active === "ambulance") renderAmbDashboard();
  if (active === "hospital")  renderHospDashboard();
  if (active === "cases")     renderCases();
  if (active === "directory") renderDirectory();
  if (active === "passport")  renderPassportPage();
  if (active === "network")    renderNetworkPage();
  if (active === "analytics") renderAnalytics();
  if (active === "settings")  renderSettings();
}

function toggleMobileMenu() {
  document.getElementById("navLinks").classList.toggle("mobile-open");
}

function closeMobileMenu() {
  document.getElementById("navLinks").classList.remove("mobile-open");
}

/* ─── ROLE SWITCHING ─────────────────────────────────── */
function switchRole(role) {
  state.role = role;
  saveState();
  document.getElementById("roleSelect").value = role;
  if (role === "hospital") showPage("hospital");
  else if (role === "dispatcher") showPage("network");
  else showPage("ambulance");
}

/* ─── MODAL HELPERS ───────────────────────────────────── */
function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");
  document.body.style.overflow = "";
}

function closeModalOnOverlay(e, id) {
  if (e.target.classList.contains("modal-overlay")) closeModal(id);
}

/* ─── TOAST ───────────────────────────────────────────── */
function showToast(message, type = "info", duration = 3500) {
  const icons = { success:"✅", error:"❌", info:"ℹ️", warning:"⚠️" };
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type]||""}</span><span>${escHtml(message)}</span>`;
  toast.onclick = () => toast.remove();
  document.getElementById("toastContainer").appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

/* ─── GPS LOCATION ────────────────────────────────────── */
let currentCoords = null;

function getLocation() {
  const statusEl = document.getElementById("locationStatus");
  statusEl.textContent = "Getting location…";
  if (!navigator.geolocation) {
    statusEl.textContent = "GPS not supported. Enter location manually.";
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => {
      currentCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      document.getElementById("fldLocation").value =
        `${currentCoords.lat.toFixed(5)}, ${currentCoords.lng.toFixed(5)}`;
      statusEl.textContent = `📍 Location captured (accuracy: ±${Math.round(pos.coords.accuracy)}m). DEMO: Using coordinates for distance calculation only.`;
      statusEl.style.color = "var(--green)";
    },
    err => {
      const msgs = {
        1: "Location access denied. Please enter the address manually.",
        2: "Location unavailable. Enter address manually.",
        3: "Location timed out. Enter address manually."
      };
      statusEl.textContent = msgs[err.code] || "Location error. Enter address manually.";
      statusEl.style.color = "var(--amber)";
      currentCoords = null;
    },
    { timeout: 8000 }
  );
}

/* ─── EMERGENCY FORM ─────────────────────────────────── */
function openEmergencyForm() {
  currentCoords = null;
  document.getElementById("emergencyForm").reset();
  document.getElementById("locationStatus").textContent = "";
  document.getElementById("locationStatus").style.color = "";
  document.querySelectorAll(".field-error").forEach(e => e.textContent = "");
  document.getElementById("fldAmbId").value = state.settings.ambId || "AMB-001";
  document.getElementById("fldCrew").value  = state.settings.crewName || "";
  document.getElementById("fldOrg").value   = state.settings.org || "";
  // Pre-fill official plate if empty
  const plateEl = document.getElementById("fldAmbPlate");
  if (plateEl && !plateEl.value) plateEl.value = "DL 1C AB 1234";
  // Default priority = urgent
  const prioUrgent = document.querySelector('input[name="priority"][value="urgent"]');
  if (prioUrgent) prioUrgent.checked = true;
  openModal("modalEmergency");
}

function submitEmergencyForm(e) {
  e.preventDefault();
  let valid = true;
  const category = document.getElementById("fldCategory").value;
  const location = document.getElementById("fldLocation").value.trim();
  const plateRaw = document.getElementById("fldAmbPlate")?.value || "";
  const ambPlate = normalizePlate(plateRaw);

  document.getElementById("errCategory").textContent = "";
  document.getElementById("errLocation").textContent = "";
  const errPlate = document.getElementById("errAmbPlate");
  if (errPlate) errPlate.textContent = "";

  if (!ambPlate) {
    if (errPlate) errPlate.textContent = "Please enter or select ambulance registration plate (e.g. DL 1C AB 1234).";
    valid = false;
  }
  if (!category) {
    document.getElementById("errCategory").textContent = "Please select an emergency type.";
    valid = false;
  }
  if (!location) {
    document.getElementById("errLocation").textContent = "Please enter the incident location.";
    valid = false;
  }
  if (!valid) return;

  const priority = document.querySelector('input[name="priority"]:checked')?.value || "urgent";
  const notes = document.getElementById("fldNotes").value.trim();
  const age = document.getElementById("fldAge").value.trim() || "Adult (~45y)";
  const ambId = document.getElementById("fldAmbId").value.trim() || state.settings.ambId || "AMB-001";
  const crew = document.getElementById("fldCrew").value.trim() || state.settings.crewName || "Lead EMT";
  const org = document.getElementById("fldOrg").value.trim() || state.settings.org || "Emergency Response Service";

  // Build draft case object for the Pre-Arrival Clinical Checklist
  const nowTs = now();
  const draft = {
    id: generateCaseId(),
    ambPlate,
    ptRef: generatePatientRef(),
    category,
    categoryLabel: categoryLabel(category),
    location,
    coords: currentCoords ? { ...currentCoords } : null,
    age,
    notes,
    priority,
    ambId,
    crew,
    org,
    status: "draft",
    vitals: {
      hr: category === "cardiac" ? "112" : "88",
      hrTime: nowTs,
      bp: category === "cardiac" ? "90/60" : "126/82",
      bpTime: nowTs,
      spo2: category === "respiratory" ? "91%" : "97%",
      spo2Time: nowTs,
      rr: category === "respiratory" ? "26" : "18",
      rrTime: nowTs,
      temp: "37.1°C",
      tempTime: nowTs,
      avpu: "Alert",
      gcs: "15"
    },
    symptoms: notes || (category === "cardiac" ? "Crushing retrosternal chest pain radiating to left jaw, diaphoresis" : category === "stroke" ? "Right-sided hemiplegia, facial droop, slurred speech" : "Blunt impact, severe thoracic and limb pain"),
    history: "Hypertension (treated), no known bleeding diathesis",
    allergies: "NKDA (No known drug allergies reported)",
    medications: "Amlodipine 5mg OD",
    injuries: category === "trauma" ? "Thoracic contusion, suspected lower rib fractures, cervical tenderness" : "No external traumatic injuries observed",
    interventions: [
      { name: "High-Flow Oxygen Therapy (10 L/min via NRB mask)", time: formatTime(nowTs) },
      { name: "Peripheral IV Cannulation (18G Left Forearm)", time: formatTime(nowTs) }
    ],
    unassessedItems: ["Patient allergies unconfirmed by hospital records", "Last meal time unassessed"],
    crewReview: {
      reviewerName: crew,
      role: "Lead EMT / Paramedic",
      confirmedAt: nowTs,
      confirmed: true,
      notes: "Initial roadside assessment verified"
    },
    doctorReview: {
      present: false,
      doctorName: "",
      qualification: "",
      confirmedAt: null,
      confirmed: false,
      notes: ""
    }
  };

  closeModal("modalEmergency");
  openClinicalChecklist(draft);
}

/* ─── PRE-ARRIVAL CLINICAL CHECKLIST MODAL LOGIC ─────── */
function openClinicalChecklist(draft) {
  state.pendingChecklistCase = draft;
  renderClinicalChecklist();
  openModal("modalClinicalChecklist");
}

function renderClinicalChecklist() {
  const c = state.pendingChecklistCase;
  if (!c) return;

  const headerEl = document.getElementById("chkCaseHeader");
  if (headerEl) {
    headerEl.innerHTML = `Case <strong>${escHtml(c.id)}</strong> &nbsp;|&nbsp; Unit: <strong>${escHtml(c.ambId)}</strong> &nbsp;|&nbsp; Plate: <span class="plate-badge"><span class="plate-badge-ind">IND</span>${escHtml(c.ambPlate)}</span> &nbsp;|&nbsp; Ref: <strong>${escHtml(c.ptRef)}</strong>`;
  }

  const container = document.getElementById("clinicalChecklistBody");
  if (!container) return;

  const nowFormatted = formatTime(now());

  container.innerHTML = `
    <div class="chk-container">
      <div class="info-banner info-blue">
        <span>📋</span>
        <span><strong>Pre-Arrival Clinical Checklist:</strong> Review and verify patient status before hospital transmission. Both Ambulance Crew and onboard clinician (when present) must review.</span>
      </div>

      <!-- Section 1: Category & Complaints -->
      <div class="chk-section">
        <div class="chk-section-header">
          <div class="chk-section-title">1. Emergency Category & Presenting Complaints</div>
          <span class="badge badge-amber">${categoryIcon(c.category)} ${escHtml(c.categoryLabel)}</span>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Presenting Complaint / Symptoms</label>
            <input type="text" id="chkSymptoms" class="form-control" value="${escHtml(c.symptoms)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Triage Priority</label>
            <select id="chkPriority" class="form-control">
              <option value="critical" ${c.priority === "critical" ? "selected" : ""}>Critical (Immediate Resuscitation)</option>
              <option value="urgent" ${c.priority === "urgent" ? "selected" : ""}>Urgent (High Acuity)</option>
              <option value="standard" ${c.priority === "standard" ? "selected" : ""}>Standard (Stable Transfer)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Section 2: History & Allergies -->
      <div class="chk-section">
        <div class="chk-section-header">
          <div class="chk-section-title">2. Relevant Medical History & Allergies</div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Past Medical History</label>
            <input type="text" id="chkHistory" class="form-control" value="${escHtml(c.history)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Known Allergies</label>
            <input type="text" id="chkAllergies" class="form-control" value="${escHtml(c.allergies)}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Current Medications</label>
          <input type="text" id="chkMeds" class="form-control" value="${escHtml(c.medications)}" />
        </div>
      </div>

      <!-- Section 3: Vital Signs with Measurement Timestamps -->
      <div class="chk-section">
        <div class="chk-section-header">
          <div class="chk-section-title">3. Observations & Vital Signs (with measurement timestamps)</div>
          <span class="text-muted" style="font-size:0.75rem">Recorded at: ${nowFormatted}</span>
        </div>
        <div class="vitals-grid">
          <div class="vital-card">
            <div class="vital-head"><span>Heart Rate</span><span class="vital-time-tag">${formatTime(c.vitals.hrTime)}</span></div>
            <input type="text" id="chkVitalHr" class="vital-val-input" value="${escHtml(c.vitals.hr)} bpm" />
          </div>
          <div class="vital-card">
            <div class="vital-head"><span>Blood Pressure</span><span class="vital-time-tag">${formatTime(c.vitals.bpTime)}</span></div>
            <input type="text" id="chkVitalBp" class="vital-val-input" value="${escHtml(c.vitals.bp)} mmHg" />
          </div>
          <div class="vital-card">
            <div class="vital-head"><span>SpO2 (Pulse Ox)</span><span class="vital-time-tag">${formatTime(c.vitals.spo2Time)}</span></div>
            <input type="text" id="chkVitalSpo2" class="vital-val-input" value="${escHtml(c.vitals.spo2)}" />
          </div>
          <div class="vital-card">
            <div class="vital-head"><span>Resp Rate</span><span class="vital-time-tag">${formatTime(c.vitals.rrTime)}</span></div>
            <input type="text" id="chkVitalRr" class="vital-val-input" value="${escHtml(c.vitals.rr)} /min" />
          </div>
          <div class="vital-card">
            <div class="vital-head"><span>Temperature</span><span class="vital-time-tag">${formatTime(c.vitals.tempTime)}</span></div>
            <input type="text" id="chkVitalTemp" class="vital-val-input" value="${escHtml(c.vitals.temp)}" />
          </div>
          <div class="vital-card">
            <div class="vital-head"><span>AVPU / GCS</span><span class="vital-time-tag">${nowFormatted}</span></div>
            <input type="text" id="chkVitalGcs" class="vital-val-input" value="GCS ${escHtml(c.vitals.gcs)} (${escHtml(c.vitals.avpu)})" />
          </div>
        </div>
      </div>

      <!-- Section 4: Suspected Injuries & Interventions -->
      <div class="chk-section">
        <div class="chk-section-header">
          <div class="chk-section-title">4. Suspected Clinical Findings & Interventions Performed</div>
        </div>
        <div class="form-group">
          <label class="form-label">Suspected Injuries / Clinical Findings</label>
          <input type="text" id="chkInjuries" class="form-control" value="${escHtml(c.injuries)}" />
        </div>
        <div class="form-group">
          <label class="form-label">Interventions Already Performed (with times)</label>
          <div class="interventions-list" id="chkInterventionsList">
            ${c.interventions.map((it, idx) => `
              <div class="chk-check-item">
                <span>⏱️ <strong>${escHtml(it.time)}</strong>: ${escHtml(it.name)}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- Section 5: Unknown or Unassessed Information -->
      <div class="chk-section">
        <div class="chk-section-header">
          <div class="chk-section-title">5. Unknown or Unassessed Information (Distinguished from Negative Findings)</div>
        </div>
        <div class="unassessed-toggle-card">
          <span>⚠️</span>
          <span>Explicitly distinguish unassessed parameters from negative findings so receiving emergency teams do not assume unassessed parameters are normal.</span>
        </div>
        <div style="margin-top:10px">
          <label class="form-label">Unassessed or Unknown Factors</label>
          <input type="text" id="chkUnassessed" class="form-control" value="${escHtml(c.unassessedItems.join("; "))}" placeholder="e.g. Allergies unassessed due to altered sensorium; Past surgical history unknown" />
        </div>
      </div>

      <!-- Section 6: Ambulance Crew & Doctor Reviews -->
      <div class="chk-section">
        <div class="chk-section-header">
          <div class="chk-section-title">6. Clinician Reviews & Verifications</div>
        </div>
        <div class="review-sign-grid">
          <!-- Crew Review -->
          <div class="review-card confirmed">
            <div class="flex justify-between align-center mb-2">
              <strong>🚑 Ambulance Crew Review</strong>
              <span class="badge badge-green">Mandatory</span>
            </div>
            <div class="form-group">
              <label class="form-label">Reviewer Name</label>
              <input type="text" id="chkCrewName" class="form-control" value="${escHtml(c.crewReview.reviewerName)}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Role</label>
              <input type="text" id="chkCrewRole" class="form-control" value="${escHtml(c.crewReview.role)}" />
            </div>
            <label class="chk-check-item" style="margin-top:10px;background:white">
              <input type="checkbox" id="chkCrewConfirm" checked />
              <span>I confirm that the ambulance crew has reviewed this pre-arrival clinical checklist.</span>
            </label>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:6px">Verified at: ${formatDateTime(c.crewReview.confirmedAt)}</div>
          </div>

          <!-- Doctor Review -->
          <div class="review-card" id="chkDocCard">
            <div class="flex justify-between align-center mb-2">
              <strong>🩺 Doctor/Paramedic Clinician Review</strong>
              <span class="badge badge-blue">Onboard Clinician</span>
            </div>
            <label class="chk-check-item" style="background:white;margin-bottom:10px">
              <input type="checkbox" id="chkDocPresentToggle" onchange="toggleDocReviewFields(this.checked)" ${c.doctorReview.present ? "checked" : ""} />
              <span>Qualified Doctor/Clinician travelling onboard</span>
            </label>
            <div id="chkDocFields" style="display:${c.doctorReview.present ? "block" : "none"}">
              <div class="form-group">
                <label class="form-label">Clinician Name</label>
                <input type="text" id="chkDocName" class="form-control" value="${escHtml(c.doctorReview.doctorName)}" placeholder="Dr. / Clinician Name" />
              </div>
              <div class="form-group">
                <label class="form-label">Qualification / Reg ID</label>
                <input type="text" id="chkDocQual" class="form-control" value="${escHtml(c.doctorReview.qualification)}" placeholder="e.g. MD (Emergency Medicine) / MCI-48291" />
              </div>
              <label class="chk-check-item" style="background:white">
                <input type="checkbox" id="chkDocConfirm" ${c.doctorReview.confirmed ? "checked" : ""} />
                <span>Onboard clinician confirms clinical findings and pre-arrival checklist.</span>
              </label>
            </div>
            <div id="chkDocEmptyNote" style="display:${c.doctorReview.present ? "none" : "block"};font-size:0.8rem;color:var(--text-muted);padding:8px;background:white;border-radius:6px">
              ℹ️ No onboard doctor present. Case will proceed with Ambulance Crew Review and clearly record that no onboard doctor review was recorded.
            </div>
          </div>
        </div>
      </div>

      <!-- Section 7: Final Verification Screen -->
      <div class="final-verification-banner">
        <div class="final-verification-prompt">
          “Please verify: Is all recorded patient information accurate and complete to the best of your knowledge?”
        </div>
        <p style="font-size:0.85rem;color:#4B5563;margin-bottom:12px">
          Linked Ambulance Plate: <strong style="font-family:monospace">${escHtml(c.ambPlate)}</strong> &nbsp;|&nbsp;
          Case ID: <strong>${escHtml(c.id)}</strong> &nbsp;|&nbsp;
          Patient Case Ref: <strong>${escHtml(c.ptRef)}</strong>
        </p>
        <label class="chk-check-item" style="display:inline-flex;background:white;text-align:left;max-width:600px">
          <input type="checkbox" id="chkFinalAccuracyDeclaration" required checked />
          <span><strong>I confirm:</strong> All recorded clinical information, vitals with measurement times, and interventions are verified accurate to the best of our knowledge.</span>
        </label>
      </div>

      <div class="modal-footer" style="padding:16px 0 0;border:none">
        <button type="button" class="btn btn-outline" onclick="returnToEmergencyForm()">← Return & Edit Initial Details</button>
        <button type="button" class="btn btn-primary" onclick="confirmAndSubmitClinicalChecklist()">Confirm & Find Suitable Hospital →</button>
      </div>
    </div>
  `;
}

function toggleDocReviewFields(checked) {
  const fields = document.getElementById("chkDocFields");
  const emptyNote = document.getElementById("chkDocEmptyNote");
  const docCard = document.getElementById("chkDocCard");
  if (fields) fields.style.display = checked ? "block" : "none";
  if (emptyNote) emptyNote.style.display = checked ? "none" : "block";
  if (docCard) {
    docCard.classList.toggle("confirmed", checked);
  }
}

function returnToEmergencyForm() {
  closeModal("modalClinicalChecklist");
  openModal("modalEmergency");
}

function confirmAndSubmitClinicalChecklist() {
  const c = state.pendingChecklistCase;
  if (!c) return;

  const crewConfirmed = document.getElementById("chkCrewConfirm")?.checked;
  const crewName = document.getElementById("chkCrewName")?.value.trim();
  const finalDeclared = document.getElementById("chkFinalAccuracyDeclaration")?.checked;

  if (!crewConfirmed || !crewName) {
    showToast("Ambulance Crew review and reviewer name are required.", "warning");
    return;
  }
  if (!finalDeclared) {
    showToast("Please check the final verification declaration to proceed.", "warning");
    return;
  }

  // Update clinical data from form
  c.symptoms = document.getElementById("chkSymptoms")?.value.trim() || c.symptoms;
  c.priority = document.getElementById("chkPriority")?.value || c.priority;
  c.history = document.getElementById("chkHistory")?.value.trim() || c.history;
  c.allergies = document.getElementById("chkAllergies")?.value.trim() || c.allergies;
  c.medications = document.getElementById("chkMeds")?.value.trim() || c.medications;
  c.injuries = document.getElementById("chkInjuries")?.value.trim() || c.injuries;

  const unassessedStr = document.getElementById("chkUnassessed")?.value.trim() || "";
  c.unassessedItems = unassessedStr ? unassessedStr.split(";").map(s => s.trim()).filter(Boolean) : [];

  c.crewReview.reviewerName = crewName;
  c.crewReview.role = document.getElementById("chkCrewRole")?.value.trim() || "Lead EMT";
  c.crewReview.confirmedAt = now();
  c.crewReview.confirmed = true;

  const docPresent = document.getElementById("chkDocPresentToggle")?.checked;
  if (docPresent) {
    const docName = document.getElementById("chkDocName")?.value.trim() || "Onboard Doctor";
    const docQual = document.getElementById("chkDocQual")?.value.trim() || "Qualified Clinician";
    c.doctorReview = {
      present: true,
      doctorName: docName,
      qualification: docQual,
      confirmedAt: now(),
      confirmed: document.getElementById("chkDocConfirm")?.checked,
      notes: "Doctor clinical checklist review verified"
    };
  } else {
    c.doctorReview = {
      present: false,
      doctorName: "",
      qualification: "",
      confirmedAt: null,
      confirmed: false,
      notes: "No onboard doctor present — case proceeded with Ambulance Crew review only."
    };
  }

  // Generate Condition-Based Preparation Requirements
  c.preparationRequirements = generatePreparationRequirements(c.category, `${c.notes} ${c.injuries}`);

  // Initialize Gate Pass in PENDING state
  c.gatePass = {
    passId: "GP-" + c.id.replace("RESQ-", ""),
    status: "pending",
    issuedAt: now(),
    verifiedAt: null,
    verifiedBy: null
  };

  // Initialize Hospital Readiness
  c.hospitalReadiness = {
    status: "not_started",
    department: null,
    acceptingPerson: null,
    acceptingRole: null,
    confirmedAt: null,
    eta: null,
    etaSource: null,
    conditions: null,
    handoverAck: false,
    reconfirmationNeeded: false,
    reconfirmationReason: null
  };

  c.status = "created";
  c.timeline = [
    { status: "created", time: now(), note: `Case created & Pre-Arrival Clinical Checklist verified by Crew (${c.crewReview.reviewerName}, ${c.crewReview.role})` }
  ];

  if (c.doctorReview.present) {
    c.timeline.push({
      status: "acknowledged",
      time: now(),
      note: `Onboard clinician review confirmed by Dr. ${c.doctorReview.doctorName} (${c.doctorReview.qualification})`
    });
  } else {
    c.timeline.push({
      status: "acknowledged",
      time: now(),
      note: "No onboard doctor review recorded — proceeding with crew verification."
    });
  }

  c.acceptanceRequests = [];
  c.handover = null;

  // Add to cases array
  state.cases.unshift(c);
  state.pendingChecklistCase = null;
  saveState();

  closeModal("modalClinicalChecklist");
  showToast(`Case ${c.id} verified with plate ${c.ambPlate}. Recommending hospitals...`, "success", 4000);
  showRecommendations(c.id);
  renderAmbDashboard();
}

/* ─── HOSPITAL RECOMMENDATION ENGINE ─────────────────── */
function recommendHospitals(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return [];

  const required = CATEGORY_CONFIG[c.category]?.requires || [];

  return DEMO_HOSPITALS.map(h => {
    let score = 0;
    let reasons = [];
    let warnings = [];

    // Capability match
    const matches = required.filter(r => h.capabilities.includes(r));
    if (required.length === 0) {
      score += 30;
      reasons.push("General capability suitable for this emergency type");
    } else if (matches.length === required.length) {
      score += 50;
      reasons.push(`Has required capabilities: ${matches.map(m=>m).join(", ")}`);
    } else if (matches.length > 0) {
      score += 25;
      reasons.push(`Has partial capability match (${matches.length}/${required.length})`);
      warnings.push("Some required capabilities may not be available at this hospital");
    } else {
      score += 0;
      warnings.push("⚠️ This hospital may not have the required specialist capabilities for this emergency");
    }

    // Availability
    if (h.edStatus === "available") { score += 20; reasons.push("ED reported as available"); }
    else if (h.edStatus === "limited") { score += 8; warnings.push("ED is reporting limited capacity"); }
    else { score -= 10; warnings.push("ED reported as not available"); }

    // Distance (if coords available)
    let distKm = null;
    let etaMin = null;
    if (c.coords && h.lat && h.lng) {
      distKm = haversineKm(c.coords.lat, c.coords.lng, h.lat, h.lng);
      etaMin = Math.round(distKm * 2.5 + 3); // rough estimate
      // Penalise very far hospitals
      if (distKm < 5)  score += 20;
      else if (distKm < 15) score += 12;
      else if (distKm < 30) score += 5;
    } else {
      // No coords: use demo position in list
      const idx = DEMO_HOSPITALS.indexOf(h);
      score += Math.max(0, 15 - idx * 3);
    }

    // Specialty bonus
    if (c.category === "cardiac" && h.hasCathLab) { score += 15; reasons.push("Catheterisation lab available"); }
    if (c.category === "stroke"  && h.hasStrokeUnit){ score += 15; reasons.push("Dedicated stroke unit"); }
    if (c.category === "trauma"  && h.hasTraumaBay){ score += 15; reasons.push("Trauma bay available"); }
    if (c.category === "burns"   && h.hasBurns)   { score += 20; reasons.push("Specialist burns unit"); }
    if (c.category === "paediatric" && h.hasPaeds){ score += 15; reasons.push("Paediatric capability"); }
    if (c.category === "obstetric"  && h.hasObs)  { score += 15; reasons.push("Obstetric capability"); }

    return { hospital: h, score, reasons, warnings, distKm, etaMin };
  })
  .sort((a, b) => b.score - a.score);
}

function showRecommendations(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;
  // Simplified UI: show the recommendations table on the Ambulance Dashboard
  if (document.getElementById("quickRecsCard")) {
    showPage("ambulance");
    renderQuickRecs(caseId);
    return;
  }

  const recs = recommendHospitals(caseId);
  const top3 = recs.slice(0, 3);

  // Context bar
  document.getElementById("caseContext").innerHTML = `
    <span><strong>Case:</strong> ${escHtml(c.id)}</span>
    <span><strong>Type:</strong> ${categoryIcon(c.category)} ${escHtml(c.categoryLabel)}</span>
    <span><strong>Priority:</strong> ${escHtml(c.priority)}</span>
    <span><strong>Location:</strong> ${escHtml(c.location)}</span>
  `;

  let html = "";
  if (top3.length === 0) {
    html = `<div class="info-banner info-amber"><span>⚠️</span><span>No hospitals found matching your criteria. Please contact dispatch or choose a hospital manually.</span></div>`;
  }

  top3.forEach((rec, idx) => {
    const h = rec.hospital;
    const isTop = idx === 0;
    const distStr = rec.distKm ? `${rec.distKm.toFixed(1)} km*` : "Distance N/A (no GPS)";
    const etaStr  = rec.etaMin ? `~${rec.etaMin} min*` : "—";

    const capTags = h.capabilities.map(c => `<span class="cap-tag">${c}</span>`).join("");
    const reasonsHtml = rec.reasons.map(r => `• ${escHtml(r)}`).join("<br>");
    const warningsHtml = rec.warnings.length
      ? `<div class="rec-warning">⚠️ ${rec.warnings.map(escHtml).join("<br>⚠️ ")}</div>` : "";

    html += `
      <div class="rec-card ${isTop ? "rec-top" : ""}">
        <div class="rec-card-header">
          <div class="rec-rank rank-${idx+1}">${idx+1}</div>
          <div>
            <div class="rec-hosp-name">${escHtml(h.name)}</div>
            <div class="rec-hosp-addr">📍 ${escHtml(h.address)}</div>
          </div>
          ${isTop ? '<span class="badge badge-amber">Recommended</span>' : ''}
        </div>
        <div class="rec-card-body">
          <div class="rec-stats">
            <div class="rec-stat">
              <span class="rec-stat-label">Distance*</span>
              <span class="rec-stat-value">${distStr}</span>
            </div>
            <div class="rec-stat">
              <span class="rec-stat-label">Est. Travel*</span>
              <span class="rec-stat-value">${etaStr}</span>
            </div>
            <div class="rec-stat">
              <span class="rec-stat-label">ED Status</span>
              <span class="rec-stat-value">${escHtml(h.edStatus.toUpperCase())} <span class="text-muted" style="font-size:0.7em">(${escHtml(h.lastUpdated)})</span></span>
            </div>
            ${h.availableBeds != null ? `<div class="rec-stat">
              <span class="rec-stat-label">Available Beds</span>
              <span class="rec-stat-value">🛏️ ${h.availableBeds} / ${h.totalBeds}</span>
            </div>` : ""}
            <div class="rec-stat">
              <span class="rec-stat-label">Match Score</span>
              <span class="rec-stat-value">${rec.score}/100</span>
            </div>
          </div>
          <div class="capability-tags">${capTags}</div>
          <div class="rec-why">✅ ${reasonsHtml}</div>
          ${warningsHtml}
          ${rec.distKm ? `<p style="font-size:0.7rem;color:var(--text-muted)">* Straight-line distance and rough estimate only. Not live traffic. Open in Maps for navigation.</p>` : ""}
        </div>
        <div class="rec-card-footer">
          <button class="btn btn-primary" onclick="selectHospital('${escHtml(caseId)}', '${escHtml(h.id)}')">Select This Hospital</button>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.address)}" target="_blank" rel="noopener" class="btn btn-outline">🗺️ Maps</a>
          <button class="btn btn-outline btn-small" onclick="viewHospitalDetail('${escHtml(h.id)}')">Details</button>
        </div>
      </div>
    `;
  });

  document.getElementById("recommendationsList").innerHTML = html;
  openModal("modalHospitals");
}

function selectHospital(caseId, hospId) {
  const c = state.cases.find(x => x.id === caseId);
  const h = DEMO_HOSPITALS.find(x => x.id === hospId);
  if (!c || !h) return;
  if (h.availableBeds === 0) {
    showToast(`${h.name} has no available beds. Please choose another hospital.`, "warning", 5000);
    return;
  }

  c.shared = true; // sync this case through the shared database
  c.selectedHospitalId = hospId;
  addTimeline(caseId, "requested", `Acceptance requested from ${h.name}`);
  updateStatus(caseId, "requested");

  // Create acceptance request record
  const reqId = "REQ-" + Date.now();
  c.acceptanceRequests.push({
    id:        reqId,
    hospId,
    hospName:  h.name,
    sentAt:    now(),
    status:    "pending",
    response:  null,
    respondedAt: null,
    respondedBy: null,
    declineReason: null
  });

  saveState();
  closeModal("modalHospitals");
  hideQuickRecs();
  showToast(`Request sent to ${h.name}. Status: Pending — waiting for the hospital.`, "info", 5000);
  renderAmbDashboard();
  refreshCurrentPage();
}

/* ─── CASE STATUS HELPERS ────────────────────────────── */
function updateStatus(caseId, status, note) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;
  c.status = status;
  if (note) addTimeline(caseId, status, note);
  saveState();
}

function addTimeline(caseId, status, note) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;
  c.timeline.push({ status, time: now(), note: note || "" });
  saveState();
}

/* ─── AMBULANCE DASHBOARD ────────────────────────────── */
/* ─── SIMPLE STATUS LABELS (Pending / Accepted / Bed Allocated / Rejected / Cancelled) ── */
function reqStatusInfo(req) {
  if (!req) return { label: "Not sent", cls: "st-none" };
  if (req.status === "accepted" && req.bedAllocated) return { label: "Bed Allocated", cls: "st-allocated" };
  if (req.status === "accepted") return { label: "Accepted", cls: "st-accepted" };
  if (req.status === "declined") return { label: "Rejected", cls: "st-rejected" };
  if (req.status === "cancelled") return { label: "Cancelled", cls: "st-cancelled" };
  if (req.status === "acknowledged") return { label: "Pending (info requested)", cls: "st-pending" };
  return { label: "Pending", cls: "st-pending" };
}
function statusPill(req) {
  const s = reqStatusInfo(req);
  return `<span class="st ${s.cls}">${escHtml(s.label)}</span>`;
}

const SPECIALTY_NEEDED = {
  cardiac: "Cardiology", stroke: "Neurology / Stroke", trauma: "Trauma surgery", fracture: "Orthopaedics / Trauma",
  respiratory: "General emergency", obstetric: "Obstetrics", paediatric: "Paediatrics", burns: "Burns unit",
  poisoning: "Toxicology", medical: "General emergency", other: "General emergency"
};

/* ─── AMBULANCE DASHBOARD ────────────────────────────── */
function renderAmbDashboard() {
  renderLiveBeds();
  renderAmbRequests();
  const plate = document.getElementById("qPlate");
  if (plate && !plate.value && document.activeElement !== plate) plate.value = state.settings.ambPlate || "";
}

function renderAmbRequests() {
  const el = document.getElementById("ambRequestsTable");
  if (!el) return;
  const rows = state.cases.filter(c => c.acceptanceRequests?.length || ["created", "recommended"].includes(c.status)).slice(0, 8);
  if (!rows.length) {
    el.innerHTML = `<p class="empty-state">No requests yet. Fill in the form above to start.</p>`;
    return;
  }
  el.innerHTML = `
    <table class="simple-table">
      <thead><tr><th>Case</th><th>Ambulance</th><th>Emergency</th><th>Hospital</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${rows.map(c => {
        const req = c.acceptanceRequests?.slice(-1)[0];
        const h = req ? DEMO_HOSPITALS.find(x => x.id === req.hospId) : null;
        const sample = c.shared ? "" : ` <span class="tag-sim">sample</span>`;
        return `<tr>
          <td><a href="#" onclick="viewCaseDetail('${escHtml(c.id)}');return false;">${escHtml(c.id)}</a>${sample}</td>
          <td>${escHtml(c.ambPlate || c.ambId || "—")}</td>
          <td>${categoryIcon(c.category)} ${escHtml(c.categoryLabel || "")}</td>
          <td>${escHtml(h?.name || req?.hospName || "—")}</td>
          <td>${req ? statusPill(req) : `<span class="st st-none">Choose hospital</span>`}</td>
          <td class="actions">${buildStatusActions(c)}</td>
        </tr>`;
      }).join("")}</tbody>
    </table>`;
}

/* Bed availability table (ambulance dashboard) */
function renderLiveBeds() {
  const el = document.getElementById("liveBedsList");
  const st = document.getElementById("liveBedsStatus");
  if (!el) return;
  if (!window.ResQDB?.connected) {
    if (st) st.textContent = "Database not connected (config.js)";
    el.innerHTML = `<p class="empty-state">Live bed data unavailable.</p>`;
    return;
  }
  const list = DEMO_HOSPITALS.filter(h => h.availableBeds != null);
  if (!list.length) return;
  if (st) st.innerHTML = `<span class="status-dot green"></span> Live · refreshes every 3 s · simulated data`;
  el.innerHTML = `
    <table class="simple-table">
      <thead><tr><th>Hospital</th><th>Location</th><th>Specialties</th><th class="num">Available Beds</th></tr></thead>
      <tbody>${list.map(h => `
        <tr>
          <td><a href="#" onclick="viewHospitalDetail('${escHtml(h.id)}');return false;">${escHtml(h.name)}</a></td>
          <td>${escHtml(h.address || "—")}</td>
          <td class="muted-cell">${escHtml((h.specialties || []).join(", "))}</td>
          <td class="num">${bedsPill(h)}</td>
        </tr>`).join("")}</tbody>
    </table>`;
}

function bedsPill(h) {
  if (h.availableBeds == null) return "—";
  const cls = h.availableBeds === 0 ? "beds-none" : h.availableBeds <= 3 ? "beds-low" : "beds-ok";
  return `<span class="beds ${cls}">${h.availableBeds} / ${h.totalBeds}</span>`;
}

/* ─── QUICK EMERGENCY REQUEST (simple form) ──────────── */
let quickCoords = null;

function pickQuickArea(val) {
  if (!val) return;
  const [ll, name] = val.split("|");
  const [lat, lng] = ll.split(",").map(Number);
  quickCoords = { lat, lng };
  const loc = document.getElementById("qLocation");
  if (!loc.value.trim()) loc.value = name;
  document.getElementById("qLocationStatus").textContent = `Distance will be estimated from ${name}.`;
}

function getQuickLocation() {
  const st = document.getElementById("qLocationStatus");
  if (!navigator.geolocation) { st.textContent = "GPS not available in this browser."; return; }
  st.textContent = "Getting GPS location…";
  navigator.geolocation.getCurrentPosition(
    pos => {
      quickCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      const loc = document.getElementById("qLocation");
      if (!loc.value.trim()) loc.value = `GPS ${quickCoords.lat.toFixed(4)}, ${quickCoords.lng.toFixed(4)}`;
      st.textContent = "✓ GPS location captured.";
    },
    () => { st.textContent = "Could not get GPS. Pick a nearby area instead."; },
    { timeout: 8000 }
  );
}

function submitQuickEmergency(e) {
  e.preventDefault();
  const plate = normalizePlate(document.getElementById("qPlate").value);
  const category = document.getElementById("qCategory").value;
  const location = document.getElementById("qLocation").value.trim();
  if (!plate || !category || !location) { showToast("Please fill in ambulance number, emergency type and location.", "warning"); return; }

  const priority = document.getElementById("qCondition").value;
  const notes = document.getElementById("qNotes").value.trim();
  const conditionText = { critical: "Critical", urgent: "Serious", standard: "Stable" }[priority];
  state.settings.ambPlate = plate;

  const c = {
    id: generateCaseId(), ambPlate: plate, ptRef: generatePatientRef(),
    category, categoryLabel: categoryLabel(category),
    location, coords: quickCoords ? { ...quickCoords } : null,
    age: document.getElementById("qAge").value.trim() || "Not recorded",
    notes, priority, condition: conditionText,
    symptoms: `${conditionText} condition${notes ? " — " + notes : ""}`,
    ambId: state.settings.ambId || "AMB-001", crew: state.settings.crewName || "Ambulance crew", org: state.settings.org || "",
    vitals: null, history: "Not recorded", allergies: "Not recorded", medications: "Not recorded",
    injuries: "Not recorded", interventions: [], unassessedItems: [],
    crewReview: { reviewerName: state.settings.crewName || "Ambulance crew", role: "Ambulance crew", confirmedAt: now(), confirmed: true, notes: "Quick request form" },
    doctorReview: { present: false, doctorName: "", qualification: "", confirmedAt: null, confirmed: false, notes: "" }
  };
  finalizeNewCase(c, `Case created via quick request form (condition: ${conditionText}).`);
  state.cases.unshift(c);
  saveState();

  document.getElementById("quickEmergencyForm").reset();
  document.getElementById("qPlate").value = plate;
  document.getElementById("qLocationStatus").textContent = "";
  quickCoords = null;
  renderAmbDashboard();
  renderQuickRecs(c.id);
}

function renderQuickRecs(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  const card = document.getElementById("quickRecsCard");
  if (!c || !card) return;
  const need = SPECIALTY_NEEDED[c.category] || "General emergency";
  document.getElementById("quickRecsContext").innerHTML =
    `Case <strong>${escHtml(c.id)}</strong> · ${escHtml(c.categoryLabel)} · ${escHtml(c.condition || c.priority || "")} · Required specialty: <strong>${escHtml(need)}</strong>`;

  // When the pickup location is known, hide hospitals more than 100 km away
  const recs = recommendHospitals(caseId).filter(r => r.distKm == null || r.distKm <= 100).slice(0, 5);
  document.getElementById("quickRecsTable").innerHTML = `
    <thead><tr><th>Hospital</th><th>Specialty match</th><th class="num">Distance</th><th class="num">Est. travel</th><th class="num">Available Beds</th><th></th></tr></thead>
    <tbody>${recs.map((r, i) => {
      const h = r.hospital;
      const required = CATEGORY_CONFIG[c.category]?.requires || [];
      const match = required.length === 0 || required.some(x => h.capabilities.includes(x));
      const full = h.availableBeds === 0;
      return `<tr class="${i === 0 ? "row-best" : ""}">
        <td><strong>${escHtml(h.name)}</strong>${i === 0 ? ` <span class="tag-best">Best match</span>` : ""}<div class="muted-cell">${escHtml(h.address || "")}</div></td>
        <td>${match ? `<span class="ok">✓ ${escHtml(need)}</span>` : `<span class="warn">✗ Not listed</span>`}</td>
        <td class="num">${r.distKm != null ? r.distKm.toFixed(1) + " km" : "—"}</td>
        <td class="num">${r.etaMin != null ? "~" + r.etaMin + " min" : "—"}</td>
        <td class="num">${bedsPill(h)}</td>
        <td class="actions">${full ? `<span class="muted-cell">No beds</span>` :
          `<button class="btn btn-primary btn-small" onclick="selectHospital('${escHtml(caseId)}','${escHtml(h.id)}')">Request Bed</button>`}</td>
      </tr>`;
    }).join("")}</tbody>`;
  if (!c.coords) document.getElementById("quickRecsContext").innerHTML += `<br><span class="muted-cell">Tip: pick a nearby area or use GPS to see distance and travel time.</span>`;
  card.style.display = "block";
  card.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideQuickRecs() {
  const card = document.getElementById("quickRecsCard");
  if (card) card.style.display = "none";
}

/* Shared case setup used by both the quick form and the detailed clinical checklist */
function finalizeNewCase(c, note) {
  c.preparationRequirements = generatePreparationRequirements(c.category, `${c.notes || ""} ${c.injuries || ""}`);
  c.gatePass = { passId: "GP-" + c.id.replace("RESQ-", ""), status: "pending", issuedAt: now(), verifiedAt: null, verifiedBy: null };
  c.hospitalReadiness = {
    status: "not_started", department: null, acceptingPerson: null, acceptingRole: null, confirmedAt: null,
    eta: null, etaSource: null, conditions: null, handoverAck: false, reconfirmationNeeded: false, reconfirmationReason: null
  };
  c.status = "created";
  c.timeline = [{ status: "created", time: now(), note }];
  c.acceptanceRequests = [];
  c.handover = null;
}

function buildStatusActions(c) {
  const btns = [];
  if (["created","recommended"].includes(c.status)) {
    btns.push(`<button class="btn btn-primary btn-small" onclick="showRecommendations('${c.id}')">Find Hospital</button>`);
  }
  if (c.status === "accepted") {
    btns.push(`<button class="btn btn-success btn-small" onclick="markEnRoute('${c.id}')">🚗 Mark En Route</button>`);
  }
  if (c.status === "enroute") {
    btns.push(`<button class="btn btn-success btn-small" onclick="markArrived('${c.id}')">📍 Mark Arrived</button>`);
  }
  if (c.shared && window.ResQDB?.connected && ["requested","acknowledged","accepted","enroute"].includes(c.status)) {
    btns.push(`<button class="btn btn-danger btn-small" onclick="cancelSharedCase('${c.id}')">✕ Cancel Case</button>`);
  }
  if (c.status === "arrived") {
    btns.push(`<button class="btn btn-primary btn-small" onclick="openHandover('${c.id}')">📋 Start Handover</button>`);
  }
  if (["declined", "alternative"].includes(c.status)) {
    btns.push(`<button class="btn btn-primary btn-small" onclick="showRecommendations('${c.id}')">Choose Another Hospital</button>`);
  }
  btns.push(`<button class="btn btn-outline btn-small" onclick="viewCaseDetail('${c.id}')">Details</button>`);
  return btns.join("");
}

function buildCaseCard(c) {
  const timeAgo = c.timeline[0]?.time ? formatDateTime(c.timeline[0].time) : "";
  const req = c.acceptanceRequests.slice(-1)[0];
  const h = c.selectedHospitalId ? DEMO_HOSPITALS.find(x=>x.id===c.selectedHospitalId) : null;
  return `
    <div class="case-card" onclick="viewCaseDetail('${c.id}')">
      <div class="case-card-icon">${categoryIcon(c.category)}</div>
      <div class="case-card-body">
        <div class="case-card-title">
          <strong>${escHtml(c.id)}</strong>
          ${statusBadge(c.status)}
          ${req && req.status === "accepted" ? '<span class="badge badge-green">✓ Hospital Accepted</span>' : ""}
        </div>
        <div class="case-card-meta">
          <span>${escHtml(c.categoryLabel)}</span>
          <span>📍 ${escHtml(c.location)}</span>
          ${h ? `<span>🏥 ${escHtml(h.name)}</span>` : ""}
          <span>🕐 ${timeAgo}</span>
        </div>
      </div>
    </div>
  `;
}

/* ─── CASE DETAIL MODAL ──────────────────────────────── */
function viewCaseDetail(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;

  const h = c.selectedHospitalId ? DEMO_HOSPITALS.find(x=>x.id===c.selectedHospitalId) : null;
  const req = c.acceptanceRequests.slice(-1)[0];

  document.getElementById("caseDetailTitle").textContent = `Case ${c.id}`;

  let html = `
    <div class="case-detail-section">
      <h3>Case Summary</h3>
      <div class="detail-grid">
        <div class="detail-item"><span class="detail-label">Case ID</span><span class="detail-value">${escHtml(c.id)}</span></div>
        <div class="detail-item"><span class="detail-label">Status</span><span class="detail-value">${statusBadge(c.status)}</span></div>
        <div class="detail-item"><span class="detail-label">Emergency Type</span><span class="detail-value">${categoryIcon(c.category)} ${escHtml(c.categoryLabel)}</span></div>
        <div class="detail-item"><span class="detail-label">Priority</span><span class="detail-value">${escHtml(c.priority?.toUpperCase() || "—")}</span></div>
        <div class="detail-item"><span class="detail-label">Location</span><span class="detail-value">${escHtml(c.location)}</span></div>
        <div class="detail-item"><span class="detail-label">Patient Age</span><span class="detail-value">${escHtml(c.age || "Not recorded")}</span></div>
        <div class="detail-item"><span class="detail-label">Ambulance</span><span class="detail-value">${escHtml(c.ambId)}</span></div>
        <div class="detail-item"><span class="detail-label">Crew</span><span class="detail-value">${escHtml(c.crew || "—")}</span></div>
        <div class="detail-item" style="grid-column:1/-1"><span class="detail-label">Notes / Observations</span><span class="detail-value">${escHtml(c.notes || "None recorded")}</span></div>
      </div>
    </div>

    ${h ? `
    <div class="case-detail-section">
      <h3>Selected Hospital</h3>
      <div class="detail-grid">
        <div class="detail-item"><span class="detail-label">Hospital</span><span class="detail-value">${escHtml(h.name)}</span></div>
        <div class="detail-item"><span class="detail-label">Address</span><span class="detail-value">${escHtml(h.address)}</span></div>
        ${req ? `
        <div class="detail-item"><span class="detail-label">Request Sent</span><span class="detail-value">${formatDateTime(req.sentAt)}</span></div>
        <div class="detail-item"><span class="detail-label">Hospital Response</span><span class="detail-value">${statusBadge(req.status)} <span class="badge-demo">DEMO</span></span></div>
        ${req.respondedBy ? `<div class="detail-item"><span class="detail-label">Responded By</span><span class="detail-value">${escHtml(req.respondedBy)}</span></div>` : ""}
        ${req.declineReason ? `<div class="detail-item"><span class="detail-label">Decline Reason</span><span class="detail-value text-red">${escHtml(req.declineReason)}</span></div>` : ""}
        ${req.responseNote ? `<div class="detail-item" style="grid-column:1/-1"><span class="detail-label">Hospital Notes</span><span class="detail-value">${escHtml(req.responseNote)}</span></div>` : ""}
        ` : ""}
      </div>
      <div class="flex-gap" style="margin-top:10px">
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.address)}" target="_blank" rel="noopener" class="btn btn-outline btn-small">🗺️ Open in Google Maps</a>
      </div>
    </div>
    ` : ""}

    ${c.handover ? `
    <div class="case-detail-section">
      <h3>Handover Record</h3>
      <div class="detail-grid">
        <div class="detail-item"><span class="detail-label">Arrival Time</span><span class="detail-value">${formatDateTime(c.handover.arrivalTime)}</span></div>
        <div class="detail-item"><span class="detail-label">Handover Time</span><span class="detail-value">${formatDateTime(c.handover.handoverTime)}</span></div>
        <div class="detail-item"><span class="detail-label">Received By</span><span class="detail-value">${escHtml(c.handover.receivedBy || "—")}</span></div>
        <div class="detail-item" style="grid-column:1/-1"><span class="detail-label">Handover Summary</span><span class="detail-value">${escHtml(c.handover.summary || "—")}</span></div>
      </div>
    </div>
    ` : ""}

    <div class="case-detail-section">
      <h3>Case Timeline</h3>
      <div class="timeline">
        ${c.timeline.slice().reverse().map(t => `
          <div class="timeline-item">
            <div class="timeline-dot ${dotColor(t.status)}"></div>
            <div class="timeline-content">
              <div class="timeline-status">${statusLabel(t.status)}</div>
              <div class="timeline-time">${formatDateTime(t.time)}</div>
              ${t.note ? `<div class="timeline-note">${escHtml(t.note)}</div>` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="status-actions">
      ${buildStatusActions(c)}
      <button class="btn btn-outline btn-small" onclick="closeModal('modalCaseDetail');showPage('passport');setTimeout(()=>{document.getElementById('passportCaseSelect').value='${c.id}';renderPassport()},100)">📄 View Passport</button>
    </div>
  `;

  document.getElementById("caseDetailBody").innerHTML = html;
  openModal("modalCaseDetail");
}

function dotColor(status) {
  if (["accepted","arrived","complete","closed"].includes(status)) return "green";
  if (["declined","cancelled"].includes(status)) return "red";
  if (["requested","pending","handover"].includes(status)) return "amber";
  return "";
}

function statusLabel(status) {
  const labels = {
    created:"Case Created", recommended:"Hospital Recommended",
    requested:"Acceptance Requested", pending:"Awaiting Response",
    acknowledged:"Hospital Acknowledged", accepted:"Hospital Accepted",
    declined:"Hospital Declined", alternative:"Alternative Required",
    enroute:"En Route", arrived:"Arrived at Hospital",
    handover:"Handover In Progress", complete:"Handover Complete",
    closed:"Case Closed", cancelled:"Cancelled"
  };
  return labels[status] || status;
}

function markEnRoute(caseId) {
  updateStatus(caseId, "enroute", "Ambulance en route to hospital");
  saveState(); renderAmbDashboard(); closeModal("modalCaseDetail");
  showToast("Status updated: En Route", "success");
}

function markArrived(caseId) {
  updateStatus(caseId, "arrived", "Ambulance arrived at hospital");
  saveState(); renderAmbDashboard(); closeModal("modalCaseDetail");
  showToast("Status updated: Arrived", "success");
}

/* ─── RESQ NO-REPETITION HANDOVER ────────────────────── */
function openHandover(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;

  const body = document.getElementById("handoverBody");
  if (!body) return;

  const gp = getGatePassStatus(c);
  const readiness = c.hospitalReadiness || {};
  const chk = c.clinicalChecklist || {};
  const v = c.vitals || {};
  const doc = c.docReview || null;
  const crewRev = c.crewReview || null;
  const handoverData = c.handover || {};
  const infoReceived = !!handoverData.infoReceivedAt;
  const careTransferred = !!handoverData.careTransferredAt;

  // Format vitals with timestamps
  const vitalsText = `
    HR: <strong>${escHtml(v.hr || "—")}</strong> bpm (${formatTime(v.hrTime || c.timeline[0]?.time)}) | 
    BP: <strong>${escHtml(v.bp || "—")}</strong> (${formatTime(v.bpTime || c.timeline[0]?.time)}) | 
    SpO2: <strong>${escHtml(v.spo2 || "—")}</strong>% (${formatTime(v.spo2Time || c.timeline[0]?.time)}) | 
    RR: <strong>${escHtml(v.rr || "—")}</strong>/min | 
    GCS: <strong>${escHtml(v.gcs || "—")}</strong> | 
    Temp: <strong>${escHtml(v.temp || "—")}</strong>°C
  `;

  // Condition changes in transit
  const condChanges = c.conditionChanges || [];
  const condChangesHtml = condChanges.length > 0 ? condChanges.map(cc => `
    <div style="background:#FFFBEB;border:1px solid #F59E0B;border-radius:4px;padding:6px 10px;margin-bottom:6px;font-size:0.8rem">
      <strong>⚠️ Transmitted at ${formatTime(cc.time)}:</strong> ${escHtml(cc.notes)}
      ${cc.bp ? ` | Updated BP: ${escHtml(cc.bp)}` : ""}
      ${cc.hr ? ` | Updated HR: ${escHtml(cc.hr)}` : ""}
      ${cc.inter ? ` | In-Transit Intervention: ${escHtml(cc.inter)}` : ""}
    </div>
  `).join("") : `<span class="text-muted" style="font-size:0.8rem">No condition changes recorded in transit. Patient remained stable.</span>`;

  // Interventions summary
  const inters = c.interventions || [];
  const intersHtml = inters.length > 0 ? inters.map(i => `
    <span class="prep-status-badge tag-confirmed" style="margin-right:6px">✓ ${escHtml(i.name)} (${escHtml(i.time)})</span>
  `).join("") : `<span class="text-muted" style="font-size:0.8rem">No field interventions performed.</span>`;

  // Amendments log
  const amendments = c.handoverAmendments || [];
  const amendmentsHtml = amendments.length > 0 ? amendments.map(a => `
    <div style="background:#F1F5F9;border-left:3px solid var(--blue);padding:6px 10px;margin-bottom:6px;font-size:0.8rem">
      <strong>${escHtml(a.author)} (${escHtml(a.role)}) at ${formatTime(a.time)}:</strong> ${escHtml(a.text)}
    </div>
  `).join("") : `<span class="text-muted" style="font-size:0.8rem">No amendments recorded. Original entries intact.</span>`;

  body.innerHTML = `
    <div class="handover-case-header">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <span class="plate-badge" style="font-size:1.1rem;padding:4px 12px"><span class="plate-badge-ind">IND</span>${escHtml(c.ambPlate || c.ambId)}</span>
        <div>
          <strong style="font-size:1.05rem;color:var(--navy)">Case ${escHtml(c.id)}</strong>
          <div style="font-size:0.75rem;color:var(--text-muted)">Patient Ref: <strong>${escHtml(c.ptRef || "—")}</strong> &nbsp;|&nbsp; Category: <strong>${categoryIcon(c.category)} ${escHtml(c.categoryLabel)}</strong></div>
        </div>
      </div>
      <div style="text-align:right">
        <span class="gate-pass-status-pill ${gp.class}">${gp.icon} ${gp.label}</span>
      </div>
    </div>

    <div class="info-banner info-blue" style="margin-bottom:14px">
      <span>ℹ️</span>
      <span><strong>No-Repetition Clinical Handover:</strong> Uses identical clinical information captured and verified in the ambulance. The receiving hospital receives this without asking the crew to re-enter data. (DEMO)</span>
    </div>

    <!-- 1. STRUCTURED CLINICAL HANDOVER SUMMARY -->
    <div class="chk-section">
      <div class="chk-section-header">
        <div class="chk-section-title">1. Structured Clinical Handover Summary (From Ambulance Verification)</div>
        <span class="badge-demo">VERIFIED ONBOARD</span>
      </div>

      <div class="detail-grid" style="margin-bottom:10px">
        <div class="detail-item" style="grid-column:1/-1">
          <span class="detail-label">Presenting Complaint & Observations</span>
          <span class="detail-value">${escHtml(c.notes || "Emergency call")}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Patient History</span>
          <span class="detail-value">${escHtml(chk.history || "No previous history reported")}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Known Allergies</span>
          <span class="detail-value" style="color:${chk.allergies ? 'var(--red)' : 'inherit'}">${escHtml(chk.allergies || "No known drug allergies reported")}</span>
        </div>
      </div>

      <div style="background:#F8FAFC;border:1px solid var(--border);border-radius:6px;padding:10px;margin-bottom:10px">
        <div class="detail-label" style="margin-bottom:4px">Recorded Observations & Vitals (with timestamps)</div>
        <div style="font-size:0.85rem">${vitalsText}</div>
      </div>

      <div style="margin-bottom:10px">
        <div class="detail-label" style="margin-bottom:4px">Suspected Injuries / Clinical Findings</div>
        <div style="font-size:0.85rem;color:var(--navy);font-weight:600">${escHtml(c.injuries || "None recorded")}</div>
      </div>

      <div style="margin-bottom:10px">
        <div class="detail-label" style="margin-bottom:4px">Interventions Administered Prior to Handover</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">${intersHtml}</div>
      </div>

      <div style="margin-bottom:10px">
        <div class="detail-label" style="margin-bottom:4px">In-Transit Condition Trajectory / Changes</div>
        <div style="margin-top:4px">${condChangesHtml}</div>
      </div>

      <div class="detail-grid" style="background:#F8FAFC;padding:10px;border-radius:6px;border:1px solid var(--border)">
        <div class="detail-item">
          <span class="detail-label">Ambulance Crew Review</span>
          <span class="detail-value">
            ${crewRev ? `✅ Confirmed by ${escHtml(crewRev.reviewer)} (${escHtml(crewRev.role)}) at ${formatTime(crewRev.time)}` : `<span class="text-amber">Pending crew sign-off</span>`}
          </span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Doctor / Paramedic Onboard Review</span>
          <span class="detail-value">
            ${doc ? `✅ Confirmed by Dr. ${escHtml(doc.docName)} (${escHtml(doc.docReg)}) at ${formatTime(doc.docTime)}` : `<span class="text-muted">No onboard clinician present (Paramedic crew transfer)</span>`}
          </span>
        </div>
        <div class="detail-item" style="grid-column:1/-1">
          <span class="detail-label">Hospital Readiness & Receiving Bay</span>
          <span class="detail-value">
            ${readiness.status ? `Status: <strong>${escHtml(readiness.status.toUpperCase())}</strong> | Bay: <strong>${escHtml(readiness.department || "Resus 1")}</strong> | Accepted by: <strong>${escHtml(readiness.acceptingPerson || "ED Lead")}</strong>` : "Readiness not yet confirmed"}
          </span>
        </div>
      </div>
    </div>

    <!-- 2. CLINICAL AMENDMENTS & CORRECTIONS (Audit-trail, non-destructive) -->
    <div class="chk-section">
      <div class="chk-section-header">
        <div class="chk-section-title">2. Handover Clarifications & Corrections (Audit Trail)</div>
        <button type="button" class="btn btn-outline btn-small" onclick="toggleHandoverAmendmentForm('${escHtml(caseId)}')">+ Add Clarification / Flag Missing Info</button>
      </div>
      <div id="handoverAmendmentsContainer" style="margin-top:8px">${amendmentsHtml}</div>
      <div id="handoverAmendmentForm_${escHtml(caseId)}" style="display:none;margin-top:10px;background:#F8FAFC;border:1px solid var(--border);border-radius:6px;padding:10px">
        <div class="form-group">
          <label class="form-label required">Author Name & Professional Role</label>
          <input type="text" id="hdrAmendAuthor" class="form-control" placeholder="e.g. Dr. K. Patel, Receiving ED Registrar" value="Dr. K. Patel (ED Registrar)" />
        </div>
        <div class="form-group">
          <label class="form-label required">Clarification / Missing Information Note</label>
          <textarea id="hdrAmendText" class="form-control" rows="2" placeholder="e.g. Clarified: Patient last oral intake 14:00; No known allergies confirmed with spouse."></textarea>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px">
          <button type="button" class="btn btn-outline btn-small" onclick="toggleHandoverAmendmentForm('${escHtml(caseId)}')">Cancel</button>
          <button type="button" class="btn btn-primary btn-small" onclick="saveHandoverAmendment('${escHtml(caseId)}')">Save Amendment to Audit Trail</button>
        </div>
      </div>
    </div>

    <!-- 3. TWO-STAGE TRANSFER OF CARE -->
    <div class="handover-stages-grid">
      <!-- Stage 1: Handover Information Received -->
      <div class="handover-stage-card ${infoReceived ? 'stage-completed' : ''}">
        <div class="handover-stage-header">
          <div class="handover-stage-title">Stage 1: Handover Information Received</div>
          <span class="badge ${infoReceived ? 'badge-green' : 'badge-amber'}">${infoReceived ? '✅ ACKNOWLEDGED' : 'PENDING'}</span>
        </div>
        <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:10px">
          Crew confirms handed over data is accurate; receiving clinician acknowledges receipt of clinical summary.
        </p>

        ${infoReceived ? `
          <div style="background:#ECFDF5;border:1px solid #10B981;border-radius:6px;padding:10px;font-size:0.8rem">
            <div><strong>Acknowledged by:</strong> ${escHtml(handoverData.infoReceivedBy)} (${escHtml(handoverData.infoReceivedRole || "Clinician")})</div>
            <div><strong>Timestamp:</strong> ${formatDateTime(handoverData.infoReceivedAt)}</div>
            <div><strong>Crew Confirmation:</strong> Confirmed by ${escHtml(handoverData.crewConfirmedBy || c.crew || "Ambulance Crew")}</div>
          </div>
        ` : `
          <div style="display:flex;flex-direction:column;gap:10px">
            <label class="chk-check-item" style="background:#F8FAFC">
              <input type="checkbox" id="chkCrewHandoverAccuracy" checked />
              <span><strong>Ambulance Crew:</strong> "I confirm that the information being handed over is accurate and complete to the best of my knowledge."</span>
            </label>
            <div class="form-group">
              <label class="form-label required">Receiving Clinician Name & Role</label>
              <input type="text" id="hdrInfoReceiver" class="form-control" value="Dr. K. Patel, ED Registrar" placeholder="e.g. Dr. K. Patel, ED Registrar" required />
            </div>
            <button type="button" class="btn btn-primary" onclick="recordHandoverInfoReceived('${escHtml(caseId)}')">
              📥 Record Handover Information Received [DEMO]
            </button>
          </div>
        `}
      </div>

      <!-- Stage 2: Patient Care Formally Transferred -->
      <div class="handover-stage-card ${careTransferred ? 'stage-completed' : ''}">
        <div class="handover-stage-header">
          <div class="handover-stage-title">Stage 2: Patient Care Formally Transferred</div>
          <span class="badge ${careTransferred ? 'badge-green' : 'badge-amber'}">${careTransferred ? '✅ CARE TRANSFERRED' : 'PENDING'}</span>
        </div>
        <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:10px">
          Formal physical transfer of patient care and custody to the receiving hospital team. Only record when physical transfer is completed.
        </p>

        ${careTransferred ? `
          <div style="background:#ECFDF5;border:1px solid #10B981;border-radius:6px;padding:10px;font-size:0.8rem">
            <div><strong>Transferred To:</strong> ${escHtml(handoverData.careTransferredBy)}</div>
            <div><strong>Receiving Bay / Bed:</strong> ${escHtml(handoverData.transferDepartment || readiness.department || "ED Resus Bay")}</div>
            <div><strong>Transfer Timestamp:</strong> ${formatDateTime(handoverData.careTransferredAt)}</div>
            <div style="margin-top:6px;color:var(--green);font-weight:700">✓ Case Marked: Handover Completed</div>
          </div>
        ` : `
          <div style="display:flex;flex-direction:column;gap:10px">
            <div class="form-group">
              <label class="form-label required">Accepting Clinician / Nurse in Charge</label>
              <input type="text" id="hdrCareTransferPerson" class="form-control" value="Dr. A. Sharma, ED Consultant" placeholder="e.g. Dr. A. Sharma, ED Consultant" ${!infoReceived ? 'disabled' : ''} required />
            </div>
            <div class="form-group">
              <label class="form-label required">Transfer Bed / Acuity Bay</label>
              <input type="text" id="hdrTransferDept" class="form-control" value="${escHtml(readiness.department || 'Resus Bay 1')}" ${!infoReceived ? 'disabled' : ''} required />
            </div>
            <label class="chk-check-item" style="background:#F8FAFC">
              <input type="checkbox" id="chkCareTransferConfirmation" ${!infoReceived ? 'disabled' : 'checked'} />
              <span><strong>Care Transfer:</strong> Patient physically transferred to receiving team in accordance with hospital handover protocols.</span>
            </label>
            <button type="button" class="btn btn-success" ${!infoReceived ? 'disabled title="Complete Stage 1 first"' : ''} onclick="recordCareTransfer('${escHtml(caseId)}')">
              🏁 Formally Complete Transfer of Care [DEMO]
            </button>
            ${!infoReceived ? `<span style="font-size:0.72rem;color:var(--amber);font-weight:600">⚠️ Stage 1 (Handover Information Received) must be acknowledged before care can be formally transferred.</span>` : ""}
          </div>
        `}
      </div>
    </div>

    <div class="modal-footer" style="padding:0;border:none;margin-top:16px">
      <button type="button" class="btn btn-outline" onclick="closeModal('modalHandover')">Close</button>
      ${careTransferred ? `<span style="color:var(--green);font-weight:700">✓ All Handover Stages Recorded & Audited</span>` : ""}
    </div>
  `;

  closeModal("modalCaseDetail");
  openModal("modalHandover");
}

function toggleHandoverAmendmentForm(caseId) {
  const el = document.getElementById(`handoverAmendmentForm_${caseId}`);
  if (el) {
    el.style.display = el.style.display === "none" ? "block" : "none";
  }
}

function saveHandoverAmendment(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;

  const author = document.getElementById("hdrAmendAuthor")?.value.trim() || "Clinician";
  const text = document.getElementById("hdrAmendText")?.value.trim();
  if (!text) {
    showToast("Please enter the clarification text.", "warning");
    return;
  }

  if (!c.handoverAmendments) c.handoverAmendments = [];
  const ts = now();
  c.handoverAmendments.push({
    time: ts,
    author: author,
    role: "Receiving Team",
    text: text
  });

  addTimeline(caseId, "handover", `Handover clinical amendment recorded by ${author}: "${text}"`);
  saveState();
  showToast("Amendment recorded in audit trail.", "success");
  openHandover(caseId); // re-render
}

function recordHandoverInfoReceived(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;

  const receiver = document.getElementById("hdrInfoReceiver")?.value.trim() || "Receiving Clinician";
  const crewConfirmed = document.getElementById("chkCrewHandoverAccuracy")?.checked;
  if (!crewConfirmed) {
    showToast("Ambulance crew must confirm handover accuracy.", "warning");
    return;
  }

  if (!c.handover) c.handover = {};
  const ts = now();
  c.handover.infoReceivedAt = ts;
  c.handover.infoReceivedBy = receiver;
  c.handover.infoReceivedRole = "ED Clinician";
  c.handover.crewConfirmedBy = c.crew || "Ambulance Crew";

  addTimeline(caseId, "handover", `Handover Information Received acknowledged by ${receiver}. Crew verified accuracy.`);
  saveState();
  showToast(`Stage 1 Complete: Handover information acknowledged by ${receiver} (DEMO)`, "success", 4000);
  openHandover(caseId); // re-render to activate Stage 2
}

function recordCareTransfer(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;

  const person = document.getElementById("hdrCareTransferPerson")?.value.trim() || "ED Consultant";
  const dept = document.getElementById("hdrTransferDept")?.value.trim() || "ED Resus Bay";
  const confirmed = document.getElementById("chkCareTransferConfirmation")?.checked;

  if (!confirmed) {
    showToast("Please confirm physical transfer of care.", "warning");
    return;
  }

  const ts = now();
  if (!c.handover) c.handover = {};
  c.handover.careTransferredAt = ts;
  c.handover.careTransferredBy = person;
  c.handover.transferDepartment = dept;
  c.handover.handoverTime = ts;
  c.handover.receivedBy = person;
  c.handover.arrivalTime = c.timeline.find(t=>t.status==="arrived")?.time || ts;

  c.status = "complete";
  c.gatePass.status = "handover_completed";

  addTimeline(caseId, "complete", `Patient Care Formally Transferred to ${person} in ${dept}. Transfer of custody recorded.`);
  saveState();
  showToast(`Patient care formally transferred to ${person}! Case complete. Ambulance returning to service. (DEMO)`, "success", 5000);

  closeModal("modalHandover");
  renderAmbDashboard();
  renderHospDashboard();
  refreshCurrentPage();
}

/* ─── HOSPITAL DASHBOARD (simple table view) ─────────── */
function currentHospView() {
  const id = state.settings.hospView;
  return DEMO_HOSPITALS.find(h => h.id === id) || DEMO_HOSPITALS[0];
}

function setHospView(id) {
  state.settings.hospView = id;
  saveState();
  renderHospDashboard();
}

function renderHospSimple() {
  const h = currentHospView();
  const sel = document.getElementById("hospViewSelect");
  if (sel) {
    const opts = DEMO_HOSPITALS.map(x => `<option value="${escHtml(x.id)}">${escHtml(x.name)}</option>`).join("");
    if (sel.dataset.sig !== opts) { sel.innerHTML = opts; sel.dataset.sig = opts; } // don't reset an open dropdown
    if (h && sel.value !== h.id) sel.value = h.id;
  }
  if (!h) return;
  document.getElementById("hospLiveBeds").innerHTML = h.availableBeds != null ? bedsPill(h) : "—";
  document.getElementById("hospSpecialties").textContent = (h.specialties || []).join(", ") || "—";
  document.getElementById("hospLocation").textContent = h.address || "—";

  const rows = [];
  state.cases.forEach(c => (c.acceptanceRequests || []).forEach(req => { if (req.hospId === h.id) rows.push({ c, req }); }));
  rows.sort((a, b) => (b.req.sentAt || "").localeCompare(a.req.sentAt || ""));
  const waiting = rows.filter(r => ["pending", "acknowledged"].includes(r.req.status)).length;
  document.getElementById("hospPendingCount").textContent = waiting;

  const el = document.getElementById("hospRequestsTable");
  if (!rows.length) { el.innerHTML = `<p class="empty-state">No requests for this hospital yet.</p>`; return; }
  el.innerHTML = `
    <table class="simple-table">
      <thead><tr><th>Received</th><th>Ambulance</th><th>Emergency</th><th>Condition</th><th>Pickup</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${rows.map(({ c, req }) => {
        const id = escHtml(c.id), rid = escHtml(req.id);
        const shared = c.shared && window.ResQDB?.connected;
        let act = "";
        if (["pending", "acknowledged"].includes(req.status)) {
          act = `<button class="btn btn-success btn-small" onclick="hospAccept('${id}','${rid}')">Accept</button>
                 <button class="btn btn-danger btn-small" onclick="hospReject('${id}','${rid}')">Reject</button>`;
        } else if (req.status === "accepted" && !req.bedAllocated && shared) {
          act = `<button class="btn btn-primary btn-small" onclick="confirmBedAllocation('${id}')">🛏️ Confirm Bed</button>
                 <button class="btn btn-outline btn-small" onclick="hospReject('${id}','${rid}')">Reject</button>`;
        }
        act += `<button class="btn btn-outline btn-small" onclick="viewCaseDetail('${id}')">Details</button>`;
        return `<tr class="${["pending", "acknowledged"].includes(req.status) ? "row-new" : ""}">
          <td>${formatDateTime(req.sentAt)}</td>
          <td>${escHtml(c.ambPlate || c.ambId || "—")}${c.shared ? "" : ` <span class="tag-sim">sample</span>`}</td>
          <td>${categoryIcon(c.category)} ${escHtml(c.categoryLabel || "")}</td>
          <td>${escHtml(c.condition || ({ critical: "Critical", urgent: "Serious", standard: "Stable" }[c.priority]) || "—")}</td>
          <td>${escHtml(c.location || "—")}</td>
          <td>${statusPill(req)}</td>
          <td class="actions">${act}</td>
        </tr>`;
      }).join("")}</tbody>
    </table>`;
}

/* One-click Accept (database first for shared cases; no bed change yet) */
function hospAccept(caseId, reqId) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;
  const done = () => {
    applyHospResponse({ preventDefault() {} }, caseId, reqId, "accept");
    if (c.shared) showToast("Accepted. Now click 🛏️ Confirm Bed to reserve the bed.", "success", 5000);
    syncPull();
  };
  if (c.shared && window.ResQDB?.connected) {
    ResQDB.acceptRequest(reqId).then(done).catch(err => { showToast("Database: " + err.message, "error", 6000); syncPull(); });
  } else done();
}

/* One-click Reject (bed count never changes) */
function hospReject(caseId, reqId) {
  const c = state.cases.find(x => x.id === caseId);
  const req = c?.acceptanceRequests?.find(r => r.id === reqId);
  if (!c || !req) return;
  const done = () => {
    req.status = "declined";
    req.respondedAt = now();
    req.declineReason = "Declined by hospital";
    c.status = "alternative";
    c.hospitalReadiness = c.hospitalReadiness || {};
    c.hospitalReadiness.status = "unable_escalate";
    if (c.gatePass) c.gatePass.status = "reconfirmation_required";
    addTimeline(caseId, "declined", "Hospital REJECTED the request. Ambulance should choose another hospital.");
    saveState();
    showToast("Request rejected. Bed count unchanged.", "info", 4000);
    refreshCurrentPage();
    syncPull();
  };
  if (c.shared && window.ResQDB?.connected) {
    ResQDB.rejectRequest(reqId).then(done).catch(err => { showToast("Database: " + err.message, "error", 6000); syncPull(); });
  } else done();
}

function renderHospDashboard() {
  renderHospSimple();

  // Collect pending requests
  const pending = [];
  state.cases.forEach(c => {
    c.acceptanceRequests?.forEach(req => {
      if (req.status === "pending" || req.status === "acknowledged") {
        pending.push({ case: c, req });
      }
    });
  });

  // Active incoming cases (accepted, enroute, arrived)
  const incomingActive = state.cases.filter(c =>
    ["accepted", "enroute", "arrived", "alternative"].includes(c.status) ||
    c.acceptanceRequests?.some(r => r.status === "accepted")
  );

  // Completed handovers
  const completed = state.cases.filter(c => ["complete","closed"].includes(c.status));

  // Incoming badge
  const badge = document.getElementById("incomingBadge");
  if (badge) {
    badge.style.display = pending.length ? "inline-flex" : "none";
    badge.textContent = pending.length;
  }

  // 1. Pending incoming requests
  const listEl = document.getElementById("incomingRequestsList");
  if (listEl) {
    if (pending.length === 0) {
      listEl.innerHTML = `<p class="empty-state">No incoming requests awaiting decision at this time. <span class="badge-demo">DEMO</span></p>`;
    } else {
      listEl.innerHTML = pending.map(({ case: c, req }) => {
        const h = DEMO_HOSPITALS.find(x=>x.id===req.hospId);
        const reqSummary = c.preparationRequirements?.slice(0, 3).map(r =>
          `<span class="prep-status-badge tag-review">• ${escHtml(r.name)}</span>`
        ).join(" ") || "";

        return `
          <div class="request-card new-request">
            <div class="request-card-header">
              <div class="flex align-center" style="gap:10px;flex-wrap:wrap">
                <span class="badge badge-amber">⏳ Pending Decision</span>
                <strong>${escHtml(c.id)}</strong>
                <span class="plate-badge"><span class="plate-badge-ind">IND</span>${escHtml(c.ambPlate || c.ambId)}</span>
                <span class="badge-demo">DEMO</span>
              </div>
              <span style="font-size:0.78rem;color:var(--text-muted)">${formatDateTime(req.sentAt)}</span>
            </div>
            <div class="request-card-body">
              <div class="request-info-grid">
                <div class="request-info-item">
                  <span class="request-info-label">Emergency Type</span>
                  <span class="request-info-value">${categoryIcon(c.category)} ${escHtml(c.categoryLabel)}</span>
                </div>
                <div class="request-info-item">
                  <span class="request-info-label">Priority</span>
                  <span class="request-info-value">${escHtml(c.priority?.toUpperCase()||"—")}</span>
                </div>
                <div class="request-info-item">
                  <span class="request-info-label">Ambulance Plate / Unit</span>
                  <span class="request-info-value">${escHtml(c.ambPlate || c.ambId)} (${escHtml(c.ambId)})</span>
                </div>
                <div class="request-info-item">
                  <span class="request-info-label">Incident Location</span>
                  <span class="request-info-value">${escHtml(c.location)}</span>
                </div>
                <div class="request-info-item">
                  <span class="request-info-label">Patient Ref / Age</span>
                  <span class="request-info-value">${escHtml(c.ptRef || "—")} | ${escHtml(c.age || "Adult")}</span>
                </div>
                <div class="request-info-item">
                  <span class="request-info-label">Destination</span>
                  <span class="request-info-value">${escHtml(h?.name || "—")}${h?.availableBeds != null ? ` — 🛏️ ${h.availableBeds} beds free` : ""}</span>
                </div>
              </div>

              <!-- Pre-Arrival Clinical Vitals Preview -->
              ${c.vitals ? `
                <div style="background:#F1F5F9;border-radius:6px;padding:8px 12px;font-size:0.8rem;margin:10px 0;display:flex;gap:12px;flex-wrap:wrap">
                  <span><strong>HR:</strong> ${escHtml(c.vitals.hr)} bpm</span>
                  <span><strong>BP:</strong> ${escHtml(c.vitals.bp)}</span>
                  <span><strong>SpO2:</strong> ${escHtml(c.vitals.spo2)}</span>
                  <span><strong>RR:</strong> ${escHtml(c.vitals.rr)}/min</span>
                  <span><strong>GCS:</strong> ${escHtml(c.vitals.gcs)} (${escHtml(c.vitals.avpu)})</span>
                </div>
              ` : ""}

              ${c.symptoms ? `<div style="background:var(--blue-light);border-radius:6px;padding:8px 12px;font-size:0.82rem;margin-bottom:10px;color:var(--navy)">📋 <strong>Presenting Symptoms:</strong> ${escHtml(c.symptoms)}</div>` : ""}

              <div style="margin-bottom:12px">
                <span style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase">Anticipated Clinical Needs:</span>
                <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">${reqSummary}</div>
              </div>

              <div class="request-actions">
                <button class="btn btn-success btn-small" onclick="openHospResponse('${escHtml(c.id)}','${escHtml(req.id)}','accept')">✅ Accept Case & Assign Dept</button>
                <button class="btn btn-outline btn-small" onclick="openHospResponse('${escHtml(c.id)}','${escHtml(req.id)}','clarify')">❓ Request Info</button>
                <button class="btn btn-danger btn-small" onclick="openHospResponse('${escHtml(c.id)}','${escHtml(req.id)}','decline')">❌ Decline</button>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // 2. Incoming Patient Preparation Section (Condition-Based Hospital Preparation)
  const prepEl = document.getElementById("incomingPrepList");
  if (prepEl) {
    if (incomingActive.length === 0) {
      prepEl.innerHTML = `<p class="empty-state">No accepted ambulances currently en route or preparing. <span class="badge-demo">DEMO</span></p>`;
    } else {
      prepEl.innerHTML = incomingActive.map(c => {
        const gp = getGatePassStatus(c);
        const readiness = c.hospitalReadiness || {};
        const reqs = c.preparationRequirements || [];
        const isReconfirm = readiness.reconfirmationNeeded;
        const etaDisplay = readiness.eta ? `${readiness.eta} (${readiness.etaSource || "GPS"})` : "~12 min (Ambulance GPS Nav)";

        return `
          <div class="incoming-prep-card ${isReconfirm ? "needs-reconfirm" : ""}">
            ${isReconfirm ? `
              <div class="reconfirmation-banner">
                <span>⚠️</span>
                <span><strong>PATIENT CONDITION CHANGED IN TRANSIT:</strong> ${escHtml(readiness.reconfirmationReason || "Clinical worsening reported")}. Previous 'Ready' confirmation is invalid. Hospital must reconfirm preparation!</span>
              </div>
            ` : ""}

            <div class="prep-header">
              <div>
                <div class="flex align-center" style="gap:8px;flex-wrap:wrap">
                  <span class="plate-badge"><span class="plate-badge-ind">IND</span>${escHtml(c.ambPlate || c.ambId)}</span>
                  <strong>${escHtml(c.id)}</strong>
                  <span class="badge badge-${readiness.status === 'ready' && !isReconfirm ? 'green' : isReconfirm ? 'red' : 'amber'}">
                    ${readiness.status === 'ready' && !isReconfirm ? 'READY FOR ARRIVAL ✓' : isReconfirm ? 'RECONFIRMATION REQUIRED ⚠️' : 'PREPARING IN PROGRESS'}
                  </span>
                  <span class="badge-demo">DEMO</span>
                </div>
                <div class="prep-meta-row">
                  <span>Category: <strong>${categoryIcon(c.category)} ${escHtml(c.categoryLabel)}</strong></span>
                  <span>Priority: <strong>${escHtml(c.priority?.toUpperCase())}</strong></span>
                  <span>ETA: <strong>⏱️ ${escHtml(etaDisplay)}</strong></span>
                  <span>Dept: <strong>${escHtml(readiness.department || "Resus Bay 1")}</strong></span>
                </div>
              </div>
              <div style="text-align:right">
                <span class="gate-pass-status-pill ${gp.class}">${gp.icon} ${gp.label}</span>
              </div>
            </div>

            <!-- Observations & Vitals -->
            ${c.vitals ? `
              <div style="background:#F8FAFC;border:1px solid var(--border);border-radius:6px;padding:8px 10px;font-size:0.8rem;margin-bottom:10px;display:flex;gap:12px;flex-wrap:wrap">
                <span><strong>Vitals:</strong> HR ${escHtml(c.vitals.hr)} | BP ${escHtml(c.vitals.bp)} | SpO2 ${escHtml(c.vitals.spo2)} | RR ${escHtml(c.vitals.rr)} | GCS ${escHtml(c.vitals.gcs)}</span>
                ${c.injuries ? `<span>| <strong>Findings:</strong> ${escHtml(c.injuries)}</span>` : ""}
              </div>
            ` : ""}

            <!-- Preparation Requirements Summary -->
            <div style="font-size:0.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px">
              Preparation Requirements & Resource Readiness Status:
            </div>
            <div class="prep-requirements-grid">
              ${reqs.map(r => {
                const tagClass = r.status === "confirmed" ? "tag-confirmed" : r.status === "unavailable" ? "tag-unavailable" : r.status === "alternative" ? "tag-alt" : "tag-pending";
                const label = r.status === "confirmed" ? "Available & Confirmed" : r.status === "unavailable" ? "Unavailable" : r.status === "alternative" ? "Alternative Arranged" : "Confirmation Pending";
                return `
                  <div class="prep-req-item">
                    <span class="prep-req-name">${escHtml(r.name)}</span>
                    <span class="prep-status-badge ${tagClass}">${label}</span>
                    <span style="font-size:0.7rem;color:var(--text-muted)">${escHtml(r.notes || "")}</span>
                  </div>
                `;
              }).join("")}
            </div>

            <div class="flex justify-between align-center" style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border);flex-wrap:wrap;gap:10px">
              <div style="font-size:0.75rem;color:var(--text-muted)">
                Responsible: <strong>${escHtml(readiness.acceptingPerson || "ED Team")} (${escHtml(readiness.acceptingRole || "ED Lead")})</strong> &nbsp;|&nbsp;
                Last confirmed: <strong>${formatDateTime(readiness.confirmedAt || now())}</strong>
              </div>
              <div class="flex-gap">
                ${(() => {
                  const ar = c.shared && c.acceptanceRequests?.find(r => r.status === "accepted");
                  if (!ar) return "";
                  return ar.bedAllocated
                    ? `<span class="badge badge-green">🛏️ Bed Allocated</span>`
                    : `<button class="btn btn-success btn-small" onclick="confirmBedAllocation('${escHtml(c.id)}')">🛏️ Confirm Bed Allocation</button>`;
                })()}
                <button class="btn btn-primary btn-small" onclick="openPrepStatusModal('${escHtml(c.id)}')">
                  ⚙️ Confirm Preparation Status
                </button>
                <button class="btn btn-outline btn-small" onclick="openGateCheckinModal('${escHtml(c.id)}')">
                  🏁 Gate Check-in
                </button>
                <button class="btn btn-outline btn-small" onclick="viewCaseDetail('${escHtml(c.id)}')">
                  Details
                </button>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // 3. Completed handovers
  const compEl = document.getElementById("hospitalCompletedList");
  if (compEl) {
    if (completed.length === 0) {
      compEl.innerHTML = `<p class="empty-state">No completed handovers yet.</p>`;
    } else {
      compEl.innerHTML = completed.map(c => `
        <div class="case-card" onclick="viewCaseDetail('${c.id}')">
          <div class="case-card-icon">✅</div>
          <div class="case-card-body">
            <div class="case-card-title">
              <strong>${escHtml(c.id)}</strong>
              <span class="plate-badge"><span class="plate-badge-ind">IND</span>${escHtml(c.ambPlate || c.ambId)}</span>
              ${statusBadge(c.status)}
            </div>
            <div class="case-card-meta">
              <span>${categoryIcon(c.category)} ${escHtml(c.categoryLabel)}</span>
              ${c.handover ? `<span>Handover: ${formatDateTime(c.handover.careTransferredAt || c.handover.handoverTime)}</span>` : ""}
              ${c.handover?.careTransferredBy ? `<span>Transferred to: ${escHtml(c.handover.careTransferredBy)}</span>` : ""}
            </div>
          </div>
        </div>
      `).join("");
    }
  }
}

/* ─── HOSPITAL ACCEPTANCE MODAL ───────────────────────── */
function openHospResponse(caseId, reqId, action) {
  const c = state.cases.find(x => x.id === caseId);
  const req = c?.acceptanceRequests?.find(r => r.id === reqId);
  if (!c || !req) return;

  let html = "";
  const h = DEMO_HOSPITALS.find(x=>x.id===req.hospId);

  if (action === "accept") {
    html = `
      <div class="info-banner info-green">
        <span>✅</span>
        <span>You are accepting case <strong>${escHtml(c.id)}</strong> (Ambulance Plate: <strong style="font-family:monospace">${escHtml(c.ambPlate || c.ambId)}</strong>). Record receiving details to issue coordination clearance. (DEMO)</span>
      </div>
      <form id="hospResponseForm" onsubmit="submitHospResponse(event,'${escHtml(caseId)}','${escHtml(reqId)}','accept')">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Authorized Person Name</label>
            <input type="text" id="respPerson" class="form-control" placeholder="e.g. Dr. A. Sharma" value="Dr. A. Sharma" required />
          </div>
          <div class="form-group">
            <label class="form-label required">Authorized Role</label>
            <input type="text" id="respRole" class="form-control" placeholder="e.g. ED Consultant, Trauma Registrar" value="ED Consultant" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Receiving Department / Bay</label>
            <input type="text" id="respDept" class="form-control" placeholder="e.g. Trauma Resus Bay 1, Cath Lab 2" value="${c.category === 'cardiac' ? 'Cath Lab Suite 2' : c.category === 'stroke' ? 'Stroke Acute Bay' : 'ED Resus Bay 1'}" required />
          </div>
          <div class="form-group">
            <label class="form-label required">Expected Arrival Time (ETA)</label>
            <input type="text" id="respEta" class="form-control" placeholder="e.g. 12 min" value="12 min" required />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">ETA Source</label>
          <input type="text" id="respEtaSource" class="form-control" value="Ambulance Live GPS Navigation" readonly />
        </div>
        <div class="form-group">
          <label class="form-label">Specific Acceptance Conditions or Limitations</label>
          <input type="text" id="respConditions" class="form-control" placeholder="e.g. Subject to immediate CT queue clearance, Direct to cath table" value="Direct triage clearance via emergency corridor" />
        </div>
        <label class="chk-check-item" style="background:#F0FDF4;margin:12px 0">
          <input type="checkbox" id="chkHandoverAck" checked required />
          <span><strong>Handover Acknowledged:</strong> Hospital has reviewed and acknowledges pre-arrival clinical checklist observations and vital signs.</span>
        </label>
        <div class="modal-footer" style="padding:0;border:none;margin-top:16px">
          <button type="button" class="btn btn-outline" onclick="closeModal('modalHospResponse')">Cancel</button>
          <button type="submit" class="btn btn-success">✅ Confirm Hospital Acceptance</button>
        </div>
      </form>
    `;
  } else if (action === "clarify") {
    html = `
      <div class="info-banner info-blue"><span>ℹ️</span><span>Request additional clinical clarification from the ambulance crew before deciding. (DEMO)</span></div>
      <form id="hospResponseForm" onsubmit="submitHospResponse(event,'${escHtml(caseId)}','${escHtml(reqId)}','clarify')">
        <div class="form-group">
          <label class="form-label required">What information do you need clarified?</label>
          <textarea id="clarifyNote" class="form-control" rows="3" placeholder="e.g. What is current GCS? Is second wide-bore IV established?" required></textarea>
        </div>
        <div class="modal-footer" style="padding:0;border:none;margin-top:16px">
          <button type="button" class="btn btn-outline" onclick="closeModal('modalHospResponse')">Cancel</button>
          <button type="submit" class="btn btn-primary">Send Clarification Request</button>
        </div>
      </form>
    `;
  } else { // decline
    html = `
      <div class="info-banner info-red">
        <span>⚠️</span>
        <span>Declining this request. The ambulance will be notified immediately and alternative hospitals in the Regional Network will be coordinated. (DEMO)</span>
      </div>
      <form id="hospResponseForm" onsubmit="submitHospResponse(event,'${escHtml(caseId)}','${escHtml(reqId)}','decline')">
        <div class="form-group">
          <label class="form-label required">Reason for declining</label>
          <select id="declineReason" class="form-control" required>
            <option value="">— Select refusal reason —</option>
            <option value="ED Resus Bays at full capacity">ED Resus Bays at full capacity</option>
            <option value="Required specialist team unavailable">Required specialist team unavailable</option>
            <option value="Critical equipment under maintenance">Critical equipment under maintenance</option>
            <option value="Regional diversion protocol in effect">Regional diversion protocol in effect</option>
            <option value="Unable to accommodate acuity level">Unable to accommodate acuity level</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Additional notes / Alternative suggestions</label>
          <input type="text" id="declineNote" class="form-control" placeholder="e.g. Suggest District Trauma Centre 6km west" />
        </div>
        <div class="modal-footer" style="padding:0;border:none;margin-top:16px">
          <button type="button" class="btn btn-outline" onclick="closeModal('modalHospResponse')">Cancel</button>
          <button type="submit" class="btn btn-danger">Confirm Refusal & Escalate</button>
        </div>
      </form>
    `;
  }

  document.getElementById("modalHospResponseBody").innerHTML = html;
  openModal("modalHospResponse");
}

function submitHospResponse(e, caseId, reqId, action) {
  e.preventDefault();
  const c = state.cases.find(x => x.id === caseId);
  // Shared cases: record the decision in the database first (atomic bed allocation).
  if (window.ResQDB?.connected && c?.shared && (action === "accept" || action === "decline")) {
    if (action === "decline" && !document.getElementById("declineReason")?.value) {
      showToast("Please select a refusal reason.", "warning"); return;
    }
    const btn = e.submitter; if (btn) btn.disabled = true;
    const op = action === "accept" ? ResQDB.acceptRequest(reqId) : ResQDB.rejectRequest(reqId);
    op.then(() => {
      applyHospResponse(e, caseId, reqId, action);
      if (action === "accept") showToast("Request accepted. Next: click 🛏️ Confirm Bed Allocation in Incoming Patient Preparation.", "info", 6000);
      syncPull();
    }).catch(err => {
      if (btn) btn.disabled = false;
      showToast("Database: " + err.message, "error", 6000);
      syncPull();
    });
    return;
  }
  applyHospResponse(e, caseId, reqId, action);
}

function applyHospResponse(e, caseId, reqId, action) {
  const c = state.cases.find(x => x.id === caseId);
  const req = c?.acceptanceRequests?.find(r => r.id === reqId);
  if (!c || !req) return;

  const ts = now();

  if (action === "accept") {
    const person = document.getElementById("respPerson")?.value.trim() || "ED Physician";
    const role = document.getElementById("respRole")?.value.trim() || "ED Consultant";
    const dept = document.getElementById("respDept")?.value.trim() || "Resus Bay 1";
    const eta = document.getElementById("respEta")?.value.trim() || "12 min";
    const etaSource = document.getElementById("respEtaSource")?.value.trim() || "Ambulance GPS";
    const conditions = document.getElementById("respConditions")?.value.trim() || "";
    const handoverAck = document.getElementById("chkHandoverAck")?.checked || true;

    req.status = "accepted";
    req.respondedAt = ts;
    req.respondedBy = person;
    req.role = role;
    req.dept = dept;
    req.eta = eta;
    req.etaSource = etaSource;
    req.conditions = conditions;
    req.handoverAck = handoverAck;

    c.status = "accepted";
    c.hospitalReadiness = {
      status: "preparing",
      department: dept,
      acceptingPerson: person,
      acceptingRole: role,
      confirmedAt: ts,
      eta: eta,
      etaSource: etaSource,
      conditions: conditions,
      handoverAck: true,
      reconfirmationNeeded: false,
      reconfirmationReason: null
    };

    if (c.gatePass) c.gatePass.status = "prep_in_progress";
    addTimeline(caseId, "accepted", `Hospital ACCEPTED by ${person} (${role}). Dept: ${dept}. ETA: ${eta} (${etaSource}). Conditions: ${conditions || "None"}. Pre-arrival clinical handover acknowledged.`);

    saveState();
    closeModal("modalHospResponse");
    showToast(`Case ${caseId} ACCEPTED by ${person}. Gate Pass updated to ACCEPTED — PREPARATION IN PROGRESS (DEMO)`, "success", 5000);

  } else if (action === "clarify") {
    const note = document.getElementById("clarifyNote").value.trim();
    req.status = "acknowledged";
    req.respondedAt = ts;
    req.responseNote = "Clarification requested: " + note;
    addTimeline(caseId, "acknowledged", `Hospital requested clinical clarification: ${note}`);
    updateStatus(caseId, "acknowledged");
    saveState();
    closeModal("modalHospResponse");
    showToast("Clarification request sent to ambulance crew. (DEMO)", "info");

  } else { // decline
    const reason = document.getElementById("declineReason").value;
    const note   = document.getElementById("declineNote")?.value.trim() || "";
    if (!reason) { showToast("Please select a refusal reason.", "warning"); return; }

    req.status = "declined";
    req.respondedAt = ts;
    req.declineReason = reason;
    req.responseNote = note;

    c.status = "alternative";
    c.hospitalReadiness = c.hospitalReadiness || {};
    c.hospitalReadiness.status = "unable_escalate";
    if (c.gatePass) c.gatePass.status = "reconfirmation_required";
    addTimeline(caseId, "declined", `Hospital DECLINED request. Reason: ${reason}${note ? ". "+note : ""}. Alternative hospital coordination required.`);

    saveState();
    closeModal("modalHospResponse");
    showToast(`Case ${caseId} DECLINED by hospital. Flagged for alternative hospital coordination. (DEMO)`, "warning", 5000);
    showRecommendations(caseId);
  }

  renderHospDashboard();
  renderAmbDashboard();
  refreshCurrentPage();
}

/* ─── CONFIRM PREPARATION STATUS MODAL (Hospital Side) ── */
function openPrepStatusModal(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;

  const reqs = c.preparationRequirements || [];
  const readiness = c.hospitalReadiness || {};

  const bodyEl = document.getElementById("modalPrepStatusBody");
  if (!bodyEl) return;

  bodyEl.innerHTML = `
    <div class="chk-container">
      <div class="info-banner info-blue">
        <span>🏥</span>
        <span>Explicitly verify hospital resource preparation for ambulance <strong>${escHtml(c.ambPlate || c.ambId)}</strong> (${escHtml(c.id)}). The system will never claim resources are available without explicit confirmation. (DEMO)</span>
      </div>

      <form id="prepStatusForm" onsubmit="submitPrepStatus(event, '${escHtml(caseId)}')">
        <div class="chk-section">
          <div class="chk-section-header">
            <div class="chk-section-title">Preparation Requirements Checklist for ${escHtml(c.categoryLabel)}</div>
            <span class="text-muted" style="font-size:0.75rem">Confirm individual resources</span>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px">
            ${reqs.map((r, idx) => `
              <div style="background:#F8FAFC;border:1px solid var(--border);border-radius:6px;padding:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
                <div style="flex:1;min-width:200px">
                  <div style="font-weight:700;font-size:0.9rem;color:var(--navy)">${escHtml(r.name)}</div>
                  <div style="font-size:0.75rem;color:var(--text-muted)">Category: ${escHtml(r.category)} &nbsp;|&nbsp; Current: <strong>${escHtml(r.status)}</strong></div>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <select id="prepReqStatus_${idx}" class="form-control" style="font-size:0.85rem;padding:4px 8px;width:auto">
                    <option value="confirmed" ${r.status === 'confirmed' ? 'selected' : ''}>Available and Confirmed</option>
                    <option value="pending" ${r.status === 'pending' ? 'selected' : ''}>Required — Hospital Confirmation Pending</option>
                    <option value="alternative" ${r.status === 'alternative' ? 'selected' : ''}>Alternative Arranged</option>
                    <option value="unavailable" ${r.status === 'unavailable' ? 'selected' : ''}>Unavailable</option>
                    <option value="review" ${r.status === 'review' ? 'selected' : ''}>To Be Reviewed</option>
                    <option value="na" ${r.status === 'na' ? 'selected' : ''}>Not Applicable</option>
                  </select>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="chk-section">
          <div class="chk-section-header">
            <div class="chk-section-title">Overall Hospital Readiness Decision</div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">Hospital Preparation Readiness State</label>
              <select id="overallPrepState" class="form-control" style="font-weight:700" required>
                <option value="ready" ${readiness.status === 'ready' && !readiness.reconfirmationNeeded ? 'selected' : ''}>1. Ready for Arrival (Explicit reception confirmed)</option>
                <option value="preparing" ${readiness.status === 'preparing' ? 'selected' : ''}>2. Preparing — Not Yet Ready</option>
                <option value="partially_ready" ${readiness.status === 'partially_ready' ? 'selected' : ''}>3. Partially Ready (Some alternatives arranged)</option>
                <option value="unable_escalate">4. Unable to Accommodate — Escalate to Alternative Facility</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label required">Confirming Person Name & Role</label>
              <input type="text" id="prepConfirmingPerson" class="form-control" value="${escHtml(readiness.acceptingPerson || 'Dr. A. Sharma, ED Consultant')}" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Preparation Notes / Arrival Route Instructions</label>
            <input type="text" id="prepNotes" class="form-control" placeholder="e.g. Resus Bay 1 monitor hooked, blood bank notified" value="Resus Bay team assembled and awaiting ambulance" />
          </div>
        </div>

        <div class="modal-footer" style="padding:0;border:none;margin-top:16px">
          <button type="button" class="btn btn-outline" onclick="closeModal('modalPrepStatus')">Cancel</button>
          <button type="submit" class="btn btn-success">Confirm Preparation Status [DEMO]</button>
        </div>
      </form>
    </div>
  `;

  openModal("modalPrepStatus");
}

function submitPrepStatus(e, caseId) {
  e.preventDefault();
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;

  const overall = document.getElementById("overallPrepState").value;
  const person = document.getElementById("prepConfirmingPerson").value.trim();
  const notes = document.getElementById("prepNotes").value.trim();

  // Update individual requirements
  if (c.preparationRequirements) {
    c.preparationRequirements.forEach((r, idx) => {
      const sel = document.getElementById(`prepReqStatus_${idx}`);
      if (sel) {
        r.status = sel.value;
        if (sel.value === "confirmed") {
          r.confirmedBy = person;
          r.confirmedAt = now();
        }
      }
    });
  }

  const ts = now();

  if (overall === "ready") {
    c.hospitalReadiness.status = "ready";
    c.hospitalReadiness.reconfirmationNeeded = false;
    c.hospitalReadiness.reconfirmationReason = null;
    c.hospitalReadiness.confirmedAt = ts;
    c.gatePass.status = "ready";
    addTimeline(caseId, "ready", `Hospital team explicitly confirmed resource readiness: READY FOR ARRIVAL by ${person}. Notes: ${notes}`);
    showToast(`Preparation confirmed: READY FOR ARRIVAL. Gate pass approved! (DEMO)`, "success", 5000);

  } else if (overall === "unable_escalate") {
    // Hospital cannot safely accommodate — escalate
    const reason = prompt("Enter reason hospital cannot accommodate this case:", "ED saturation / critical resource unavailable");
    const req = c.acceptanceRequests?.slice(-1)[0];
    if (req) {
      req.status = "declined";
      req.declineReason = reason || "Unable to accommodate";
    }
    c.status = "alternative";
    c.hospitalReadiness.status = "unable_escalate";
    c.hospitalReadiness.reconfirmationNeeded = false;
    c.gatePass.status = "reconfirmation_required";
    addTimeline(caseId, "declined", `Hospital UNABLE TO ACCOMMODATE: ${reason || "Escalation requested"}. Flagged for regional coordination.`);
    showToast("Case escalated. Alternative hospital coordination required.", "warning", 5000);
    closeModal("modalPrepStatus");
    saveState();
    renderHospDashboard();
    renderAmbDashboard();
    showRecommendations(caseId);
    return;

  } else {
    c.hospitalReadiness.status = overall;
    c.hospitalReadiness.confirmedAt = ts;
    c.gatePass.status = "prep_in_progress";
    addTimeline(caseId, "accepted", `Hospital preparation status updated to ${overall} by ${person}.`);
    showToast(`Preparation status recorded: ${overall}.`, "info");
  }

  saveState();
  closeModal("modalPrepStatus");
  renderHospDashboard();
  renderAmbDashboard();
  refreshCurrentPage();
}

/* ─── IN-TRANSIT CONDITION UPDATE (Trigger Reconfirmation) ─── */
function openUpdateConditionModal(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;

  const bodyEl = document.getElementById("modalConditionUpdateBody");
  if (!bodyEl) return;

  bodyEl.innerHTML = `
    <form id="conditionUpdateForm" onsubmit="submitConditionUpdate(event, '${escHtml(caseId)}')">
      <div class="info-banner info-red">
        <span>⚠️</span>
        <span>Logging condition changes in transit will automatically invalidate outdated hospital readiness and set Gate Pass to <strong>UPDATED / RECONFIRMATION REQUIRED</strong>.</span>
      </div>

      <div class="form-group">
        <label class="form-label required">Description of Condition Change / Worsening</label>
        <textarea id="updConditionNotes" class="form-control" rows="3" placeholder="e.g. Patient GCS dropped from 15 to 9; onset of respiratory distress; cardiac rhythm altered..." required></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Updated Blood Pressure</label>
          <input type="text" id="updBP" class="form-control" placeholder="e.g. 80/50 mmHg" />
        </div>
        <div class="form-group">
          <label class="form-label">Updated Heart Rate / SpO2</label>
          <input type="text" id="updHR" class="form-control" placeholder="e.g. HR 128 bpm, SpO2 91%" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">New Interventions Performed in Transit</label>
        <input type="text" id="updInterventions" class="form-control" placeholder="e.g. 500ml Normal Saline bolus started, airway repositioned" />
      </div>

      <div class="modal-footer" style="padding:0;border:none;margin-top:16px">
        <button type="button" class="btn btn-outline" onclick="closeModal('modalConditionUpdate')">Cancel</button>
        <button type="submit" class="btn btn-danger">⚠️ Transmit Condition Change</button>
      </div>
    </form>
  `;

  openModal("modalConditionUpdate");
}

function submitConditionUpdate(e, caseId) {
  e.preventDefault();
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;

  const notes = document.getElementById("updConditionNotes").value.trim();
  const bp = document.getElementById("updBP")?.value.trim();
  const hr = document.getElementById("updHR")?.value.trim();
  const inter = document.getElementById("updInterventions")?.value.trim();

  const ts = now();

  if (!c.conditionChanges) c.conditionChanges = [];
  c.conditionChanges.push({
    time: ts,
    notes,
    bp, hr, inter
  });

  if (bp && c.vitals) { c.vitals.bp = bp; c.vitals.bpTime = ts; }
  if (hr && c.vitals) { c.vitals.hr = hr; c.vitals.hrTime = ts; }
  if (inter) {
    if (!c.interventions) c.interventions = [];
    c.interventions.push({ name: inter, time: formatTime(ts) });
  }

  // Trigger dynamic reconfirmation: invalidate READY state!
  c.hospitalReadiness.reconfirmationNeeded = true;
  c.hospitalReadiness.reconfirmationReason = notes;
  c.gatePass.status = "reconfirmation_required";

  addTimeline(caseId, "reconfirm", `⚠️ PATIENT CONDITION CHANGED IN TRANSIT: ${notes}. Outdated hospital readiness invalidated. RECONFIRMATION REQUIRED.`);

  saveState();
  closeModal("modalConditionUpdate");
  showToast("Condition change transmitted! Hospital marked RECONFIRMATION REQUIRED.", "warning", 5000);

  renderAmbDashboard();
  renderHospDashboard();
  refreshCurrentPage();
}

/* ─── HOSPITAL GATE CHECK-IN & ARRIVAL CLEARANCE ──────── */
function openGateCheckinModal(caseId) {
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;

  const gp = getGatePassStatus(c);
  const bodyEl = document.getElementById("modalGateCheckinBody");
  if (!bodyEl) return;

  bodyEl.innerHTML = `
    <form id="gateCheckinForm" onsubmit="submitGateCheckin(event, '${escHtml(caseId)}')">
      <div class="info-banner info-blue">
        <span>🏁</span>
        <span>Hospital Gate Arrival Clearance. Match physical vehicle registration plate before allowing ambulance bay entry. (DEMO)</span>
      </div>

      <div style="background:#F8FAFC;border:2px solid var(--navy);border-radius:8px;padding:14px;margin-bottom:14px;text-align:center">
        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;font-weight:700">Official Ambulance Registration Plate</div>
        <div style="margin:8px 0">
          <span class="plate-badge" style="font-size:1.3rem;padding:6px 16px"><span class="plate-badge-ind">IND</span>${escHtml(c.ambPlate || c.ambId)}</span>
        </div>
        <div style="font-size:0.8rem;color:var(--text-muted)">ResQ Case: <strong>${escHtml(c.id)}</strong> &nbsp;|&nbsp; Ref: <strong>${escHtml(c.ptRef || "—")}</strong></div>
        <div style="margin-top:8px"><span class="gate-pass-status-pill ${gp.class}">${gp.icon} ${gp.label}</span></div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label required">Gate Officer / Triage Nurse Name</label>
          <input type="text" id="gateOfficerName" class="form-control" value="Officer K. Singh" required />
        </div>
        <div class="form-group">
          <label class="form-label required">Officer Role / Post</label>
          <input type="text" id="gateOfficerRole" class="form-control" value="ED Receiving Gate Security & Triage" required />
        </div>
      </div>

      <label class="chk-check-item" style="background:#F0FDF4;margin:12px 0">
        <input type="checkbox" id="chkPlateMatched" required checked />
        <span><strong>Plate Verified:</strong> Physical vehicle plate matches registered number plate <strong>${escHtml(c.ambPlate || c.ambId)}</strong>.</span>
      </label>

      <div class="modal-footer" style="padding:0;border:none;margin-top:16px">
        <button type="button" class="btn btn-outline" onclick="closeModal('modalGateCheckin')">Cancel</button>
        <button type="submit" class="btn btn-success">🏁 Approve Arrival Clearance [DEMO]</button>
      </div>
    </form>
  `;

  openModal("modalGateCheckin");
}

function submitGateCheckin(e, caseId) {
  e.preventDefault();
  const c = state.cases.find(x => x.id === caseId);
  if (!c) return;

  const officer = document.getElementById("gateOfficerName").value.trim();
  const role = document.getElementById("gateOfficerRole").value.trim();

  const ts = now();
  c.status = "arrived";
  c.gatePass.status = "arrival_verified";
  c.gatePass.verifiedAt = ts;
  c.gatePass.verifiedBy = `${officer} (${role})`;

  addTimeline(caseId, "arrived", `Ambulance plate ${c.ambPlate || c.ambId} verified at hospital gate by ${officer} (${role}). ARRIVAL VERIFIED.`);

  saveState();
  closeModal("modalGateCheckin");
  showToast(`Ambulance arrival verified at gate by ${officer}! Gate Pass: ARRIVAL VERIFIED ✓`, "success", 5000);

  renderAmbDashboard();
  renderHospDashboard();
  refreshCurrentPage();
}

function updateResourceStatus(resource, value) {
  // Demo only — just show toast
  showToast(`Resource status updated: ${resource} = ${value} (DEMO — not saved to real system)`, "info");
}

/* ─── CASES PAGE ─────────────────────────────────────── */
function renderCases() {
  const search = (document.getElementById("caseSearch")?.value || "").toLowerCase();
  const filter = document.getElementById("caseFilter")?.value || "all";

  let cases = state.cases.filter(c => {
    if (search && !c.id.toLowerCase().includes(search) &&
        !c.categoryLabel?.toLowerCase().includes(search) &&
        !c.location?.toLowerCase().includes(search)) return false;
    if (filter === "all") return true;
    if (filter === "active") return !["complete","closed","cancelled"].includes(c.status);
    if (filter === "accepted") return c.status === "accepted" || c.acceptanceRequests.some(r=>r.status==="accepted");
    if (filter === "pending") return ["requested","pending","acknowledged"].includes(c.status);
    if (filter === "complete") return ["complete","closed"].includes(c.status);
    if (filter === "declined") return c.status === "declined" || c.acceptanceRequests.some(r=>r.status==="declined");
    return true;
  });

  const el = document.getElementById("allCasesList");
  if (cases.length === 0) {
    el.innerHTML = `<p class="empty-state">${t("noCases")}</p>`;
  } else {
    el.innerHTML = cases.map(c => buildCaseCard(c)).join("");
  }
}

/* ─── HOSPITAL DIRECTORY ─────────────────────────────── */
function renderDirectory() {
  const search  = (document.getElementById("hospSearch")?.value || "").toLowerCase();
  const capFil  = document.getElementById("hospCapFilter")?.value || "all";

  const filtered = DEMO_HOSPITALS.filter(h => {
    if (capFil !== "all" && !h.capabilities.includes(capFil)) return false;
    if (search && !h.name.toLowerCase().includes(search) &&
        !h.address.toLowerCase().includes(search)) return false;
    return true;
  });

  const el = document.getElementById("directoryList");
  if (filtered.length === 0) {
    el.innerHTML = `<p class="empty-state">No hospitals match your search.</p>`;
    return;
  }

  el.innerHTML = filtered.map(h => {
    const caps = h.capabilities.map(c => `<span class="cap-tag">${c}</span>`).join("");
    const statusCls = h.edStatus === "available" ? "green" : h.edStatus === "limited" ? "amber" : "red";
    return `
      <div class="hospital-card" onclick="viewHospitalDetail('${escHtml(h.id)}')">
        <div class="hospital-card-name">🏥 ${escHtml(h.name)}</div>
        <div class="hospital-card-location">📍 ${escHtml(h.address)}</div>
        <div class="capability-tags">${caps}</div>
        <div class="hospital-card-status">
          <span class="status-dot ${statusCls}"></span>
          <span>ED: ${escHtml(h.edStatus.toUpperCase())}</span>
          ${h.availableBeds != null ? `<span>🛏️ ${h.availableBeds}/${h.totalBeds} beds</span>` : ""}
          <span style="margin-left:auto;font-size:0.68rem">Updated: ${escHtml(h.lastUpdated)}</span>
        </div>
      </div>
    `;
  }).join("");
}

function viewHospitalDetail(hospId) {
  const h = DEMO_HOSPITALS.find(x => x.id === hospId);
  if (!h) return;

  document.getElementById("hospDetailName").textContent = h.name;
  const caps = h.capabilities.map(c => `<span class="cap-tag">${c}</span>`).join("");
  const specs = h.specialties.map(s => `<li>${escHtml(s)}</li>`).join("");

  document.getElementById("hospDetailBody").innerHTML = `
    <div class="info-banner info-amber"><span>⚠️</span><span>All data is simulated for demonstration purposes only. Do not use for real emergency decisions.</span></div>
    <div class="detail-grid">
      <div class="detail-item" style="grid-column:1/-1"><span class="detail-label">Address</span><span class="detail-value">📍 ${escHtml(h.address)}</span></div>
      <div class="detail-item"><span class="detail-label">ED Status</span><span class="detail-value">${escHtml(h.edStatus.toUpperCase())}</span></div>
      ${h.availableBeds != null ? `<div class="detail-item"><span class="detail-label">Available Beds</span><span class="detail-value">🛏️ ${h.availableBeds} / ${h.totalBeds}</span></div>` : ""}
      <div class="detail-item"><span class="detail-label">Last Updated</span><span class="detail-value">${escHtml(h.lastUpdated)}</span></div>
      <div class="detail-item"><span class="detail-label">Contact</span><span class="detail-value">${escHtml(h.contactNumber)}</span></div>
      <div class="detail-item"><span class="detail-label">Cath Lab</span><span class="detail-value">${h.hasCathLab ? "✅ Yes" : "❌ No"}</span></div>
      <div class="detail-item"><span class="detail-label">Stroke Unit</span><span class="detail-value">${h.hasStrokeUnit ? "✅ Yes" : "❌ No"}</span></div>
      <div class="detail-item"><span class="detail-label">Trauma Bay</span><span class="detail-value">${h.hasTraumaBay ? "✅ Yes" : "❌ No"}</span></div>
      <div class="detail-item"><span class="detail-label">Burns Unit</span><span class="detail-value">${h.hasBurns ? "✅ Yes" : "❌ No"}</span></div>
      <div class="detail-item"><span class="detail-label">Paediatric</span><span class="detail-value">${h.hasPaeds ? "✅ Yes" : "❌ No"}</span></div>
      <div class="detail-item"><span class="detail-label">Obstetric</span><span class="detail-value">${h.hasObs ? "✅ Yes" : "❌ No"}</span></div>
    </div>
    <div style="margin-top:14px">
      <div class="detail-label">Capabilities</div>
      <div class="capability-tags" style="margin-top:6px">${caps}</div>
    </div>
    <div style="margin-top:14px">
      <div class="detail-label">Specialties</div>
      <ul style="margin-top:6px;padding-left:20px;font-size:0.875rem">${specs}</ul>
    </div>
    ${h.notes ? `<div style="margin-top:14px"><div class="detail-label">Notes</div><div style="font-size:0.875rem;margin-top:4px">${escHtml(h.notes)}</div></div>` : ""}
    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.address)}" target="_blank" rel="noopener" class="btn btn-outline btn-small">🗺️ Open in Google Maps</a>
    </div>
  `;
  openModal("modalHospDetail");
}

/* ─── ARRIVAL PASSPORT ────────────────────────────────── */
function renderPassportPage() {
  const sel = document.getElementById("passportCaseSelect");
  const current = sel.value;
  sel.innerHTML = '<option value="">— Select a case —</option>';
  state.cases.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.id} — ${c.categoryLabel} (${statusLabel(c.status)})`;
    if (c.id === current) opt.selected = true;
    sel.appendChild(opt);
  });
  renderPassport();
}

function renderPassport() {
  const caseId = document.getElementById("passportCaseSelect").value;
  const el = document.getElementById("passportContent");

  if (!caseId) {
    el.innerHTML = `<p class="empty-state">${t("selectCase")}</p>`;
    return;
  }

  const c = state.cases.find(x => x.id === caseId);
  if (!c) { el.innerHTML = `<p class="empty-state">Case not found.</p>`; return; }

  const h = c.selectedHospitalId ? DEMO_HOSPITALS.find(x=>x.id===c.selectedHospitalId) : null;
  const req = c.acceptanceRequests?.slice(-1)[0];
  const createdAt = c.timeline[0]?.time;
  const gp = getGatePassStatus(c);
  const readiness = c.hospitalReadiness || {};
  const chk = c.clinicalChecklist || {};
  const v = c.vitals || {};
  const crewRev = c.crewReview || null;
  const docRev = c.docReview || null;
  const reqs = c.preparationRequirements || [];

  // Vitals summary
  const vitalsText = v.hr ? `
    HR: <strong>${escHtml(v.hr)}</strong> bpm (${formatTime(v.hrTime || createdAt)}) | 
    BP: <strong>${escHtml(v.bp)}</strong> (${formatTime(v.bpTime || createdAt)}) | 
    SpO2: <strong>${escHtml(v.spo2)}</strong>% (${formatTime(v.spo2Time || createdAt)}) | 
    RR: <strong>${escHtml(v.rr || "—")}</strong>/min | 
    GCS: <strong>${escHtml(v.gcs || "—")}</strong>
  ` : "<em>Vitals not recorded.</em>";

  // Gate pass verification data
  const qrSvg = generateQrSvg(`${c.id}|${c.ambPlate || c.ambId}|${gp.code}|${c.status}`);

  const timelineItems = c.timeline.map(t => `
    <tr>
      <td style="padding:6px 10px;font-size:0.75rem;white-space:nowrap;border-bottom:1px solid var(--border)">${formatDateTime(t.time)}</td>
      <td style="padding:6px 10px;font-size:0.75rem;font-weight:700;border-bottom:1px solid var(--border)">${statusLabel(t.status)}</td>
      <td style="padding:6px 10px;font-size:0.75rem;color:var(--text);border-bottom:1px solid var(--border)">${escHtml(t.note||"")}</td>
    </tr>
  `).join("");

  const passportHtml = `
    <div class="passport-preview">
      <!-- HEADER BLOCK -->
      <div class="passport-header-block">
        <div>
          <div class="passport-logo">ResQ</div>
          <div class="passport-tagline">Right Hospital. Right Time. — Emergency Response Coordination</div>
        </div>
        <div style="text-align:right">
          <div class="passport-title">VERIFIED ARRIVAL PASSPORT</div>
          <div style="display:flex;align-items:center;gap:8px;justify-content:flex-end;margin-top:4px">
            <span class="plate-badge" style="font-size:1.1rem;padding:4px 12px"><span class="plate-badge-ind">IND</span>${escHtml(c.ambPlate || c.ambId)}</span>
            <span class="passport-case-id">${escHtml(c.id)}</span>
          </div>
        </div>
      </div>

      <div class="passport-demo-warning">
        ⚠️ DEMO HOSPITAL COORDINATION DOCUMENT — NOT AN OFFICIAL POLICE/SECURITY PASS ⚠️
      </div>

      <div class="passport-body">

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- FEATURE 1: RESQ HOSPITAL ARRIVAL GATE PASS CARD -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="passport-gate-card">
          <div class="passport-gate-header">
            <div>
              <div style="font-size:0.72rem;letter-spacing:1px;font-weight:700;color:var(--text-muted);text-transform:uppercase">
                ResQ Entry Coordination Clearance
              </div>
              <h2 style="font-size:1.25rem;color:var(--navy);margin:2px 0 4px">ResQ Hospital Arrival Gate Pass</h2>
              <div style="font-size:0.8rem;color:var(--text-muted)">
                Ambulance Plate: <strong style="font-family:monospace;color:var(--navy)">${escHtml(c.ambPlate || c.ambId)}</strong> &nbsp;|&nbsp;
                Patient Case Ref: <strong>${escHtml(c.ptRef || "—")}</strong>
              </div>
            </div>
            <div style="text-align:right">
              <span class="gate-pass-status-pill ${gp.class}">${gp.icon} ${gp.label}</span>
              <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px">
                Status Code: <code>${gp.code}</code>
              </div>
            </div>
          </div>

          <div class="passport-gate-grid">
            <div class="passport-gate-info">
              <div class="gate-info-row">
                <span class="gate-label">Destination Hospital:</span>
                <span class="gate-val"><strong>${escHtml(h ? h.name : "Not yet assigned")}</strong></span>
              </div>
              <div class="gate-info-row">
                <span class="gate-label">Receiving Dept / Bay:</span>
                <span class="gate-val"><strong>${escHtml(readiness.department || "Resus Bay")}</strong></span>
              </div>
              <div class="gate-info-row">
                <span class="gate-label">Hospital Acceptance:</span>
                <span class="gate-val">${req?.status === 'accepted' ? `<span class="tag-confirmed">✓ Accepted by ${escHtml(readiness.acceptingPerson || req.respondedBy)} (${escHtml(readiness.acceptingRole || "Staff")})</span>` : req?.status === 'declined' ? `<span class="tag-unavailable">✕ Declined — Alternative required</span>` : `<span class="tag-pending">⏳ Confirmation Pending</span>`}</span>
              </div>
              <div class="gate-info-row">
                <span class="gate-label">Acceptance Timestamp:</span>
                <span class="gate-val">${readiness.confirmedAt ? formatDateTime(readiness.confirmedAt) : "Pending hospital response"}</span>
              </div>
              <div class="gate-info-row">
                <span class="gate-label">Arrival ETA & Source:</span>
                <span class="gate-val"><strong>${escHtml(readiness.eta || "12 min")}</strong> (${escHtml(readiness.etaSource || "Ambulance Live GPS")})</span>
              </div>
              <div class="gate-info-row">
                <span class="gate-label">Hospital Readiness:</span>
                <span class="gate-val">
                  ${readiness.status === 'ready' && !readiness.reconfirmationNeeded ? `<span class="tag-confirmed">✓ READY FOR ARRIVAL</span>` : readiness.reconfirmationNeeded ? `<span class="tag-alt">⚠️ RECONFIRMATION REQUIRED</span>` : readiness.status === 'preparing' ? `<span class="tag-pending">⚙️ PREPARING — NOT YET READY</span>` : `<span class="tag-review">TO BE REVIEWED</span>`}
                </span>
              </div>
              <div class="gate-info-row">
                <span class="gate-label">Gate Arrival Verification:</span>
                <span class="gate-val">
                  ${c.gatePass?.verifiedAt ? `<span class="tag-confirmed">✓ VERIFIED at gate by ${escHtml(c.gatePass.verifiedBy)} (${formatDateTime(c.gatePass.verifiedAt)})</span>` : `<em>Pending ambulance arrival at physical hospital gate</em>`}
                </span>
              </div>
              <div class="gate-info-row">
                <span class="gate-label">Clinical Handover State:</span>
                <span class="gate-val">
                  ${c.handover?.careTransferredAt ? `<span class="tag-confirmed">✓ CARE FORMALLY TRANSFERRED (${formatDateTime(c.handover.careTransferredAt)})</span>` : c.handover?.infoReceivedAt ? `<span class="tag-alt">Stage 1: Handover Info Acknowledged</span>` : `<em>Pending patient handover</em>`}
                </span>
              </div>
            </div>

            <!-- Deterministic SVG QR Code Frame -->
            <div class="passport-gate-qr-frame">
              <div class="qr-svg-wrapper">
                ${qrSvg}
              </div>
              <div style="font-size:0.68rem;color:var(--text-muted);margin-top:6px;line-height:1.2">
                🔒 Access-controlled QR<br>
                <span>Plate: ${escHtml(c.ambPlate || c.ambId)}</span>
              </div>
            </div>
          </div>

          <!-- Quick interactive actions directly inside passport -->
          <div class="passport-actions-bar">
            <span style="font-size:0.75rem;font-weight:700;color:var(--text-muted)">DEMO WORKFLOW CONTROLS:</span>
            <button class="btn btn-outline btn-small" onclick="openPrepStatusModal('${escHtml(c.id)}')">
              🏥 Hospital Approve Readiness [DEMO]
            </button>
            <button class="btn btn-outline btn-small" onclick="openGateCheckinModal('${escHtml(c.id)}')">
              🏁 Verify Plate & Gate Check-in [DEMO]
            </button>
            <button class="btn btn-outline btn-small" onclick="openUpdateConditionModal('${escHtml(c.id)}')">
              ⚠️ Update Condition in Transit [DEMO]
            </button>
            <button class="btn btn-primary btn-small" onclick="openHandover('${escHtml(c.id)}')">
              📋 Structured Handover [DEMO]
            </button>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- FEATURE 1B: PRE-ARRIVAL CLINICAL CHECKLIST & VERIFICATION -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="passport-section">
          <div class="passport-section-title">Pre-Arrival Clinical Checklist & Onboard Verifications</div>
          <div class="passport-grid">
            <div class="passport-field">
              <span class="passport-field-label">Emergency Category</span>
              <span class="passport-field-value">${categoryIcon(c.category)} ${escHtml(c.categoryLabel)}</span>
            </div>
            <div class="passport-field">
              <span class="passport-field-label">Assigned Priority</span>
              <span class="passport-field-value">${escHtml(c.priority?.toUpperCase() || "URGENT")}</span>
            </div>
            <div class="passport-field">
              <span class="passport-field-label">Incident Location</span>
              <span class="passport-field-value">${escHtml(c.location)}</span>
            </div>
            <div class="passport-field">
              <span class="passport-field-label">Patient Age</span>
              <span class="passport-field-value">${escHtml(c.age || "Not recorded")}</span>
            </div>
          </div>

          <div style="background:#F8FAFC;border:1px solid var(--border);border-radius:6px;padding:10px;margin-top:10px">
            <div class="passport-field-label">Recorded Vitals & Measurements (with timestamps)</div>
            <div style="font-size:0.85rem;margin-top:4px">${vitalsText}</div>
          </div>

          <div class="passport-grid" style="margin-top:10px">
            <div class="passport-field" style="grid-column:1/-1">
              <span class="passport-field-label">Presenting Complaints & History</span>
              <span class="passport-field-value">${escHtml(c.notes || "None")} | Medical History: ${escHtml(chk.history || "No previous history reported")}</span>
            </div>
            <div class="passport-field">
              <span class="passport-field-label">Suspected Injuries / Findings</span>
              <span class="passport-field-value">${escHtml(c.injuries || "None recorded")}</span>
            </div>
            <div class="passport-field">
              <span class="passport-field-label">Known Allergies</span>
              <span class="passport-field-value" style="color:${chk.allergies ? 'var(--red)' : 'inherit'}">${escHtml(chk.allergies || "No known drug allergies reported")}</span>
            </div>
          </div>

          <div class="detail-grid" style="background:#F8FAFC;border:1px solid var(--border);border-radius:6px;padding:10px;margin-top:10px">
            <div class="detail-item">
              <span class="detail-label">Ambulance Crew Review</span>
              <span class="detail-value">
                ${crewRev ? `✅ Confirmed by <strong>${escHtml(crewRev.reviewer)}</strong> (${escHtml(crewRev.role)}) at ${formatTime(crewRev.time)}` : `<span class="text-amber">Pending crew sign-off</span>`}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Doctor / Paramedic Onboard Review</span>
              <span class="detail-value">
                ${docRev ? `✅ Confirmed by Dr. <strong>${escHtml(docRev.docName)}</strong> (${escHtml(docRev.docReg)}) at ${formatTime(docRev.docTime)}` : `<span class="text-muted">No onboard clinician present (Paramedic transfer)</span>`}
              </span>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- FEATURE 2: HOSPITAL READINESS & RESOURCE PREPARATION -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="passport-section">
          <div class="passport-section-title">Hospital Readiness & Resource Preparation Requirements</div>
          ${h ? `
            <div class="passport-grid" style="margin-bottom:10px">
              <div class="passport-field" style="grid-column:1/-1">
                <span class="passport-field-label">Destination Hospital</span>
                <span class="passport-field-value">🏥 <strong>${escHtml(h.name)}</strong> — ${escHtml(h.address)}</span>
              </div>
              <div class="passport-field">
                <span class="passport-field-label">Receiving Dept / Bay</span>
                <span class="passport-field-value">${escHtml(readiness.department || "Resus Bay 1")}</span>
              </div>
              <div class="passport-field">
                <span class="passport-field-label">Acceptance Decision</span>
                <span class="passport-field-value">
                  ${req?.status === 'accepted' ? `✅ Accepted by ${escHtml(readiness.acceptingPerson)} at ${formatDateTime(readiness.confirmedAt)}` : req?.status === 'declined' ? `❌ Declined: ${escHtml(req.declineReason)}` : `⏳ Acceptance Pending`}
                </span>
              </div>
            </div>

            <!-- Resource requirements grid -->
            <div style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin:8px 0 4px">
              Condition-Based Preparation Prompts & Hospital Confirmation:
            </div>
            <div class="prep-requirements-grid">
              ${reqs.map(r => {
                const tagClass = r.status === "confirmed" ? "tag-confirmed" : r.status === "unavailable" ? "tag-unavailable" : r.status === "alternative" ? "tag-alt" : "tag-pending";
                const label = r.status === "confirmed" ? "Available & Confirmed" : r.status === "unavailable" ? "Unavailable" : r.status === "alternative" ? "Alternative Arranged" : "Pending Confirmation";
                return `
                  <div class="prep-req-item">
                    <span class="prep-req-name">${escHtml(r.name)}</span>
                    <span class="prep-status-badge ${tagClass}">${label}</span>
                  </div>
                `;
              }).join("")}
            </div>
          ` : `<p class="empty-state">No hospital assigned to this case yet.</p>`}
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- TIMELINE AUDIT -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="passport-section">
          <div class="passport-section-title">Case Coordination & Handover Audit Timeline</div>
          <table style="width:100%;border-collapse:collapse;border:1px solid var(--border);border-radius:6px;overflow:hidden">
            <thead>
              <tr style="background:#F1F5F9">
                <th style="text-align:left;padding:6px 10px;font-size:0.7rem;text-transform:uppercase;color:var(--text-muted);font-weight:700">Timestamp</th>
                <th style="text-align:left;padding:6px 10px;font-size:0.7rem;text-transform:uppercase;color:var(--text-muted);font-weight:700">Event / Status</th>
                <th style="text-align:left;padding:6px 10px;font-size:0.7rem;text-transform:uppercase;color:var(--text-muted);font-weight:700">Audit Description & Notes</th>
              </tr>
            </thead>
            <tbody>${timelineItems}</tbody>
          </table>
        </div>

        <div style="text-align:center;padding:12px;background:#F9FAFB;border-radius:6px;margin-top:12px">
          <div style="font-size:0.7rem;color:var(--text-muted)">
            ResQ Verified Arrival Passport | Case ID: <strong>${escHtml(c.id)}</strong> | Ambulance Plate: <strong>${escHtml(c.ambPlate || c.ambId)}</strong> | Timestamp: ${formatDateTime(now())}
          </div>
          <div style="font-size:0.68rem;color:var(--text-muted);margin-top:4px">
            Simulated demonstration document. For real emergencies, call 112 (India) | 999 (UK) | 911 (US).
          </div>
        </div>
      </div>
    </div>
  `;

  el.innerHTML = passportHtml;
  document.getElementById("printablePassport").innerHTML = passportHtml;
}

function printPassport() {
  const caseId = document.getElementById("passportCaseSelect").value;
  if (!caseId) { showToast("Please select a case first.", "warning"); return; }
  renderPassport();
  setTimeout(() => window.print(), 200);
}

/* ─── REGIONAL EMERGENCY NETWORK DASHBOARD ────────────── */
function renderNetworkPage() {
  const regFil    = document.getElementById("netRegionFilter")?.value || "all";
  const typeFil   = document.getElementById("netTypeFilter")?.value || "all";
  const capFil    = document.getElementById("netCapFilter")?.value || "all";
  const statusFil = document.getElementById("netStatusFilter")?.value || "all";

  // Filter hospitals
  const hospitals = DEMO_HOSPITALS.filter(h => {
    if (regFil !== "all" && h.region !== regFil) return false;
    if (capFil !== "all" && !h.capabilities.includes(capFil)) return false;
    if (statusFil !== "all" && h.edStatus !== statusFil) return false;
    return true;
  });

  // Calculate Network KPIs
  const totalParticipating = hospitals.length;
  const enRouteCases = state.cases.filter(c => ["accepted", "enroute", "arrived"].includes(c.status)).length;
  const availableBeds = hospitals.filter(h => h.edStatus === "available").length;
  const limitedBeds = hospitals.filter(h => h.edStatus === "limited").length;
  const diversionBeds = hospitals.filter(h => h.edStatus === "full").length;
  const escalationCases = state.cases.filter(c => c.status === "alternative" || c.hospitalReadiness?.status === "unable_escalate" || c.acceptanceRequests?.some(r=>r.status==="declined"));

  // Render Network KPI cards
  const statsEl = document.getElementById("networkStatsGrid");
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="stat-big-card">
        <div class="stat-big-number">${totalParticipating}</div>
        <div class="stat-big-label">Participating Facilities (${regFil === 'all' ? 'All Regions' : regFil})</div>
      </div>
      <div class="stat-big-card">
        <div class="stat-big-number" style="color:var(--blue)">${enRouteCases}</div>
        <div class="stat-big-label">Active In-Transit Cases</div>
      </div>
      <div class="stat-big-card">
        <div class="stat-big-number" style="color:var(--green)">${availableBeds} / ${totalParticipating}</div>
        <div class="stat-big-label">Available / Accepting (${limitedBeds} Limited, ${diversionBeds} Diversion)</div>
      </div>
      <div class="stat-big-card">
        <div class="stat-big-number" style="color:${escalationCases.length ? 'var(--red)' : 'var(--navy)'}">${escalationCases.length}</div>
        <div class="stat-big-label">Escalations / Re-Routing Queue</div>
      </div>
    `;
  }

  // 1. Escalation / Alternative Routing Queue
  const escBadge = document.getElementById("escalationCountBadge");
  if (escBadge) escBadge.textContent = `${escalationCases.length} Pending`;

  const escList = document.getElementById("networkEscalationList");
  if (escList) {
    if (escalationCases.length === 0) {
      escList.innerHTML = `<p class="empty-state">✅ No cases currently require alternative hospital coordination. All active cases successfully accommodated.</p>`;
    } else {
      escList.innerHTML = escalationCases.map(c => {
        const lastDeclined = c.acceptanceRequests?.filter(r=>r.status==="declined").slice(-1)[0];
        return `
          <div class="case-card" style="border-left:4px solid var(--red)">
            <div class="case-card-icon">🚨</div>
            <div class="case-card-body">
              <div class="case-card-title">
                <strong>${escHtml(c.id)}</strong>
                <span class="plate-badge"><span class="plate-badge-ind">IND</span>${escHtml(c.ambPlate || c.ambId)}</span>
                <span class="badge badge-red">ALTERNATIVE COORDINATION REQUIRED</span>
              </div>
              <div class="case-card-meta">
                <span>Category: <strong>${categoryIcon(c.category)} ${escHtml(c.categoryLabel)}</strong></span>
                <span>Priority: <strong>${escHtml(c.priority?.toUpperCase())}</strong></span>
                <span>Location: <strong>${escHtml(c.location)}</strong></span>
              </div>
              <div style="font-size:0.8rem;color:var(--red);margin-top:6px">
                Reason for re-routing: ${escHtml(lastDeclined?.declineReason || c.hospitalReadiness?.reconfirmationReason || "ED saturation / acuity limit")}
              </div>
              <div class="flex-gap" style="margin-top:10px">
                <button class="btn btn-primary btn-small" onclick="showRecommendations('${escHtml(c.id)}')">
                  🔄 Coordinate Alternative Hospital
                </button>
                <button class="btn btn-outline btn-small" onclick="viewCaseDetail('${escHtml(c.id)}')">
                  View Timeline & Vitals
                </button>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // 2. Coverage Gaps & Recurring Bottlenecks Panel
  const bottleEl = document.getElementById("networkBottlenecksList");
  if (bottleEl) {
    bottleEl.innerHTML = `
      <div class="bottleneck-card">
        <div class="bottleneck-header">
          <strong>⚠️ Gurugram NH-8 Trauma Corridor</strong>
          <span class="badge badge-red">High Latency (+18 min)</span>
        </div>
        <p style="font-size:0.78rem;color:var(--text-muted);margin:4px 0">
          <strong>Historical Trend:</strong> Peak traffic congestion 17:30–20:30 causes frequent ambulance transport delays between Manesar and Delhi Level-1 Trauma Centres.
        </p>
        <div style="font-size:0.75rem;color:var(--navy);font-weight:600">
          Current Live Status: 2 trauma bays reporting limited capacity; secondary triage routing recommended.
        </div>
      </div>

      <div class="bottleneck-card">
        <div class="bottleneck-header">
          <strong>🔥 East Delhi Burns Unit Capacity</strong>
          <span class="badge badge-amber">Coverage Deficit</span>
        </div>
        <p style="font-size:0.78rem;color:var(--text-muted);margin:4px 0">
          <strong>Historical Trend:</strong> Recurring deficit in specialized pediatric burn beds during festival seasons. Average transfer distance exceeds 22 km.
        </p>
        <div style="font-size:0.75rem;color:var(--navy);font-weight:600">
          Current Live Status: Safdarjung Hospital burns unit at 88% capacity.
        </div>
      </div>

      <div class="bottleneck-card">
        <div class="bottleneck-header">
          <strong>🧠 South Delhi After-Hours Stroke Unit</strong>
          <span class="badge badge-blue">Verified Active</span>
        </div>
        <p style="font-size:0.78rem;color:var(--text-muted);margin:4px 0">
          <strong>Historical Trend:</strong> Rapid tPA delivery pathways consistently maintained at AIIMS & Max Healthcare with average door-to-needle time under 38 min.
        </p>
        <div style="font-size:0.75rem;color:var(--green);font-weight:600">
          Current Live Status: 2 CT suites staffed and operational for emergency neuro-interventions.
        </div>
      </div>
    `;
  }

  // 3. Participating Facilities Grid
  const countEl = document.getElementById("networkHospCount");
  if (countEl) countEl.textContent = `Showing ${hospitals.length} participating hospitals`;

  const gridEl = document.getElementById("networkHospitalList");
  if (gridEl) {
    if (hospitals.length === 0) {
      gridEl.innerHTML = `<p class="empty-state">No participating hospitals match the selected regional filters.</p>`;
    } else {
      gridEl.innerHTML = hospitals.map(h => {
        const caps = h.capabilities.map(c => `<span class="cap-tag">${c}</span>`).join("");
        const statusCls = h.edStatus === "available" ? "green" : h.edStatus === "limited" ? "amber" : "red";
        const incomingHospCases = state.cases.filter(c => c.selectedHospitalId === h.id && ["accepted", "enroute", "arrived"].includes(c.status));

        return `
          <div class="network-hosp-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <div style="font-weight:700;font-size:0.95rem;color:var(--navy)">🏥 ${escHtml(h.name)}</div>
                <div style="font-size:0.75rem;color:var(--text-muted)">📍 ${escHtml(h.address)} &nbsp;|&nbsp; Region: <strong>${escHtml(h.region || "NCR")}</strong></div>
              </div>
              <span class="status-dot ${statusCls}" title="ED Status: ${h.edStatus}"></span>
            </div>

            <div class="capability-tags" style="margin:8px 0">
              ${caps}
            </div>

            <div style="background:#F8FAFC;border:1px solid var(--border);border-radius:4px;padding:6px 8px;font-size:0.75rem;margin-bottom:8px">
              <div>ED Status: <strong>${escHtml(h.edStatus.toUpperCase())}</strong> &nbsp;|&nbsp; Pressure: <strong>${escHtml(h.reportedPressure || "Normal")}</strong></div>
              <div>Last Updated: <strong>${escHtml(h.lastUpdated)}</strong></div>
            </div>

            <div style="font-size:0.75rem;font-weight:700;color:var(--navy);margin-bottom:4px">
              Incoming En-Route Ambulances: <span class="badge ${incomingHospCases.length ? 'badge-blue' : 'badge-green'}">${incomingHospCases.length}</span>
            </div>
            ${incomingHospCases.length > 0 ? incomingHospCases.map(ic => `
              <div style="font-size:0.72rem;background:#F1F5F9;padding:4px 6px;border-radius:4px;margin-bottom:3px;display:flex;justify-content:space-between">
                <span><span class="plate-badge" style="font-size:0.65rem;padding:1px 4px"><span class="plate-badge-ind">IND</span>${escHtml(ic.ambPlate || ic.ambId)}</span> ${escHtml(ic.id)} (${categoryIcon(ic.category)})</span>
                <span>ETA: <strong>${escHtml(ic.hospitalReadiness?.eta || "12m")}</strong></span>
              </div>
            `).join("") : `<div style="font-size:0.72rem;color:var(--text-muted)">No active ambulances currently en route to this facility.</div>`}

            <div style="margin-top:10px;text-align:right">
              <button class="btn btn-outline btn-small" onclick="viewHospitalDetail('${escHtml(h.id)}')">View Capabilities</button>
            </div>
          </div>
        `;
      }).join("");
    }
  }
}

/* ─── ANALYTICS ───────────────────────────────────────── */
function renderAnalytics() {
  const total    = state.cases.length;
  const active   = state.cases.filter(c => !["complete","closed","cancelled"].includes(c.status)).length;
  const accepted = state.cases.filter(c => c.acceptanceRequests?.some(r=>r.status==="accepted")).length;
  const declined = state.cases.filter(c => c.acceptanceRequests?.some(r=>r.status==="declined")).length;
  const pending  = state.cases.filter(c => ["requested","pending","acknowledged"].includes(c.status)).length;
  const complete = state.cases.filter(c => ["complete","closed"].includes(c.status)).length;
  const handovers= state.cases.filter(c => c.handover).length;

  const items = [
    { label:"Total Cases",       value: total,    color:"" },
    { label:"Active Cases",      value: active,   color:"" },
    { label:"Accepted",          value: accepted, color:"color:var(--green)" },
    { label:"Awaiting Response", value: pending,  color:"color:var(--amber)" },
    { label:"Declined",          value: declined, color:"color:var(--red)" },
    { label:"Handovers Complete",value: handovers,color:"color:var(--blue)" },
    { label:"Cases Closed",      value: complete, color:"" },
  ];

  document.getElementById("analyticsGrid").innerHTML = items.map(item => `
    <div class="stat-big-card">
      <div class="stat-big-number" style="${item.color}">${item.value}</div>
      <div class="stat-big-label">${escHtml(item.label)}</div>
    </div>
  `).join("");
}

/* ─── SETTINGS ────────────────────────────────────────── */
function renderSettings() {
  document.getElementById("settingAmbId").value  = state.settings.ambId  || "";
  document.getElementById("settingCrewName").value= state.settings.crewName|| "";
  document.getElementById("settingOrg").value    = state.settings.org    || "";
  document.getElementById("roleSelect").value    = state.role;
}

function saveSettings() {
  state.settings.ambId   = document.getElementById("settingAmbId").value.trim()  || "AMB-001";
  state.settings.crewName= document.getElementById("settingCrewName").value.trim();
  state.settings.org     = document.getElementById("settingOrg").value.trim();
  saveState();
  showToast("Settings saved.", "success");
  renderAmbDashboard();
}

function confirmResetData() {
  if (confirm("This will permanently delete all demo cases. Are you sure?")) {
    state.cases = [];
    saveState();
    showToast("All demo data has been reset.", "info");
    renderAmbDashboard();
    renderHospDashboard();
  }
}

function restoreSampleData() {
  if (state.cases.length > 0) {
    if (!confirm("This will restore upgraded sample cases. Existing cases will be kept. Continue?")) return;
  }
  const sampleCases = [
    {
      id: "RESQ-DEMO1",
      ambPlate: "DL 1C AB 1234",
      ptRef: "PT-CR-8821",
      category: "cardiac",
      categoryLabel: "Cardiac Emergency",
      location: "12, Station Road, New Delhi",
      coords: { lat: 28.6200, lng: 77.2100 },
      age: "58",
      notes: "Crushing retrosternal chest pain 35 minutes. Diaphoretic. Acute STEMI presentation.",
      priority: "critical",
      ambId: "AMB-001",
      crew: "Paramedic S. Roy",
      org: "Delhi Emergency Medical Services",
      status: "accepted",
      vitals: {
        hr: "108",
        hrTime: new Date(Date.now()-850000).toISOString(),
        bp: "90/60",
        bpTime: new Date(Date.now()-850000).toISOString(),
        spo2: "94",
        spo2Time: new Date(Date.now()-850000).toISOString(),
        rr: "24",
        gcs: "15 (E4V5M6)",
        temp: "36.8"
      },
      injuries: "No external trauma; ST-elevation in leads II, III, aVF on 12-lead ECG",
      interventions: [
        { name: "Aspirin 300mg oral", time: "14:15" },
        { name: "Oxygen 4L/min via nasal cannula", time: "14:18" },
        { name: "18G IV cannula left antecubital fossa", time: "14:20" }
      ],
      clinicalChecklist: {
        history: "Hypertension 8 yrs on Amlodipine; non-smoker",
        allergies: "NKDA",
        verified: true
      },
      crewReview: {
        reviewer: "S. Roy",
        role: "Senior Paramedic (Reg #DL-EMS-402)",
        time: new Date(Date.now()-800000).toISOString()
      },
      docReview: {
        docName: "V. Saxena",
        docReg: "MCI-48192",
        docTime: new Date(Date.now()-780000).toISOString()
      },
      preparationRequirements: [
        { name: "Cath Lab / Primary PCI Suite Activated", category: "Facility", status: "confirmed", confirmedBy: "Dr. A. Sharma", confirmedAt: new Date(Date.now()-650000).toISOString(), notes: "Lab 2 on standby" },
        { name: "Cardiologist / Interventionalist On-Site", category: "Staff", status: "confirmed", confirmedBy: "Dr. A. Sharma", confirmedAt: new Date(Date.now()-650000).toISOString(), notes: "Dr. Nair scrubbed" },
        { name: "Defibrillator & Advanced Resus Ready", category: "Equipment", status: "confirmed", confirmedBy: "Dr. A. Sharma", confirmedAt: new Date(Date.now()-650000).toISOString(), notes: "Resus Bay 1 checked" },
        { name: "Direct Triage Corridor Cleared", category: "Logistics", status: "confirmed", confirmedBy: "Dr. A. Sharma", confirmedAt: new Date(Date.now()-650000).toISOString(), notes: "Direct to cath corridor" }
      ],
      hospitalReadiness: {
        status: "ready",
        department: "Cath Lab Suite 2 / Resus Bay 1",
        acceptingPerson: "Dr. A. Sharma",
        acceptingRole: "ED Consultant & Interventional Lead",
        confirmedAt: new Date(Date.now()-650000).toISOString(),
        eta: "8 min",
        etaSource: "Ambulance Live GPS Navigation",
        conditions: "Direct admission via Emergency Bay 1",
        handoverAck: true,
        reconfirmationNeeded: false,
        reconfirmationReason: null
      },
      gatePass: {
        status: "ready",
        verifiedAt: null,
        verifiedBy: null
      },
      timeline: [
        { status: "created",     time: new Date(Date.now()-900000).toISOString(), note: "Emergency created for ambulance DL 1C AB 1234" },
        { status: "recommended", time: new Date(Date.now()-850000).toISOString(), note: "Pre-arrival clinical checklist reviewed by Paramedic S. Roy & Dr. V. Saxena" },
        { status: "requested",   time: new Date(Date.now()-700000).toISOString(), note: "Acceptance requested from City General Hospital" },
        { status: "accepted",    time: new Date(Date.now()-650000).toISOString(), note: "Hospital ACCEPTED by Dr. A. Sharma (ED Consultant). Cath lab activated. Clinical handover acknowledged." },
        { status: "ready",       time: new Date(Date.now()-640000).toISOString(), note: "Hospital explicitly confirmed preparation: READY FOR ARRIVAL" },
        { status: "enroute",     time: new Date(Date.now()-600000).toISOString(), note: "Ambulance en route. Live GPS ETA 8 min." }
      ],
      selectedHospitalId: "H001",
      acceptanceRequests: [{
        id: "REQ-DEMO1",
        hospId: "H001",
        hospName: "City General Hospital",
        sentAt: new Date(Date.now()-700000).toISOString(),
        status: "accepted",
        respondedAt: new Date(Date.now()-650000).toISOString(),
        respondedBy: "Dr. A. Sharma",
        role: "ED Consultant",
        dept: "Cath Lab Suite 2",
        eta: "8 min",
        etaSource: "Ambulance Live GPS",
        conditions: "Direct admission via Emergency Bay 1",
        handoverAck: true,
        responseNote: "Cath lab activated. Direct to Resus Bay 1.",
        declineReason: null
      }],
      handover: null
    },
    {
      id: "RESQ-DEMO2",
      ambPlate: "DL 1C EF 5678",
      ptRef: "PT-TR-4402",
      category: "trauma",
      categoryLabel: "Accident / Trauma",
      location: "NH-8, Km 42, Gurugram",
      coords: null,
      age: "32",
      notes: "High-speed road traffic collision. Driver, restrained. Blunt chest & pelvic trauma. GCS 13.",
      priority: "critical",
      ambId: "AMB-002",
      crew: "Paramedic M. Khan",
      org: "Haryana Rapid Medical Response",
      status: "complete",
      vitals: {
        hr: "118",
        hrTime: new Date(Date.now()-3500000).toISOString(),
        bp: "105/70",
        bpTime: new Date(Date.now()-3500000).toISOString(),
        spo2: "96",
        spo2Time: new Date(Date.now()-3500000).toISOString(),
        rr: "26",
        gcs: "13 (E3V4M6)",
        temp: "36.5"
      },
      injuries: "Right chest flail segment suspected; pelvic tenderness, stable on binder",
      interventions: [
        { name: "Cervical collar and pelvic binder", time: "12:10" },
        { name: "2x 16G IV access with 500ml Normal Saline", time: "12:15" },
        { name: "High-flow O2 via non-rebreather mask", time: "12:18" }
      ],
      clinicalChecklist: {
        history: "Nil relevant",
        allergies: "NKDA",
        verified: true
      },
      crewReview: {
        reviewer: "M. Khan",
        role: "Critical Care Paramedic",
        time: new Date(Date.now()-3450000).toISOString()
      },
      docReview: null,
      preparationRequirements: [
        { name: "Level-1 Trauma Resus Bay Ready", category: "Facility", status: "confirmed", confirmedBy: "Trauma Registrar", confirmedAt: new Date(Date.now()-3300000).toISOString() },
        { name: "Massive Transfusion Protocol Standby", category: "Blood Products", status: "confirmed", confirmedBy: "Trauma Registrar", confirmedAt: new Date(Date.now()-3300000).toISOString() },
        { name: "CT Scanner Cleared for Arrival", category: "Diagnostics", status: "confirmed", confirmedBy: "Trauma Registrar", confirmedAt: new Date(Date.now()-3300000).toISOString() }
      ],
      hospitalReadiness: {
        status: "ready",
        department: "Trauma Bay 1",
        acceptingPerson: "Dr. Mehta",
        acceptingRole: "Trauma Registrar",
        confirmedAt: new Date(Date.now()-3300000).toISOString(),
        eta: "14 min",
        etaSource: "Ambulance GPS",
        conditions: "Direct trauma team activation",
        handoverAck: true,
        reconfirmationNeeded: false,
        reconfirmationReason: null
      },
      gatePass: {
        status: "handover_completed",
        verifiedAt: new Date(Date.now()-2800000).toISOString(),
        verifiedBy: "Security Officer R. Kumar (Receiving Gate)"
      },
      timeline: [
        { status: "created",   time: new Date(Date.now()-3600000).toISOString(), note: "Emergency created for ambulance DL 1C EF 5678" },
        { status: "requested", time: new Date(Date.now()-3400000).toISOString(), note: "Acceptance requested from District Trauma Centre" },
        { status: "accepted",  time: new Date(Date.now()-3300000).toISOString(), note: "Accepted by Trauma Registrar Dr. Mehta. Trauma bay ready." },
        { status: "ready",     time: new Date(Date.now()-3280000).toISOString(), note: "Hospital confirmed resource readiness: READY FOR ARRIVAL" },
        { status: "enroute",   time: new Date(Date.now()-3200000).toISOString(), note: "Ambulance en route" },
        { status: "arrived",   time: new Date(Date.now()-2800000).toISOString(), note: "Ambulance plate DL 1C EF 5678 verified at gate. ARRIVAL VERIFIED." },
        { status: "handover",  time: new Date(Date.now()-2750000).toISOString(), note: "Stage 1: Handover Information Received acknowledged by Dr. Mehta" },
        { status: "complete",  time: new Date(Date.now()-2700000).toISOString(), note: "Stage 2: Patient Care Formally Transferred to Trauma Bay 1. Handover Completed." }
      ],
      selectedHospitalId: "H003",
      acceptanceRequests: [{
        id: "REQ-DEMO2",
        hospId: "H003",
        hospName: "District Trauma Centre",
        sentAt: new Date(Date.now()-3400000).toISOString(),
        status: "accepted",
        respondedAt: new Date(Date.now()-3300000).toISOString(),
        respondedBy: "Dr. Mehta",
        role: "Trauma Registrar",
        dept: "Trauma Bay 1",
        eta: "14 min",
        etaSource: "Ambulance GPS",
        conditions: "Direct trauma team activation",
        handoverAck: true,
        responseNote: "Trauma bay ready.",
        declineReason: null
      }],
      handover: {
        arrivalTime: new Date(Date.now()-2800000).toISOString(),
        infoReceivedAt: new Date(Date.now()-2750000).toISOString(),
        infoReceivedBy: "Dr. Mehta",
        infoReceivedRole: "Trauma Registrar",
        crewConfirmedBy: "Paramedic M. Khan",
        careTransferredAt: new Date(Date.now()-2700000).toISOString(),
        careTransferredBy: "Dr. Mehta (Trauma Registrar)",
        transferDepartment: "Trauma Bay 1",
        handoverTime: new Date(Date.now()-2700000).toISOString(),
        receivedBy: "Trauma Registrar, Dr. Mehta",
        summary: "32M, RTC driver, GCS 13, pelvic binder applied, bilateral 16G IV access with 500ml NS. Vitals stable."
      }
    },
    {
      id: "RESQ-DEMO3",
      ambPlate: "HR 26 CY 9901",
      ptRef: "PT-ST-1930",
      category: "stroke",
      categoryLabel: "Suspected Stroke",
      location: "45, MG Road, Bengaluru",
      coords: { lat: 12.9780, lng: 77.6000 },
      age: "71",
      notes: "Sudden onset right hemiparesis, facial asymmetry, slurred speech. FAST 3/3 positive. Symptom onset 45 min ago.",
      priority: "critical",
      ambId: "AMB-003",
      crew: "Paramedic R. Iyer",
      org: "Karnataka Emergency Care",
      status: "pending",
      vitals: {
        hr: "84",
        hrTime: new Date(Date.now()-550000).toISOString(),
        bp: "172/98",
        bpTime: new Date(Date.now()-550000).toISOString(),
        spo2: "98",
        spo2Time: new Date(Date.now()-550000).toISOString(),
        rr: "18",
        gcs: "14 (E4V4M6)",
        temp: "37.1"
      },
      injuries: "No signs of physical head injury; acute neurological deficit",
      interventions: [
        { name: "Blood glucose measured: 118 mg/dL", time: "16:20" },
        { name: "20G IV established right forearm", time: "16:22" }
      ],
      clinicalChecklist: {
        history: "Atrial fibrillation on Apixaban; Type 2 Diabetes",
        allergies: "NKDA",
        verified: true
      },
      crewReview: {
        reviewer: "R. Iyer",
        role: "Advanced Paramedic",
        time: new Date(Date.now()-520000).toISOString()
      },
      docReview: null,
      preparationRequirements: [
        { name: "Urgent CT Head / Perfusion Standby", category: "Diagnostics", status: "pending", notes: "Stroke protocol imaging" },
        { name: "Neurology / Stroke Team Available", category: "Staff", status: "pending", notes: "Thrombolysis / EVT evaluation" },
        { name: "ICU / Acute Stroke Bed Ready", category: "Facility", status: "pending", notes: "Monitoring bed" }
      ],
      hospitalReadiness: {
        status: "preparing",
        department: "Stroke Resus Bay",
        acceptingPerson: null,
        acceptingRole: null,
        confirmedAt: null,
        eta: "11 min",
        etaSource: "Ambulance Live GPS",
        conditions: null,
        handoverAck: false,
        reconfirmationNeeded: false,
        reconfirmationReason: null
      },
      gatePass: {
        status: "pending",
        verifiedAt: null,
        verifiedBy: null
      },
      timeline: [
        { status: "created",   time: new Date(Date.now()-600000).toISOString(), note: "Emergency created for ambulance HR 26 CY 9901" },
        { status: "requested", time: new Date(Date.now()-500000).toISOString(), note: "Acceptance requested from Sunrise Neurology Hospital" }
      ],
      selectedHospitalId: "H004",
      acceptanceRequests: [{
        id: "REQ-DEMO3",
        hospId: "H004",
        hospName: "Sunrise Neurology Hospital",
        sentAt: new Date(Date.now()-500000).toISOString(),
        status: "pending",
        respondedAt: null,
        respondedBy: null,
        responseNote: null,
        declineReason: null
      }],
      handover: null
    }
  ];

  sampleCases.forEach(sc => {
    const idx = state.cases.findIndex(c => c.id === sc.id);
    if (idx >= 0) {
      state.cases[idx] = sc;
    } else {
      state.cases.push(sc);
    }
  });

  saveState();
  showToast("Upgraded sample data restored (3 verified cases with registration plates and gate passes).", "success");
  refreshCurrentPage();
}

/* ─── INTERNAL DEMO ACCESS ───────────────────────────── */
// The Admin Dashboard link is for internal testing only. It appears when the site runs
// locally (VS Code Live Server: localhost / 127.0.0.1) or when opened with ?demo=1
// (remembered in this browser; ?demo=0 turns it off). Regular visitors never see it.
function showAdminLinkIfDemo() {
  const params = new URLSearchParams(location.search);
  try {
    if (params.get("demo") === "1") localStorage.setItem("resq_demo", "1");
    if (params.get("demo") === "0") localStorage.removeItem("resq_demo");
  } catch (e) { /* storage blocked: fall back to URL/host only */ }
  let remembered = false;
  try { remembered = localStorage.getItem("resq_demo") === "1"; } catch (e) {}
  const local = ["localhost", "127.0.0.1", "[::1]", "::1", ""].includes(location.hostname);
  const show = params.get("demo") !== "0" && (local || params.get("demo") === "1" || remembered);
  const item = document.getElementById("adminNavItem");
  if (item) item.hidden = !show;
}

/* ─── INIT ────────────────────────────────────────────── */
function init() {
  loadState();
  applyTranslations();

  // Apply saved role to select
  document.getElementById("roleSelect").value = state.role;

  // If no cases at all or missing registration plates, offer sample data
  // Local sample cases only when there is no shared database (they can still be restored in Settings)
  if (!window.ResQDB?.connected && (state.cases.length === 0 || !state.cases.some(c => c.ambPlate))) {
    restoreSampleData();
  }

  showAdminLinkIfDemo();
  showPage(location.hash === "#hospital" ? "hospital" : "ambulance");
  window.addEventListener("hashchange", () => {
    if (location.hash === "#hospital") showPage("hospital");
    else if (location.hash === "#ambulance") showPage("ambulance");
  });
  startSync();
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", init);

