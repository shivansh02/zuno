import React, { useState, useEffect } from "react";
import { Title, Card, Text, Space } from "@mantine/core";
import PerformanceGraph from "./PerformanceGraph";

const MonitorPerformance = () => {
  const [performance, setPerformance] = useState([3, 1, 4, 2, 6, 7, 4]);
  const [overallPerformance, setOverallPerformance] = useState(0);

  function successiveChange(arr, N) {
    let result = 0;

    let var1 = arr[0];
    let var2 = arr[1];

    result = var1 + var2 + (var1 * var2) / 100;

    for (var i = 2; i < N; i++)
      result = result + arr[i] + (result * arr[i]) / 100;
    result = result.toFixed(2);

    return result;
  }

  useEffect(() => {
    setOverallPerformance(successiveChange(performance, performance.length));
  }, []);

  let lastGameScore = performance[performance.length - 1];
  let lastGameBetterBy =
    performance.length - 1 - (performance.length - 2) / 100;
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
            <Text className="text-xl font-bold mb-4">
              {overallPerformance < 0 ? "Nothig to worry about" : "Woohoo!🥳 "}
            </Text>
            <Text className="text-xl">
              {overallPerformance < 0
                ? "Raman performance dropped by:"
                : "Ramans Overall performance has been better by:"}
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
            {lastGameScore}
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
            {performance[performance.length - 1] >
            performance[performance.length - 2]
              ? `${lastGameBetterBy}%`
              : `-${lastGameBetterBy}%`}
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
