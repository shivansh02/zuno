import {
  Button,
  Card,
  Stack,
  Text,
  TextInput,
  ActionIcon,
  PasswordInput,
  Title,
  ThemeIcon,
  Container,
  Image,
} from "@mantine/core";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { MantineProvider } from "@mantine/core";
import VideoBg from "..//assets/video.mp4";
import Logo from "../assets/logo.png";
import { IconBrandGoogle, IconBrandMeta, IconUserPlus } from "@tabler/icons";

const Signup = () => {
  return (
    <>
      <video
        src={VideoBg}
        autoPlay
        loop
        muted
        className="w-screen h-screen object-cover absolute"
      />
      <div className="absolute bg-black opacity-50 h-screen w-screen overflow-hidden z-0"></div>
      <div className="h-screen w-screen flex justify-between items-center">
        {/* App Info Section */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-1/5 bg-transparent">
            <Image src={Logo} />
            <Title order={2}>App Name</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
            </Text>
          </div>
        </div>
        <div className="flex-1 m-12 flex justify-center items-center">
          <Card
            radius="xl"
            className="p-10 px-10 h-full flex justify-center w-4/6"
            shadow="xl"
          >
            <div className="py-10 bg-white rounded-xl flex flex-col w-5/6 justify-between gap-8">
              <Title
                order={1}
                weight={700}
                className=" text-peach text-xl w-max text-3xl"
              >
                Sign Up
              </Title>
              <Stack>
                <TextInput
                  margin="normal"
                  label="Enter Email"
                  placeholder="Email"
                  size="md"
                  radius="md"
                />
                <TextInput
                  margin="normal"
                  label="Enter Username"
                  placeholder="Username"
                  size="md"
                  radius="md"
                />
                <PasswordInput
                  placeholder="Password"
                  label="Enter Password"
                  radius="md"
                  size="md"
                />
                <PasswordInput
                  placeholder="Password"
                  label="Confirm Password"
                  radius="md"
                  size="md"
                />
                {/* ButtonContainer */}
                <div className="flex items-center justify-start gap-2">
                  <Button radius="lg" className="w-3/5" size="lg" color="cyan">
                    Sign Up
                  </Button>
                  <div className="">
                    <ActionIcon
                      radius="md"
                      className="w-3/5"
                      size="xl"
                      color="cyan"
                      variant="outline"
                    >
                      <IconUserPlus size={26} />
                    </ActionIcon>
                  </div>
                </div>
              </Stack>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Signup;
