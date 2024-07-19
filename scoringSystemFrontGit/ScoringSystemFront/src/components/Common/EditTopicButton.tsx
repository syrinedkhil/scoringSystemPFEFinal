import * as React from "react";
import EditIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

interface Props {
  onClick: () => void;
}

const EditTopicButton: React.FC<Props> = ({ onClick }) => {
  return (
      <IconButton onClick={onClick} style={{}}>
        <EditIcon style={{}} />
      </IconButton>
  );
};
export default EditTopicButton;
