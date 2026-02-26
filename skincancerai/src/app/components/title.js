import Image from "next/image";

export default function Title() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* HERO BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/hero_bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pt-24 flex flex-col min-h-screen">
        {/* Centered title + buttons */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-white font-bold tracking-tight text-[64px] leading-[1.1]">
            Landing page
          </h1>

          <div className="mt-12 flex items-center gap-3">
            <a
              href="#try"
              className="rounded-xl bg-white px-4 py-2.5 text-[18px] font-medium text-slate-900 shadow-sm hover:bg-white/90 transition"
            >
              Try Diagnostic
            </a>

            <a
              href="#"
              className="rounded-xl border border-white/35 bg-white/0 px-4 py-2.5 text-[18px] font-medium text-white/90 hover:bg-white/10 transition"
            >
              Optional second
            </a>
          </div>
        </div>

        {/* Spacer to push card to bottom */}
        <div className="flex-1" />
        <div className="flex justify-center">
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-t-[28px]"
          >
            {/* CARD BG */}
            <div className="absolute inset-0">
              <Image
                src="/card_bg.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>

            {/* Card content */}
            <div className="relative h-full px-8 py-12 sm:px-14 sm:py-14">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-emerald-900/80">
                  Demo
                </div>

                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                  Text goes inside this card
                </h2>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  Add your intended description here. This content sits above the exact exported
                  SVG background.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#try"
                    className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800 transition"
                  >
                    Open demo
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
