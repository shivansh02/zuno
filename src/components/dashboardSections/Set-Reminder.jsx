import { Title, ScrollArea, Text, Loader } from "@mantine/core";
import ReminderElement from "../reminder-element";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Testing from "./testingSec";
import AddReminder from "./Add-Reminder";
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
import dateFormat, { masks } from "dateformat";
import ShowReminders from "./showReminders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const SetReminder = (props) => {
  const [reminderData, setReminderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const notify = () => toast("✅Reminder Added!");

  const addReminder = async (values) => {
    let time = values.time.toLocaleString();
    let date = values.date.toLocaleString();
    const formatedDate = dateFormat(date, "dS mmmm yyyy");
    const formatedTime = dateFormat(time, "h:mm TT");
    console.log("data", values);

    const docRef = await addDoc(collection(db, "reminders"), {
      title: values.title,
      description: values.description,
      priority: values.priority,
      mediaUrl: null,
      date: formatedDate,
      time: formatedTime,
    });
    const newReminder = {
      title: values.title,
      description: values.description,
      priority: values.priority,
      mediaUrl: null,
      date: formatedDate,
      time: formatedTime,
      id: docRef.id,
    };
    console.log("Document written with ID: ", docRef.id);
    setReminderData((oldArray) => [newReminder, ...oldArray]);
    notify();
  };

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "reminders"));

      querySnapshot.forEach((doc) => {
        let singleReminder = doc.data();
        singleReminder = { ...singleReminder, id: doc.id };
        console.log("reminderData", singleReminder);
        setReminderData((oldArray) => [...oldArray, singleReminder]);
      });
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="px-7 font-poppins flex flex-col w-full">
        {/* Reminder Window */}
        <ToastContainer />
        <Title className="mb-16 mt-8">Set Reminders</Title>
        {loading ? (
          <Loader color="blue" className="self-center" />
        ) : (
          <ShowReminders reminderData={reminderData} />
        )}

        <div className="mt-12">
          <Title className="mb-12">Add New Reminder</Title>

          <AddReminder addReminder={addReminder} />
        </div>
      </div>
    </>
  );
};

export default SetReminder;
