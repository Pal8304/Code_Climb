import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import tags from "./tags.json";
import { InputLabel, MenuItem, TextField, FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import LoadingQuestions from "./loading";
const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [problems_rating, setProblems_Rating] = useState(null);
  const [problems_tag, setProblem_Tag] = useState([]);
  const [tag, setTag] = useState("");
  const [loading, setIsLoading] = useState(0); // 0 - not loading and no spinner in rating, 1 - loading and spinner in rating , 2 - fetched and no spinner in rating
  const [loading_tag, setIsLoading_tag] = useState(3); // 3 - not loading and no spinner in tag, 4 - loading and spinner in tag , 5 - fetched and no spinner in tag
  const [, setCurrentProblem] = useState(null);

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
          <TextField
            id="outlined-basic"
            label="Codeforces Username"
            variant="outlined"
            value={username}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              width: 300,
            }}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Button variant="contained" type="submit">
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
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="tags-select-label">Tags</InputLabel>
            <Select
              labelId="tags-select-label"
              id="tags-select-standard"
              value={tag}
              label="Tags"
              sx={{
                color: "white",
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              onChange={(e) => {
                setTag(e.target.value);
                console.log(e.target.value);
              }}
            >
              {tags.map((tag) => (
                <MenuItem value={tag.tag_id} key={tag.tag_id}>
                  {tag.tag_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            Generate Questions as per tag
          </Button>
        </div>
      </form>

      {loading === 1 ? <LoadingQuestions /> : <div></div>}
      <div className="problems">
        {loading === 2 ? (
          <div className="problems_rating">
            <h2>Problems By Rating</h2>
            <ul>
              {problems_rating.map((problem) => (
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
        ) : (
          <div className="problems"></div>
        )}

        {loading_tag === 4 ? (
          <div>
            <LoadingQuestions />
          </div>
        ) : loading_tag === 5 ? (
          <div className="problems_tag">
            <h2>Problems By Tag</h2>
            <div className="problems_tag_list">
              <ul>
                {problems_tag.map((problem) => (
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
          </div>
        ) : (
          <div className="problems_tag"></div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
