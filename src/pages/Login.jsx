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
import { IconBrandGoogle, IconBrandMeta } from "@tabler/icons";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#F2A8A4",
      darker: "#242424",
    },
    neutral: {
      main: "#F2A8A4",
      contrastText: "#242424",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),

    fontSize: 10,
  },
});

const Login = () => {
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
                Login
              </Title>
              <Stack>
                <TextInput
                  margin="normal"
                  label="Email"
                  placeholder="Email"
                  size="md"
                  radius="md"
                />
                <PasswordInput
                  placeholder="Password"
                  label="Password"
                  radius="md"
                  size="md"
                />
                {/* ButtonContainer */}
                <div className="flex items-center justify-between">
                  <Button radius="lg" className="w-3/5" size="lg" color="cyan">
                    Sign In
                  </Button>
                  <div className="flex gap-3">
                    <ActionIcon
                      color="cyan"
                      size="xl"
                      radius="xl"
                      variant="filled"
                      className="shadow-lg"
                    >
                      <IconBrandGoogle size={26} />
                    </ActionIcon>
                    <ActionIcon
                      color="cyan"
                      size="xl"
                      radius="xl"
                      variant="filled"
                      className="shadow-lg"
                    >
                      <IconBrandMeta size={26} />
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

export default Login;

// <MantineProvider theme={{ colorScheme: "dark" }}>
//       <div className="flex justify-between h-screen">
//         <div className="flex-1 flex justify-center items-center">
//           <div className="m-auto text-white text-xl flex justify-center bg-black p-10 rounded-xl w-fit">
//             Hello
//           </div>
//         </div>

//         <div>
//           <Card className="w-fit p-10 px-20">
//             <div className="py-20 bg-white rounded-xl flex flex-col">
//               <Text className=" text-peach text-xl w-max">Login</Text>

//               <TextInput margin="normal" label="Email Address" size="normal" />
//               <TextInput label="Password" size="normal" />
//               <br />
//               <Button>Sign In</Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </MantineProvider>
