"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AlumniConnect() {
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);

  // detect screen size
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 990);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <section className="py-4 overflow-hidden  bg-blue w-100">
      <motion.div
        className="d-flex align-items-center gap-4 text-white fw-semibold fs-10 text-orange"
        initial={{ x: "-100%" }} // start off-screen left
        animate={
          !isMobile && !paused
            ? { x: ["-100%", "100%"] } // left → right
            : { x: "-100" }
        }
        transition={
          !isMobile && !paused
            ? { repeat: Infinity, duration: 15, ease: "linear" }
            : {}
        }
      >
        <span className="text-white scroll-connect">
          CONNECT with your classmates on your Alumni Association
        </span>
        <div className="call-to-btn text-start mt-0">
          <Link
            className="rbt-btn btn-gradient hover-icon-reverse radius-round d-flex align-items-center"
            href="#"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span className="icon-reverse-wrapper">
              <span className="btn-text">Register Now</span>
              <span className="btn-icon">
                <i className="feather-arrow-right"></i>
              </span>
              <span className="btn-icon">
                <i className="feather-arrow-right"></i>
              </span>
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}



