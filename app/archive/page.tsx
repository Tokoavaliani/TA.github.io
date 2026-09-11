import type { Metadata } from "next";
import Link from "next/link";
import { archive } from "@/content/site-data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Archive",
};

export default function ArchivePage() {
  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.back}>
        ← Home
      </Link>
      <h1>Archive</h1>
      <p className={styles.intro}>The full record</p>
      <p className={styles.intro}>
        Coursework, internship-related tinkering, and personal projects.
      </p>

      <div className={styles.list}>
        {archive.map((entry) => {
          const rowContent = (
            <>
              <span className={styles.year}>{entry.year}</span>
              <div className={styles.main}>
                <span className={styles.title}>{entry.title}</span>
                <span className={styles.tech}>{entry.tech}</span>
              </div>
              <span
                className={
                  entry.href ? styles.link : `${styles.link} ${styles.linkNone}`
                }
              >
                {entry.href ? entry.linkLabel : "—"}
              </span>
            </>
          );

          if (entry.href) {
            return (
              <a
                key={entry.title}
                className={styles.row}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {rowContent}
              </a>
            );
          }

          return (
            <div key={entry.title} className={styles.row}>
              {rowContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}
