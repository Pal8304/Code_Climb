import "./App.css";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [problems, setProblems] = useState([]);

  return (
    <main>
      <h1>CF Problem Generator</h1>
      <p>This is a tool to generate problems for the CF Problem Generator.</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch(
            `http://localhost:8000/get_questions/${username}`
          );
          const data = await response.json();
          setProblems(data);
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>

      {
        problems.length > 0 && (
          <div>
            <h2>
              Problems
            </h2>
            <ul>
              {problems.map((problem)=>
                <li>
                  <a href= {`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`} >
                    {problem.name} ({problem.rating})
                  </a>
                </li>
              )}
            </ul>
          </div>
        )
      }
      {/* {JSON.stringify(problems)} */}
    </main>
  );
}

export default App;
