import React, { useState, ChangeEvent } from "react";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputLabels from "./InputLabels";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Topic from "../../Interfaces/Topic";
import emptyTopic from "../../Interfaces/EmptyTopic";

interface TopicDrawerProps {
  open: boolean;
  onClose: () => void;
  topics: Topic[];
  addTopic: (newTemplate: Topic) => void;
  Updatetopic: (topic: Topic) => void;
  deleteTopic: (topic: Topic) => void;
}

const TopicDrawer: React.FC<TopicDrawerProps> = ({
  open,
  onClose,
  topics,
  addTopic,
  Updatetopic,
  deleteTopic,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Topic | null>(null);
  const [newTemplate, setNewTemplate] = useState<Topic>(emptyTopic);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleExpansionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleHPLabelChange = (labels: string[]) => {
    if (selectedTemplate) {
      setSelectedTemplate((prevTemplate) => {
        if (prevTemplate) {
          return { ...prevTemplate, highLabels: labels };
        }
        return null;
      });
    }
  };

  const handleMPLabelChange = (labels: string[]) => {
    if (selectedTemplate) {
      setSelectedTemplate((prevTemplate) => {
        if (prevTemplate) {
          return { ...prevTemplate, midLabels: labels };
        }
        return null;
      });
    }
  };

  const handleLPLabelChange = (labels: string[]) => {
    if (selectedTemplate) {
      setSelectedTemplate((prevTemplate) => {
        if (prevTemplate) {
          return { ...prevTemplate, lowLabels: labels };
        }
        return null;
      });
    }
  };

  const handleNameAdd = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTemplate((prevTemplate) => ({
      ...prevTemplate,
      topicName: event.target.value,
    }));
  };

  const handleHPLabelAdd = (labels: string[]) => {
    setNewTemplate((prevTemplate) => ({
      ...prevTemplate,
      highLabels: labels,
    }));
  };

  const handleMPLabelAdd = (labels: string[]) => {
    setNewTemplate((prevTemplate) => ({
      ...prevTemplate,
      midLabels: labels,
    }));
  };

  const handleLPLabelAdd = (labels: string[]) => {
    setNewTemplate((prevTemplate) => ({
      ...prevTemplate,
      lowLabels: labels,
    }));
  };

  const handleSaveChanges = () => {
    if (
      selectedTemplate &&
      (selectedTemplate.highLabels.length !== 0 ||
        selectedTemplate.midLabels.length !== 0 ||
        selectedTemplate.lowLabels.length !== 0)
    ) {
      Updatetopic(selectedTemplate);
      setSelectedTemplate(null);
    }
  };

  const handleDeleteTopic = () => {
    if (selectedTemplate) deleteTopic(selectedTemplate);
    setSelectedTemplate(null);
  };

  const clearNewTemplate = () => {
    setNewTemplate(emptyTopic);
  };

  const handleSaveNewTemplate = () => {
    if (newTemplate.topicName.trim() === "") {
      console.error("Template name cannot be empty");
      return;
    }
    if (
      newTemplate.highLabels.length === 0 &&
      newTemplate.midLabels.length === 0 &&
      newTemplate.lowLabels.length === 0
    ) {
      console.error("At least one label array must contain at least one label");
      return;
    }
    addTopic(newTemplate);
    clearNewTemplate();
  };

  const handleClose = () => {
    setExpanded(false);
    onClose();
    setSelectedTemplate(null);
  };

  const handleTopicChange = (_event: any, newValue: string | null) => {
    const selected = topics.find((topic) => topic.topicName === newValue);
    setSelectedTemplate(selected ? selected : null);
  };
  
  return (
    <React.Fragment>
      <Drawer
        size="md"
        open={open}
        onClose={handleClose}
        slotProps={{
          content: { sx: { bgcolor: "transparent", p: { md: 3, sm: 0 }, boxShadow: "none" } },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "auto",
            height: "100%",
          }}
        >
          <DialogTitle>Topics</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: "auto" }} />
          <DialogContent sx={{ gap: 2 }} >
            <div
              style={{
                width: "99%",
                alignSelf: "center",
              }}
            >
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleExpansionChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Edit Topic
                </AccordionSummary>
                <AccordionDetails>
                  <Autocomplete
                    style={{ width: "100%" }}
                    value={selectedTemplate ? selectedTemplate.topicName : ""}
                    onChange={handleTopicChange}
                    onInputChange={() => {}}
                    id="controllable-states-demo"
                    options={topics.map((topic) => topic.topicName)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Topic" />}
                  />
                  {selectedTemplate && (
                    <div
                      role="group"
                      aria-labelledby="rank"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                      }}
                    >
                      <Typography level="title-md" fontWeight="bold" sx={{ mt: 1 }}>
                        Edit {selectedTemplate?.topicName} :
                      </Typography>
                      <InputLabels
                        labels={selectedTemplate?.highLabels}
                        changeLabels={handleHPLabelChange}
                        textField={{
                          label: "High Priority labels",
                          placeholder: "Talan",
                        }}
                      />
                      <InputLabels
                        labels={selectedTemplate?.midLabels}
                        changeLabels={handleMPLabelChange}
                        textField={{
                          label: "Medium Priority labels",
                          placeholder: "Talan",
                        }}
                      />
                      <InputLabels
                        labels={selectedTemplate?.lowLabels}
                        changeLabels={handleLPLabelChange}
                        textField={{
                          label: "Low Priority labels",
                          placeholder: "Talan",
                        }}
                      />
                    </div>
                  )}
                </AccordionDetails>
                <AccordionActions>
                  {selectedTemplate && (
                    <div>
                      <Button onClick={handleDeleteTopic} color="error">
                        Delete
                      </Button>
                      <Button onClick={handleSaveChanges}>Save changes</Button>
                    </div>
                  )}
                </AccordionActions>
              </Accordion>

              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleExpansionChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Add Topic</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    role="group"
                    aria-labelledby="rank"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                      width: "100%",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Topic name"
                      variant="outlined"
                      value={newTemplate.topicName}
                      onChange={handleNameAdd}
                    />
                    <InputLabels
                      labels={newTemplate?.highLabels}
                      changeLabels={handleHPLabelAdd}
                      textField={{
                        label: "High Priority labels",
                        placeholder: "Talan",
                      }}
                    />
                    <InputLabels
                      labels={newTemplate?.midLabels}
                      changeLabels={handleMPLabelAdd}
                      textField={{
                        label: "High medium labels",
                        placeholder: "Talan",
                      }}
                    />
                    <InputLabels
                      labels={newTemplate?.lowLabels}
                      changeLabels={handleLPLabelAdd}
                      textField={{
                        label: "Low Priority labels",
                        placeholder: "Talan",
                      }}
                    />
                  </div>
                </AccordionDetails>
                <AccordionActions>
                  <Button onClick={clearNewTemplate}>Clear</Button>
                  <Button onClick={handleSaveNewTemplate}>Add</Button>
                </AccordionActions>
              </Accordion>

            </div>
          </DialogContent>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
};
export default TopicDrawer;
