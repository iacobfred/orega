// import SelectionToggleIcon from "@/components/icons/SelectionToggleIcon";
import { Habit } from "@/graphql/schema/generated/models/habit.model";
import { gql, useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
// import Link from "next/link";
import { FC, MouseEvent, useState } from "react";

const TOGGLE_IDENTIFICATION = gql`
  mutation ToggleActionAdoption($actionId: String!, $archivedAt: DateTime) {
    toggleHabitAdoption(actionId: $actionId, archivedAt: $archivedAt) {
      actId
      archivedAt
    }
  }
`;

interface SelectableActionProps {
  act: Habit;
  selected: boolean;
}

const SelectableAction: FC<SelectableActionProps> = ({
  act,
  selected: initiallySelected,
}: SelectableActionProps) => {
  const { data: session } = useSession();
  const [mutate] = useMutation(TOGGLE_IDENTIFICATION);
  const [selected, setSelected] = useState(initiallySelected);
  const toggleSelection = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (session) {
      let archivedAt = null;
      if (selected) {
        archivedAt = new Date();
      }
      mutate({
        variables: { actId: act.id, archivedAt },
        optimisticResponse: {
          __typename: "Mutation",
          toggleHabitAdoption: {
            __typename: "ToggleActionAdoptionPayload",
            actId: act.id,
            archivedAt,
          },
        },
      });
      setSelected(!selected);
    }
  };
  return (
    <Box key={act.name} position="relative" display="inline-block">
      {/* <Link href={`/habits/${act.slug}`} key={act.name} passHref prefetch={false}>
        <Button
          component="a"
          variant="outlined"
          size="small"
          sx={{
            margin: "0.6rem 1.2rem",
            display: "inline-block",
            fontSize: "1rem",
            border: ".08rem solid black",
            paddingRight: "2.1rem",
          }}
        >
          {act.name}
        </Button>
      </Link>
      <Box position="absolute" right="1.5rem" display="inline-block" top="24%">
        <a href={`/habits/${act.slug}`} onClick={toggleSelection}>
          <SelectionToggleIcon positive={selected} />
        </a>
      </Box> */}
    </Box>
  );
};

export default SelectableAction;
