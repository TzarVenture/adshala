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
  const courseObj = course_data[0].course_details.find(
    (c) => c.title === course,
  );
  const coursePrice = courseObj?.price ?? 0;

  const [selectedType, setSelectedType] = useState<
    "registration" | "custom" | ""
  >("");
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
  const remainingBalance = coursePrice - amountPayable;
  const isPartial = amountPayable > 0 && amountPayable < coursePrice;

  return (
    <div className="form-step">
      <div className="payment-step-header mb-3">
        <h2 className="step-title mb-0">Fee Payment</h2>
        <div className="payment-secured-badge">
          <i className="fas fa-lock"></i>
          <span>Secured by Razorpay</span>
        </div>
      </div>
      <p className="step-subtitle">
        Reserve your seat by paying the registration fee or a custom amount.
      </p>

      {/* Hidden fields for validation */}
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
            if (coursePrice > 0 && num > coursePrice) {
              return `Cannot exceed ₹${coursePrice.toLocaleString("en-IN")}`;
            }
            return true;
          },
        })}
      />

      <div className="payment-summary-card">
        <h4 className="payment-summary-title">Order Summary</h4>
        <div className="payment-summary-row">
          <span>Selected Course</span>
          <span className="payment-summary-course">{course || "—"}</span>
        </div>
        {batch && (
          <div className="payment-summary-row">
            <span>Batch & Mode</span>
            <span
              style={{ fontSize: "14px", color: "#161439", fontWeight: 500 }}
            >
              {batch}
            </span>
          </div>
        )}
        <div className="payment-summary-row payment-summary-row--total">
          <span>Total Course Fee</span>
          <span className="payment-total-fee">
            {coursePrice > 0 ? `₹${coursePrice.toLocaleString("en-IN")}` : "—"}
          </span>
        </div>

        {/* Cards */}
        <div className="form-field mt-4">
          <label className="payment-option-label">
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
                  Pay only the booking fee now
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
                  Pay any amount up to full fee
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
              {coursePrice > 0 &&
                ` / Max ₹${coursePrice.toLocaleString("en-IN")}`}{" "}
              *
            </label>
            <div className="payment-amount-input-wrap">
              <span className="payment-rupee-sign">₹</span>
              <input
                type="number"
                className="payment-amount-input"
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
                max={coursePrice > 0 ? coursePrice : undefined}
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
              coursePrice > 0 &&
              customAmount > coursePrice && (
                <span className="form-error mt-1 d-block">
                  Cannot exceed ₹{coursePrice.toLocaleString("en-IN")}
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

        {/* Total Payable */}
        {selectedType && (
          <div className="payment-payable-box mt-4">
            <div className="payment-payable-row">
              <span>Amount Payable Now</span>
              <span className="payment-payable-amount">
                {amountPayable > 0
                  ? `₹${amountPayable.toLocaleString("en-IN")}`
                  : "—"}
              </span>
            </div>

            {selectedType === "registration" && coursePrice > 0 && (
              <div className="payment-partial-note">
                <i className="fas fa-info-circle"></i>
                <p>
                  This ₹{Minimum_Fee.toLocaleString("en-IN")} registration fee
                  will be <strong>fully adjusted</strong> against your total
                  course fee of{" "}
                  <strong>₹{coursePrice.toLocaleString("en-IN")}</strong> at
                  full payment.
                </p>
              </div>
            )}

            {isPartial && selectedType === "custom" && (
              <div className="payment-partial-note">
                <i className="fas fa-info-circle"></i>
                <p>
                  Paying{" "}
                  <strong>₹{amountPayable.toLocaleString("en-IN")}</strong> now.
                  Remaining{" "}
                  <strong>₹{remainingBalance.toLocaleString("en-IN")}</strong>{" "}
                  due before batch commencement.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Trust Footer */}
      <div className="payment-trust-footer">
        <div className="payment-trust-item">
          <i className="fas fa-shield-alt"></i>
          <span>
            128-bit SSL
            <br />
            Encrypted
          </span>
        </div>
        <div className="payment-trust-razorpay">
          <img
            src="https://badge.razorpay.com/static/badge.svg"
            alt="Secured by Razorpay"
            style={{ height: "34px", objectFit: "contain" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span style={{ fontSize: "11px", color: "#6D6C80" }}>
            Secured by Razorpay
          </span>
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
