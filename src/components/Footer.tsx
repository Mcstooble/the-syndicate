import { site } from "../content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 md:px-12 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <span className="font-serif text-lg tracking-tight text-ink">{site.name}</span>
        <a
          href={`mailto:${site.contactEmail}`}
          className="text-sm text-mist transition-colors hover:text-accent"
        >
          {site.contactEmail}
        </a>
        <span className="text-xs text-mist">
          &copy; {new Date().getFullYear()} {site.name}
        </span>
      </div>
    </footer>
  );
}
