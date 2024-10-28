import { Card, CardContent } from "@/components/ui/card";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const StoriesNav = () => {
  const plugin = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false, // true makes it stop all the time and it doesnt move again
      stopOnMouseEnter: true, // this to make it move again
    }),
  );

  return (
    <div className="flex flex-col gap-2 ">
      <h1 className="font-semibold text-center  text-sm lg:text-xl">Stories</h1>
      <hr />
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 transition-transform hover:scale-105">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <hr />
    </div>
  );
};

export default StoriesNav;
