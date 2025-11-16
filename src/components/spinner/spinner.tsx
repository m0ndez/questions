import "./spinner.css";

type SpinnerProps = {
  message?: string;
};
export const Spinner = ({ message = "Loading users..." }: SpinnerProps) => {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
};
