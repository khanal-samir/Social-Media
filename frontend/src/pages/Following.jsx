/* eslint-disable react-hooks/exhaustive-deps */
import { Posts } from "@/components";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FaXTwitter } from "react-icons/fa6";
import useGetFollowingTweets from "@/hooks/useGetFollowingTweets";
import { useDispatch, useSelector } from "react-redux";
import { allTweets } from "@/store/tweetSlice";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
const Following = () => {
  const dispatch = useDispatch();
  const { loading, fetchFollowingTweets } = useGetFollowingTweets();
  const [currentPage, setCurrentPage] = useState(1);
  const tweets = useSelector((state) => state.tweet.tweets);
  const { toast } = useToast();
  useEffect(() => {
    const fetchTweets = async () => {
      const data = await fetchFollowingTweets({ page: currentPage });
      if (data.length > 0) {
        dispatch(allTweets(data));
        return;
      } else {
        toast({ variant: "destructive", title: "No more tweets to show " });
        setCurrentPage((prev) => prev - 1);
      }
    };
    fetchTweets();
  }, [dispatch, currentPage]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center text-5xl  border-x-2">
        <FaXTwitter className="animate-bounce" />
      </div>
    );
  return (
    <>
      {!tweets.length ? (
        <div className="h-screen border-x-2 py-8 text-center text-muted-foreground font-light text-2xl">
          <p>Welcome to the Following page!!</p>
          <p>
            Follow other users to get there specified feeds on your timeline.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Posts />
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => (!prev === 1 ? prev - 1 : prev))
                }
              >
                Previous
              </PaginationPrevious>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(1)}
                  isActive={1 === currentPage}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(2)}
                  isActive={2 === currentPage}
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(3)}
                  isActive={3 === currentPage}
                >
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </PaginationNext>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default Following;
