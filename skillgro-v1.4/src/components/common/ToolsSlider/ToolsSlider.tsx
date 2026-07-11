"use client";

import React from "react";
import "./ToolsSlider.css";
import { CourseTool, ToolItem } from "@/data/inner-data/CourseToolsData";

interface ToolsSliderProps {
  tools: CourseTool;
  title?: string;
}

export default function ToolsSlider({
  tools,
  title = "Tools & Technologies You Will Learn",
}: ToolsSliderProps) {
  // Triple-duplicate items so the infinite scroll loop is smooth at any speed
  const row1Items: ToolItem[] = [...tools.row1, ...tools.row1, ...tools.row1];
  const row2Items: ToolItem[] = [...tools.row2, ...tools.row2, ...tools.row2];

  return (
    <section className="ts__section">
      <div className="section__title text-center mb-40">
        <h2 className="title">{title}</h2>
      </div>

      <div className="ts__container">
        {/* Row 1: scrolls left → */}
        <div className="ts__row">
          <div className="ts__track ts__track--left">
            {row1Items.map((item, idx) => (
              <div className="ts__item" key={`r1-${idx}`}>
                <i className={item.icon}></i>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: scrolls right ← */}
        <div className="ts__row">
          <div className="ts__track ts__track--right">
            {row2Items.map((item, idx) => (
              <div className="ts__item" key={`r2-${idx}`}>
                <i className={item.icon}></i>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
