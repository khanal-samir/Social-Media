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
import useGetAllTweets from "@/hooks/useGetAllTweets";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { allTweets } from "@/store/tweetSlice";
import { FaXTwitter } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
const Foryou = () => {
  const { loading, getTweets } = useGetAllTweets();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchTweets = async () => {
      const data = await getTweets({ page: currentPage });
      if (data.length > 0) {
        dispatch(allTweets(data));
        return;
      } else {
        toast({ variant: "destructive", title: "No more tweets to show " });
        setCurrentPage(currentPage - 1);
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
    <div className="flex flex-col gap-2">
      <Posts />
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            href="#"
            onClick={() =>
              setCurrentPage((prev) => (prev === 1 ? prev : prev - 1))
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
  );
};

export default Foryou;
