import { initializeApp } from "firebase/app";
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
import { Title, ScrollArea, Text, Loader } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import ShowPrescriptions from "./showPrescriptions";

// Firebase fetching
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

const UpdatePrescription = () => {
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const notify = () => toast("✅Prescription Added!");

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "prescriptions"));

      querySnapshot.forEach((doc) => {
        let singlePrescription = doc.data();
        singlePrescription = { ...singlePrescription, id: doc.id };
        console.log("prescriptionData", singlePrescription);
        setPrescriptionData((oldArray) => [...oldArray, singlePrescription]);
      });
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="px-7 font-poppins flex flex-col w-full">
        {/* Reminder Window */}
        <ToastContainer />
        <Title className="mb-16 mt-8">Prescriptions</Title>
      </div>
      {loading ? (
        <Loader color="gray" className="self-center" />
      ) : (
        <ShowPrescriptions prescriptionData={prescriptionData} />
      )}
    </>
  );
};

export default UpdatePrescription;
