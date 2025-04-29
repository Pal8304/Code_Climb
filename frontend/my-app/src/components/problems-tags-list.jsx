import { Link } from "react-router-dom";
export default function ProblemsTagsList({ problems_tag }) {
    return (
        <div>
            <h2>Problems By Tag</h2>
            <div className="problems_tag_list">
                <ul>
                    {problems_tag.map((problem) => (
                        <Link
                            to={`/scrape-problem/${problem.contestId}/${problem.index}`}
                            onClick={() => {
                                //   setCurrentProblem({
                                //     contestId: problem.contestId,
                                //     index: problem.index,
                                //   });
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
        </div>
    );
}