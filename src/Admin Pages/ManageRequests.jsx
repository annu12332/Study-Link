import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";

/* ═══════════════════════════════════════════════════
   INLINE SVG ICON PATHS
═══════════════════════════════════════════════════ */
const Ico = ({ d, size=16, color="currentColor", style={} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,...style}}>
    <path d={d}/>
  </svg>
);
const P = {
  search:  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevD:   "M6 9l6 6 6-6",
  chevU:   "M18 15l-6-6-6 6",
  trash:   "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  pdf:     "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15h6M9 11h6M9 19h4",
  user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  mail:    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  phone:   "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.1 1.11h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92z",
  map:     "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z",
  globe:   "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  grad:    "M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5",
  book:    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  flag:    "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
  filter:  "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  sort:    "M3 6h18M7 12h10M11 18h2",
  refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  copy:    "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2M8 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2M8 4h8",
  check:   "M20 6L9 17l-5-5",
  clock:   "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2",
  spin:    "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  alert:   "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  uni:     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  xmark:   "M18 6L6 18M6 6l12 12",
};

/* ═══════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════ */
const STATUS_CFG = {
  Pending:       { bg:"#FFF7ED", border:"#FED7AA", color:"#C2410C", dot:"#F97316", step:0 },
  Contacted:     { bg:"#EFF6FF", border:"#BFDBFE", color:"#1D4ED8", dot:"#3B82F6", step:1 },
  "In Progress": { bg:"#F5F3FF", border:"#DDD6FE", color:"#6D28D9", dot:"#8B5CF6", step:2 },
  Completed:     { bg:"#F0FDF4", border:"#BBF7D0", color:"#15803D", dot:"#22C55E", step:3 },
  Rejected:      { bg:"#FFF1F2", border:"#FECDD3", color:"#BE123C", dot:"#F43F5E", step:-1 },
};
const STEPS = ["Pending","Contacted","In Progress","Completed"];

const fmt     = v => v || "—";
const fmtDate = d => d ? new Date(d).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}) : "—";
const initials = n => (n||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
const avatarGrad = name => {
  const g=[["#1e40af","#3b82f6"],["#065f46","#10b981"],["#7c2d12","#f97316"],
           ["#4c1d95","#8b5cf6"],["#881337","#f43f5e"],["#164e63","#06b6d4"]];
  return `linear-gradient(135deg,${g[(name||"X").charCodeAt(0)%g.length][0]},${g[(name||"X").charCodeAt(0)%g.length][1]})`;
};

/* ═══════════════════════════════════════════════════
   PDF  —  simple, clean, user-friendly
═══════════════════════════════════════════════════ */
const generatePDF = app => {
  const doc = new jsPDF({ unit:"mm", format:"a4", orientation:"portrait" });
  const W = 210, H = 297, M = 20;

  // helpers
  const safe = v => (v !== null && v !== undefined && String(v).trim() !== "") ? String(v).trim() : "Not provided";
  const bold   = ()  => doc.setFont("helvetica","bold");
  const normal = ()  => doc.setFont("helvetica","normal");
  const size   = n   => doc.setFontSize(n);
  const gray   = n   => doc.setTextColor(n,n,n);
  const rgb    = (r,g,b) => doc.setTextColor(r,g,b);
  const fill   = (r,g,b) => doc.setFillColor(r,g,b);
  const line   = (x1,y1,x2,y2,r,g,b,w=0.3) => {
    doc.setDrawColor(r,g,b); doc.setLineWidth(w); doc.line(x1,y1,x2,y2);
  };

  let y = 0;

  /* ─── TOP BLUE BAR ─── */
  fill(30,80,180); doc.rect(0,0,W,18,"F");
  bold(); size(15); rgb(255,255,255);
  doc.text("Student Application Record", M, 12);

  // status chip on right
  const st = safe(app.status);
  const chipColors = {
    Pending:[245,158,11], Contacted:[59,130,246],
    "In Progress":[139,92,246], Completed:[34,197,94], Rejected:[239,68,68]
  };
  const [cr,cg,cb] = chipColors[st] || chipColors.Pending;
  fill(cr,cg,cb); doc.rect(W-M-36, 4, 36, 10, "F");
  bold(); size(8); rgb(255,255,255);
  doc.text(st.toUpperCase(), W-M-18, 10.5, {align:"center"});

  y = 26;

  /* ─── APPLICANT NAME BLOCK ─── */
  bold(); size(18); gray(20);
  doc.text(safe(app.applicantName), M, y);
  y += 5;
  normal(); size(9); gray(100);
  doc.text(safe(app.email) + "   |   " + safe(app.mobile), M, y);
  y += 4;
  doc.text("Area: " + safe(app.area), M, y);
  y += 3;

  // divider
  line(M, y, W-M, y, 200,210,225, 0.4);
  y += 6;

  /* ─── META ROW ─── */
  normal(); size(8); gray(130);
  doc.text("Application ID: " + safe(app._id), M, y);
  doc.text("Submitted: " + fmtDate(app.createdAt), W-M, y, {align:"right"});
  y += 5;
  line(M, y, W-M, y, 220,228,238, 0.3);
  y += 8;

  /* ─── SECTION RENDERER ─── */
  const section = (title, fields) => {
    // section title
    bold(); size(9); rgb(30,80,180);
    doc.text(title.toUpperCase(), M, y);
    y += 1;
    line(M, y, W-M, y, 30,80,180, 0.5);
    y += 4;

    // 2-column label+value rows
    const col2 = (W - M*2) / 2;
    fields.forEach((row, i) => {
      const x = i % 2 === 0 ? M : M + col2;
      if (i % 2 === 0 && i > 0) y += 8;

      // label
      normal(); size(7.5); gray(140);
      doc.text(String(row.label), x, y);

      // value
      bold(); size(9); 
      const v = safe(row.val);
      if (v === "Not provided") { gray(195); } else { gray(30); }
      doc.text(v, x, y+4.5, {maxWidth: col2 - 4});
    });

    // if odd number of fields, last row was alone
    if (fields.length % 2 !== 0) y += 8;
    else y += 8;

    y += 6;
  };

  /* ─── ALL SECTIONS ─── */
  section("Personal Information", [
    {label:"Full Name",       val:app.applicantName},
    {label:"Gender",          val:app.gender},
    {label:"Date of Birth",   val:app.dob},
    {label:"Guardian Name",   val:app.guardianName},
    {label:"Mobile Number",   val:app.mobile},
    {label:"Area / Address",  val:app.area},
  ]);

  section("English Proficiency", [
    {label:"IELTS Score",     val:app.ielts},
    {label:"PTE Score",       val:app.pte},
    {label:"Duolingo Score",  val:app.duolingo},
    {label:"SAT Score",       val:app.sat},
    {label:"ACT Score",       val:app.act},
  ]);

  section("Academic Background", [
    {label:"SSC Board",          val:app.sscBoard},
    {label:"SSC Passing Year",   val:app.sscYear},
    {label:"SSC GPA",            val:app.sscGpaVal},
    {label:"HSC Board",          val:app.hscBoard},
    {label:"HSC Passing Year",   val:app.hscYear},
    {label:"HSC GPA",            val:app.hscGpaVal},
    {label:"University Name",    val:app.ugUni},
    {label:"Degree Programme",   val:app.ugDegree},
    {label:"University CGPA",    val:app.ugGpa},
  ]);

  section("Study Destination", [
    {label:"Desired Country",    val:app.desiredCountry},
    {label:"Target University",  val:app.desiredUniversity},
    {label:"Desired Course",     val:app.desiredCourse},
  ]);

  /* ─── FOOTER ─── */
  line(M, H-16, W-M, H-16, 200,210,225, 0.4);
  normal(); size(7.5); gray(160);
  doc.text("Confidential  |  For Admin Use Only", M, H-10);
  const d = new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
  doc.text("Generated: " + d, W-M, H-10, {align:"right"});

  doc.save(safe(app.applicantName) + "_Application.pdf");
};

/* ═══════════════════════════════════════════════════
   SMALL COMPONENTS
═══════════════════════════════════════════════════ */

const StatusBadge = ({status}) => {
  const c = STATUS_CFG[status]||STATUS_CFG.Pending;
  return (
    <span style={{background:c.bg,color:c.color,border:`1px solid ${c.border}`}}
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide whitespace-nowrap">
      <span style={{background:c.dot}} className="w-1.5 h-1.5 rounded-full"/>
      {status||"Pending"}
    </span>
  );
};

const Pipeline = ({status}) => {
  const cur = STATUS_CFG[status]?.step??0;
  const rej = status==="Rejected";
  return (
    <div className="flex items-center w-full">
      {STEPS.map((s,i)=>{
        const done=!rej&&cur>=i, active=!rej&&cur===i, c=STATUS_CFG[s];
        return (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center flex-shrink-0">
              <div style={{
                background:done?c.dot:"#e2e8f0",
                border:active?`2px solid ${c.dot}`:"2px solid transparent",
                boxShadow:active?`0 0 0 4px ${c.dot}25`:""
              }} className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300">
                {done
                  ? <Ico d={P.check} size={12} color="white" style={{strokeWidth:3}}/>
                  : <span className="w-2 h-2 rounded-full bg-slate-300"/>}
              </div>
              <span className={`text-[9px] font-bold mt-1 ${done?"text-slate-600":"text-slate-300"}`}>{s}</span>
            </div>
            {i<STEPS.length-1&&(
              <div style={{background:!rej&&cur>i?STATUS_CFG[STEPS[i]].dot:"#e2e8f0",flex:1}}
                className="h-0.5 mx-1 mb-4 transition-all duration-500"/>
            )}
          </React.Fragment>
        );
      })}
      {rej&&<div className="ml-3 flex items-center gap-1 text-rose-500 text-[11px] font-bold whitespace-nowrap">
        <Ico d={P.xmark} size={13} color="#f43f5e"/>Rejected
      </div>}
    </div>
  );
};

const CopyField = ({value}) => {
  const [copied,setCopied] = useState(false);
  if(!value||value==="—") return <span className="text-slate-300 italic text-sm">Not provided</span>;
  return (
    <button onClick={e=>{e.stopPropagation();navigator.clipboard.writeText(value).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),1800);});}}
      title="Click to copy" className="flex items-center gap-1 group/c text-left transition-colors hover:text-blue-600">
      <span className="font-semibold text-slate-800 text-sm group-hover/c:text-blue-600">{value}</span>
      <span className="opacity-0 group-hover/c:opacity-100 transition-opacity ml-0.5">
        {copied
          ? <Ico d={P.check} size={11} color="#22c55e"/>
          : <Ico d={P.copy} size={11} color="#94a3b8"/>}
      </span>
    </button>
  );
};

const InfoCard = ({label,value,icon,copyable=false,highlight=false}) => (
  <div style={highlight&&value?{background:"linear-gradient(135deg,#eff6ff,#f0fdf4)",border:"1px solid #bfdbfe"}:{}}
    className={`flex flex-col gap-1.5 rounded-xl p-3.5 transition-all duration-150
    ${highlight&&value?"":"bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-sm"}`}>
    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold uppercase tracking-widest">
      {icon&&<span className="text-blue-400 flex-shrink-0">{icon}</span>}
      {label}
    </div>
    {copyable
      ? <CopyField value={value}/>
      : <p className={`font-semibold text-sm leading-snug ${value?"text-slate-800":"text-slate-300 font-normal italic"}`}>
          {value||"Not provided"}
        </p>}
  </div>
);

const Section = ({title,icon,accent="#3b82f6",children,cols=3}) => (
  <div>
    <div className="flex items-center gap-2.5 mb-3">
      <div style={{background:accent+"18",color:accent}} className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <h4 className="font-bold text-slate-700 text-sm">{title}</h4>
      <div className="flex-1 h-px bg-slate-100"/>
    </div>
    <div style={{gridTemplateColumns:`repeat(${cols},minmax(0,1fr))`}} className="grid gap-2.5">
      {children}
    </div>
  </div>
);

const StatCard = ({label,value,color,icon}) => (
  <div style={{background:color+"12",border:`1px solid ${color}30`}}
    className="flex items-center gap-3 px-4 py-3 rounded-2xl flex-shrink-0 min-w-[100px]">
    <div style={{color}}>{icon}</div>
    <div>
      <p style={{color}} className="text-2xl font-black leading-none">{value}</p>
      <p className="text-slate-500 text-[11px] font-semibold mt-0.5">{label}</p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════ */
export default function ApplicationRequests() {
  const [applications,setApplications] = useState([]);
  const [expandedId,setExpandedId]     = useState(null);
  const [loading,setLoading]           = useState(true);
  const [searchTerm,setSearchTerm]     = useState("");
  const [statusFilter,setStatusFilter] = useState("All");
  const [sortNewest,setSortNewest]     = useState(true);
  const [generating,setGenerating]     = useState(null);
  const [toast,setToast]               = useState(null);

  const showToast = (msg,type="success") => {
    setToast({msg,type}); setTimeout(()=>setToast(null),2800);
  };

  useEffect(()=>{fetchApplications();},[]);

  const fetchApplications = async()=>{
    try{
      const res = await axios.get("https://studylinkserver.thinkcodify.site/api/admin/applications");
      const data=res.data.applications||res.data.data||(Array.isArray(res.data)?res.data:[]);
      setApplications(data);
    }catch(e){console.error(e);showToast("Failed to load applications","error");}
    finally{setLoading(false);}
  };

  const updateStatus = async(id,newStatus,e)=>{
    e?.stopPropagation();
    try{
      await axios.patch(`https://studylinkserver.thinkcodify.site/api/admin/applications/${id}/status`,{status:newStatus});
      setApplications(p=>p.map(a=>a._id===id?{...a,status:newStatus}:a));
      showToast(`Status updated to "${newStatus}"`);
    }catch{showToast("Status update failed","error");}
  };

  const deleteApplication = async(id,e)=>{
    e?.stopPropagation();
    if(!window.confirm("Permanently delete this application? This cannot be undone.")) return;
    try{
      await axios.delete(`https://studylinkserver.thinkcodify.site/api/admin/applications/${id}`);
      setApplications(p=>p.filter(a=>a._id!==id));
      if(expandedId===id) setExpandedId(null);
      showToast("Application deleted");
    }catch{showToast("Delete failed","error");}
  };

  const handleDownloadPDF = (app,e)=>{
    e?.stopPropagation();
    setGenerating(app._id);
    setTimeout(()=>{
      try{generatePDF(app);showToast("PDF downloaded!");}
      catch(err){console.error(err);showToast("PDF generation failed","error");}
      finally{setGenerating(null);}
    },60);
  };

  const filtered = applications
    .filter(app=>{
      const s=searchTerm.toLowerCase();
      const ms=(app.applicantName||"").toLowerCase().includes(s)
             ||(app.email||"").toLowerCase().includes(s)
             ||(app.desiredCountry||"").toLowerCase().includes(s)
             ||(app.desiredCourse||"").toLowerCase().includes(s);
      const mf=statusFilter==="All"||(app.status||"Pending")===statusFilter;
      return ms&&mf;
    })
    .sort((a,b)=>sortNewest?new Date(b.createdAt)-new Date(a.createdAt):new Date(a.createdAt)-new Date(b.createdAt));

  const counts=Object.fromEntries(Object.keys(STATUS_CFG).map(k=>[k,applications.filter(a=>(a.status||"Pending")===k).length]));

  /* ── loading ── */
  if(loading) return (
    <div style={{background:"linear-gradient(135deg,#f0f4ff,#f8faff)"}} className="h-screen flex items-center justify-center">
      <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}}
        className="flex flex-col items-center gap-5">
        <div style={{background:"linear-gradient(135deg,#1e40af,#06b6d4)"}}
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl">
          <Ico d={P.grad} size={28} color="white"/>
        </div>
        <div className="flex gap-1.5">
          {[0,1,2].map(i=>(
            <motion.div key={i} className="w-2 h-2 rounded-full bg-blue-400"
              animate={{y:[0,-8,0]}} transition={{repeat:Infinity,duration:0.8,delay:i*0.15}}/>
          ))}
        </div>
        <p className="text-slate-500 text-sm font-medium">Loading applications…</p>
      </motion.div>
    </div>
  );

  return (
    <div style={{background:"linear-gradient(150deg,#f0f5ff 0%,#f8faff 50%,#ecfdf5 100%)",minHeight:"100vh",fontFamily:"'DM Sans',system-ui,sans-serif"}}>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast&&(
          <motion.div initial={{y:-60,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-60,opacity:0}}
            style={{background:toast.type==="error"?"#fef2f2":"#f0fdf4",
                    border:`1px solid ${toast.type==="error"?"#fecaca":"#bbf7d0"}`,
                    color:toast.type==="error"?"#dc2626":"#15803d"}}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-semibold whitespace-nowrap">
            <Ico d={toast.type==="error"?P.alert:P.check} size={14} color="currentColor"/>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PDF overlay ── */}
      <AnimatePresence>
        {generating&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{background:"rgba(10,20,60,0.72)",backdropFilter:"blur(8px)"}}>
            <motion.div initial={{scale:0.85}} animate={{scale:1}} exit={{scale:0.85}}
              className="bg-white rounded-3xl px-12 py-10 flex flex-col items-center shadow-2xl">
              <div style={{background:"linear-gradient(135deg,#1e40af,#06b6d4)"}}
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                <Ico d={P.pdf} size={26} color="white"/>
              </div>
              <div className="flex gap-1.5 mb-4">
                {[0,1,2].map(i=>(
                  <motion.div key={i} className="w-2.5 h-2.5 rounded-full bg-blue-500"
                    animate={{scale:[1,1.4,1]}} transition={{repeat:Infinity,duration:0.7,delay:i*0.15}}/>
                ))}
              </div>
              <p className="font-bold text-slate-800 text-lg">Building PDF</p>
              <p className="text-slate-400 text-sm mt-1">Compiling all details onto one page…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* ══ HEADER ══ */}
        <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div style={{background:"linear-gradient(135deg,#1e40af,#06b6d4)"}}
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Ico d={P.grad} size={26} color="white"/>
              </div>
              <div>
                <h1 style={{fontWeight:900,letterSpacing:"-0.02em"}} className="text-3xl text-slate-900 leading-tight">
                  Student Applications
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">{applications.length} total records · Admin Dashboard</p>
              </div>
            </div>
            <button onClick={fetchApplications}
              className="self-start md:self-auto flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 border border-slate-200 bg-white rounded-xl px-4 py-2.5 transition hover:border-blue-300 hover:shadow-sm">
              <Ico d={P.refresh} size={13}/> Refresh
            </button>
          </div>
        </motion.div>

        {/* ══ STATS ══ */}
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.05}}
          className="flex flex-wrap gap-3 mb-6">
          <StatCard label="Total"       value={applications.length}    color="#3b82f6" icon={<Ico d={P.user}  size={18} color="#3b82f6"/>}/>
          <StatCard label="Pending"     value={counts.Pending||0}      color="#f97316" icon={<Ico d={P.clock} size={18} color="#f97316"/>}/>
          <StatCard label="In Progress" value={counts["In Progress"]||0} color="#8b5cf6" icon={<Ico d={P.spin}  size={18} color="#8b5cf6"/>}/>
          <StatCard label="Completed"   value={counts.Completed||0}    color="#22c55e" icon={<Ico d={P.check} size={18} color="#22c55e"/>}/>
          <StatCard label="Rejected"    value={counts.Rejected||0}     color="#f43f5e" icon={<Ico d={P.alert} size={18} color="#f43f5e"/>}/>
        </motion.div>

        {/* ══ TOOLBAR ══ */}
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Ico d={P.search} size={14} color="#94a3b8" style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)"}}/>
            <input className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
              placeholder="Search by name, email or destination…"
              value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
            {searchTerm&&<button onClick={()=>setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 text-xl leading-none">×</button>}
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
            <Ico d={P.filter} size={13} color="#94a3b8"/>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
              className="text-sm font-semibold text-slate-600 bg-transparent focus:outline-none cursor-pointer pr-2">
              <option value="All">All Statuses</option>
              {Object.keys(STATUS_CFG).map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={()=>setSortNewest(p=>!p)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 border border-slate-200 bg-slate-50 rounded-xl px-3 py-2.5 transition flex-shrink-0">
            <Ico d={P.sort} size={14}/>{sortNewest?"Newest first":"Oldest first"}
          </button>
          <div className="flex items-center px-3.5 bg-blue-50 border border-blue-100 rounded-xl flex-shrink-0">
            <span className="text-blue-700 font-black text-sm">{filtered.length}</span>
            <span className="text-blue-400 text-xs ml-1">results</span>
          </div>
        </motion.div>

        {/* ══ LIST ══ */}
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((app,idx)=>{
              const isOpen=expandedId===app._id;
              const cfg=STATUS_CFG[app.status||"Pending"];
              return (
                <motion.div key={app._id}
                  initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                  transition={{delay:idx*0.02}}
                  style={{border:isOpen?`2px solid ${cfg.dot}44`:"2px solid #e2e8f0"}}
                  className={`bg-white rounded-2xl overflow-hidden transition-shadow duration-200 ${isOpen?"shadow-lg":"shadow-sm"}`}>

                  {/* ── Row header ── */}
                  <div className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/60 transition-colors group"
                    onClick={()=>setExpandedId(isOpen?null:app._id)}>
                    <div className="flex items-center gap-4 min-w-0">
                      <div style={{background:avatarGrad(app.applicantName),flexShrink:0}}
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-base shadow-sm">
                        {initials(app.applicantName)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-800 text-[15px]">{app.applicantName||"Unknown"}</h3>
                          <StatusBadge status={app.status||"Pending"}/>
                        </div>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-xs text-slate-400 flex items-center gap-1 truncate max-w-[200px]">
                            <Ico d={P.mail} size={11} color="#94a3b8"/>{app.email||"—"}
                          </span>
                          {app.mobile&&<span className="text-xs text-slate-400 flex items-center gap-1">
                            <Ico d={P.phone} size={11} color="#94a3b8"/>{app.mobile}
                          </span>}
                          {app.desiredCountry&&<span className="text-xs text-slate-400 flex items-center gap-1">
                            <Ico d={P.globe} size={11} color="#94a3b8"/>{app.desiredCountry}
                          </span>}
                          {app.desiredCourse&&<span className="hidden md:flex text-xs text-slate-400 items-center gap-1 truncate max-w-[140px]">
                            <Ico d={P.book} size={11} color="#94a3b8"/>{app.desiredCourse}
                          </span>}
                          <span className="text-[11px] text-slate-300 flex items-center gap-1">
                            <Ico d={P.clock} size={10} color="#cbd5e1"/>{fmtDate(app.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                      {app.desiredUniversity&&<span className="hidden xl:flex items-center gap-1 text-[11px] text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1">
                        <Ico d={P.uni} size={11} color="#94a3b8"/>{app.desiredUniversity}
                      </span>}
                      <div style={{color:isOpen?cfg.dot:"#cbd5e1"}} className="transition-colors">
                        <Ico d={isOpen?P.chevU:P.chevD} size={18}/>
                      </div>
                    </div>
                  </div>

                  {/* ── Expanded panel ── */}
                  <AnimatePresence>
                    {isOpen&&(
                      <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}
                        exit={{height:0,opacity:0}} transition={{duration:0.3,ease:"easeInOut"}}>

                        <div style={{borderTop:`2px solid ${cfg.dot}22`}} className="px-5 py-6 space-y-6">

                          {/* Progress */}
                          <div className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Application Progress</p>
                            <Pipeline status={app.status||"Pending"}/>
                          </div>

                          {/* Action bar */}
                          <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl"
                            style={{background:"#f8faff",border:"1px solid #dbeafe"}}
                            onClick={e=>e.stopPropagation()}>
                            {/* PDF button */}
                            <button type="button"
                              onClick={e=>handleDownloadPDF(app,e)}
                              disabled={!!generating}
                              style={{background:"linear-gradient(135deg,#1e40af,#3b82f6)"}}
                              className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 shadow-md shadow-blue-200 disabled:opacity-50 transition">
                              <Ico d={generating===app._id?P.spin:P.pdf} size={14} color="white"/>
                              {generating===app._id?"Building PDF…":"Download PDF"}
                            </button>
                            {/* Status selector */}
                            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-sm"
                              onClick={e=>e.stopPropagation()}>
                              <Ico d={P.flag} size={13} color="#94a3b8"/>
                              <span className="text-xs text-slate-400 font-semibold">Status</span>
                              <select value={app.status||"Pending"}
                                onChange={e=>updateStatus(app._id,e.target.value,e)}
                                onClick={e=>e.stopPropagation()}
                                className="text-sm font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer">
                                {Object.keys(STATUS_CFG).map(s=><option key={s}>{s}</option>)}
                              </select>
                            </div>
                            {/* App ID */}
                            <div className="flex items-center gap-1.5 bg-white border border-slate-100 rounded-xl px-3 py-2.5 text-[11px] text-slate-400 font-mono">
                              <Ico d={P.eye} size={11} color="#94a3b8"/>
                              ID: …{app._id?.slice(-8)||"—"}
                            </div>
                            {/* Date badge */}
                            <div className="flex items-center gap-1.5 bg-white border border-slate-100 rounded-xl px-3 py-2.5 text-[11px] text-slate-500 font-medium">
                              <Ico d={P.clock} size={11} color="#94a3b8"/>
                              Submitted {fmtDate(app.createdAt)}
                            </div>
                            {/* Delete */}
                            <button type="button"
                              onClick={e=>deleteApplication(app._id,e)}
                              className="flex items-center gap-2 border border-rose-100 text-rose-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 px-4 py-2.5 rounded-xl text-sm font-bold transition ml-auto">
                              <Ico d={P.trash} size={13} color="currentColor"/>Delete
                            </button>
                          </div>

                          {/* Personal */}
                          <Section title="Personal Information" cols={3} accent="#3b82f6"
                            icon={<Ico d={P.user} size={15} color="#3b82f6"/>}>
                            <InfoCard label="Full Name"      value={app.applicantName} copyable highlight/>
                            <InfoCard label="Gender"         value={app.gender}/>
                            <InfoCard label="Date of Birth"  value={app.dob} icon={<Ico d={P.clock} size={11} color="#94a3b8"/>}/>
                            <InfoCard label="Guardian Name"  value={app.guardianName}/>
                            <InfoCard label="Mobile Number"  value={app.mobile}  copyable icon={<Ico d={P.phone} size={11} color="#94a3b8"/>}/>
                            <InfoCard label="Area / Address" value={app.area}    icon={<Ico d={P.map} size={11} color="#94a3b8"/>}/>
                          </Section>

                          {/* Contact */}
                          <Section title="Contact Details" cols={2} accent="#06b6d4"
                            icon={<Ico d={P.mail} size={15} color="#06b6d4"/>}>
                            <InfoCard label="Email Address" value={app.email}  copyable highlight icon={<Ico d={P.mail} size={11} color="#94a3b8"/>}/>
                            <InfoCard label="Phone Number"  value={app.mobile} copyable icon={<Ico d={P.phone} size={11} color="#94a3b8"/>}/>
                          </Section>

                          {/* English */}
                          <Section title="English Proficiency Scores" cols={5} accent="#8b5cf6"
                            icon={<Ico d={P.book} size={15} color="#8b5cf6"/>}>
                            <InfoCard label="IELTS"    value={app.ielts}    highlight={!!app.ielts}/>
                            <InfoCard label="PTE"      value={app.pte}      highlight={!!app.pte}/>
                            <InfoCard label="Duolingo" value={app.duolingo} highlight={!!app.duolingo}/>
                            <InfoCard label="SAT"      value={app.sat}      highlight={!!app.sat}/>
                            <InfoCard label="ACT"      value={app.act}      highlight={!!app.act}/>
                          </Section>

                          {/* Academic */}
                          <Section title="Academic Background" cols={3} accent="#f97316"
                            icon={<Ico d={P.grad} size={15} color="#f97316"/>}>
                            <InfoCard label="SSC Board"        value={app.sscBoard}/>
                            <InfoCard label="SSC Passing Year" value={app.sscYear}/>
                            <InfoCard label="SSC GPA"          value={app.sscGpaVal} highlight={!!app.sscGpaVal}/>
                            <InfoCard label="HSC Board"        value={app.hscBoard}/>
                            <InfoCard label="HSC Passing Year" value={app.hscYear}/>
                            <InfoCard label="HSC GPA"          value={app.hscGpaVal} highlight={!!app.hscGpaVal}/>
                            <InfoCard label="University"       value={app.ugUni}   icon={<Ico d={P.uni} size={11} color="#94a3b8"/>}/>
                            <InfoCard label="Degree"           value={app.ugDegree}/>
                            <InfoCard label="University CGPA"  value={app.ugGpa}   highlight={!!app.ugGpa}/>
                          </Section>

                          {/* Destination */}
                          <Section title="Study Destination" cols={3} accent="#22c55e"
                            icon={<Ico d={P.globe} size={15} color="#22c55e"/>}>
                            <InfoCard label="Desired Country"   value={app.desiredCountry}    highlight icon={<Ico d={P.flag} size={11} color="#94a3b8"/>}/>
                            <InfoCard label="Target University" value={app.desiredUniversity} highlight icon={<Ico d={P.uni}  size={11} color="#94a3b8"/>}/>
                            <InfoCard label="Desired Course"    value={app.desiredCourse}     highlight icon={<Ico d={P.book} size={11} color="#94a3b8"/>}/>
                          </Section>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filtered.length===0&&!loading&&(
          <motion.div initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}}
            className="flex flex-col items-center justify-center py-32 text-center">
            <div style={{background:"linear-gradient(135deg,#f1f5f9,#e2e8f0)"}}
              className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6">
              <Ico d={P.user} size={42} color="#cbd5e1"/>
            </div>
            <p className="text-xl font-bold text-slate-400">No applications found</p>
            <p className="text-slate-300 text-sm mt-1.5">Try adjusting your search or filter</p>
            {(searchTerm||statusFilter!=="All")&&(
              <button onClick={()=>{setSearchTerm("");setStatusFilter("All");}}
                className="mt-5 text-sm font-bold text-blue-500 hover:text-blue-700 border border-blue-200 rounded-xl px-5 py-2.5 transition hover:bg-blue-50">
                Clear all filters
              </button>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
}