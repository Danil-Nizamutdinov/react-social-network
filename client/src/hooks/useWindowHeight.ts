import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { getVideosNextPage } from "@src/store/reducers/ActionCreators/VideoAC";

const useWindowHeight = (page: number, totalPages: number) => {
  const dispatch = useAppDispatch();
  const scrollHandler = (e: Event) => {
    const target = e.target as Document;

    const scrollPosition = target.documentElement.scrollTop;
    const scrollHeight = target.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const nearBottom = scrollHeight - (scrollPosition + windowHeight) < 100;
    if (nearBottom && page < totalPages) {
      dispatch(getVideosNextPage(page + 1));
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [page]);
};

export default useWindowHeight;
