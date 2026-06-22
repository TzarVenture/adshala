interface MenuItem {
    id: number;
    title: string;
    link: string;
    menu_class?: string;
    home_sub_menu?: {
        menu_details: {
            link: string;
            title: string;
            badge?: string;
            badge_class?: string;
        }[];
    }[];
    sub_menus?: {
        link: string;
        title: string;
        dropdown?: boolean;
        mega_menus?: {
            link: string;
            title: string;
        }[];
    }[];
}[];

const menu_data: MenuItem[] = [
    {
        id: 1,
        title: "Home",
        link: "/",
    },
    {
        id: 2,
        title: "Courses",
        link: "/courses",
    },
    {
        id: 3,
        title: "Pages",
        link: "#",
        sub_menus: [
            { link: "/about-us", title: "About Us" },
            // { link: "/instructors", title: "Our Instructors" },
            { link: "/faq", title: "FAQ" },
            { link: "/contact", title: "Contact" },
        ],
    },
];

export default menu_data;