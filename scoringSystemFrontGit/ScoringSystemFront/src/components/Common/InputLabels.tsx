import React, { ChangeEvent } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface InputLabelsProps {
  labels: string[] | undefined;
  textField: {
    label: string;
    placeholder: string;
  };
  changeLabels: (labels: string[]) => void;
}

const InputLabels: React.FC<InputLabelsProps> = ({
  labels,
  textField,
  changeLabels,
}) => {
  const handleTagChange = (_event: ChangeEvent<{}>, newValue: string[]) => {
    if (newValue) {
      const newLabel = newValue.find((label) => !labels?.includes(label));
      if (newLabel) {
        const updatedLabels = [...(labels || []), newLabel]; 
        changeLabels(updatedLabels); 
      }
    } else {
      changeLabels(newValue); 
    }
  };

  const handleDeleteTag = (deletedLabel: string) => {
    const updatedLabels = labels?.filter((label) => label !== deletedLabel); 
    if (updatedLabels) {
      changeLabels(updatedLabels); 
    }
  };

  return (
    <Autocomplete
      sx={{ width: "100%" }}
      multiple
      id="tags-filled"
      options={[]}
      defaultValue={labels}
      freeSolo
      value={labels}
      onChange={handleTagChange}
      renderTags={(value: readonly string[]) =>
        value.map((option: string) => (
          <Chip
            variant="outlined"
            label={option}
            onDelete={() => handleDeleteTag(option)}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          label={textField.label}
          placeholder={textField.placeholder}
          
        />
      )}
      
    />
  );
};

export default InputLabels;
