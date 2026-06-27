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
                    { link: "/course-details/certification-in-advanced-digital-marketing-&-ai-mumbai", title: "Digital Marketing", badge_class: "tg-badge", badge: "Hot"  },
                    { link: "/course-details/advanced-seo-certification-in-mumbai", title: "SEO Certification", badge_class: "tg-badge-two", badge: "New" },
                    { link: "/course-details/certification-in-web-development-in-mumbai", title: "Web Development"},
                    { link: "/course-details/certification-in-advanced-graphic-design-&-ai-mumbai", title: "Graphic Designing" },
                    { link: "/course-details/mastery-in-social-media-management-in-mumbai", title: "Social Media Management" },
                ]
            },
            {
                menu_details: [
                    { link: "/course-details/marketplace-specialist-program-in-mumbai", title: "Marketplace Certification" },
                    // { link: "/courses/python", title: "Python", badge_class: "tg-badge", badge: "Hot" },
                    // { link: "/courses/devops", title: "DevOps" },
                ]
            },
        ],
    },
    // {
    //     id: 3,
    //     title: "Pages",
    //     link: "#",
    //     sub_menus: [
    //         { link: "/about-us", title: "About Us" },
    //         { link: "/faq", title: "FAQ" },
    //         { link: "/contact", title: "Contact" },
    //     ],
    // },
    {
        id: 4,
        title: "About Us",
        link: "/about-us",
       
    },
    {
        id: 5,
        title: "Contact",
        link: "/contact",
        
    },
];

export default menu_data;