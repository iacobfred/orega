import AppLayout from "@/components/AppLayout";
import DashboardViewer, {
  DashboardData,
  fragment as dashboardDataFragment,
} from "@/components/dashboard/Dashboard";
import Select from "@/components/Select";
import { DashboardLayouts } from "@/graphql/schema/definitions/Dashboard";
import { DashboardCreationArgs } from "@/graphql/schema/generated/args/dashboard.args";
import {
  DashboardFragment,
  dashboardFragment,
} from "@/graphql/schema/generated/fragments/dashboard.fragment";
import { Dashboard } from "@/graphql/schema/generated/models/dashboard.model";
import {
  CREATE_DASHBOARD,
  updateCacheAfterCreatingDashboard,
} from "@/graphql/schema/generated/mutations/dashboard.mutations";
import { buildGetServerSidePropsFunc } from "@/utils/ssr";
import { gql, useMutation, useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import isEmpty from "lodash/isEmpty";
import { GetServerSideProps, NextPage } from "next";
import { PageWithAuth } from "next-auth";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

// cols={{ xl: 24, lg: 18, md: 12, sm: 6, xs: 4, xxs: 2 }}
const DEFAULT_LAYOUTS = {
  xs: [
    { i: "calendar", x: 0, y: 0, w: 4, h: 6, minW: 3, minH: 4, resizeHandles: ["se", "sw"] },
    { i: "tasks", x: 0, y: 1, w: 4, h: 6, minW: 3, minH: 4, resizeHandles: ["se", "sw"] },
    // { i: "identities", x: 0, y: 2, w: 4, h: 1, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "values", x: 0, y: 3, w: 4, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "topics", x: 0, y: 4, w: 4, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
  ],
  sm: [
    { i: "calendar", x: 0, y: 0, w: 3, h: 10, minW: 3, minH: 4, resizeHandles: ["se", "sw"] },
    { i: "tasks", x: 4, y: 3, w: 3, h: 10, minW: 3, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "identities", x: 9, y: 4, w: 2, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "values", x: 6, y: 5, w: 2, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "topics", x: 9, y: 6, w: 2, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
  ],
  md: [
    { i: "calendar", x: 0, y: 0, w: 6, h: 10, minW: 2, minH: 4, resizeHandles: ["se", "sw"] },
    { i: "tasks", x: 7, y: 0, w: 6, h: 10, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "identities", x: 9, y: 0, w: 3, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "values", x: 9, y: 2, w: 3, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "topics", x: 9, y: 2, w: 3, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
  ],
  lg: [
    { i: "calendar", x: 1, y: 0, w: 8, h: 10, minW: 2, minH: 4, resizeHandles: ["se", "sw"] },
    { i: "tasks", x: 9, y: 0, w: 8, h: 10, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "identities", x: 15, y: 2, w: 4, h: 2, resizeHandles: ["se", "sw"] },
    // { i: "values", x: 15, y: 3, w: 4, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "topics", x: 15, y: 4, w: 4, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
  ],
  xl: [
    { i: "calendar", x: 1, y: 0, w: 8, h: 10, minW: 2, minH: 4, resizeHandles: ["se", "sw"] },
    { i: "tasks", x: 9, y: 0, w: 8, h: 10, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "identities", x: 17, y: 2, w: 4, h: 2, resizeHandles: ["se", "sw"] },
    // { i: "values", x: 17, y: 3, w: 4, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
    // { i: "topics", x: 17, y: 4, w: 4, h: 2, minH: 2, resizeHandles: ["se", "sw"] },
  ],
};

const QUERY = gql`
  query DashboardPage {
    ...DashboardData
    dashboards {
      ...DashboardFragment
    }
  }
  ${dashboardDataFragment}
  ${dashboardFragment}
`;

const TOP_BAR_HEIGHT = "3rem";

interface DashboardPageData extends DashboardData {
  dashboards: Dashboard[];
}

const DashboardPage: NextPage = () => {
  const { data: session } = useSession();
  const { loading: loadingData, error, data } = useQuery<DashboardPageData>(QUERY);
  const [createDashboard, { loading: loadingCreateDashboard }] = useMutation<
    { createDashboard: DashboardFragment },
    DashboardCreationArgs
  >(CREATE_DASHBOARD, updateCacheAfterCreatingDashboard);
  const loading = loadingData || loadingCreateDashboard;
  const { dashboards, ...dashboardData } = data || { dashboards: [] };
  const defaultDashboard = dashboards?.find((dashboard) => dashboard.isDefault);
  const [editing, setEditing] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedDashboardId, setSelectedDashboardId] = useState<string | null>(
    (defaultDashboard || dashboards?.[0])?.id || null
  );
  const selectedDashboard =
    dashboards?.find((dashboard) => dashboard.id === selectedDashboardId) || dashboards?.[0];

  const layouts = selectedDashboard?.layouts ?? DEFAULT_LAYOUTS;

  useEffect(() => {
    if (session && !loading && data && !dashboards?.length) {
      createDashboard({
        variables: {
          data: {
            name: "Daily Planner",
            isDefault: true,
            layouts: DEFAULT_LAYOUTS,
            userId: session.user.id,
          },
        },
      }).catch(console.error);
    }
  }, [loading, data, dashboards, createDashboard, session]);

  useEffect(() => {
    if (dashboards?.length && !selectedDashboardId) setSelectedDashboardId(dashboards[0].id);
  }, [dashboards, selectedDashboardId, setSelectedDashboardId]);

  if (!data || isEmpty(dashboardData)) return null;
  return (
    <AppLayout>
      <NextSeo
        title={"Dashboard"}
        canonical={"/app/dashboard"}
        description={"Be your best self."}
        noindex
        nofollow
      />
      {(!dashboards?.length && (
        <Box display="flex" justifyContent="center" alignItems="center" height="90%">
          <p>{"Initializing dashboard..."}</p>
        </Box>
      )) || (
        <Box display="flex" paddingTop="0.8rem" paddingX="0.75rem" height={TOP_BAR_HEIGHT}>
          <Box flexGrow={1} paddingX="0.75rem">
            {editing ? (
              <TextField
                variant="standard"
                value={selectedDashboard.name}
                onChange={() => {
                  alert("Not yet implemented.");
                }}
              />
            ) : (
              <Select
                value={selectedDashboardId}
                SelectDisplayProps={{ style: { paddingTop: "0.4rem", paddingBottom: "0.4rem" } }}
                options={[
                  ...dashboards.map((dashboard) => ({
                    value: `${dashboard.id}`,
                    label: dashboard.name,
                  })),
                  {
                    value: "_",
                    label: (
                      <>
                        <AddIcon /> {"Add new dashboard"}
                      </>
                    ),
                    nativeSelectLabel: "+ Add new dashboard",
                    onSelect: () => {
                      alert("This functionality is not yet implemented.");
                    },
                  },
                ]}
                onChange={(value) => {
                  if (dashboards?.length) setSelectedDashboardId(value);
                }}
              />
            )}
          </Box>
          {editing ? (
            <IconButton onClick={() => setEditing(false)}>
              <DoneIcon />
            </IconButton>
          ) : null}
          <IconButton
            id="menu-button-x"
            onClick={(e) => {
              setMenuAnchorEl(e.currentTarget);
              setMenuOpen(true);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            MenuListProps={{
              "aria-labelledby": "menu-button-x",
            }}
          >
            <MenuItem>
              <IconButton
                onClick={() => {
                  setEditing(true);
                  setMenuOpen(false);
                }}
              >
                <ModeEditIcon />
              </IconButton>
            </MenuItem>
            <MenuItem onClick={() => setMenuOpen(false)}>{"Close"}</MenuItem>
          </Menu>
        </Box>
      )}
      {!!layouts && !isEmpty(dashboardData) && (
        <DashboardViewer
          data={dashboardData as DashboardData}
          loading={loading}
          error={error}
          layouts={layouts as unknown as DashboardLayouts} // TODO
          setLayouts={(layouts) => {
            console.log("Modify dashboard layouts", layouts);
          }}
          editing={editing}
          height={`calc(100% - ${TOP_BAR_HEIGHT})`}
        />
      )}
    </AppLayout>
  );
};

export default DashboardPage;

(DashboardPage as PageWithAuth).auth = true;

export const getServerSideProps: GetServerSideProps = buildGetServerSidePropsFunc({
  unauthedRedirectDestination: `/auth/signin?callbackUrl=/app/dashboard`,
  query: {
    query: QUERY,
    variables: {
      date: new Date().toISOString(),
    },
  },
});
