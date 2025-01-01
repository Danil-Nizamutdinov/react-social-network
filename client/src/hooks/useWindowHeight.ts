import { useEffect, useState } from "react";

const useWindowHeight = () => {
  const scrollHandler = (e: Event) => {
    const target = e.target as Document;

    const scrollPosition = target.documentElement.scrollTop;
    const scrollHeight = target.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    const nearBottom = scrollHeight - (scrollPosition + windowHeight) < 100;
    console.log(nearBottom, "nearBottom");

    if (nearBottom) {
      console.log(nearBottom);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);
};

export default useWindowHeight;
