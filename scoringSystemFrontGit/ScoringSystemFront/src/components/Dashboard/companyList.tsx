import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

interface Props {
  relatedCompanies: string[];
}
export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

const CompanyList: React.FC<Props> = ({ relatedCompanies }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Dione");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const radioGroupRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (!open) {
        setValue(valueProp);
      }
    }, [valueProp, open]);

    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };

    const handleClose = () => {
      onClose();
    };

    return (
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        TransitionProps={{ onEntering: handleEntering }}
        open={open}
        {...other}
      >
        <DialogTitle>Related Companies</DialogTitle>
        <DialogContent dividers>
          {relatedCompanies.length > 0 ? (
            relatedCompanies.map((company, index) => (
              <div key={company}>
                <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>{company}</div>
                {index !== relatedCompanies.length - 1 && <Divider />}
              </div>
            ))
          ) : (
            <Typography style={{ color: "gray" }}>No related companies</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <div style={{ width: "100px" }}>
      <ListItemButton
        aria-haspopup="true"
        aria-controls="ringtone-menu"
        aria-label="phone ringtone"
        onClick={handleClickListItem}
      >
        <ListItemText primary="View" />
      </ListItemButton>
      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
    </div>
  );
};
export default CompanyList;
