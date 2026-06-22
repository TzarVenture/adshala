"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menu_data from "@/data/home-data/MenuData";

const NavMenu = () => {
   const pathname = usePathname();

   const isActive = (href: string) => pathname === href;
   const isAnyChildActive = (hrefs: string[] = []) => hrefs.some((href) => pathname === href);

   return (
      <ul className="navigation">
         {menu_data.map((menu) => {
            const subMenuLinks = menu.sub_menus?.map((sub_m) => sub_m.link).filter(Boolean) || [];
            const megaMenuLinks = menu.sub_menus
               ?.flatMap((sub_m) => sub_m.mega_menus?.map((mega_m) => mega_m.link))
               .filter(Boolean) || [];
            const allLinks = [...subMenuLinks, ...megaMenuLinks].filter(Boolean) as string[];
            const hasChildren = !!(menu.sub_menus?.length || menu.home_sub_menu?.length);

            return (
               <li
                  key={menu.id}
                  className={`
                     ${hasChildren ? "menu-item-has-children" : ""}
                     ${isActive(menu.link) || isAnyChildActive(allLinks) ? "active" : ""}
                  `.trim()}
               >
                  <Link href={menu.link}>{menu.title}</Link>

                  {hasChildren && menu.sub_menus && (
                     <ul className="sub-menu">
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