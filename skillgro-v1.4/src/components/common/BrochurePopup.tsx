// src/components/common/BrochurePopup.tsx
"use client"
import { useState } from "react"
import BtnArrow from "@/svg/BtnArrow"

interface BrochurePopupProps {
  isOpen: boolean
  onClose: () => void
}

const BrochurePopup = ({ isOpen, onClose }: BrochurePopupProps) => {
  const [username, setUsername] = useState("")
  const [useremail, setUseremail] = useState("")
  const [userphone, setUserphone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Brochure Data", username, useremail, userphone)
    try {
      const response = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, userphone, useremail }),
      })
      if (!response.ok) {
        console.log("brochure data saved")
      }
    } catch (err) {
      console.log(err)
    }
    // Trigger PDF download
    const link = document.createElement("a")
    link.href = "/Adshalaa-Brochure.pdf"
    link.download = "Adshalaa-Brochure.pdf"
    link.click()
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    // reset after close animation
    setTimeout(() => { setUsername(""); setUseremail(""); setUserphone(""); setSubmitted(false) }, 300)
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 9998, cursor: "pointer"
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff", borderRadius: "16px",
        padding: "40px 36px", width: "90%", maxWidth: "460px",
        zIndex: 9999, boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
      }}>

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            background: "none", border: "none", fontSize: "20px",
            cursor: "pointer", color: "#999", lineHeight: 1
          }}
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📄</div>
            <h3 style={{ marginBottom: "8px", color: "#161439" }}>
              Your download has started!
            </h3>
            <p style={{ color: "#666", marginBottom: "24px" }}>
              Didn't start? <a href="/Adshalaa-Brochure.pdf" download="Adshala-Brochure.pdf" style={{ color: "#4263eb" }}>Click here</a>
            </p>
            <button onClick={handleClose} className="btn btn-two arrow-btn">
              Close <BtnArrow />
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ marginBottom: "6px", color: "#161439", fontSize: "22px" }}>
              Download Our Brochure
            </h3>
            <p style={{ color: "#666", marginBottom: "28px", fontSize: "14px" }}>
              Get detailed course info, fees &amp; placement stats — free.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-grp" style={{ marginBottom: "16px" }}>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  style={{ width: "100%", padding: "7px", borderRadius: "16px", border: "0.5px solid black" }}
                />
              </div>
              <div className="form-grp" style={{ marginBottom: "16px" }}>
                <input
                  type="tel"
                  placeholder="Your Phone Number *"
                  value={userphone}
                  onChange={e => setUserphone(e.target.value)}
                  required
                  style={{ width: "100%", padding: "7px", borderRadius: "16px", border: "0.5px solid black" }}
                />
              </div>
              <div className="form-grp" style={{ marginBottom: "24px" }}>
                <input
                  type="email"
                  placeholder="Your Email Address *"
                  value={useremail}
                  onChange={e => setUseremail(e.target.value)}
                  required
                  style={{ width: "100%", padding: "7px", borderRadius: "16px", border: "0.5px solid black" }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-two arrow-btn"
                style={{ width: "100%" }}
              >
                Download Brochure <BtnArrow />
              </button>
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default BrochurePopup