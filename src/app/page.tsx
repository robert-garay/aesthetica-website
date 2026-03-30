export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto">
        {/* Overline */}
        <p
          className="text-xs font-medium uppercase tracking-[0.2em] mb-6"
          style={{ color: "var(--color-rose)" }}
        >
          Virginia State-Qualified Esthetics Education
        </p>

        {/* Wordmark */}
        <h1
          className="text-7xl font-light tracking-tight mb-4 text-foreground"
          style={{ fontFamily: "var(--font-display)", lineHeight: 1.05 }}
        >
          aesthetica
        </h1>

        {/* Tagline */}
        <p
          className="text-4xl font-light italic text-muted-foreground mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Learn to glow.
        </p>

        {/* Description */}
        <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
          A modern learning portal for Virginia esthetics students.
          Complete your 600-hour theory requirement — online, at your pace,
          built for 2026.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            className="inline-flex items-center justify-center rounded-[--radius] px-6 py-2.5 text-sm font-medium transition-all"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
            }}
          >
            Start Learning
          </button>
          <button
            className="inline-flex items-center justify-center rounded-[--radius] border px-6 py-2.5 text-sm font-medium transition-all"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-foreground)",
            }}
          >
            For Schools
          </button>
        </div>
      </div>

      {/* Palette preview — dev only */}
      <div className="mt-16 flex gap-3 flex-wrap justify-center">
        {[
          ["var(--color-plum)", "Plum"],
          ["var(--color-plum-light)", "Plum Light"],
          ["var(--color-rose)", "Rose"],
          ["var(--color-rose-light)", "Rose Light"],
          ["var(--color-champagne)", "Champagne"],
          ["var(--color-sage)", "Sage"],
        ].map(([color, label]) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <div
              className="w-10 h-10 rounded-lg border"
              style={{
                backgroundColor: color,
                borderColor: "var(--color-border)",
              }}
            />
            <span className="text-[10px] text-muted-foreground font-medium">{label}</span>
          </div>
        ))}
      </div>
    </main>
  )
}
