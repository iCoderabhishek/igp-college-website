import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HeroCarouselProps {
  images: string[];
  interval?: number;
  children?: React.ReactNode;
}

export default function HeroCarousel({
  images,
  interval = 4000,
  children,
}: HeroCarouselProps) {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, interval);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [api, interval]);

  // Update current slide when carousel changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      opts={{
        loop: true,
        align: "start",
      }}
      className="w-full h-full"
      setApi={setApi}
    >
      <CarouselContent className="h-full">
        {images.map((image, index) => (
          <CarouselItem key={index} className="h-full">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(/home-overly.png)` }}
              />
              {children}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-4 bg-black/30 hover:bg-black/50 text-white border-none" />
      <CarouselNext className="right-4 bg-black/30 hover:bg-black/50 text-white border-none" />
    </Carousel>
  );
}
