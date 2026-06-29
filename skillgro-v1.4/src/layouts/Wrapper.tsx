"use client";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "@/components/common/ScrollToTop";
import MotionAnimation from "@/hooks/MotionAnimation";
import StickyBar from "@/components/common/StickyBar";

if (typeof window !== "undefined") {
    require("bootstrap/dist/js/bootstrap");
}

type WrapperProps = {
    children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {

    MotionAnimation();

    return <>
        {children}
        <StickyBar />
        <ScrollToTop />
        <ToastContainer position="top-center" />
    </>;
}

export default Wrapper
