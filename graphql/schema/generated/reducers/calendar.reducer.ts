/* Do not edit this file. It was generated programmatically. */
import { Calendar } from "@/graphql/schema/generated/models/calendar.model";
import { InputData, Payload } from "@/utils/data";

export type CalendarData = InputData<Calendar>;
// export type InitialCalendarData = InitialData<Calendar, "rank" | "userId">;

export function calendarDataReducer(state: CalendarData, payload: Payload<CalendarData>) {
  if (payload.field === "init") return payload.value as CalendarData;
  return { ...state, [payload.field]: payload.value };
}
