import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-12">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200/80">
                Garage Boost
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Page not found
              </h1>
              <p className="mt-4 text-base text-slate-300 md:text-lg">
                We looked everywhere for that page, but it does not exist. If you typed the URL, double-check it or use one of the shortcuts below.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-blue-200/70">Error</p>
                <p className="mt-2 text-4xl font-semibold text-white">404</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <Link
              href="/garage"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to Home
            </Link>
            <a
              href="mailto:garage@bizzboost.uk"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Support
            </a>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Try search</p>
              <p className="mt-1 text-slate-300">Use the search bar to locate jobs, customers, or invoices.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Recent activity</p>
              <p className="mt-1 text-slate-300">Head to the dashboard for your latest updates.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Need help?</p>
              <p className="mt-1 text-slate-300">We can point you to the right place in minutes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
