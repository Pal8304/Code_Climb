export default function ProblemTag({loading, tags}){
    if(loading){
        return (
            <div>
                Loading...
            </div>
        );
    }
    if(tags === null || tags === undefined || tags === ""){
        return (
            <div>
                Tags not available
            </div>
        );
    }
    return (
        <div>
            <h1>Tags: {tags}</h1>
        </div>
    );
}