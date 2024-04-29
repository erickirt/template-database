"use client";

import Link from "next/link";
import useScroll from "@/lib/use-scroll";
import { cx } from "@/lib/utils";
import { siteConfig } from "@/app/siteConfig";
import { Button } from "../Button";
import { DatabaseLogo } from "../../../public/DatabaseLogo";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import React from "react";

export function Navigation() {
  const scrolled = useScroll(15);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(min-width: 768px)");
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setOpen(false);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange({
      matches: mediaQuery.matches,
    } as MediaQueryListEvent);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <header
      className={cx(
        "fixed top-4 inset-x-2 rounded-xl mx-auto max-w-6xl flex justify-center z-50 transition-all border duration-500 border-transparent ease-[cubic-bezier(0.16,1,0.3,1.03)] animate-slide-down-fade px-3 py-3 will-change-transform transform-gpu h-[4rem] overflow-hidden",
        open === true && "h-56",
        scrolled || open === true
          ? "border-gray-100 bg-white/80 dark:border-white/15 dark:bg-black/70 shadow-xl shadow-black/5 max-w-3xl backdrop-blur-nav"
          : "bg-white/0 dark:bg-gray-950/0"
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between">
          <Link href={siteConfig.baseLinks.home} aria-label="Home">
            <span className="sr-only">Company logo</span>
            <DatabaseLogo className="w-28 md:w-32" />
          </Link>
          <nav className="md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 hidden md:block absolute">
            <ul className="items-center font-medium gap-4 flex">
              <li>
                <Link
                  className="hover:text-gray-900 text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 px-2 py-1"
                  href={siteConfig.baseLinks.about}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-900 text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 px-2 py-1"
                  href={siteConfig.baseLinks.pricing}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-900 text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 px-2 py-1"
                  href={siteConfig.baseLinks.changelog}
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </nav>
          <Button className="hidden md:flex">Book demo</Button>
          <div className="flex md:hidden gap-x-2">
            <Button>Book demo</Button>
            <Button
              onClick={() => setOpen(!open)}
              variant="light"
              className="aspect-square p-2"
            >
              {open ? (
                <RiCloseLine aria-hidden="true" className="size-5" />
              ) : (
                <RiMenuLine aria-hidden="true" className="size-5" />
              )}
            </Button>
          </div>
        </div>
        <nav
          className={cx(
            "flex md:hidden text-lg my-6 will-change-transform ease-in-out",
            open ? "" : "hidden"
          )}
        >
          <ul className="space-y-4">
            <li onClick={() => setOpen(false)}>
              <Link href={siteConfig.baseLinks.about}>About</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href={siteConfig.baseLinks.pricing}>Pricing</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href={siteConfig.baseLinks.changelog}>Changelog</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
