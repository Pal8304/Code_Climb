import React,{useState,useEffect} from "react";
import DOMPurify from 'dompurify'
import { useParams } from "react-router-dom";

const ScrapeProblem = () => {
    const {contestId,index} = useParams();
    const [problem_statement, setProblem_Statement] = useState("");
    const [problem_tite, setProblem_Title] = useState("");
    const [problem_time_limit, setProblem_Time_Limit] = useState("");
    const [problem_memory_limit, setProblem_Memory_Limit] = useState("");
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/get_problem_statement/${contestId}/${index}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const formattedProblemStatement = data.problem_statement.replace(/\$\$\$(.*?)\$\$\$/g, (match, p1) => {
                return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
            });
            setProblem_Statement(DOMPurify.sanitize(formattedProblemStatement));
            const formattedProblemTitle = data.problem_title.replace(/\$\$\$(.*?)\$\$\$/g, (match, p1) => {
                return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
            }
            );
            setProblem_Title(DOMPurify.sanitize(formattedProblemTitle));
            const formattedProblemTimeLimit = data.problem_time_limit.replace(/\$\$\$(.*?)\$\$\$/g, (match, p1) => {
                return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
            }
            );
            setProblem_Time_Limit(DOMPurify.sanitize(formattedProblemTimeLimit));
            const formattedProblemMemoryLimit = data.problem_memory_limit.replace(/\$\$\$(.*?)\$\$\$/g, (match, p1) => {
                return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
            }
            );
            setProblem_Memory_Limit(DOMPurify.sanitize(formattedProblemMemoryLimit));
        });
    }, [contestId,index]);

    useEffect(() => {
        // Trigger MathJax typesetting after updating the problem statement
        if (window.MathJax) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
        }
    }, [problem_statement]);

    return (
        <div className="problem_details_container">
            <h2 dangerouslySetInnerHTML={{ __html: problem_tite }} ></h2>
            <p dangerouslySetInnerHTML={{ __html: problem_time_limit }} ></p>
            <p dangerouslySetInnerHTML={{ __html: problem_memory_limit }} ></p>
            <div dangerouslySetInnerHTML={{ __html: problem_statement }} ></div>
        </div>
    );
    // console.log(problem_statement);
}

export default ScrapeProblem;