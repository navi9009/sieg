import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, MapPin, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Landmark = { name: string; location: string; url: string; author: string; license: string; source: string; licenseUrl: string };

export function GermanyHero({ landmarks, children }: { landmarks: Landmark[]; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [failed, setFailed] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const touchStart = useRef<number | null>(null);
  const available = loaded.filter((index) => !failed.includes(index));
  const current = landmarks[active];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!available.length || available.includes(active)) return;
    setActive(available[0]);
  }, [active, loaded, failed]);

  useEffect(() => {
    if (paused || focused || reducedMotion || available.length < 2) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActive((previous) => {
        for (let step = 1; step <= landmarks.length; step++) {
          const candidate = (previous + step) % landmarks.length;
          if (available.includes(candidate)) return candidate;
        }
        return previous;
      });
    }, 6000);
    return () => window.clearInterval(timer);
  }, [active, loaded, failed, paused, focused, reducedMotion, landmarks.length]);

  const move = (direction: number) => {
    for (let step = 1; step <= landmarks.length; step++) {
      const candidate = (active + direction * step + landmarks.length) % landmarks.length;
      if (available.includes(candidate)) { setActive(candidate); return; }
    }
  };

  return (
    <section aria-label="Discover Germany" aria-roledescription="slideshow" className="germany-hero relative isolate flex flex-col justify-between overflow-hidden bg-sieg-black pt-28 text-sieg-white md:pt-36"
      onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => { const end = event.changedTouches[0]?.clientX; if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 60) move(end < touchStart.current ? 1 : -1); touchStart.current = null; }}>
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        {landmarks.map((landmark, index) => (
          <img key={landmark.url} src={landmark.url} alt="" decoding="async" fetchPriority={index === 0 ? "high" : "low"}
            className={cn("germany-hero-image absolute inset-0 h-full w-full object-cover", index === active && loaded.includes(index) && !failed.includes(index) && "is-active")}
            onLoad={() => setLoaded((previous) => previous.includes(index) ? previous : [...previous, index])}
            onError={() => setFailed((previous) => previous.includes(index) ? previous : [...previous, index])} />
        ))}
      </div>
      <div className="germany-hero-overlay pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">{children}</div>
      <div className="mx-auto mt-12 flex w-full max-w-[1600px] flex-col gap-5 px-5 pb-6 md:mt-16 md:flex-row md:items-end md:justify-between md:px-10 md:pb-8">
        <div className="min-h-16">
          <p className="flex items-center gap-2 text-sm font-medium"><MapPin className="h-4 w-4 text-sieg-yellow" aria-hidden="true" />{current?.name}<span className="text-sieg-white/60">/ {current?.location}</span></p>
          <details className="mt-2 text-[10px] text-sieg-white/70">
            <summary className="w-fit cursor-pointer">Photo credits</summary>
            {current && <p className="mt-2 max-w-md"><a href={current.source} target="_blank" rel="noreferrer" className="underline">{current.name}</a> · {current.author} · <a href={current.licenseUrl} target="_blank" rel="noreferrer" className="underline">{current.license}</a> · Cropped for display</p>}
          </details>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-0.5" role="group" aria-label="Choose a German landmark">
            {landmarks.map((landmark, index) => (
              <Button key={landmark.name} variant="ghost" size="icon-sm" className="h-10 w-6 rounded-none hover:bg-sieg-white/10" disabled={!available.includes(index)} aria-label={`Show ${landmark.name}`} aria-pressed={index === active} title={landmark.name} onClick={() => setActive(index)}>
                <span className={cn("block h-1 w-4 transition-colors", index === active ? "bg-sieg-yellow" : "bg-sieg-white/40")} />
              </Button>
            ))}
          </div>
          <span className="text-xs tabular-nums text-sieg-white/60">{String(active + 1).padStart(2, "0")} / {String(landmarks.length).padStart(2, "0")}</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" aria-label="Previous landmark" title="Previous landmark" disabled={available.length < 2} onClick={() => move(-1)} className="rounded-none border border-sieg-white/30 hover:bg-sieg-white/10 hover:text-sieg-white"><ArrowLeft /></Button>
            <Button variant="ghost" size="icon" aria-label="Next landmark" title="Next landmark" disabled={available.length < 2} onClick={() => move(1)} className="rounded-none border border-sieg-white/30 hover:bg-sieg-white/10 hover:text-sieg-white"><ArrowRight /></Button>
            {!reducedMotion && <Button variant="ghost" size="icon" aria-label={paused ? "Play slideshow" : "Pause slideshow"} title={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((previous) => !previous)} className="rounded-none hover:bg-sieg-white/10 hover:text-sieg-white">{paused ? <Play /> : <Pause />}</Button>}
          </div>
        </div>
      </div>
    </section>
  );
}