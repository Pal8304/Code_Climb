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
            `http://localhost:8000/get_unsolved_questions/${username}/1000/1100`
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

      {JSON.stringify(problems)}
    </main>
  );
}

export default App;
