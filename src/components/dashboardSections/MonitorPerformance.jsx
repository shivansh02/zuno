import React, { useState } from "react";
import { Title, Card, Text, Space } from "@mantine/core";
import PerformanceGraph from "./PerformanceGraph";

const MonitorPerformance = () => {
  const [performance, setPerformance] = useState([0.3, 0.5, 1, 2, 6, 4, 2]);
  let overallPerformance = 5;
  let lastGameScore = 14;
  let lastGameBetterBy = 10;
  return (
    <>
      <Title className="mb-16 mt-8 font-poppins">Monitor Performance</Title>
      <div className="flex justify-center w-full gap-8">
        <Card
          className="flex gap-4 w-2/4 flex-auto p-8 justify-center items-center"
          withBorder
          shadow="xl"
          radius="lg"
        >
          <div className="w-4/5">
            <Text className="text-xl font-semibold">
              {overallPerformance > 0 ? "Nothig to worry about" : "Woohoo! "}
            </Text>
            <Text className="text-xl">
              {overallPerformance > 0
                ? "Raman performance dropped by:"
                : "ramans Overall performance has been better by:"}
            </Text>
          </div>
          <div>
            <Text
              className={`text-6xl font-bold self-center p-4 ${
                overallPerformance == 5 ? "text-green-500" : "text-red-500"
              }`}
            >
              {overallPerformance}%
            </Text>
          </div>
        </Card>
        <Card
          className="flex flex-col gap-4  flex-auto w-1/4 p-8"
          withBorder
          shadow="xl"
          radius="lg"
        >
          <Text className="text-xl">Last Game Score:</Text>
          <Text
            className={`text-5xl font-bold self-center p-4 ${
              overallPerformance == 5 ? "text-green-500" : "text-red-500"
            }`}
          >
            14
          </Text>
        </Card>
        <Card
          className="flex flex-col gap-4  flex-auto w-1/4 p-8"
          withBorder
          shadow="xl"
          radius="lg"
        >
          <Text className="text-xl">Last Game Better By:</Text>
          <Text
            className={`text-5xl font-bold self-center p-4 ${
              overallPerformance == 5 ? "text-green-500" : "text-red-500"
            }`}
          >
            40%
          </Text>
        </Card>
      </div>
      <Space className="mt-8" />
      <div className="p-4">
        <PerformanceGraph performanceData={performance} />
      </div>
    </>
  );
};

export default MonitorPerformance;
