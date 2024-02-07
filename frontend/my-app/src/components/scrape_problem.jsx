import React,{useState,useEffect} from "react";
import DOMPurify from 'dompurify'
const ScrapeProblem = ({contestId,index}) => {
    const [problem_statement, setProblem_Statement] = useState("");
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/get_problem_statement/${contestId}/${index}`)
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            setProblem_Statement(DOMPurify.sanitize(data.problem_statement));
        });
    }, [contestId,index]);
    return (
        <div>
            <h1>Problem Statement</h1>
            <div dangerouslySetInnerHTML={{ __html: problem_statement }} ></div>
        </div>
    );
    // console.log(problem_statement);
}

export default ScrapeProblem;