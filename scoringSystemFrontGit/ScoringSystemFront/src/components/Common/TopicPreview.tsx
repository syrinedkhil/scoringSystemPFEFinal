import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Topic from "../../Interfaces/Topic";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface Props {
  selectedTopicToScore: Topic | null;
}

const TopicPreview: React.FC<Props> = ({ selectedTopicToScore }) => {
  const [showHighChips, setShowHighChips] = useState(false);
  const [showMidChips, setShowMidChips] = useState(false);
  const [showLowChips, setShowLowChips] = useState(false);

  const handleShowMoreHigh = () => {
    setShowHighChips(true);
  };

  const handleShowLessHigh = () => {
    setShowHighChips(false);
  };

  const handleShowMoreMid = () => {
    setShowMidChips(true);
  };

  const handleShowLessMid = () => {
    setShowMidChips(false);
  };

  const handleShowMoreLow = () => {
    setShowLowChips(true);
  };

  const handleShowLessLow = () => {
    setShowLowChips(false);
  };

  return (
    <>
      {selectedTopicToScore && selectedTopicToScore.id != "" && (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            p: 1,
          }}
        >
          {selectedTopicToScore.highLabels.length > 0 && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                High Priority Labels:
              </Typography>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {selectedTopicToScore.highLabels.map((data, index) => {
                  if (showHighChips || index < 5) {
                    return (
                      <ListItem key={index}>
                        <Chip label={data} />
                      </ListItem>
                    );
                  } else {
                    return null;
                  }
                })}
                {selectedTopicToScore.highLabels.length > 5 && (
                    <ListItem>
                      {!showHighChips ? (
                        <Chip label="Show More" onClick={handleShowMoreHigh} />
                      ) : (
                        <Chip label="Show Less" onClick={handleShowLessHigh} />
                      )}
                    </ListItem>
                  )}
              </Paper>
            </>
          )}

          {selectedTopicToScore.midLabels.length > 0 && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Medium Priority Labels:
              </Typography>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {selectedTopicToScore.midLabels.map((data, index) => {
                  if (showMidChips || index < 5) {
                    return (
                      <ListItem key={index}>
                        <Chip label={data} />
                      </ListItem>
                    );
                  } else {
                    return null;
                  }
                })}
                {selectedTopicToScore.midLabels.length > 5 && (
                    <ListItem>
                      {!showMidChips ? (
                        <Chip label="Show More" onClick={handleShowMoreMid} />
                      ) : (
                        <Chip label="Show Less" onClick={handleShowLessMid} />
                      )}
                    </ListItem>
                  )}
              </Paper>
            </>
          )}

          {selectedTopicToScore.lowLabels.length > 0 && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Low Priority Labels:
              </Typography>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {selectedTopicToScore.lowLabels.map((data, index) => {
                  if (showLowChips || index < 5) {
                    return (
                      <ListItem key={index}>
                        <Chip label={data} />
                      </ListItem>
                    );
                  } else {
                    return null;
                  }
                })}
                {selectedTopicToScore.lowLabels.length > 5 && (
                    <ListItem>
                      {!showLowChips ? (
                        <Chip label="Show More" onClick={handleShowMoreLow} />
                      ) : (
                        <Chip label="Show Less" onClick={handleShowLessLow} />
                      )}
                    </ListItem>
                  )}
              </Paper>
            </>
          )}
        </Paper>
      )}
    </>
  );
};
export default TopicPreview;
