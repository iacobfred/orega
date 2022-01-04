import { gql } from "@apollo/client";

export const userActionFragment = gql`
  fragment UserActionFragment on UserAction {
    __typename
    id
    action {
      id
      name
      slug
    }
    schedules {
      id
      frequency
      multiplier
    }
  }
`;

export const calendarEventFragment = gql`
  fragment CalendarEventFragment on CalendarEvent {
    __typename
    id
    scheduleId
    calendarId
    title
    start
    end
  }
`;

export const userValueFragment = gql`
  fragment UserValueFragment on UserValue {
    __typename
    id
    value {
      id
      name
      slug
    }
  }
`;

export const userIdentityFragment = gql`
  fragment UserIdentityFragment on UserIdentity {
    __typename
    id
    identity {
      id
      name
      slug
    }
  }
`;

export const routineActionFragment = gql`
  fragment RoutineActionFragment on RoutineAction {
    __typename
    id
    position
    durationInMin
    action {
      id
      name
      slug
    }
  }
`;

export const routineFragment = gql`
  fragment RoutineFragment on Routine {
    __typename
    id
    name
    description
    routineActions {
      ...RoutineActionFragment
    }
  }
  ${routineActionFragment}
`;
