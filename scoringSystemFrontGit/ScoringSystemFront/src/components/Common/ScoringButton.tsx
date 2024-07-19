import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

interface ScoringButtonProps {
  scoringLoader: boolean;
  Bfunction: () => void;
  text1: string;
  text2: string;
}
const ScoringButton: React.FC<ScoringButtonProps> = ({ scoringLoader, Bfunction,text1, text2}) => {
  function handleClick() {
    Bfunction();
  }

  return (
      <LoadingButton
        style={{ /* width: "100%", */height:'35px'}}
        fullWidth
        size="small"
        onClick={handleClick}
        loading={scoringLoader}
        loadingIndicator={text2}
        variant="contained"
      >
        <span>{text1}</span>
      </LoadingButton>
  );
};
export default ScoringButton;
