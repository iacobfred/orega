import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { routineFragment } from "@/graphql/fragments";
import { Action, Routine, RoutineAction } from "@/graphql/schema";
import { addApolloState, initializeApollo } from "@/lib/apollo/apolloClient";
import { gql, useQuery } from "@apollo/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { NextSeo } from "next-seo";

interface RoutinesPageProps {
  session: Session;
}

const QUERY = gql`
  query RoutinesPage($userId: String!) {
    routines(where: { userId: { equals: $userId } }) {
      ...RoutineFragment
    }
  }
  ${routineFragment}
`;

interface Data {
  routines: (Omit<Routine, "routineActions"> & {
    routineActions: (Omit<RoutineAction, "action"> & {
      action: Action;
    })[];
  })[];
}

const RoutinesPage: NextPage<RoutinesPageProps> = (props: RoutinesPageProps) => {
  const { data: session } = useSession();
  const { loading, error, data } = useQuery<Data>(QUERY, {
    variables: {
      userId: session?.user?.id,
    },
    // Setting this value to true makes the component rerender when "networkStatus" changes,
    // so we are able to know if it is fetching more data.
    // notifyOnNetworkStatusChange: true,
  });
  if (!session) {
    return null;
  }
  if (!data) {
    return null;
  }
  const { routines } = data;
  return (
    <Layout>
      <NextSeo
        title={"My Routines"}
        canonical={"/app/routines"}
        description={"Be your best self."}
        noindex
        nofollow
      />
      <PageHeader>{"My Routines"}</PageHeader>
      <Grid container spacing={2} justifyContent="center" padding="1.5rem">
        {routines.map((routine) => (
          <Grid item key={routine.id} xs={12} md={8} lg={4} xl={3} order={{ xs: 2, sm: 1 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <p>{routine.name}</p>
                <p>{routine.description}</p>
                <div>
                  {routine.routineActions.length ? (
                    routine.routineActions.map((routineAction) => (
                      <div key={routineAction.id}>
                        {routineAction.action.name}, {routineAction.durationInMin} minutes
                      </div>
                    ))
                  ) : (
                    <span>No actions</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};
export default RoutinesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const session = await getSession({ req: context.req });
  if (!session?.user?.id) {
    return {
      redirect: {
        destination: "/auth/signin?callbackUrl=/app/routines",
        permanent: false,
      },
    };
  }
  const props: RoutinesPageProps = {
    session,
  };
  await apolloClient
    .query({
      query: QUERY,
      variables: {
        userId: session.user.id,
      },
    })
    .catch((e) => {
      console.error(e.networkError?.result?.errors);
    });
  return addApolloState(apolloClient, { props });
};
