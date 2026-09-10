import Link from "next/link";
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { SectionNav } from "@/components/section-nav";
import { experience, projects } from "@/content/site-data";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.shell}>
      <aside className={styles.side}>
        <div>
          <h1 className={styles.name}>Tornike Avaliani</h1>
          <p className={styles.role}>Engineering, University of Cambridge</p>
          <SectionNav />
        </div>
        <div className={styles.sideFoot}>
          <a
            href="/documents/Toko%20Avaliani%20CV%20-%20Summer%202026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cv}
          >
            <DownloadIcon />
            Download CV
          </a>
          <div className={styles.socials}>
            <a
              href="https://github.com/Tokoavaliani"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/tornikeavaliani/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
            <a href="mailto:tokoavaliani42@gmail.com" aria-label="Email">
              <MailIcon />
            </a>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <section id="about" className={styles.section}>
          <h2 className={styles.secLabel} data-n="01">
            About
          </h2>
          <div className={styles.prose}>
            <p>
              I graduated in engineering from the <b>University of Cambridge</b>,
              where I was a <b>College Scholar</b> and an{" "}
              <b>IET Diamond Jubilee Scholar</b>. For my <b>MEng</b> I investigated
              orbital angular momentum multiplexing for free-space optical{" "}
              <b>inter-satellite communications</b>, building an end-to-end
              simulation to analyse performance.
            </p>
            <p>
              In my free time I enjoy building things: AI tools, embedded systems,
              and web apps. Most of what I know about programming is{" "}
              <b>self-taught</b>, through online courses and applied{" "}
              <b>project-based learning</b>.
            </p>
            <p>
              Alongside my degree, I rowed for{" "}
              <span
                className={styles.caius}
                title={
                  'The light blue Gonville & Caius lent Cambridge in 1836 — it became "Cambridge Blue".'
                }
              >
                Caius Boat Club
              </span>
              , where I captained the Men&apos;s squad and served on committee. In
              my final year I was also President of the Gonville &amp; Caius
              Engineering Society, running a programme of talks and industry
              events.
            </p>
          </div>
        </section>

        <section id="experience" className={styles.section}>
          <h2 className={styles.secLabel} data-n="02">
            Experience
          </h2>
          {experience.map((entry) => (
            <div key={`${entry.year}-${entry.org}`} className={styles.row}>
              <div className={styles.when}>{entry.year}</div>
              <div>
                <h3>
                  {entry.role} · <span className={styles.at}>{entry.org}</span>
                </h3>
                <p>{entry.description}</p>
                <div className={styles.tags}>
                  {entry.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section id="projects" className={styles.section}>
          <h2 className={styles.secLabel} data-n="03">
            Projects
          </h2>
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.row}
            >
              <div className={styles.when}>{project.year}</div>
              <div>
                <h3>
                  {project.title} <span className={styles.arrow}>↗</span>
                </h3>
                <p>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
          <Link href="/archive" className={styles.archiveLink}>
            View the full archive →
          </Link>
        </section>
      </main>
    </div>
  );
}
