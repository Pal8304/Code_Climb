import { Link } from "react-router-dom";
import { useState } from "react";
export default function ProblemsRatingList({ problems }) {
  const [, setCurrentProblem] = useState({
    contestId: "",
    index: "",
  });
  return (
    <div>
      <h2>Problems By Rating</h2>
      <ul>
        {problems.map((problem) => (
          <Link
            to={`/scrape-problem/${problem.contestId}/${problem.index}`}
            onClick={() => {
                setCurrentProblem({
                  contestId: problem.contestId,
                  index: problem.index,
                });
            }}
          >
            <li
              className={problem.solved ? "solved" : "unsolved"}
              key={problem.contestId + problem.index}
            >
              {problem.name} ({problem.rating})
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
