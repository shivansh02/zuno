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
import { NavLink } from "react-router-dom";

const NavigationBar = (props) => {
  const [opened, setOpened] = useState(false);
  return (
    <Navbar
      className="bg-[#DCE7FD]"
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Card
        radius="xl"
        className="relative h-full box-content bg-[#FEE0DF] hover:drop-shadow-xl"
      >
        <Stack className="w-full">
          <NavLink className="no-underline" to="/dashboard">
            <Card radius="xl" className="flex gap-4 py-3">
              <ThemeIcon radius="xl" color="cyan">
                <IconLayoutDashboard size={20} stroke={2} />
              </ThemeIcon>
              <Text>Dashboard</Text>
            </Card>
          </NavLink>
          <NavLink className="no-underline" to="set-reminders">
            <Card radius="xl" className="flex gap-4 py-3  bg-white">
              <ThemeIcon radius="xl" color="cyan">
                <IconListCheck size={30} stroke={2} />
              </ThemeIcon>
              <Text>Remineders</Text>
            </Card>
          </NavLink>
          <NavLink className="no-underline" to="live-location">
            <Card radius="xl" className="flex gap-4 py-3  bg-white">
              <ThemeIcon radius="xl" color="cyan">
                <IconRoute size={30} stroke={2} />
              </ThemeIcon>
              <Text>Live Location</Text>
            </Card>
          </NavLink>
          <NavLink className="no-underline" to="update-prescription">
            <Card radius="xl" className="flex gap-4 py-3  bg-white">
              <ThemeIcon radius="xl" color="cyan">
                <IconCashBanknote size={30} stroke={2} />
              </ThemeIcon>
              <Text>Update Prescription</Text>
            </Card>
          </NavLink>
          <NavLink className="no-underline" to="performance">
            <Card radius="xl" className="flex gap-4 py-3  bg-white">
              <ThemeIcon radius="xl" color="cyan">
                <IconChartArcs3 size={30} stroke={2} />
              </ThemeIcon>
              <Text>Performance</Text>
            </Card>
          </NavLink>
        </Stack>
      </Card>
    </Navbar>
  );
};

export default NavigationBar;
{
  /* <NavLink label="With icon" icon={<IconHome2 size={16} stroke={1.5} className="rounded-2xl"/>}/> */
}
