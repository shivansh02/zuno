import { Card, Text, ThemeIcon, Title } from "@mantine/core";
import { forwardRef } from "react";
import ReminderElement from "./reminder-element";

const PrescriptionElement = forwardRef((props, ref) => {
  return (
    <Card
      radius="md"
      shadow={props.shadow}
      ref={ref}
      className={`px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
    >
      {props.children}
    </Card>
  );
});

export default PrescriptionElement;
