import {
  IconBrightness,
  IconHaze,
  IconMoon,
  IconPills,
  IconX,
  IconEdit,
} from "@tabler/icons";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import React, { useContext, useState } from "react";
import PrescriptionElement from "../prescription-element";
import {
  Card,
  Text,
  ThemeIcon,
  Title,
  ScrollArea,
  Stack,
  ActionIcon,
} from "@mantine/core";
import { PrescriptionContext } from "./Update-Prescription";

const MotionPrescriptionElement = motion(PrescriptionElement);

const CardComponent = ({ card, onSelect }) => {
  return (
    <MotionPrescriptionElement layoutId={`card_${card.id}`} shadow="md">
      <motion.div onClick={onSelect}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flexj justify-between items-center text-black py-4"
        >
          <motion.div className="flex justify-between items-center gap-2 w-full">
            <motion.div className="flex items-center gap-4">
              <ThemeIcon
                color="white"
                radius="xl"
                size="xl"
                className="text-yellow bg-transparent"
              >
                <IconPills size={36} />
              </ThemeIcon>

              <motion.div className="flex flex-col justify-center items-start gap-1">
                <motion.h1
                  transition={{ layout: { duration: 0.9 } }}
                  layoutId={`card_title_${card.id}`}
                  className="text-2xl font-poppins p-0 m-0 font-semibold"
                >
                  {card.name}
                </motion.h1>
                <motion.h2
                  layout="position"
                  transition={{ layout: { duration: 0.2 } }}
                  layoutId={`card_date_${card.id}`}
                  className="text-base m-0 p-0 font-poppins font-normal"
                >
                  Tenure: {card.tenure} | Disease: {card.disease}
                </motion.h2>
              </motion.div>
            </motion.div>
            <motion.div className="flex items-end justify-evenly gap-9 py-0 pr-4">
              <ThemeIcon
                color="white"
                className="text-black relative"
                size="xl"
              >
                <IconHaze size="xl" />
                <ThemeIcon
                  color="orange"
                  radius="xl"
                  className="absolute -bottom-1/3 -left-1/3"
                >
                  {card.dosage.morning}
                </ThemeIcon>
              </ThemeIcon>
              <ThemeIcon
                color="white"
                className="text-black relative"
                size="xl"
              >
                <IconBrightness size="xl" />
                <ThemeIcon
                  color="orange"
                  radius="xl"
                  className="absolute -bottom-1/3 -left-1/3"
                >
                  {card.dosage.afternoon}
                </ThemeIcon>
              </ThemeIcon>

              <ThemeIcon
                color="white"
                className="text-black relative"
                size="xl"
              >
                <IconMoon size="xl" />
                <ThemeIcon
                  color="orange"
                  radius="xl"
                  className="absolute -bottom-1/3 -left-1/3"
                >
                  {card.dosage.night}
                </ThemeIcon>
              </ThemeIcon>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionPrescriptionElement>
  );
};

const ShowPrescriptions = (props) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const prescriptionData = [...props.prescriptionData];
  const { currentPrescription, setCurrentPrescription } =
    useContext(PrescriptionContext);

  return (
    <MotionConfig
      transition={{ duration: 0.85, type: "spring", ease: "easeInOut" }}
    >
      <ScrollArea style={{ height: 400 }} type="always" offsetScrollbars>
        <Stack spacing="md">
          {prescriptionData.map((card) => {
            return (
              <CardComponent
                key={card.id}
                card={card}
                onSelect={() => {
                  setSelectedCard(card);
                }}
              />
            );
          })}
        </Stack>
      </ScrollArea>
      <AnimatePresence>
        {selectedCard && (
          <motion.div className="absolute top-1/4 left-0 z-30 w-full">
            <MotionPrescriptionElement
              layoutId={`card_${selectedCard.id}`}
              key={selectedCard.id}
              shadow="xl"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center items-center text-black py-4"
              >
                <motion.div className="flex justify-between items-center gap-2 p-4">
                  <motion.div className="flex items-start gap-4">
                    <ThemeIcon
                      color="white"
                      radius="xl"
                      size="xl"
                      className="text-yellow bg-transparent"
                    >
                      <IconPills size={36} />
                    </ThemeIcon>

                    <motion.div className="flex flex-col justify-center items-start gap-1">
                      <motion.h1
                        transition={{ layout: { duration: 0.9 } }}
                        layoutId={`card_title_${selectedCard.id}`}
                        className="text-3xl font-poppins p-0 m-0 font-semibold flex items-center"
                      >
                        Medicine Prescribed: {"  "}
                        {
                          <Text
                            color="blue"
                            className="text-3xl font-poppins ml-1"
                          >
                            {selectedCard.name}
                          </Text>
                        }
                      </motion.h1>
                      <motion.h2
                        layout="position"
                        transition={{ layout: { duration: 0.2 } }}
                        layoutId={`card_date_${selectedCard.id}`}
                        className="text-1xl m-0 p-0 font-poppins font-normal flex items-center"
                      >
                        Tenure: {"  "}
                        {
                          <Text
                            color="blue"
                            className="text-1xl font-poppins ml-1"
                          >
                            {selectedCard.tenure}
                          </Text>
                        }
                      </motion.h2>
                      <motion.h2
                        layout="position"
                        transition={{ layout: { duration: 0.2 } }}
                        layoutId={`card_date_${selectedCard.id}`}
                        className="text-1xl m-0 p-0 font-poppins font-normal flex items-centerx"
                      >
                        Disease: {"  "}
                        {
                          <Text
                            color="blue"
                            className="text-1xl font-poppins ml-1"
                          >
                            {selectedCard.disease}
                          </Text>
                        }
                      </motion.h2>
                    </motion.div>
                  </motion.div>
                </motion.div>
                <motion.div className="flex-auto font-poppins">
                  <motion.ul className="flex flex-col items-center">
                    <div className="flex flex-col items-start">
                      <motion.h2>Dosage</motion.h2>
                      <motion.li className="flex text-lg">
                        Morning:{" "}
                        {
                          <Text className="ml-1 text-dark-blue font-bold">
                            {selectedCard.dosage.morning}
                          </Text>
                        }
                      </motion.li>
                      <motion.li className="flex text-lg">
                        Afternoon:{" "}
                        {
                          <Text className="ml-1 text-dark-blue font-bold">
                            {selectedCard.dosage.afternoon}
                          </Text>
                        }
                      </motion.li>
                      <motion.li className="flex text-lg">
                        Night:{" "}
                        {
                          <Text className="ml-1 text-dark-blue font-bold">
                            {selectedCard.dosage.night}
                          </Text>
                        }
                      </motion.li>
                    </div>
                  </motion.ul>
                </motion.div>
              </motion.div>
              <motion.div className="flex gap-2 w-full justify-end">
                <ActionIcon
                  radius="xl"
                  variant="filled"
                  size="xl"
                  onClick={() => {
                    setCurrentPrescription(selectedCard);
                  }}
                >
                  {<IconEdit />}
                </ActionIcon>
                <ActionIcon
                  onClick={() => setSelectedCard(null)}
                  className=""
                  color="gray"
                  radius="xl"
                  variant="filled"
                  size="xl"
                >
                  {<IconX />}
                </ActionIcon>
              </motion.div>
            </MotionPrescriptionElement>
          </motion.div>
        )}
      </AnimatePresence>
      {selectedCard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.4 }}
          className="w-screen h-screen bg-white absolute top-0 left-0 opacity-80"
        ></motion.div>
      )}
    </MotionConfig>
  );
};

export default ShowPrescriptions;
