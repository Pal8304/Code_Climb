import React,{useState,useEffect} from "react";
import DOMPurify from 'dompurify'
const ScrapeProblem = ({contestId,index}) => {
    const [problem_statement, setProblem_Statement] = useState("");
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/get_problem_statement/${contestId}/${index}`)
        .then((res) => res.json())
        .then((data) => {
            const formattedContent = data.problem_statement.replace(/\$\$\$(.*?)\$\$\$/g, (match, p1) => {
                return `\\(${p1}\\)`; // Assuming inline math, adjust if needed
            });
            setProblem_Statement(DOMPurify.sanitize(formattedContent));
        });
    }, [contestId,index]);

    useEffect(() => {
        // Trigger MathJax typesetting after updating the problem statement
        if (window.MathJax) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
        }
    }, [problem_statement]);

    return (
        <div>
            <h1>Problem Statement</h1>
            <div dangerouslySetInnerHTML={{ __html: problem_statement }} ></div>
        </div>
    );
    // console.log(problem_statement);
}

export default ScrapeProblem;