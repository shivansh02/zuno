import React, { useState, useEffect } from "react";
import { Title, Card, Text, Space } from "@mantine/core";
import PerformanceGraph from "./PerformanceGraph";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  setDoc,
  DocumentSnapshot,
  doc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBURkT8NXBIUV5iqXWSGyuV12KgEpFuvFM",
  authDomain: "hacky-e0462.firebaseapp.com",
  projectId: "hacky-e0462",
  storageBucket: "hacky-e0462.appspot.com",
  messagingSenderId: "205609134912",
  appId: "1:205609134912:web:31c5cfa1d3bfbd129b68a5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const MonitorPerformance = () => {
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "game", "8vDBT3JL2dAU7b0pi3JP");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPerformance(docSnap.data().maxLevel);
      } else {
        console.log("No such document!");
      }
    })();
  }, []);

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
    if (performance.length > 0)
      setOverallPerformance(successiveChange(performance, performance.length));
  }, [performance]);

  let lastGameScore = performance[performance.length - 1];
  let lastGameBetterBy =
    performance.length - 1 - (performance.length - 2) / 100;
  return (
    <div className="mx-4 w-full">
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
      <div className="mx-9">
        <PerformanceGraph performanceData={performance} />
      </div>
    </div>
  );
};

export default MonitorPerformance;
