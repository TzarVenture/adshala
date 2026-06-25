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
                    { link: "/course-details/111", title: "Digital Marketing", badge_class: "tg-badge", badge: "Hot"  },
                    { link: "/course-details/115", title: "SEO Certification", badge_class: "tg-badge-two", badge: "New" },
                    { link: "/course-details/116", title: "Web Development"},
                    { link: "/course-details/112", title: "Graphic Designing" },
                    { link: "/course-details/113", title: "Social Media Management" },
                ]
            },
            {
                menu_details: [
                    { link: "/course-details/114", title: "Marketplace Certification" },
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