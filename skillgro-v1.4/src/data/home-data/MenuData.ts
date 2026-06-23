interface MenuItem {
    id: number;
    title: string;
    link: string;
    course_sub_menu?: {
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
}

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
        course_sub_menu: [
            {
                menu_details: [
                    { link: "/courses/web-development", title: "Web Development", badge_class: "tg-badge", badge: "Hot" },
                    { link: "/courses/react", title: "SEO Certification", badge_class: "tg-badge-two", badge: "New" },
                    { link: "/courses/nodejs", title: "Digital Marketing" },
                    { link: "/courses/mongodb", title: "Graphic Designing" },
                    { link: "/courses/nextjs", title: "Social Media Management" },
                ]
            },
            {
                menu_details: [
                    { link: "/courses/ui-ux", title: "Marketplace Certification" },
                    // { link: "/courses/python", title: "Python", badge_class: "tg-badge", badge: "Hot" },
                    // { link: "/courses/devops", title: "DevOps" },
                ]
            },
        ],
    },
    {
        id: 3,
        title: "Pages",
        link: "#",
        sub_menus: [
            { link: "/about-us", title: "About Us" },
            { link: "/faq", title: "FAQ" },
            { link: "/contact", title: "Contact" },
        ],
    },
];

export default menu_data;