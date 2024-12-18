import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const StoriesNav = () => {
  const plugin = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false, // true makes it stop all the time and it doesnt move again
      stopOnMouseEnter: true, // this to make it move again
    }),
  );
  const tweets = useSelector((state) => state.tweet.tweets);
  const filteredTweet = tweets?.filter((tweet) => tweet.media !== "") || [];

  if (filteredTweet.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-center text-sm lg:text-xl">Uploads</h1>
      <hr />
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-1">
          {filteredTweet?.map((tweet, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="w-28 h-28 p-2 cursor-pointer">
                    <img
                      src={tweet.media}
                      alt={`Tweet media ${index}`}
                      className="object-cover h-full w-full rounded-md border-2 transition-transform hover:scale-110"
                    />
                  </div>
                </CarouselItem>
              </DialogTrigger>
              <DialogContent>
                <div className="max-h-96 flex flex-col p-2 justify-center items-center">
                  <img
                    src={tweet.media}
                    alt={`Tweet media ${index}`}
                    className="w-96 h-96 object-cover rounded-md"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </CarouselContent>
      </Carousel>
      <hr />
    </div>
  );
};

export default StoriesNav;
