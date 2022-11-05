import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Card,
  Stack,
  ThemeIcon,
} from "@mantine/core";
import {
  IconPhoto,
  IconHome2,
  IconGauge,
  IconChevronRight,
  IconActivity,
  IconCircleOff,
  IconLayoutDashboard,
  IconListCheck,
  IconCashBanknote,
  IconChartArcs3,
  IconRoute,
} from "@tabler/icons";
import NavigationBar from "../components/navBar";

import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard(props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      className="bg-[#DCE7FD]"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavigationBar />}
      header={
        <Header height={90} p="md" className="bg-[#DCE7FD]">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Card radius="xl" className="w-full p-6 my-4"></Card>
          </div>
        </Header>
      }
    >
      <Card radius="xl" className="w-full h-full">
        <Outlet />
      </Card>
    </AppShell>
  );
}
