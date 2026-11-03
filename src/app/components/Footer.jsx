import Link from "next/link";

const GITHUB_REPOSITORY = "https://github.com/sudeepsarmah/valotrait";

export default function Footer() {
  return (
    <footer className="site-footer mt-6 w-full min-w-0">
      <div className="footer-main flex flex-col gap-6">
        <Link href="/" className="footer-brand">
          V<span className="text-accent">.</span>
          <span className="footer-brand-name">VALOTRAITS</span>
        </Link>

        <p className="footer-description">
          Understand your instincts.
          <br />
          Discover your playstyle.
        </p>

        <a
          href={GITHUB_REPOSITORY}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-github w-fit"
        >
          <span aria-hidden="true">↗</span> GITHUB REPOSITORY
        </a>
      </div>

      <div className="footer-bottom flex flex-col items-start gap-4">
        <p>© {new Date().getFullYear()} ValoTraits. All rights reserved.</p>

        <p className="footer-disclaimer">
          An unofficial Valorant personality project. Not affiliated with Riot
          Games.
        </p>

        <Link href="/quiz" className="footer-quiz-link">
          FIND YOUR TYPE ↗
        </Link>
      </div>
    </footer>
  );
}
