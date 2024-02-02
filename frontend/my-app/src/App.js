import "./App.css";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [username, setUsername] = useState("");
  const [problems_rating, setProblems_Rating] = useState(null);
  const [problems_tag, setProblem_Tag] = useState([]);
  const [tag, setTag] = useState("");
  const [loading, setIsLoading] = useState(0); // 0 - not loading and no spinner in rating, 1 - loading and spinner in rating , 2 - fetched and no spinner in rating
  const [loading_tag, setIsLoading_tag] = useState(3); // 3 - not loading and no spinner in tag, 4 - loading and spinner in tag , 5 - fetched and no spinner in tag
  return (
    <main>
      <h1>CF Problem Generator</h1>
      <p>This is a tool to generate problems for the CF Problem Generator.</p>
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
          <Button variant="primary" type="submit" className="custom-button">
            Generate Questions as per rating
          </Button>
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
              Select Tag
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => {
                  setTag("dp");
                }}
              >
                DP
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  setTag("math");
                }}
              >
                Math
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  setTag("implementation");
                }}
              >
                Implementation
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary" type="submit" className="custom-button">
            Generate Questions as per tag
          </Button>
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
        {loading == 2 ? (
          <div className="problems_rating">
            <h2>Problems By Rating</h2>
            <ul>
              {problems_rating.map((problem) => (
                <a
                  href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                  target="_blank"
                >
                  <li
                    className={problem.solved ? "solved" : "unsolved"}
                    key={problem.contestId + problem.index}
                  >
                    {problem.name} ({problem.rating})
                  </li>
                </a>
              ))}
            </ul>
          </div>
        ) : (
          <div></div>
        )}

        {loading_tag == 4 ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : loading_tag == 5 ? (
          <div className="problems_tag">
            <h2>Problems By Tag</h2>
            <div className="problems_tag_list">
              <ul>
                {problems_tag.map((problem) => (
                  <a
                    href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                    target="_blank"
                  >
                    <li
                      className={problem.solved ? "solved" : "unsolved"}
                      key={problem.contestId + problem.index}
                    >
                      {problem.name} ({problem.rating})
                    </li>
                  </a>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {/* {JSON.stringify(problems_tag)} */}
      </div>
    </main>
  );
}

export default App;
