import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:zuno/reminders.dart';
import 'package:intl/intl.dart';

class ImageUploads extends StatefulWidget {
  const ImageUploads({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _ImageUploadsState createState() => _ImageUploadsState();
}

class _ImageUploadsState extends State<ImageUploads> {
  final GlobalKey<FormState> formKey = GlobalKey();
  final TextEditingController titleController = TextEditingController();
  final TextEditingController noteController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  final TextEditingController timeController = TextEditingController();
  final TextEditingController prioController = TextEditingController();
  firebase_storage.FirebaseStorage storage =
      firebase_storage.FirebaseStorage.instance;
  DateTime selectedDate = DateTime.now();

  List<String> list = ['High', 'Mid', 'Low'];
  String? selectedPrio = 'Low';

  Future uploadFile() async {
    String message = '';

    try {
      final collection = FirebaseFirestore.instance.collection('reminders');

      await collection.doc().set({
        'title': titleController.text,
        'description': noteController.text,
        'date': selectedDate,
        'time': timeController.text,
        'priority': selectedPrio.toString(),
      });

      message = 'User added successfully';
    } catch (e) {
      message = 'Error occured';
    }
  }

  void initState() {
    timeController.text = ""; //set the initial value of text field
    super.initState();
  }

  @override
  void dispose() {
    titleController.dispose();
    noteController.dispose();
    dateController.dispose();
    timeController.dispose();
    prioController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: true,
        appBar: AppBar(
          backgroundColor: const Color(0xFF7A87FB),
          title: Text(
            "Add Reminder",
            style: TextStyle(
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        body: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(children: <Widget>[
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  SizedBox(
                      width: MediaQuery.of(context).size.width * .85,
                      child: Padding(
                        padding: const EdgeInsetsDirectional.fromSTEB(
                            10, 30, 10, 10),
                        child: TextFormField(
                          validator: (String? text) {
                            if (text == null || text.isEmpty) {
                              return 'Please enter a value';
                            }
                            return null;
                          },
                          textInputAction: TextInputAction.done,
                          controller: titleController,
                          decoration: const InputDecoration(
                            enabledBorder: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                              borderSide:
                                  BorderSide(width: 2, color: Colors.teal),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                              borderSide:
                                  BorderSide(width: 2, color: Colors.teal),
                            ),
                            border: OutlineInputBorder(),
                            labelText: 'Title',
                            contentPadding: EdgeInsets.all(20),
                          ),
                        ),
                      )),
                  SizedBox(
                      width: MediaQuery.of(context).size.width * .85,
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: TextFormField(
                          controller: noteController,
                          validator: (String? text) {
                            if (text == null || text.isEmpty) {
                              return 'Please enter a value';
                            }
                            return null;
                          },
                          textInputAction: TextInputAction.done,
                          decoration: const InputDecoration(
                            enabledBorder: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                              borderSide:
                                  BorderSide(width: 2, color: Colors.teal),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                              borderSide:
                                  BorderSide(width: 2, color: Colors.teal),
                            ),
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.all(20),
                            labelText: 'Description',
                          ),
                        ),
                      )),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    // mainAxisSize: MainAxisSize.min,
                    children: [
                      SizedBox(
                        width: MediaQuery.of(context).size.width * .85,
                        child: Padding(
                          padding: const EdgeInsets.only(
                              left: 10, right: 10, bottom: 10),
                          child: TextField(
                            controller: dateController,
                            decoration: const InputDecoration(
                              prefixIcon: Icon(Icons.calendar_today_rounded),
                              enabledBorder: OutlineInputBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(30)),
                                borderSide:
                                    BorderSide(width: 2, color: Colors.teal),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(30)),
                                borderSide:
                                    BorderSide(width: 2, color: Colors.teal),
                              ),
                              border: OutlineInputBorder(),
                              contentPadding: EdgeInsets.all(20),
                              labelText: "Select date",
                            ),
                            onTap: () async {
                              DateTime? selectedDate = await showDatePicker(
                                  context: context,
                                  initialDate: DateTime.now(),
                                  firstDate: DateTime(2000),
                                  lastDate: DateTime(2050));
                              if (selectedDate != null) {
                                dateController.text = DateFormat('yyyy-MM-dd')
                                    .format(selectedDate);
                              }
                            },
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                      width: MediaQuery.of(context).size.width * .85,
                      child: Padding(
                          padding: const EdgeInsets.all(10),
                          child: TextField(
                            controller: timeController,
                            decoration: const InputDecoration(
                                prefixIcon: Icon(Icons.timer),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(30)),
                                  borderSide:
                                      BorderSide(width: 2, color: Colors.teal),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(30)),
                                  borderSide:
                                      BorderSide(width: 2, color: Colors.teal),
                                ),
                                border: OutlineInputBorder(),
                                contentPadding: EdgeInsets.all(20),
                                labelText: "Enter Time"),
                            readOnly: true,
                            onTap: () async {
                              TimeOfDay? pickedTime = await showTimePicker(
                                initialTime: TimeOfDay.now(),
                                context: context,
                              );

                              if (pickedTime != null) {
                                print(pickedTime.format(context));
                                DateTime parsedTime = DateFormat.jm().parse(
                                    pickedTime.format(context).toString());

                                print(parsedTime);
                                String formattedTime =
                                    DateFormat('HH:mm:ss').format(parsedTime);
                                print(formattedTime);

                                setState(() {
                                  timeController.text = formattedTime;
                                });
                              } else {
                                print("Time is not selected");
                              }
                            },
                          ))),
                  SizedBox(
                      width: MediaQuery.of(context).size.width * .85,
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: DropdownButtonFormField(
                          value: selectedPrio,
                          items: list
                              .map((map) => DropdownMenuItem<String>(
                                  value: map, child: Text(map)))
                              .toList(),
                          onChanged: (map) {
                            setState(() {
                              selectedPrio = map;
                            });
                          },
                          decoration: const InputDecoration(
                            enabledBorder: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                              borderSide:
                                  BorderSide(width: 2, color: Colors.teal),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                              borderSide:
                                  BorderSide(width: 2, color: Colors.teal),
                            ),
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.all(20),
                            labelText: 'Priority',
                          ),
                        ),
                      )),
                  Padding(
                      padding: const EdgeInsets.only(top: 30),
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20)),
                            padding: EdgeInsets.all(10),
                            backgroundColor: Color(0xFF7A87FB),
                            textStyle: TextStyle(fontSize: 20)),
                        child: const Text("Set Reminder"),
                        onPressed: () {
                          uploadFile();
                          if (formKey.currentState!.validate()) {
                            ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                    content: Text("User added successfully")));
                            Navigator.pushAndRemoveUntil(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const RemindersApp()),
                                (Route<dynamic> route) => false);
                          }
                        },
                      ))
                ],
              ),
            ]),
          ),
        ));
  }
}
