import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import React, { useState } from "react";
import ReminderElement from "../reminder-element";
import {
  Card,
  Text,
  ThemeIcon,
  Title,
  ScrollArea,
  Stack,
  ActionIcon,
} from "@mantine/core";
import { IconCross, IconEdit, IconX } from "@tabler/icons";

const ReminderData = [
  {
    id: 1,
    title: "title2",
    description: "description2",
    time: "4:40",
    date: "12th Decemeber 2022",
    priority: "high",
  },
  {
    id: 2,
    title: "title2",
    description: "description2",
    time: "4:40",
    date: "12th Decemeber 2022",
    priority: "high",
  },
];

const MotionReminderElement = motion(ReminderElement);

const CardComp = ({ card, onSelect, children }) => {
  console.log("card_" + card.id);
  return (
    <MotionReminderElement
      layoutId={`card_${card.id}`}
      priority={card.priority}
      shadow="md"
    >
      <motion.div onClick={onSelect}>
        <motion.div>
          <motion.div className="flex justify-between items-center text-white">
            <motion.div className="flex items-center gap-2">
              <ThemeIcon
                className={`${
                  card.priority == "high"
                    ? "bg-[#f55a76]"
                    : card.priority == "mid"
                    ? "bg-[#f7d35b]"
                    : "bg-[#be6efb]"
                }`}
                radius="xl"
                // className={`bg-[${props.priorityColor}]`}
              ></ThemeIcon>
              <motion.h1
                transition={{ layout: { duration: 0.2 } }}
                layoutId={`card_title_${card.id}`}
                className="text-2xl"
              >
                {card.title}
              </motion.h1>
            </motion.div>
            <motion.div className="flex flex-col items-end justify-evenly">
              <motion.h2
                layout="position"
                transition={{ layout: { duration: 0.2 } }}
                layoutId={`card_date_${card.id}`}
                className="text-xl m-0 p-0"
              >
                {card.date}
              </motion.h2>
              <motion.h3
                layout="position"
                transition={{ layout: { duration: 0.2 } }}
                layoutId={`card_time_${card.id}`}
                className="text-base m-0 p-0"
              >
                {card.time}
              </motion.h3>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionReminderElement>
  );
};

const Testing = (props) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const ReminderData = [...props.reminderData];
  console.log("log", props);

  return (
    <MotionConfig
      transition={{ duration: 0.6, type: "spring", ease: "easeInOut" }}
    >
      <motion.div>
        <ScrollArea style={{ height: 400 }} type="always" offsetScrollbars>
          <Stack spacing="md">
            {ReminderData.map((card, index) => {
              console.log(card.id);
              return (
                <CardComp
                  card={card}
                  key={card.id}
                  onSelect={() => {
                    setSelectedCard(card);
                    console.log(selectedCard);
                  }}
                />
              );
            })}
          </Stack>
        </ScrollArea>
      </motion.div>
      <AnimatePresence>
        {selectedCard && (
          <motion.div className="absolute top-1/4 left-0 z-30 w-full">
            <MotionReminderElement
              layoutId={`card_${selectedCard.id}`}
              priority={selectedCard.priority}
              key={selectedCard.id}
              shadow="xl"
            >
              <motion.div className="flex flex-col justify-between items-center text-white">
                <motion.div className="flex justify-between items-center w-full">
                  <motion.div className="flex items-center  gap-2">
                    <ThemeIcon
                      radius="xl"
                      className={`${
                        selectedCard.priority == "high"
                          ? "bg-[#f55a76]"
                          : selectedCard.priority == "mid"
                          ? "bg-[#f7d35b]"
                          : "bg-[#be6efb]"
                      }`}
                    ></ThemeIcon>
                    <motion.h1 layoutId={`card_title_${selectedCard.id}`}>
                      {selectedCard.title}
                    </motion.h1>
                  </motion.div>
                  <motion.div className="flex flex-col items-end">
                    <motion.h2
                      layoutId={`card_date_${selectedCard.id}`}
                      className="text-2xl m-0 p-0"
                    >
                      {selectedCard.date}
                    </motion.h2>
                    <motion.h3
                      layoutId={`card_time_${selectedCard.id}`}
                      className="text-xl m-0 p-0"
                    >
                      {selectedCard.time}
                    </motion.h3>
                  </motion.div>
                </motion.div>
                {/* {Poping} */}
                <motion.div className="self-start flex flex-col gap-8 p-2 w-full">
                  <motion.div
                    initial={{ opacity: 0, position: -5 }}
                    animate={{ opacity: 1, position: 0 }}
                    transition={{
                      duration: 0.9,
                      default: { ease: "easeInOut" },
                      type: "spring",
                    }}
                  >
                    <Title order={2}>Description</Title>
                    <Text size="lg" className="w-2/4 text-black">
                      {selectedCard.description}
                    </Text>
                  </motion.div>
                  <motion.div
                    className="flex justify-between"
                    initial={{
                      opacity: 1,
                      scale: 1,
                    }}
                  >
                    <Title order={3}>
                      Priority: {`${selectedCard.priority}`}
                    </Title>
                    <motion.div className="flex gap-2">
                      <ActionIcon
                        className="bg-white text-black"
                        radius="xl"
                        variant="light"
                        size="xl"
                      >
                        {<IconEdit />}
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => setSelectedCard(null)}
                        className="bg-white text-peach"
                        radius="xl"
                        variant="light"
                        size="xl"
                      >
                        {<IconX />}
                      </ActionIcon>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </MotionReminderElement>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};

export default Testing;
