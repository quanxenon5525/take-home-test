import React, { useEffect, useRef } from "react";

type AutoHorizontalScrollLoopContainerProps = {
  scrollStep?: number;
  style?: React.CSSProperties;
  url: string[];
  width?: number;
  height?: number;
};

function AutoHorizontalScrollLoopContainer({
  url,
  style,
  scrollStep = 2,
  width = 100,
  height = 100,
}: AutoHorizontalScrollLoopContainerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);

  const defaultImage: any = {
    width: width,
    height: height,
  };
  const setStyleImage = { ...defaultImage, ...style };
  const innerContentWidth = url?.length * setStyleImage?.width || 0;

  useEffect(() => {
    if (!scrollContainerRef.current || !innerContentRef.current) return;

    const contentWidth = contentRef.current?.clientWidth || 0;
    const innerWidth = innerContentWidth || contentWidth;
    const clone = innerContentRef.current.cloneNode(true) as HTMLElement;
    const totalNodesToAppend = Math.ceil(contentWidth / innerWidth);

    Array.from({ length: totalNodesToAppend }).forEach(() => {
      scrollContainerRef.current?.appendChild(clone.cloneNode(true));
    });

    let scrollAmount = 0;
    let animationFrameId: number;
    const scroll = () => {
      if (!scrollContainerRef.current) return;
      scrollAmount += scrollStep;
      scrollContainerRef.current.style.transform = `translateX(-${scrollAmount}px)`;
      if (scrollAmount >= innerWidth) {
        scrollAmount = 0;
        scrollContainerRef.current.style.transform = "translateX(0)";
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollStep, innerContentWidth]);

  return (
    <div
      className="scrollTrack"
      ref={contentRef}
      style={{ overflow: "hidden", position: "relative", width: "100%" }}
    >
      <div
        className="flex absolute flex-nowrap w-auto"
        ref={scrollContainerRef}
        style={{ display: "flex", whiteSpace: "nowrap" }}
      >
        <div
          ref={innerContentRef}
          className="flex-nowrap relative"
          style={{ display: "flex" }}
        >
          {url?.length > 0 &&
            url.map((link, index) => (
              <div key={index} style={setStyleImage} className="px-2 py-3">
                <img
                  width="100%"
                  height="100%"
                  src={link}
                  alt="partner"
                  style={{
                    objectFit: "scale-down",
                    filter: "drop-shadow(0 0 0.5rem rgba(0,0,0,.3))",
                  }}
                  loading="lazy"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AutoHorizontalScrollLoopContainer;
