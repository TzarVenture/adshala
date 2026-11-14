'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'next/navigation';
import CourseSidebar from './CourseSidebar';
import CourseTop from './CourseTop';
import UseCourses from '@/hooks/UseCourses';
import CourseCard from '../CourseCard';
import { getPriceLines, formatINR } from '@/utils/coursePricing';

const CourseArea = () => {

   const { courses, setCourses } = UseCourses();
   const searchParams = useSearchParams();
   const queryParam = (searchParams.get('q') || '').trim().toLowerCase();

   const itemsPerPage = 12;
   const [itemOffset, setItemOffset] = useState(0);
   const [activeTab, setActiveTab] = useState(0);

   const filteredCourses = courses.filter((course: any) => {
      if (!queryParam) return true;

      const searchableText = [
         course?.title,
         course?.category,
         course?.desc,
         course?.instructors,
      ]
         .filter(Boolean)
         .join(' ')
         .toLowerCase();

      return searchableText.includes(queryParam);
   });

   const endOffset = itemOffset + itemsPerPage;
   const currentItems = filteredCourses.slice(itemOffset, endOffset);
   const pageCount = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage));

   const startOffset = filteredCourses.length ? itemOffset + 1 : 0;
   const totalItems = filteredCourses.length;

   useEffect(() => {
      setItemOffset(0);
   }, [queryParam]);

   const handlePageClick = (event: { selected: number }) => {
      const safeLength = filteredCourses.length || 1;
      const newOffset = (event.selected * itemsPerPage) % safeLength;
      setItemOffset(newOffset);
   };

   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   return (
      <section className="all-courses-area section-py-120">
         <div className="container">
            <div className="row">
               <CourseSidebar setCourses={setCourses} queryParam={queryParam} />
               <div className="col-xl-9 col-lg-8">
                  {queryParam && (
                     <div className="d-flex align-items-center justify-content-between mb-20 bg-light p-3 rounded" style={{ border: '1px solid #edf2f0' }}>
                        <span className="fs-6 text-secondary">
                           Showing results for: <strong className="text-dark">"{searchParams.get('q')}"</strong>
                        </span>
                        <Link href="/courses" className="btn btn-sm btn-danger text-white rounded-pill px-3 py-1" style={{ fontSize: '13px', display: 'flex', alignItems: 'center' }}>
                           Clear Search <i className="fas fa-times ms-2"></i>
                        </Link>
                     </div>
                  )}
                  <CourseTop
                     startOffset={startOffset}
                     endOffset={Math.min(endOffset, totalItems)}
                     totalItems={totalItems}
                     setCourses={setCourses}
                     handleTabClick={handleTabClick}
                     activeTab={activeTab}
                  />
                  <div className="tab-content" id="myTabContent">
                     <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="grid" role="tabpanel" aria-labelledby="grid-tab">
                        <div className="row courses__grid-wrap row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
                           {currentItems.length > 0 ? currentItems.map((item: any) => (
                              <div key={item.id} className="col d-flex">
                                 <CourseCard
                                    sku={item.sku}
                                    title={item.title}
                                    category={item.category}
                                    thumb={item.thumb}
                                    price={item.price}
                                    offlinePrice={item.offlinePrice}
                                    onlinePrice={item.onlinePrice}
                                 />
                              </div>
                           )) : (
                              <div className="col-12">
                                 <div className="text-center py-5">
                                    <h5>No courses found for this search.</h5>
                                 </div>
                              </div>
                           )}
                        </div>
                        <nav className="pagination__wrap mt-30">
                           <ReactPaginate
                              breakLabel="..."
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={3}
                              pageCount={pageCount}
                              renderOnZeroPageCount={null}
                              className="list-wrap"
                           />
                        </nav>
                     </div>

                     <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="list" role="tabpanel" aria-labelledby="list-tab">
                        <div className="row courses__list-wrap row-cols-1">
                           {currentItems.length > 0 ? currentItems.map((item: any) => (
                              <div key={item.id} className="col">
                                 <div className="courses__item courses__item-three shine__animate-item">
                                    <div className="courses__item-thumb">
                                       <Link href={`/course-details/${item?.sku}`} className="shine__animate-link">
                                          <Image src={item.thumb} alt={item.title} />
                                       </Link>
                                    </div>
                                    <div className="courses__item-content">
                                       <ul className="courses__item-meta list-wrap">
                                          <li className="courses__item-tag">
                                             <Link href="/courses">{item.category}</Link>
                                          </li>
                                       </ul>
                                       <h5 className="title"><Link href={`/course-details/${item?.sku}`}>{item.title}</Link></h5>
                                       <p className="info">{item.desc}</p>
                                       <div className="course-card__prices" style={{ marginBottom: "12px", maxWidth: "340px" }}>
                                          {getPriceLines(item).map((line) => (
                                             <div key={line.key} className="course-card__price">
                                                <span className="course-card__price-label">{line.label}</span>
                                                <span className="course-card__price-amount">{formatINR(line.amount)}</span>
                                             </div>
                                          ))}
                                       </div>
                                       <div className="courses__item-bottom">
                                          <div className="button">
                                             <Link href={`/course-details/${item?.sku}`}>
                                                <span className="text">Enroll Now</span>
                                                <i className="flaticon-arrow-right"></i>
                                             </Link>
                                          </div>
                                          <span className="course-card__gst">*GST Tax Included</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           )) : (
                              <div className="col-12">
                                 <div className="text-center py-5">
                                    <h5>No courses found for this search.</h5>
                                 </div>
                              </div>
                           )}
                        </div>
                        <nav className="pagination__wrap mt-30">
                           <ul className="list-wrap">
                              <ReactPaginate
                                 breakLabel="..."
                                 onPageChange={handlePageClick}
                                 pageRangeDisplayed={3}
                                 pageCount={pageCount}
                                 renderOnZeroPageCount={null}
                                 className="list-wrap"
                              />
                           </ul>
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default CourseArea;
