import { Card, Title, Text, TextInput, Button } from "@mantine/core";
import VideoBg from "..//assets/video.mp4";
import { IconChevronRight } from "@tabler/icons";
export const ConnectWithAppPage = ({ props }) => {
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
      <div className="h-screen w-screen p-20">
        <Card
          radius="xl"
          className="h-full w-full opacity-90 flex flex-col justify-between p-10"
          color="white"
          withBorder
          shadow="xl"
        >
          <div className="w-3/6 flex flex-col gap-3">
            <Title order={1}>Easing the life of your loved ones</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
              ipsum quasi cupiditate omnis, minima dignissimos tenetur harum
              quibusdam quod sapiente,omnis, minima dignissimos tenetur harum
              quibusdam quod sapiente!
            </Text>
          </div>

          <div className="w-1/2 self-end relative bottom-1/3">
            <TextInput
              size="lg"
              classname="w-16 p-3"
              placeholder="Patient ID"
              label="Enter Patient ID"
              rightSection={
                <Button size="md" className="relative right-2/3">
                  <IconChevronRight />
                </Button>
              }
            />
            <Text size="sm">Connecting...</Text>
          </div>
        </Card>
      </div>
    </>
  );
};
