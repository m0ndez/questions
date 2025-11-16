import "./content-error.css";

type ContentErrorProps = {
  message?: string;
};

export const ContentError = ({
  message = "Something went wrong. Please try again.",
}: ContentErrorProps) => {
  return (
    <div className="error-container">
      <p className="error-message">{message}</p>
      <button className="error-button" onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );
};
