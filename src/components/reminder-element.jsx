import { Card, Text, ThemeIcon, Title } from "@mantine/core";
import { forwardRef } from "react";

const ReminderElement = forwardRef((props, ref) => {
  return (
    <Card
      radius="md"
      shadow={props.shadow}
      ref={ref}
      className={` px-6 py-2 ${
        props.priority == "high"
          ? "bg-[#F3B1B1]"
          : props.priority == "mid"
          ? "bg-[#EEF080]"
          : "bg-[#D6B1F3]"
      }`}
    >
      {props.children}
    </Card>
  );
});

export default ReminderElement;
