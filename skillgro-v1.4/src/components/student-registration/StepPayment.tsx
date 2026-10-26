"use client";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import course_data from "@/data/home-data/CourseData";

const Minimum_Fee = Number(process.env.NEXT_PUBLIC_MIN_FEE) || 2000;

export default function StepPayment() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const course = useFormContext().watch("course");
  const batch = useFormContext().watch("batch");
  const batchMode = useFormContext().watch("batchMode");
  const courseObj = course_data[0].course_details.find(
    (c) => c.title === course,
  );

  const isOnline = batchMode === "Online" || (typeof batch === "string" && batch.toLowerCase().includes("online"));
  let coursePrice = courseObj?.price ?? 0;
  if (courseObj) {
    if (isOnline && courseObj.onlinePrice) {
      coursePrice = courseObj.onlinePrice;
    } else if (!isOnline && courseObj.offlinePrice) {
      coursePrice = courseObj.offlinePrice;
    }
  }

  const [selectedType, setSelectedType] = useState<
    "registration" | "custom" | ""
  >("registration");
  const [customAmount, setCustomAmount] = useState<number | "">(Minimum_Fee);

  // Sync to react-hook-form
  useEffect(() => {
    setValue("paymentType", selectedType, { shouldValidate: true });
  }, [selectedType, setValue]);
  useEffect(() => {
    const amt =
      selectedType === "registration"
        ? Minimum_Fee
        : typeof customAmount === "number"
          ? customAmount
          : 0;
    setValue("paymentAmount", amt, { shouldValidate: true });
  }, [selectedType, customAmount, setValue]);

  const numericCustom = typeof customAmount === "number" ? customAmount : 0;
  const amountPayable =
    selectedType === "registration"
      ? Minimum_Fee
      : numericCustom >= Minimum_Fee
        ? numericCustom
        : 0;

  // Effective course price (fallback to 30000 if not listed)
  const effectiveCoursePrice = coursePrice > 0 ? coursePrice : 30000;
  const remainingBalance = Math.max(0, effectiveCoursePrice - amountPayable);
  const isPartial = amountPayable > 0 && amountPayable < effectiveCoursePrice;

  // ── EMI Logic for 3-Month Course Duration ─────────────────────────────────
  // 1. If user pays only registration fee (₹2,000): remaining split into 3 monthly EMIs
  // 2. If user chooses custom amount between 2000 and full fee: remaining split into 2 monthly EMIs
  // 3. If full payment: 0 EMIs
  let emiCount = 0;
  let emiAmount = 0;
  let emiPlanType = "FULL_PAYMENT";

  if (amountPayable >= effectiveCoursePrice) {
    emiCount = 0;
    emiAmount = 0;
    emiPlanType = "FULL_PAYMENT";
  } else if (selectedType === "registration" || amountPayable === Minimum_Fee) {
    emiCount = 3;
    emiAmount = Math.ceil(remainingBalance / 3);
    emiPlanType = "3_MONTHS";
  } else if (amountPayable > Minimum_Fee && amountPayable < effectiveCoursePrice) {
    emiCount = 2;
    emiAmount = Math.ceil(remainingBalance / 2);
    emiPlanType = "2_PARTS";
  }

  // Sync EMI fields to form context
  useEffect(() => {
    setValue("remainingBalance", remainingBalance);
    setValue("emiPlanType", emiPlanType);
    setValue("emiAmount", emiAmount);
    setValue("emiCount", emiCount);
  }, [remainingBalance, emiPlanType, emiAmount, emiCount, setValue]);

  return (
    <div className="form-step">
      <div className="payment-step-header mb-3">
        <h2 className="step-title mb-0">Fee Payment</h2>
        <div className="payment-secured-badge">
          <i className="fas fa-lock" style={{ fontSize: "11px", color: "#ffc224" }}></i>
          <span style={{ color: "#ffffff", fontWeight: 600 }}>Secured by</span>
          <img
            src="/razorpay.png"
            alt="Razorpay"
            style={{
              height: "14px",
              width: "auto",
              objectFit: "contain",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
        </div>
      </div>
      <p className="step-subtitle">
        Reserve your seat by paying the registration fee or a custom amount.
      </p>

      {/* Hidden fields for validation and EMI submission */}
      <input
        type="hidden"
        {...register("paymentType", {
          required: "Please select a payment option",
        })}
      />
      <input
        type="hidden"
        {...register("paymentAmount", {
          required: "Please enter a valid amount",
          validate: (val) => {
            const num = Number(val);
            if (!num || num < Minimum_Fee) {
              return `Minimum amount is ₹${Minimum_Fee.toLocaleString("en-IN")}`;
            }
            if (effectiveCoursePrice > 0 && num > effectiveCoursePrice) {
              return `Cannot exceed ₹${effectiveCoursePrice.toLocaleString("en-IN")}`;
            }
            return true;
          },
        })}
      />
      <input type="hidden" {...register("remainingBalance")} />
      <input type="hidden" {...register("emiPlanType")} />
      <input type="hidden" {...register("emiAmount")} />
      <input type="hidden" {...register("emiCount")} />

      <div className="payment-summary-card">
        <h4 className="payment-summary-title" style={{ marginBottom: '10px' }}>Order Summary</h4>
        <div className="payment-summary-row">
          <span>Selected Course</span>
          <span className="payment-summary-course">{course || "—"}</span>
        </div>
        {batch && (
          <div className="payment-summary-row">
            <span>Batch & Mode</span>
            <span
              style={{ fontSize: "13.5px", color: "#161439", fontWeight: 500 }}
            >
              {batch}
            </span>
          </div>
        )}
        <div className="payment-summary-row payment-summary-row--total">
          <span>Total Course Fee</span>
          <span className="payment-total-fee" style={{ fontSize: '18px' }}>
            {effectiveCoursePrice > 0 ? `₹${effectiveCoursePrice.toLocaleString("en-IN")}` : "—"}
          </span>
        </div>

        {/* Cards */}
        <div className="form-field mt-3">
          <label className="payment-option-label" style={{ marginBottom: '8px', fontSize: '13.5px' }}>
            Select Payment Option *
          </label>
          <div className="payment-option-grid">
            <div
              className={`payment-option-card ${selectedType === "registration" ? "payment-option-card--active" : ""}`}
              onClick={() => setSelectedType("registration")}
            >
              <div className="payment-option-icon">
                <i className="fas fa-tag"></i>
              </div>
              <div className="payment-option-content">
                <span className="payment-option-title">Registration Fee</span>
                <span className="payment-option-amount">
                  ₹{Minimum_Fee.toLocaleString("en-IN")}
                </span>
                <span className="payment-option-desc">
                  ₹2,000 now + 3 monthly EMIs
                </span>
              </div>
              {selectedType === "registration" && (
                <div className="payment-option-check">
                  <i className="fas fa-check-circle"></i>
                </div>
              )}
            </div>

            <div
              className={`payment-option-card ${selectedType === "custom" ? "payment-option-card--active" : ""}`}
              onClick={() => {
                setSelectedType("custom");
                if (customAmount === "" || customAmount === 0) {
                  setCustomAmount(Minimum_Fee);
                }
              }}
            >
              <div className="payment-option-icon">
                <i className="fas fa-keyboard"></i>
              </div>
              <div className="payment-option-content">
                <span className="payment-option-title">Custom Amount</span>
                <span className="payment-option-amount">
                  Min ₹{Minimum_Fee.toLocaleString("en-IN")}
                </span>
                <span className="payment-option-desc">
                  Custom pay + 2 monthly EMIs
                </span>
              </div>
              {selectedType === "custom" && (
                <div className="payment-option-check">
                  <i className="fas fa-check-circle"></i>
                </div>
              )}
            </div>
          </div>
          {errors.paymentType && (
            <span className="form-error mt-1 d-block">
              {errors.paymentType.message as string}
            </span>
          )}
        </div>

        {/* Custom amount input */}
        {selectedType === "custom" && (
          <div className="form-field mt-3">
            <label
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#1a3f32",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Enter Amount — Min ₹{Minimum_Fee.toLocaleString("en-IN")}
              {effectiveCoursePrice > 0 &&
                ` / Max ₹${effectiveCoursePrice.toLocaleString("en-IN")}`}{" "}
              *
            </label>
            <div className="payment-amount-input-wrap">
              <span className="payment-rupee-sign">₹</span>
              <input
                type="number"
                className="payment-amount-input"
                style={{ paddingLeft: "46px" }}
                value={customAmount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setCustomAmount("");
                  } else {
                    const num = Number(val);
                    setCustomAmount(isNaN(num) ? "" : num);
                  }
                }}
                min={Minimum_Fee}
                max={effectiveCoursePrice > 0 ? effectiveCoursePrice : undefined}
                placeholder={String(Minimum_Fee)}
              />
            </div>
            {customAmount !== "" &&
              typeof customAmount === "number" &&
              customAmount < Minimum_Fee && (
                <span className="form-error mt-1 d-block">
                  Minimum is ₹{Minimum_Fee.toLocaleString("en-IN")}
                </span>
              )}
            {customAmount === "" && (
              <span className="form-error mt-1 d-block">
                Please enter a valid amount
              </span>
            )}
            {typeof customAmount === "number" &&
              effectiveCoursePrice > 0 &&
              customAmount > effectiveCoursePrice && (
                <span className="form-error mt-1 d-block">
                  Cannot exceed ₹{effectiveCoursePrice.toLocaleString("en-IN")}
                </span>
              )}
            {errors.paymentAmount &&
              customAmount !== "" &&
              typeof customAmount === "number" &&
              customAmount >= Minimum_Fee && (
                <span className="form-error mt-1 d-block">
                  {errors.paymentAmount.message as string}
                </span>
              )}
          </div>
        )}

        {/* Total Payable Box */}
        {selectedType && (
          <div className="payment-payable-box mt-3">
            <div className="payment-payable-row">
              <span>Amount Payable Now</span>
              <span className="payment-payable-amount">
                {amountPayable > 0
                  ? `₹${amountPayable.toLocaleString("en-IN")}`
                  : "—"}
              </span>
            </div>

            {/* ── Case 1: 3-Month EMI Breakdown (Registration Fee Selected) ── */}
            {emiPlanType === "3_MONTHS" && remainingBalance > 0 && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "12px",
                  background: "#ffffff",
                  border: "1px solid #1a3f32",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(26,63,50,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px", flexWrap: "wrap", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", color: "#1a3f32", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fas fa-calendar-check" style={{ color: "#2e7d32" }}></i>
                    3-Month EMI Schedule (Remaining: ₹{remainingBalance.toLocaleString("en-IN")})
                  </strong>
                  <span style={{ fontSize: "11px", background: "#e8f5e9", color: "#2e7d32", padding: "2px 7px", borderRadius: "10px", fontWeight: 600 }}>
                    3 Months
                  </span>
                </div>
                <p style={{ fontSize: "11.5px", color: "#555", margin: "0 0 8px 0", lineHeight: 1.35 }}>
                  ₹{Minimum_Fee.toLocaleString("en-IN")} seat booking fee paid now. Remaining balance split into 3 monthly EMIs:
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                    gap: "6px",
                  }}
                >
                  <div style={{ background: "#f8faf9", border: "1px solid #dbe6e0", borderRadius: "6px", padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: "10.5px", color: "#666", textTransform: "uppercase", fontWeight: 600 }}>Month 1</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a3f32" }}>₹{emiAmount.toLocaleString("en-IN")}</div>
                    <div style={{ fontSize: "10px", color: "#888" }}>Due in 30d</div>
                  </div>
                  <div style={{ background: "#f8faf9", border: "1px solid #dbe6e0", borderRadius: "6px", padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: "10.5px", color: "#666", textTransform: "uppercase", fontWeight: 600 }}>Month 2</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a3f32" }}>₹{emiAmount.toLocaleString("en-IN")}</div>
                    <div style={{ fontSize: "10px", color: "#888" }}>Due in 60d</div>
                  </div>
                  <div style={{ background: "#f8faf9", border: "1px solid #dbe6e0", borderRadius: "6px", padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: "10.5px", color: "#666", textTransform: "uppercase", fontWeight: 600 }}>Month 3</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a3f32" }}>
                      ₹{(remainingBalance - (emiAmount * 2) > 0 ? remainingBalance - (emiAmount * 2) : emiAmount).toLocaleString("en-IN")}
                    </div>
                    <div style={{ fontSize: "10px", color: "#888" }}>Due in 90d</div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Case 2: 2-Part EMI Breakdown (Custom Amount Selected) ── */}
            {emiPlanType === "2_PARTS" && remainingBalance > 0 && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "12px",
                  background: "#ffffff",
                  border: "1px solid #1a3f32",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(26,63,50,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px", flexWrap: "wrap", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", color: "#1a3f32", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className="fas fa-calendar-alt" style={{ color: "#2e7d32" }}></i>
                    2-Part Balance Schedule (Remaining: ₹{remainingBalance.toLocaleString("en-IN")})
                  </strong>
                  <span style={{ fontSize: "11px", background: "#e8f5e9", color: "#2e7d32", padding: "2px 7px", borderRadius: "10px", fontWeight: 600 }}>
                    2 Installments
                  </span>
                </div>
                <p style={{ fontSize: "11.5px", color: "#555", margin: "0 0 8px 0", lineHeight: 1.35 }}>
                  Paying ₹{amountPayable.toLocaleString("en-IN")} today. Remaining balance in 2 installments:
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                    gap: "6px",
                  }}
                >
                  <div style={{ background: "#f8faf9", border: "1px solid #dbe6e0", borderRadius: "6px", padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: "10.5px", color: "#666", textTransform: "uppercase", fontWeight: 600 }}>Installment 1</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a3f32" }}>₹{emiAmount.toLocaleString("en-IN")}</div>
                    <div style={{ fontSize: "10px", color: "#888" }}>Due in 30d</div>
                  </div>
                  <div style={{ background: "#f8faf9", border: "1px solid #dbe6e0", borderRadius: "6px", padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: "10.5px", color: "#666", textTransform: "uppercase", fontWeight: 600 }}>Installment 2</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a3f32" }}>
                      ₹{(remainingBalance - emiAmount).toLocaleString("en-IN")}
                    </div>
                    <div style={{ fontSize: "10px", color: "#888" }}>Due in 60d</div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Case 3: 100% Full Payment ── */}
            {emiPlanType === "FULL_PAYMENT" && amountPayable >= effectiveCoursePrice && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "10px 14px",
                  background: "#e8f5e9",
                  border: "1px solid #a5d6a7",
                  borderRadius: "6px",
                  color: "#1b5e20",
                  fontSize: "12.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <i className="fas fa-check-circle" style={{ fontSize: "14px" }}></i>
                <span><strong>Full Course Fee Paid Upfront</strong> — No remaining balance or EMI required.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Trust Footer with Official Razorpay Trust Badge */}
      <div className="payment-trust-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginTop: "14px", paddingTop: "12px" }}>
        <div className="payment-trust-item">
          <i className="fas fa-shield-alt"></i>
          <span>
            256-bit SSL
            <br />
            Encrypted
          </span>
        </div>
        <div className="payment-trust-razorpay">
          <a
            href="https://razorpay.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
          >
            <img
              referrerPolicy="origin"
              src="https://badges.razorpay.com/badge-dark.png"
              style={{ height: "45px", width: "113px", objectFit: "contain" }}
              alt="Razorpay | Payment Gateway | Neobank"
            />
          </a>
        </div>
        <div className="payment-trust-item">
          <i className="fas fa-check-circle"></i>
          <span>
            100% Safe &<br />
            Secure Pay
          </span>
        </div>
      </div>
    </div>
  );
}
