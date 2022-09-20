import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { CalendarEventData } from "@web/generated/reducers/calendarEvent.reducer";
import { Payload } from "@web/hooks/reduction";
import { Dispatch, FC } from "react";

interface EventFormFieldsProps {
  dataTuple: [CalendarEventData, Dispatch<Payload<CalendarEventData>>];
}

const EventFormFields: FC<EventFormFieldsProps> = ({ dataTuple }: EventFormFieldsProps) => {
  const [formData, dispatchFormData] = dataTuple;
  return (
    <div>
      <TextField
        id="title"
        label="Title"
        variant="standard"
        value={formData.title}
        onChange={(event) => dispatchFormData({ field: "title", value: event.target.value })}
        fullWidth
        autoFocus
      />
      <FormGroup sx={{ marginY: "1rem" }}>
        <DateTimePicker
          label="Start"
          openTo="minutes"
          value={formData.start}
          onChange={(value: Date | null) => value && dispatchFormData({ field: "start", value })}
          renderInput={(params: TextFieldProps) => (
            <TextField {...params} sx={{ marginY: "1rem" }} required />
          )}
        />
        <DateTimePicker
          label="End"
          openTo="minutes"
          minDateTime={formData.start}
          value={formData.end}
          // inputFormat="yyyy/MM/dd hh:mm a"
          onChange={(value: Date | null) => value && dispatchFormData({ field: "end", value })}
          renderInput={(params: TextFieldProps) => (
            <TextField {...params} sx={{ marginY: "1rem" }} />
          )}
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="All day" />
        <FormControlLabel control={<Checkbox />} label="Repeat" />
      </FormGroup>
      <TextField
        fullWidth
        multiline
        id="notes"
        label="Notes"
        variant="outlined"
        margin="dense"
        value={formData.notes ?? ""}
        onChange={(event) => dispatchFormData({ field: "notes", value: event.target.value })}
      />
    </div>
  );
};

export default EventFormFields;
