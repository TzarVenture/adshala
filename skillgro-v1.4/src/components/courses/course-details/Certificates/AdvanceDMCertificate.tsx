import React from "react";
import Image from "next/image";

import img1 from "@/assets/img/certificates/advance-digital-marketing/AshalaaDigital1.png";
import img2 from "@/assets/img/certificates/advance-digital-marketing/AshalaaDigital2.png";

const certificates = [
  {
    title: "Certificate of Completion",
    image: img1,
  },
  {
    title: "Internship Certificate",
    image: img2,
  },
];

const AdvanceDMCertificate = () => {
  return (
    <section className="py-5">
      <div className="container">
       

        <div className="row g-4">
          {certificates.map((certificate, index) => (
            <div className="col-12 col-md-6" key={index}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-center mb-4">
                    {certificate.title}
                  </h5>

                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    className="img-fluid rounded"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvanceDMCertificate;