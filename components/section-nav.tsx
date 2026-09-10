"use client";

import { useEffect, useRef } from "react";
import styles from "./section-nav.module.css";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export function SectionNav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const links = Array.from(navRef.current?.querySelectorAll("a") ?? []);
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href") ?? ""))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = sections.indexOf(entry.target);
          links.forEach((link) => link.classList.remove(styles.active));
          links[index]?.classList.add(styles.active);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav ref={navRef} className={styles.nav}>
      {SECTIONS.map(({ id, label }, index) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${styles.link} ${index === 0 ? styles.active : ""}`}
        >
          <span className={styles.bar} />
          {label}
        </a>
      ))}
    </nav>
  );
}
