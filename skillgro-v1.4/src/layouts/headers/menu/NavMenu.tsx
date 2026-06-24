"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menu_data from "@/data/home-data/MenuData";
import Image from "next/image";
import icon_1 from "@/assets/img/others/mega_menu_img.jpeg";

const NavMenu = () => {
   const pathname = usePathname();
   const isActive = (href: string) => pathname === href;
   const isAnyChildActive = (hrefs: string[] = []) => hrefs.some((href) => pathname === href);

   return (
      <ul className="navigation">
         {menu_data.map((menu) => {
            const subMenuLinks = menu.sub_menus?.map((sub_m) => sub_m.link).filter(Boolean) as string[] || [];
            const megaMenuLinks = menu.sub_menus
               ?.flatMap((sub_m) => sub_m.mega_menus?.map((mega_m) => mega_m.link))
               .filter(Boolean) as string[] || [];
            const courseSubMenuLinks = menu.course_sub_menu
               ?.flatMap((c_menu) => c_menu.menu_details.map((d) => d.link))
               .filter(Boolean) as string[] || [];

            const allLinks: string[] = [...subMenuLinks, ...megaMenuLinks, ...courseSubMenuLinks];
            const hasChildren = !!(menu?.sub_menus?.length || menu?.course_sub_menu?.length);

            return (
               <li
                  key={menu.id}
                  className={`
                     ${hasChildren ? "menu-item-has-children" : ""}
                     ${isActive(menu.link) || isAnyChildActive(allLinks) ? "active" : ""}
                  `.trim()}
               >
                  <Link href={menu.link}>{menu.title}</Link>

                  {/* Course mega menu */}
                  {menu.course_sub_menu && (
                     <ul className="sub-menu mega-menu">
                        {menu.course_sub_menu.map((c_menu, i) => (
                           <li key={i}>
                              <ul className="list-wrap mega-sub-menu">
                                 {c_menu.menu_details.map((item, index) => (
                                    <li key={index} className={isActive(item.link) ? "active" : ""}>
                                       <Link href={item.link}>
                                          {item.title}{" "}
                                          {item.badge && (
                                             <span className={item.badge_class}>{item.badge}</span>
                                          )}
                                       </Link>
                                    </li>
                                 ))}
                              </ul>
                           </li>
                        ))}
                           <li>
         <div className="mega-menu-img">
            <Link href="/courses"><Image src={icon_1} alt="img" /></Link>
         </div>
      </li>
                     </ul>
                  )}

                  {/* Regular sub menu */}
                  {!menu.course_sub_menu && hasChildren && menu.sub_menus && (
                     <ul className="sub-menu">
                        {menu.sub_menus.map((sub_m, index) => {
                           const isSubMenuActive = isActive(sub_m.link);
                           const isAnyMegaChildActive = isAnyChildActive(
                              sub_m.mega_menus?.map((mega_m) => mega_m.link).filter(Boolean) as string[] || []
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
                                    <ul className="sub-menu">
                                       {sub_m.mega_menus.map((mega_m, i) => (
                                          <li key={i} className={isActive(mega_m.link) ? "active" : ""}>
                                             <Link href={mega_m.link}>{mega_m.title}</Link>
                                          </li>
                                       ))}
                                    </ul>
                                 )}
                              </li>
                           );
                        })}
                     </ul>
                  )}
               </li>
            );
         })}
      </ul>
   );
};

export default NavMenu;