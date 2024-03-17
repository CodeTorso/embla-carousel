import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const rapidFire = [
  { q: "What is JavaScript?", a: "A programming language" },
  { q: "What is a variable?", a: "A container for data" },
  { q: "What is an array?", a: "A collection of elements" },
  { q: "What is a function?", a: "A reusable block of code" },
  { q: "What is an object?", a: "A collection of key-value pairs" },
  { q: "What is DOM?", a: "Document Object Model" },
  { q: "What is a loop?", a: "Repeating execution of code" },
  {
    q: "What is a conditional statement?",
    a: "Executes code based on condition",
  },
  { q: "What is an API?", a: "Application Programming Interface" },
  { q: "What is AJAX?", a: "Asynchronous JavaScript and XML" },
  { q: "What is HTTP?", a: "Hypertext Transfer Protocol" },
  { q: "What is a callback function?", a: "A function passed as an argument" },
  {
    q: "What is a promise?",
    a: "An object representing the eventual completion",
  },
  { q: "What is ES6?", a: "ECMAScript 2015" },
  { q: "What is a module?", a: "Encapsulated code" },
  { q: "What is npm?", a: "Node Package Manager" },
];

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    // containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="max-w-screen-md m-auto">
      <div className="px-3 overflow-hidden" ref={emblaMainRef}>
        <div className="flex touch-pan-y ml-[calc(1rem_*_-1)]">
          {slides.map((index) => (
            <div className="flex-[0_0_100%] min-w-0 pl-4" key={index}>
              <div className="shadow-[inset_0_0_0_0.2rem_rgb(25,25,25)] text-[4rem] font-semibold flex flex-col items-center justify-center gap-1 h-[19rem] rounded-[1.8rem]">
                <h2 className="text-gray-300 text-xl font-bold">
                  {rapidFire[index].q}
                </h2>
                <h2 className="text-gray-100 text-4xl">{rapidFire[index].a}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[0.8rem]">
        <div className="px-4 overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex ml-[calc(0.8rem_*_-1)]">
            {slides.map((index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
