import { GraduationCap, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function UniversityCarousel({ universities }: { universities: string[] }) {
  return (
    <Carousel opts={{ align: "start", slidesToScroll: 1 }} aria-label="German universities" className="mx-auto mt-6 max-w-[1600px] px-5 pt-16 md:px-10">
      <div className="absolute right-5 top-0 flex gap-2 md:right-10">
        <CarouselPrevious aria-label="Previous universities" title="Previous universities" className="static h-11 w-11 translate-y-0 rounded-none border-sieg-white/30 bg-sieg-black text-sieg-white hover:bg-sieg-yellow hover:text-sieg-black" />
        <CarouselNext aria-label="Next universities" title="Next universities" className="static h-11 w-11 translate-y-0 rounded-none border-sieg-white/30 bg-sieg-black text-sieg-white hover:bg-sieg-yellow hover:text-sieg-black" />
      </div>
      <CarouselContent>
        {universities.map((name, index) => (
          <CarouselItem key={name} className="basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <article className="flex h-64 flex-col border border-sieg-white/20 bg-sieg-ink p-6">
              <div className="flex items-center justify-between text-sieg-yellow">
                <GraduationCap className="h-7 w-7" aria-hidden="true" />
                <span className="font-mono-label text-xs text-sieg-white/45">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold leading-snug">{name}</h3>
              <Button asChild variant="link" className="mt-auto h-auto justify-between p-0 text-sieg-yellow">
                <Link to="/dashboard" aria-label={`Start your journey — ${name}`}>Start your journey <ArrowUpRight aria-hidden="true" /></Link>
              </Button>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}