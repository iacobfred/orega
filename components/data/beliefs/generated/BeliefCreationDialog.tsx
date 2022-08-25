import CreationDialog from "@/components/data/CreationDialog";
import fields from "@/graphql/generated/fields/belief.fields";
import { BeliefFragment } from "@/graphql/generated/fragments/belief.fragment";
import { useBeliefDataReducer, useCreateBelief } from "@/graphql/generated/hooks/belief.hooks";
import { BeliefCreationInput } from "@/graphql/generated/inputs/belief.inputs";
import { getOptimisticResponseForBeliefCreation } from "@/graphql/generated/mutations/belief.mutations";
import Belief from "@/graphql/generated/types/Belief";
import { bindPopover } from "material-ui-popup-state/hooks";

export type BeliefCreationDialogProps = ReturnType<typeof bindPopover>;

export default function BeliefCreationDialog(props: BeliefCreationDialogProps) {
  const [create] = useCreateBelief();
  const dataTuple = useBeliefDataReducer();
  return CreationDialog<Belief, BeliefCreationInput, { createBelief: BeliefFragment }>({
    typeName: "belief",
    dataTuple,
    create,
    fields,
    // produceInitialData,
    getOptimisticResponse: getOptimisticResponseForBeliefCreation,
    ...props,
  });
}
