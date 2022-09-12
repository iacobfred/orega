/* Do not edit this file. It was generated programmatically. */

import { MutationHookOptions } from "@apollo/client";
import {
  CREATE_CALENDAR,
  UPDATE_CALENDAR,
  updateCacheAfterCreatingCalendar,
} from "@web/graphql/generated/mutations/calendar.mutations";
import { CalendarFragment } from "@web/graphql/generated/fragments/calendar.fragment";
import {
  CalendarCreationArgs,
  CalendarUpdateArgs,
} from "@web/graphql/generated/args/calendar.args";
import { useHandleMutation } from "@web/utils/data/mutation";
import { Payload, ArrayAction } from "@web/utils/data/reduction";
import { useEffect, useReducer, Dispatch } from "react";
import {
  calendarReducer,
  calendarsReducer,
  CalendarData,
  initializeCalendarData,
} from "@web/graphql/generated/reducers/calendar.reducer";
import { useUser } from "@web/components/contexts/UserContext";
import {
  calendarCreationInputSchema,
  calendarUpdateInputSchema,
} from "@web/graphql/generated/schemas/calendar.schemas";
import {
  getOptimisticResponseForCalendarCreation,
} from "@web/graphql/generated/mutations/calendar.mutations";

type CalendarCreationMutationHookOptions = MutationHookOptions<
  { createCalendar: CalendarFragment },
  CalendarCreationArgs
>;

export const useCreateCalendar = (options?: CalendarCreationMutationHookOptions) => {
  return useHandleMutation<{ createCalendar: CalendarFragment }, CalendarCreationArgs>(
    CREATE_CALENDAR,
    { ...updateCacheAfterCreatingCalendar, ...(options ?? {}) },
    calendarCreationInputSchema,
    getOptimisticResponseForCalendarCreation
  );
};

type CalendarUpdateMutationHookOptions = MutationHookOptions<
  { updateCalendar: CalendarFragment },
  CalendarUpdateArgs
>;

export const useUpdateCalendar = (options?: CalendarUpdateMutationHookOptions) => {
  return useHandleMutation<{ updateCalendar: CalendarFragment }, CalendarUpdateArgs>(
    UPDATE_CALENDAR,
    options,
    calendarUpdateInputSchema
  );
};

export const useCalendarReducer = (
  data?: CalendarData
): [CalendarData, Dispatch<Payload<CalendarData>>] => {
  const { user } = useUser();
  const starterData = data ?? {};
  const initializedData = initializeCalendarData(starterData, user);
  const [calendarData, dispatchCalendarData] = useReducer(
    calendarReducer,
    initializedData,
    initializeCalendarData
  );
  useEffect(() => {
    if (user?.id && !calendarData?.userId) {
      dispatchCalendarData({
        field: "init",
        value: initializeCalendarData(calendarData, user),
      });
    }
  }, [user, calendarData]);
  return [calendarData, dispatchCalendarData];
};

export const useCalendarsReducer = (
  data: CalendarFragment[]
): [CalendarFragment[], Dispatch<ArrayAction<CalendarFragment>>] => {
  return useReducer(calendarsReducer, data);
};
