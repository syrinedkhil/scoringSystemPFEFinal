import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Topic from "../../Interfaces/Topic";

interface Props {
  topics: Topic[];
  selectedTopicToScore: Topic | null;
  handleSelectedTempToScore: (topic: Topic | null) => void;
  clearRightDiv: () => void;
}

const NewTopicSelector: React.FC<Props> = ({
  topics,
  selectedTopicToScore,
  handleSelectedTempToScore,
  clearRightDiv,
}) => {
  function handleOnChange() {
    return (_event: any, newValue: any) => {
      const selected = topics.find((topic) => topic.topicName === newValue);
      if (selected) {
        handleSelectedTempToScore(selected);
      } else {
        handleSelectedTempToScore(null);
      }
      clearRightDiv();
    };
  }

  return (
    <Autocomplete
      style={{ width: "100%" }}
      value={selectedTopicToScore ? selectedTopicToScore.topicName : ""}
      onChange={handleOnChange()}
      id="controllable-states-demo"
      options={topics.map((topic) => topic.topicName)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Topic" />}
    />
  );
};
export default NewTopicSelector;
