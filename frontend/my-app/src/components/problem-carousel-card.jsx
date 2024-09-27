import "./problem-carousel-card.css";

export default function ProblemCarouselCard({problemTitle, problemDescription, problemRating}){
    return (
        <div className="problem-carousel-card">
            <h2 className="problem-title">
                {problemTitle}
            </h2>
            <p className="problem-rating">
                {problemRating}
            </p>
        </div>
    )
}