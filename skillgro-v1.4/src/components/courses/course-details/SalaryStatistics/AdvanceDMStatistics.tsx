import React from "react";
import Image from "next/image";

import img3 from "@/assets/img/certificates/advance-digital-marketing/AshalaaDigital3.png";

function AdvanceDMStatistics() {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">
          Salary Growth
        </h2>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <Image
              src={img3}
              alt="Digital Marketing Statistics"
              className="img-fluid rounded shadow"
              style={{
                width: "100%",
                height: "auto",
              }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdvanceDMStatistics;