import {
  ActionIcon,
  TextInput,
  Select,
  Card,
  Textarea,
  Space,
  NumberInput,
} from "@mantine/core";
import { IconPlus, IconClock, IconUpload } from "@tabler/icons";
import React, { useState, useContext, useEffect } from "react";
import { useForm } from "@mantine/form";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { PrescriptionContext } from "./Update-Prescription";

const AddPrescription = ({ addPrescription, updatePrescription }) => {
  const { currentPrescription, setCurrentPrescription } =
    useContext(PrescriptionContext);
  const [updateMethod, setUpdateMethod] = useState(false);
  console.log("insifr", currentPrescription);

  const addForm = useForm({
    initialValues: {
      name: currentPrescription.name,
      disease: currentPrescription.disease,
      tenure: currentPrescription.tenure,
      dosage: {
        morning: currentPrescription.dosage.morning,
        afternoon: currentPrescription.dosage.afternoon,
        night: currentPrescription.dosage.night,
      },
    },
  });

  useEffect(() => {
    // addForm.values.name = currentPrescription.name;
    // addForm.values.disease = c
    addForm.setValues({
      name: currentPrescription.name,
      disease: currentPrescription.disease,
      tenure: currentPrescription.tenure,
      dosage: {
        morning: currentPrescription.dosage.morning,
        afternoon: currentPrescription.dosage.afternoon,
        night: currentPrescription.dosage.night,
      },
    });
    setUpdateMethod(true);
  }, [currentPrescription]);

  return (
    <Card radius="lg" shadow="lg" withBorder>
      <div className="p-2">
        <form
          onSubmit={addForm.onSubmit((values) => {
            if (!updateMethod) {
              console.log("creating");
              addPrescription(values);
              addForm.reset();
              addForm.resetTouched();
            } else {
              console.log("updating");
              updatePrescription(values, currentPrescription.id);
              addForm.reset();
              addForm.resetTouched();
            }
          })}
          className="flex flex-col font-poppins border-8 overflow-y-visible gap-4 h-max justify-center"
        >
          <TextInput
            radius="lg"
            placeholder="Enter Medicine Name"
            size="lg"
            // value={addForm.values.name}
            {...addForm.getInputProps("name")}
          />
          <TextInput
            radius="lg"
            placeholder="Enter Condition"
            size="lg"
            {...addForm.getInputProps("disease")}
          />
          <div className="flex justify-around items-center gap-4">
            <NumberInput
              defaultValue={addForm.values.dosage.morning}
              placeholder="Dose"
              label="Morning"
              radius="md"
              size="lg"
              {...addForm.getInputProps("dosage.morning")}
            />
            <NumberInput
              defaultValue={addForm.values.dosage.afternoon}
              placeholder="Dose"
              label="Afternoon"
              radius="md"
              size="lg"
              {...addForm.getInputProps("dosage.afternoon")}
            />
            <NumberInput
              defaultValue={addForm.values.dosage.night}
              placeholder="Dose"
              label="Night"
              radius="md"
              size="lg"
              {...addForm.getInputProps("dosage.night")}
            />
          </div>
          <TextInput
            radius="lg"
            placeholder="Enter Tenure"
            size="lg"
            {...addForm.getInputProps("tenure")}
          />

          <div className="flex justify-end w-full mt-4">
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
        </form>
      </div>
    </Card>
  );
};

export default AddPrescription;
