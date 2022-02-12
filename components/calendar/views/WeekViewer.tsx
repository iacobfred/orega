import CalendarCell from "@/components/calendar/CalendarCell";
import {
  HALF_HOUR_HEIGHT,
  HOUR_HEIGHT,
  START_HOUR,
  TIME_LABEL_COLUMN_WIDTH,
} from "@/components/calendar/constants";
import EventEditingDialog from "@/components/calendar/EventEditingDialog";
import EventSlot from "@/components/calendar/EventSlot";
import TimeLabelsColumn from "@/components/calendar/TimeLabelsColumn";
import { ViewerProps } from "@/components/calendar/views/props";
import DateContext from "@/components/contexts/DateContext";
import { CalendarEvent } from "@/graphql/schema";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  addMinutes,
  differenceInMinutes,
  getDay,
  isSameDay,
  parseISO,
  setDay,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";
import { bindPopover, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { FC, Fragment, useContext, useEffect, useRef } from "react";

const Root = styled("div")(({ theme }) => {
  const borderDef = `1px solid ${theme.palette.divider}`;
  return {
    "& *": {
      boxSizing: "border-box",
    },
    "& .time-label": {
      display: "flex",
      alignItems: "center",
      justifyContent: "right",
      paddingRight: "0.25rem",
      fontFamily: "Roboto, Arial, sans-serif",
      fontWeight: 400,
      fontSize: "0.7rem",
      lineHeight: "1.66",
      whiteSpace: "nowrap",
      color: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.6)",
      width: "3.5rem",
    },
    "& .calendar-slots-column": {
      flexGrow: 1,
      position: "relative",
      cursor: "pointer",
      scrollBehavior: "smooth",
      "&:not(:first-of-type)": {
        borderLeft: borderDef,
      },
    },
    "& .border-trick-box": {
      borderRight: borderDef,
      width: "0.5rem",
    },
    "& .calendar-event-slot": {
      display: "flex",
      borderTop: borderDef,
      height: `${HALF_HOUR_HEIGHT}px`,
    },
  };
});

const WeekViewer: FC<ViewerProps> = (props: ViewerProps) => {
  const {
    selectedDate,
    initialEventFormData,
    setInitialEventFormData,
    defaultCalendar,
    hidden,
    data,
  } = props;
  const { calendarEvents } = data;
  const date = useContext(DateContext);
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const eventEditingDialogState = usePopupState({
    variant: "popover",
    popupId: `event-editing-dialog`,
  });
  const eventEditingDialogTriggerProps = bindTrigger(eventEditingDialogState);

  const selectedDayIndex = getDay(selectedDate);
  const dayStart = zeroToHour(date, START_HOUR);
  const allDayBoxHeight = HALF_HOUR_HEIGHT;
  const currentTimeOffsetPx =
    (HOUR_HEIGHT / 60) * differenceInMinutes(date, dayStart) + HALF_HOUR_HEIGHT;

  // TODO: create default calendar when user is created; ensure a user has 1+ calendars.
  const primaryCalendarId = defaultCalendar?.id ?? calendarEvents?.[0]?.calendarId; // calendars.find((c) => c.primary);

  useEffect(() => {
    // Scroll to the current time.
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ top: currentTimeOffsetPx - HOUR_HEIGHT, behavior: "smooth" });
    }
  }, [currentTimeOffsetPx]);
  const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayHeaderHeight = `${HALF_HOUR_HEIGHT}px`;
  return (
    <Root className={`${hidden ? "hidden" : ""}`}>
      {/* Day headers */}
      <Box display="flex">
        <Box
          width={TIME_LABEL_COLUMN_WIDTH}
          height={dayHeaderHeight}
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        />
        <div className="calendar-slots-column">
          <Box
            height={dayHeaderHeight}
            display="flex"
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box flexGrow={1} display="flex">
              {DAYS_OF_WEEK.map((day, i) => {
                const dayDate = setDay(selectedDate, i);
                return (
                  <CalendarCell key={i} className="day-header-cell">
                    <Box
                      height="100%"
                      display="flex"
                      flexDirection={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Typography fontSize="0.7rem">{day}</Typography>
                      <Typography
                        fontSize="0.9rem"
                        fontWeight={600}
                        height="1.5rem"
                        width="1.5rem"
                        border={isSameDay(dayDate, date) ? "1px solid gray" : "none"}
                        borderRadius={"50%"}
                        sx={{
                          color: (theme) =>
                            isSameDay(dayDate, selectedDate)
                              ? theme.palette.primary.main
                              : theme.palette.primary.contrastText,
                        }}
                      >
                        {dayDate.getDate()}
                      </Typography>
                    </Box>
                  </CalendarCell>
                );
              })}
            </Box>
          </Box>
        </div>
      </Box>
      {/* All day boxes */}
      <Box
        display="flex"
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <div style={{ width: TIME_LABEL_COLUMN_WIDTH }}>
          <Box className="time-label" height={`${allDayBoxHeight}px`}>
            All Day
          </Box>
        </div>
        <div className="calendar-slots-column">
          <Box height={`${allDayBoxHeight}px`} display="flex">
            <Box flexGrow={1} display="flex">
              {DAYS_OF_WEEK.map((day, i) => {
                return (
                  <CalendarCell key={i} className="all-day-cell">
                    <div></div>
                  </CalendarCell>
                );
              })}
            </Box>
          </Box>
        </div>
      </Box>
      {/* Time slots */}
      <Box
        display="flex"
        ref={scrollableDivRef}
        position="relative"
        className="no-scrollbar"
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <TimeLabelsColumn />
        <Box display="flex" flexGrow={1}>
          {DAYS_OF_WEEK.map((_, dayIndex) => {
            return (
              <div key={dayIndex} className="calendar-slots-column">
                <Box height={`${HALF_HOUR_HEIGHT}px`} display="flex">
                  <Box flexGrow={1} />
                </Box>
                {[...Array(24)].map((_, i) => {
                  return (
                    <Fragment key={i}>
                      {[...Array(2)].map((_, j) => {
                        const eventSlotDate = setDay(
                          setHours(setMinutes(setSeconds(selectedDate, 0), j * 30), START_HOUR + i),
                          selectedDate.getDay() + dayIndex - selectedDayIndex
                        );
                        const eventSlotEvents = calendarEvents.filter((event: CalendarEvent) => {
                          const diff = differenceInMinutes(
                            parseISO(event.start),
                            eventSlotDate,
                            // Rounding method options are round, ceil, floor, and trunc (default).
                            // The default rounding method results in diffs that are 1 smaller
                            // than expected; e.g., 29 rather than 30, causing a 2:30 event to be
                            // included in the 2:00 slot.
                            { roundingMethod: "round" } // ceil also works
                          );
                          // console.log("Inspecting event", event.title, event.start, event.end, diff, Math.abs(diff) < 30 && diff > 0);
                          return Math.abs(diff) < 30 && diff >= 0;
                        });
                        return (
                          <Box key={j} className="calendar-event-slot">
                            <EventSlot
                              date={eventSlotDate}
                              view="week"
                              events={eventSlotEvents}
                              defaultCalendarId={primaryCalendarId}
                              onClick={(e) => {
                                // Only trigger if the click was actually on the slot. This check
                                // allows us to avoid stopping propagation on click events for
                                // other elements in the slot.
                                if (e.target === e.currentTarget) {
                                  setInitialEventFormData({
                                    title: initialEventFormData.title ?? "",
                                    start: eventSlotDate,
                                    end: addMinutes(eventSlotDate, 29),
                                    allDay: false,
                                    notes: initialEventFormData.notes ?? "",
                                    calendarId:
                                      initialEventFormData.calendarId ?? primaryCalendarId,
                                  });
                                  eventEditingDialogTriggerProps.onClick(e);
                                }
                              }}
                            />
                          </Box>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </div>
            );
          })}
          <EventEditingDialog
            {...bindPopover(eventEditingDialogState)}
            eventData={initialEventFormData}
          />
        </Box>
      </Box>
    </Root>
  );
};

export default WeekViewer;

const zeroToHour = (date: Date, hour: number) => {
  return setHours(setMinutes(setSeconds(date, 0), 0), hour);
};
