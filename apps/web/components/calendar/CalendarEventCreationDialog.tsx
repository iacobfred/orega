import { CalendarEventData } from "@web/generated/reducers/calendarEvent.reducer";
import { Payload } from "@web/hooks/reduction";
import { bindDialog } from "material-ui-popup-state/hooks";
import { Dispatch, FC } from "react";
import CalendarEventDialog from "./CalendarEventDialog";

interface CalendarEventDialogProps extends ReturnType<typeof bindDialog> {
  calendarEventDataTuple: [CalendarEventData, Dispatch<Payload<CalendarEventData>>];
  close: () => void;
}

const CalendarEventCreationDialog: FC<CalendarEventDialogProps> = (
  props: CalendarEventDialogProps
) => {
  // console.log("Rendering CalendarEventCreationDialog");
  return <CalendarEventDialog mutation={"create"} {...props} />;
};

export default CalendarEventCreationDialog;
