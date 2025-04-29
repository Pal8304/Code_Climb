import { Skeleton } from "@mui/material";

export default function LoadingQuestions() {
  return (
    <div>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={300}
        height={100}
        style={{ marginBottom: "10px" }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        width={300}
        height={100}
        style={{ marginBottom: "10px" }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        width={300}
        height={100}
        style={{ marginBottom: "10px" }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        width={300}
        height={100}
        style={{ marginBottom: "10px" }}
      />
    </div>
  );
}
