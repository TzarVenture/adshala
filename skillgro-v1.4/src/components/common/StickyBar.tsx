"use client"

import React from "react";
import Link from "next/link";
import { useState } from "react"
import { FaWhatsapp, FaFileAlt, FaEnvelope } from "react-icons/fa";
import "./StickyBar.css";
import BrochurePopup from "@/components/common/BrochurePopup"

const WHATSAPP_NUMBER = "911234567890"; // replace with real number
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const BROCHURE_LINK = "/Adshala_Complete_A4_Brochure_2025 (1).pdf";
import { useRouter } from "next/navigation";

const StickyBar: React.FC = () => {
    const router = useRouter();
    const [brochureOpen, setBrochureOpen] = useState(false)
  return (
    <div className="sticky-bar" role="navigation" aria-label="site actions">
      <span className="sticky-action action-left" onClick={() =>{
                                    setBrochureOpen(true); 
                                    }} >
        <FaFileAlt className="icon" />
        <span className="label">Get Brochure</span>
      </span>

      <a className="sticky-action action-center" href="https://wa.me/918652199991" target="_blank" rel="noreferrer">
        <FaWhatsapp className="icon whatsapp" color="white" size={30}/>
        {/* <span className="label">WhatsApp</span> */}
      </a>

      <button className="sticky-action action-right" onClick={() => {
    const form = document.getElementById("enquiry-form01");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/#enquiry-form01");
    }
  }}>
        <FaEnvelope className="icon" />
        <span className="label">Enquire Now</span>
      </button>
               <BrochurePopup isOpen={brochureOpen} onClose={() => setBrochureOpen(false)} />

    </div>
  );
};

export default StickyBar;
