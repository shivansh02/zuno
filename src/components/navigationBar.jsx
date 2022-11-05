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
  Image,
  Divider,
  Title,
  ActionIcon,
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
  IconChevronLeft,
} from "@tabler/icons";
import { NavLink } from "react-router-dom";
import Logo from "../assets/M.png";
import ProfileImage from "../assets/image 7.png";
import { IconSearch } from "@tabler/icons";

const NavigationPane = (props) => {
  return (
    <Navbar
      className="bg-[#7a87fb] rounded-tr-[4rem] rounded-br-[4rem] px-9 font-poppins"
      p="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, md: 300, lg: 400 }}
    >
      <div>
        <div className="flex justify-between items-center mt-16">
          <div className="flex items-center gap-2">
            <ThemeIcon color="white" radius="xl" size="xl">
              <Image src={Logo} className="w-full h-full p-1" />
            </ThemeIcon>
            <Text weight={600} color="white" size="xl" className="font-poppins">
              MemoryBox
            </Text>
          </div>
          <IconSearch color="white" size={30} />
        </div>
        <Stack className="w-full mt-12 font-poppins" spacing="md">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "opacity-100 no-underline font-bold"
                : "opacity-70 no-underline"
            }
            to=""
          >
            <Text color="white" size="lg">
              Dashboard
            </Text>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "opacity-100 no-underline font-bold"
                : "opacity-70 no-underline"
            }
            to="live-location"
          >
            <Text color="white" size="lg">
              Live Location
            </Text>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "opacity-100 no-underline font-bold"
                : "opacity-70 no-underline"
            }
            to="set-reminders"
          >
            <Text color="white" size="lg">
              Set Reminders
            </Text>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "opacity-100 no-underline font-bold"
                : "opacity-70 no-underline"
            }
            to="update-prescription"
          >
            <Text color="white" size="lg">
              Update Prescription
            </Text>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "opacity-100 no-underline font-bold"
                : "opacity-70 no-underline"
            }
            to="performance"
          >
            <Text color="white" size="lg">
              Performance
            </Text>
          </NavLink>
        </Stack>
        <Divider className="mt-4" size="sm" />
        <div className="mt-4 flex flex-col w-5/6 text-white ">
          <div className="flex">
            <div className="w-28 flex-auto p-2 rounded-[2rem] overflow-hidden">
              <Image src={ProfileImage} />
            </div>
            <div className="flex-auto p-2">
              <Title order={2} weight={500}>
                Raman Rishi
              </Title>
              <Text>Age: 67</Text>
              <Text>Severe Alzheimer, Dimentia</Text>
            </div>
          </div>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
            ipsum quasi cupiditate omnis,
          </Text>
        </div>
        {/* Controls */}
        <div className="flex justify-evenly mt-4">
          <ActionIcon
            className="bg-white text-yellow"
            radius="xl"
            variant="flled"
          >
            <IconChevronLeft />
          </ActionIcon>
          <ActionIcon
            className="bg-white text-yellow"
            radius="xl"
            variant="flled"
          >
            <IconChevronRight />
          </ActionIcon>
        </div>
        <Divider className="mt-4" size="sm" />
      </div>
    </Navbar>
  );
};

export default NavigationPane;
