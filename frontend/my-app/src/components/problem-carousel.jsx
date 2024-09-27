import ProblemCarouselCard from "./problem-carousel-card";
import React from "react";
import { useState } from "react";
import "./problem-carousel.css";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default function ProblemCarousel({ problems }) {
  const [problemIndex, setProblemIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  function handleNext() {
    setDirection("next");
  }
  function handlePrev() {
    setDirection("prev");
  }
  return (
    <div className="problem-carousel">
      <div className="problem-carousel-arrow" onClick={handlePrev}>
        {" "}
        <FaCaretLeft />{" "}
      </div>
      <div
        className={`problem-carousel-card ${direction}`}
        onTransitionEnd={() => {
            if (direction === "next") {
              setProblemIndex((problemIndex + 1) % problems.length);
              setDirection(null);
            } else if (direction === "prev") {
              setProblemIndex(
                ((problemIndex - 1 + problems.length) % problems.length)
              );
              setDirection(null);
            }
            if (direction) {
              setDirection(`${direction}-entering`);
            }
          }}
      >
        {
          <ProblemCarouselCard
            problemTitle={problems[problemIndex].name}
            problemRating={problems[problemIndex].rating}
          />
        }
      </div>
      <div className="problem-carousel-arrow" onClick={handleNext}>
        {" "}
        <FaCaretRight />{" "}
      </div>
    </div>
  );
}
