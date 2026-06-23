"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menu_data from "@/data/home-data/MenuData";
import { useState } from "react";

const MobileMenu = () => {
   const pathname = usePathname();
   const isActive = (href: string) => pathname === href;
   const isAnyChildActive = (hrefs: string[] = []) => hrefs.some((href) => pathname === href);
   const [navTitle, setNavTitle] = useState("");
   const [subNavTitle, setSubNavTitle] = useState("");

   const openMobileMenu = (menu: string) => {
      setNavTitle(prev => prev === menu ? "" : menu);
   };

   const openMobileSubMenu = (sub_m: string) => {
      setSubNavTitle(prev => prev === sub_m ? "" : sub_m);
   };

   return (
      <ul className="navigation">
         {menu_data.map((menu) => {
            const subMenuLinks = menu.sub_menus?.map((sub_m) => sub_m.link).filter(Boolean) || [];
            const megaMenuLinks = menu.sub_menus
               ?.flatMap((sub_m) => sub_m.mega_menus?.map((mega_m) => mega_m.link))
               .filter(Boolean) || [];
            const courseSubMenuLinks = menu.course_sub_menu
               ?.flatMap((c_menu) => c_menu.menu_details.map((d) => d.link))
               .filter(Boolean) || [];

            const allLinks = [...subMenuLinks, ...megaMenuLinks, ...courseSubMenuLinks].filter(Boolean) as string[];
            const hasChildren = !!(menu.sub_menus?.length || menu.course_sub_menu?.length);

            return (
               <li
                  key={menu.id}
                  className={`
                     ${hasChildren ? "menu-item-has-children" : ""}
                     ${isActive(menu.link) || isAnyChildActive(allLinks) ? "active" : ""}
                  `.trim()}
               >
                  <Link href={menu.link}>{menu.title}</Link>

                  {/* Course mega menu for mobile */}
                  {menu.course_sub_menu && (
                     <ul
                        className="sub-menu"
                        style={{ display: navTitle === menu.title ? "block" : "none" }}
                     >
                        {menu.course_sub_menu.flatMap((c_menu) =>
                           c_menu.menu_details.map((item, index) => (
                              <li key={index} className={isActive(item.link) ? "active" : ""}>
                                 <Link href={item.link}>
                                    {item.title}{" "}
                                    {item.badge && (
                                       <span className={item.badge_class}>{item.badge}</span>
                                    )}
                                 </Link>
                              </li>
                           ))
                        )}
                     </ul>
                  )}

                  {/* Regular sub menu */}
                  {!menu.course_sub_menu && hasChildren && menu.sub_menus && (
                     <ul
                        className="sub-menu"
                        style={{ display: navTitle === menu.title ? "block" : "none" }}
                     >
                        {menu.sub_menus.map((sub_m, index) => {
                           const isSubMenuActive = isActive(sub_m.link);
                           const isAnyMegaChildActive = isAnyChildActive(
                              sub_m.mega_menus?.map((mega_m) => mega_m.link).filter(Boolean) as string[]
                           );
                           return (
                              <li
                                 key={index}
                                 className={`
                                    ${sub_m.dropdown ? "menu-item-has-children" : ""}
                                    ${isSubMenuActive || isAnyMegaChildActive ? "active" : ""}
                                 `.trim()}
                              >
                                 <Link href={sub_m.link}>{sub_m.title}</Link>
                                 {sub_m.mega_menus && (
                                    <ul
                                       className="sub-menu"
                                       style={{ display: subNavTitle === sub_m.title ? "block" : "none" }}
                                    >
                                       {sub_m.mega_menus.map((mega_m, i) => (
                                          <li key={i} className={isActive(mega_m.link) ? "active" : ""}>
                                             <Link href={mega_m.link}>{mega_m.title}</Link>
                                          </li>
                                       ))}
                                    </ul>
                                 )}
                                 {sub_m.mega_menus && (
                                    <div
                                       className={`dropdown-btn ${subNavTitle === sub_m.title ? "open" : ""}`}
                                       onClick={() => openMobileSubMenu(sub_m.title)}
                                    >
                                       <span className="plus-line"></span>
                                    </div>
                                 )}
                              </li>
                           );
                        })}
                     </ul>
                  )}

                  {hasChildren && (
                     <div
                        className={`dropdown-btn ${navTitle === menu.title ? "open" : ""}`}
                        onClick={() => openMobileMenu(menu.title)}
                     >
                        <span className="plus-line"></span>
                     </div>
                  )}
               </li>
            );
         })}
      </ul>
   );
};

export default MobileMenu;