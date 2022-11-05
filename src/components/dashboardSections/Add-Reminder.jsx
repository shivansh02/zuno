import {
  ActionIcon,
  TextInput,
  Select,
  Card,
  Textarea,
  Space,
} from "@mantine/core";
import { TimeInput, DatePicker } from "@mantine/dates";
import { IconPlus, IconClock } from "@tabler/icons";
import ReminderElement from "../reminder-element";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

const AddReminder = ({ addReminder }) => {
  const addForm = useForm({
    initialValues: {
      title: "",
      description: "",
      date: Date,
      priority: "",
    },
    validate: {
      title: (value) => {
        value.length < 3 ? "Enter title longer than 3 characters" : null;
      },
      priority: (value) => {
        value == "" ? "Please assign priority to the reminder" : null;
      },
      date: (value) => {
        value == null ? "Enter a date to scehdule the reminder" : null;
      },
      time: (value) => {
        value == null ? "Pick time to schedule the reminder" : null;
      },
    },
  });

  return (
    <Card radius="lg" shadow="lg" withBorder>
      <div className="p-2">
        <form
          onSubmit={addForm.onSubmit((values) => {
            addReminder(values);
            addForm.reset();
            addForm.resetTouched();
          })}
          className="flex flex-col font-poppins border-8 overflow-y-visible gap-4 h-max justify-center"
        >
          <TextInput
            radius="lg"
            placeholder="Reminder Title"
            size="lg"
            {...addForm.getInputProps("title")}
          />
          <Textarea
            placeholder="Enter Description"
            autoSize
            minRows={2}
            maxRows={3}
            radius="lg"
            size="lg"
            {...addForm.getInputProps("description")}
          />
          <div className="flex justify-around items-center gap-4">
            <DatePicker
              placeholder="Pick Date"
              radius="lg"
              size="lg"
              className="flex-1"
              {...addForm.getInputProps("date")}
            />

            <TimeInput
              icon={<IconClock size={16} />}
              placeholder="Pick Time"
              format="12"
              size="lg"
              radius="lg"
              clearable
              className="flex-1"
              {...addForm.getInputProps("date")}
            />
          </div>
          <div className="flex items-center self-end gap-4">
            <Select
              dropdownPosition="flip"
              placeholder="Importance"
              color="yellow"
              size="lg"
              radius="lg"
              variant="filled"
              data={[
                { value: "high", label: "High" },
                { value: "mid", label: "Mid" },
                { value: "low", label: "Low" },
              ]}
              className="w-fit self-end rounded-xl"
              {...addForm.getInputProps("priority")}
            />
            <motion.div
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ActionIcon
                radius="lg"
                variant="filled"
                color="blue"
                size="xl"
                type="submit"
              >
                <IconPlus />
              </ActionIcon>
            </motion.div>
          </div>
          <Space size="xl" className="h-28" />
        </form>
      </div>
    </Card>
  );
};

export default AddReminder;
