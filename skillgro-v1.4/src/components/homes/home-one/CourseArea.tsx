"use client"
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import CourseCard from "@/components/courses/CourseCard";
import course_data from "@/data/home-data/CourseData";

import bg_img from '@//assets/img/bg/courses_bg.jpg';

const tab_title: string[] = ["All Courses", "Design", "Marketing", "Development"];
const tabCategories = [null, "Design", "Marketing", "Development"];

// slider setting
const setting = {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 30,
  observer: true,
  observeParents: true,
  autoplay: false,
  // Navigation arrows
  navigation: {
    nextEl: '.courses-button-next',
    prevEl: '.courses-button-prev',
  },
  breakpoints: {
    '1500': {
      slidesPerView: 4,
    },
    '1200': {
      slidesPerView: 4,
    },
    '992': {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    '768': {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    '576': {
      slidesPerView: 1,
    },
    '0': {
      slidesPerView: 1,
    },
  },
};

interface StyleType {
  style?: boolean;
}

const CourseArea = ({ style }: StyleType) => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <section className={`courses-area ${style ? "section-py-120" : "section-pt-120 section-pb-90"}`} style={{ backgroundImage: `url(${bg_img.src})` }}>
      <div className="container">
        <div className="section__title-wrap">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="section__title text-center mb-40">
                <span className="sub-title">Top Certification Courses</span>
                <h2 className="title">Explore Our Best Certification Courses</h2>
                <p className="desc">Practical training, real internships and certifications that get you hired</p>
              </div>
              <div className="courses__nav">
                <ul className="nav nav-tabs" id="courseTab" role="tablist">
                  {tab_title.map((tab, index) => (
                    <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                      <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="tab-content" id="courseTabContent">
          {(() => {
            const courseItem = course_data.find((item) => item.page === "home_1");
            const filtered = courseItem?.course_details.filter(
              (item) => tabCategories[activeTab] === null || item.tag === tabCategories[activeTab]
            );
            return (
              <div className="tab-pane fade show active">
                <Swiper {...setting} modules={[Autoplay, Navigation]} className="swiper courses-swiper-active">
                  {filtered?.map((item) => (
                    <SwiperSlide key={item.id} className="swiper-slide" style={{ height: "auto", display: "flex" }}>
                      <CourseCard
                        sku={String(item.sku)}
                        title={item.title}
                        category={item.tag}
                        thumb={item.thumb}
                        price={item.price}
                        offlinePrice={item.offlinePrice}
                        onlinePrice={item.onlinePrice}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {!style &&
                  <div className="courses__nav">
                    <div className="courses-button-prev"><i className="flaticon-arrow-right"></i></div>
                    <div className="courses-button-next"><i className="flaticon-arrow-right"></i></div>
                  </div>
                }
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  )
}

export default CourseArea
