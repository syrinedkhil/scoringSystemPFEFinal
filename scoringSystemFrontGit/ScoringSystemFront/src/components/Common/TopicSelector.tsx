import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Topic from "../../Interfaces/Topic";
import emptyTopic from "../../Interfaces/EmptyTopic";
interface Props {
  topics: Topic[];
  selectedTempToScore: Topic | null;
  handleSelectedTempToScore: (topics: Topic) => void;
}

const TopicSelector: React.FC<Props> = ({
  topics,
  selectedTempToScore,
  handleSelectedTempToScore,
}) => {

  function handleOnChange() {
    return (_event: any, newValue: string | null) => {
      const selected = topics.find((topic) => topic.topicName === newValue);
      if (selected) {
        handleSelectedTempToScore(selected);
      } else {
        handleSelectedTempToScore(emptyTopic);
      }
    };
  }
  
  return (
    <Autocomplete
      style={{ width: "100%" }}
      value={selectedTempToScore ? selectedTempToScore.topicName : ""}
      onChange={handleOnChange()}
      id="controllable-states-demo"
      options={topics.map((topic) => topic.topicName)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Topic" />}
    />
  );
};
export default TopicSelector;
