import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <p
        className="text-[7rem] leading-none font-light select-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        404
      </p>
      <h1
        className="mt-4 text-3xl font-semibold text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Page not found
      </h1>
      <p className="mt-3 text-base text-muted-foreground max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-[--radius] bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Back to home
      </Link>
    </div>
  )
}
