import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import "./scrape-problem.css";

const ScrapeProblem = () => {
  const { contestId, index } = useParams();
  const [problem_statement, setProblem_Statement] = useState("");
  const [problem_tite, setProblem_Title] = useState("");
  const [problem_time_limit, setProblem_Time_Limit] = useState("");
  const [problem_memory_limit, setProblem_Memory_Limit] = useState("");
  const [input_specification, setInput_Specification] = useState("");
  const [output_specification, setOutput_Specification] = useState("");
  const [sample_tests, setSample_Tests] = useState("");
  const [problem_note, setProblem_Note] = useState("");
  const [errorOccurred, setErrorOccurred] = useState(false);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/get_problem_statement/${contestId}/${index}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.Error !== undefined) {
          setErrorOccurred(true);
          return;
        }
        const formattedProblemStatement = data.problem_statement.replace(
          /\$\$\$(.*?)\$\$\$/g,
          (match, p1) => {
            return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
          }
        );
        setProblem_Statement(DOMPurify.sanitize(formattedProblemStatement));
        const formattedProblemTitle = data.problem_title.replace(
          /\$\$\$(.*?)\$\$\$/g,
          (match, p1) => {
            return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
          }
        );
        setProblem_Title(DOMPurify.sanitize(formattedProblemTitle));
        const formattedProblemTimeLimit = data.problem_time_limit.replace(
          /\$\$\$(.*?)\$\$\$/g,
          (match, p1) => {
            return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
          }
        );
        setProblem_Time_Limit(DOMPurify.sanitize(formattedProblemTimeLimit));
        const formattedProblemMemoryLimit = data.problem_memory_limit.replace(
          /\$\$\$(.*?)\$\$\$/g,
          (match, p1) => {
            return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
          }
        );
        setProblem_Memory_Limit(
          DOMPurify.sanitize(formattedProblemMemoryLimit)
        );
        if (
          data.problem_input_specification !== null &&
          data.problem_input_specification !== undefined &&
          data.problem_input_specification !== ""
        ) {
          const formattedInputSpecification =
            data.problem_input_specification.replace(
              /\$\$\$(.*?)\$\$\$/g,
              (match, p1) => {
                return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
              }
            );
          setInput_Specification(
            DOMPurify.sanitize(formattedInputSpecification)
          );
        }
        if (
          data.problem_output_specification !== null &&
          data.problem_output_specification !== undefined &&
          data.problem_output_specification !== ""
        ) {
          const formattedOutputSpecification =
            data.problem_output_specification.replace(
              /\$\$\$(.*?)\$\$\$/g,
              (match, p1) => {
                return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
              }
            );
          setOutput_Specification(
            DOMPurify.sanitize(formattedOutputSpecification)
          );
        }
        if (
          data.problem_sample_tests !== null &&
          data.problem_sample_tests !== undefined &&
          data.problem_sample_tests !== ""
        ) {
          const formattedSampleTests = data.problem_sample_tests.replace(
            /\$\$\$(.*?)\$\$\$/g,
            (match, p1) => {
              return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
            }
          );
          setSample_Tests(DOMPurify.sanitize(formattedSampleTests));
        }
        if (
          data.problem_note !== null &&
          data.problem_note !== undefined &&
          data.problem_note !== ""
        ) {
          const formattedProblemNote = data.problem_note.replace(
            /\$\$\$(.*?)\$\$\$/g,
            (match, p1) => {
              return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
            }
          );
          setProblem_Note(DOMPurify.sanitize(formattedProblemNote));
        }
      });
  }, [contestId, index]);
  console.log("Contest ID:", contestId);
  console.log("Index:", index);
  console.log("Problem Statement:", problem_statement);
  console.log("Problem Title:", problem_tite);
  useEffect(() => {
    // Trigger MathJax typesetting after updating the problem statement
    if (window.MathJax) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    }
  }, [problem_statement]);
  if (errorOccurred) {
    return (
      <div className="problem_details_container">
        Error occurred while fetching the problem statement.
      </div>
    );
  }
  return (
    <div className="problem_details_container">
      <h2
        className="problem_tite"
        dangerouslySetInnerHTML={{ __html: problem_tite }}
      ></h2>
      <p
        className="problem_time_limit"
        dangerouslySetInnerHTML={{ __html: problem_time_limit }}
      ></p>
      <p
        className="problem_memory_limit"
        dangerouslySetInnerHTML={{ __html: problem_memory_limit }}
      ></p>
      <div
        className="problem_statement"
        dangerouslySetInnerHTML={{ __html: problem_statement }}
      ></div>
      <div
        className="problem_input_specification"
        dangerouslySetInnerHTML={{ __html: input_specification }}
      ></div>
      <div
        className="problem_output_specification"
        dangerouslySetInnerHTML={{ __html: output_specification }}
      ></div>
      <div
        className="problem_sample_test"
        dangerouslySetInnerHTML={{ __html: sample_tests }}
      ></div>
      {/* Add condition to not add problem_note if it is null */}
      <div
        className="problem_note"
        dangerouslySetInnerHTML={{ __html: problem_note }}
      ></div>
    </div>
  );
  // console.log(problem_statement);
};

export default ScrapeProblem;
