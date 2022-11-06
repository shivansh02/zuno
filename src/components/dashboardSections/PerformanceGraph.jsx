import { Card, Text } from "@mantine/core";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "bottom",
    },
    title: {
      display: false,
    },
  },
};

const labels = ["", "", "", "", "", "", ""];

const PerformanceGraph = ({ performanceData }) => {
  console.log("performanceData", performanceData);
  const data = {
    labels,
    datasets: [
      {
        label: "Performance Data",
        data: performanceData.map((item, index) => {
          return performanceData[index];
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <Card withBorder shadow="xl" radius="lg" className="p-4">
      <Text size="xl" className="text-3xl font-poppins">
        Performance Graph
      </Text>
      <Line options={options} data={data} className="w-5/6" />;
    </Card>
  );
};

export default PerformanceGraph;
