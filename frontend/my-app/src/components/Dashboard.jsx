import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import tags from "./tags.json";

import problemList from "./problemsList.json";

import ProblemRating from "./problem-rating";
import ProblemCarousel from "./problem-carousel";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [problems_rating, setProblems_Rating] = useState(null);
  const [problems_tag, setProblem_Tag] = useState([]);
  const [tag, setTag] = useState("");
  const [loading, setIsLoading] = useState(0); // 0 - not loading and no spinner in rating, 1 - loading and spinner in rating , 2 - fetched and no spinner in rating
  const [loading_tag, setIsLoading_tag] = useState(3); // 3 - not loading and no spinner in tag, 4 - loading and spinner in tag , 5 - fetched and no spinner in tag
  const [currentProblem, setCurrentProblem] = useState(null);
  console.log(problems_rating);
  return (
    <main>
      <h1>Code Climb</h1>
      <p>
        Enter your Codeforces username and we will generate problems for you
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(1);
          const response = await fetch(
            `http://localhost:8000/get_questions/${username}`
          );
          const data = await response.json();
          setProblems_Rating(data);
          setIsLoading(2);
        }}
      >
        <div className="rating_input">
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter your CF username"
            className="custom-input"
          />
          <button type="submit" className="generate-questions-btn">
            Generate Questions as per rating
          </button>
        </div>
      </form>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading_tag(4);
          const response = await fetch(
            `http://localhost:8000/get_questions_by_tag/${username}/${tag}`
          );
          const data = await response.json();
          setProblem_Tag(data);
          setIsLoading_tag(5);
        }}
      >
        <div className="tag_input">
          <Dropdown className="custom-dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {tag ? tag : "Select Tag"}{" "}
              {/* Show the selected tag if it exists, otherwise show "Select Tag" */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                tags.map((tag) => (
                  <Dropdown.Item
                    onClick={() => {
                      setTag(tag.tag_id);
                    }}
                  >
                    {tag.tage_name}
                  </Dropdown.Item>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>
          <button type="submit" className="generate-questions-btn">
            Generate Questions as per tag
          </button>
        </div>
      </form>

      {loading === 1 ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div></div>
      )}
      <div className="problems">
        {loading === 2 ? problems_rating && (
          <div className="problems_rating">
            <h2>Problems By Rating</h2>
            <ul>
              {problems_rating && problems_rating.map((problem) => (
                <Link to={`/scrape-problem/${problem.contestId}/${problem.index}`}
                onClick={
                  () => {
                    setCurrentProblem({
                      contestId: problem.contestId,
                      index: problem.index,
                    });
                    console.log(problem.contestId,problem.index);
                  }
                }
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
        ) : (
          <div className="problems"></div>
        )}

        {loading_tag === 4 ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : loading_tag === 5 ? (
          <div className="problems_tag">
            <h2>Problems By Tag</h2>
            <div className="problems_tag_list">
              <ul>
                {problems_tag.map((problem) => (
                  <Link to={`/scrape-problem/${problem.contestId}/${problem.index}`}
                  onClick={
                    () => {
                      setCurrentProblem({
                        contestId: problem.contestId,
                        index: problem.index,
                      });
                      //console.log(problem.contestId,problem.index);
                    }
                  }
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
        ) : (
          <div className="problems_tag"></div>
        )}
        {/* {JSON.stringify(tags)} */}
      </div>
      {/* <div>
        { problemList && <ProblemCarousel problems={problemList} />}
      </div> */}
    </main>
  );
};

export default Dashboard;
