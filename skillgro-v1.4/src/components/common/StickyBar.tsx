"use client"

import React from "react";
import Link from "next/link";
import EnquiryPopup from "@/modals/EnquiryPopup"
import { SlEnvolope } from "react-icons/sl";
import { useState } from "react"
import { FaWhatsapp, FaFileAlt, FaEnvelope } from "react-icons/fa";
import "./StickyBar.css";
import BrochurePopup from "@/components/common/BrochurePopup"
import { MdOutlineFileDownload } from "react-icons/md";
const WHATSAPP_NUMBER = "911234567890"; // replace with real number
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const BROCHURE_LINK = "/Adshala_Complete_A4_Brochure_new.pdf";
import { useRouter } from "next/navigation";

const StickyBar: React.FC = () => {
  const router = useRouter();
  const [brochureOpen, setBrochureOpen] = useState(false)
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
  return (
    <div className="sticky-bar" role="navigation" aria-label="site actions">
      <span className="sticky-action action-left" onClick={() => {
        setBrochureOpen(true);
      }} >
        <MdOutlineFileDownload className="icon" size={25} />
        <span className="label">Get Brochure</span>
      </span>

      <a className="sticky-action action-center" href="https://wa.me/918652199991" target="_blank" rel="noreferrer">
        <FaWhatsapp className="icon whatsapp" color="white" size={30} />
        {/* <span className="label">WhatsApp</span> */}
      </a>

      <button className="sticky-action action-right" onClick={() => setIsEnquiryOpen(true)}>
        {/* <FaEnvelope className="icon" size={25} /> */}
        <SlEnvolope size={25} />
        <span className="label">Enquire Now</span>
      </button>
      <BrochurePopup isOpen={brochureOpen} onClose={() => setBrochureOpen(false)} />
      <EnquiryPopup
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        videoId="b2Az7_lLh3g"
      />
    </div>
  );
};

export default StickyBar;
