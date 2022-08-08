import EventFormFields from "@/components/calendar/EventFormFields";
import { useUser } from "@/components/contexts/UserContext";
import {
  CreateCalendarEventArgs,
  UpdateCalendarEventArgs,
} from "@/graphql/schema/generated/args/calendarEvent.args";
import { CalendarEventFragment } from "@/graphql/schema/generated/fragments/calendarEvent.fragment";
import {
  CalendarEventCreateInput,
  CalendarEventUpdateInput,
  CalendarEventWhereUniqueInput,
} from "@/graphql/schema/generated/inputs/calendarEvent.inputs";
import {
  CREATE_CALENDAR_EVENT,
  getOptimisticResponseForCalendarEventCreation,
  getOptimisticResponseForCalendarEventUpdate,
  UPDATE_CALENDAR_EVENT,
} from "@/graphql/schema/generated/mutations/calendarEvent.mutations";
import { ID } from "@/graphql/schema/types";
import { CalendarEventData } from "@/utils/calendarEvents";
import { useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { bindPopover } from "material-ui-popup-state/hooks";
import { Dispatch, FC } from "react";

interface CalendarEventDialogProps extends ReturnType<typeof bindPopover> {
  calendarEvent: CalendarEventData;
  toggleCompletion?: Dispatch<boolean>;
  dispatchCalendarEventData: Dispatch<{ field: string; value: unknown }>;
}

const CalendarEventDialog: FC<CalendarEventDialogProps> = (props: CalendarEventDialogProps) => {
  const {
    calendarEvent: calendarEventData,
    dispatchCalendarEventData,
    onClose,
    anchorEl: _anchorEl,
    ...dialogProps
  } = props;
  const user = useUser();
  const [mutate, { loading }] = useMutation<
    { createCalendarEvent: CalendarEventFragment } | { updateCalendarEvent: CalendarEventFragment },
    CreateCalendarEventArgs | UpdateCalendarEventArgs
  >(calendarEventData.id ? UPDATE_CALENDAR_EVENT : CREATE_CALENDAR_EVENT);
  const handleSave = async () => {
    if (!calendarEventData.start) {
      alert("Start date is required.");
      return;
    }
    // prettier-ignore
    const mutationVars: {
      data: CalendarEventUpdateInput;
      where: CalendarEventWhereUniqueInput;
    } | {
      data: CalendarEventCreateInput;
    } = {
      ...(!!calendarEventData.id && { where: { id: calendarEventData.id } }),
      data: {
        ...calendarEventData,
        userId: user?.id as ID,
      }
    };
    await mutate({
      variables: mutationVars,
      optimisticResponse: calendarEventData.id
        ? getOptimisticResponseForCalendarEventUpdate(
            calendarEventData as CalendarEventFragment,
            calendarEventData
          )
        : getOptimisticResponseForCalendarEventCreation(calendarEventData),
    });
    onClose();
  };
  return (
    <Dialog fullWidth onClose={onClose} {...dialogProps}>
      <DialogTitle>{calendarEventData.id ? "Modify" : "Create"} calendar event</DialogTitle>
      <DialogContent>
        <EventFormFields data={calendarEventData} dispatch={dispatchCalendarEventData} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarEventDialog;
