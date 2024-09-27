import React from 'react';
export default function ProblemRating({ loading, rating }) {
    if(loading){
        return (
            <div>
                Loading...
            </div>
        );
    }
    if(rating === null || rating === undefined || rating === ""){
        return (
            <div>
                Rating not available
            </div>
        );
    }
    return (
        <div>
            <h1>Rating: {rating}</h1>
        </div>
    );
}