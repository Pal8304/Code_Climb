import "./App.css";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [username, setUsername] = useState("");
  const [problems_rating, setProblems_Rating] = useState(null);
  const [problems_tag, setProblem_Tag] = useState([]);
  const [tag, setTag] = useState("");
  const [loading, setIsLoading] = useState(0); // 0 - not loading and no spinner, 1 - loading and spinner, 2 - fetched and no spinner
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
      </form>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch(
            `http://localhost:8000/get_questions_by_tag/${username}/${tag}`
          );
          const data = await response.json();
          setProblem_Tag(data);
        }}
      >
        {/* <input type="text" 
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Enter your CF username" className="custom-input" /> */}
        <Dropdown className="custom-dropdown">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select Tag
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => {
            setTag("dp");
          }
          }>DP</Dropdown.Item>
          <Dropdown.Item onClick={(e) => {
            setTag("math");
          }
          }>Math</Dropdown.Item>
          <Dropdown.Item onClick={(e) => {
            setTag("implementation");
          }
          }>Implementation</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" type="submit" className="custom-button">
          Generate Questions as per tag
        </Button>
      </form>

      {
        loading === 1 ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <div></div>
        )
      }

      {
        loading === 2 ? (
          <div>
            <h2>Problems</h2>
            <ul>
              {problems_rating.map((problem) => (
                <li key={problem.contestId + problem.index}>
                  <a
                    href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                  >
                    {problem.name} ({problem.rating})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div></div>
        )
      }

      {
        problems_tag.length > 0 ? (
          <div>
            <h2>Problems</h2>
            <ul>
              {problems_tag.map((problem) => (
                <li key={problem.contestId + problem.index}>
                  <a
                    href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                  >
                    {problem.name} ({problem.rating})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div></div>
        )
      }
      {/* {JSON.stringify(problems_tag)} */}
    </main>
  );
}

export default App;