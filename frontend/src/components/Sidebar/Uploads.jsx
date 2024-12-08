import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useSelector } from "react-redux";

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
  console.log("Filtered", filteredTweet);

  return (
    <div className="flex flex-col gap-2 ">
      <h1 className="font-semibold text-center  text-sm lg:text-xl">Uploads</h1>
      <hr />
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-1">
          {filteredTweet?.map((tweet, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="w-28 h-28 p-2 cursor-pointer">
                <img
                  src={tweet.media}
                  className="object-cover h-full w-full rounded-md border-2 transition-transform hover:scale-110"
                />
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
