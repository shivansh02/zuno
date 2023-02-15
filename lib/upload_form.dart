// ignore_for_file: avoid_print, use_build_context_synchronously

import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
// ignore: depend_on_referenced_packages
import 'package:path/path.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:zuno/people_you_know.dart';

const purple = Color.fromRGBO(122, 135, 251, 1);

class ImageUploads extends StatefulWidget {
  const ImageUploads({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _ImageUploadsState createState() => _ImageUploadsState();
}

class _ImageUploadsState extends State<ImageUploads> {
  final GlobalKey<FormState> formKey = GlobalKey();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController relController = TextEditingController();
  firebase_storage.FirebaseStorage storage =
      firebase_storage.FirebaseStorage.instance;

  File? _photo;
  final ImagePicker _picker = ImagePicker();

  Future imgFromGallery() async {
    final pickedFile = await _picker.pickImage(source: ImageSource.gallery);

    setState(() {
      if (pickedFile != null) {
        _photo = File(pickedFile.path);
      } else {
        print('No image selected.');
      }
    });
  }

  Future imgFromCamera() async {
    final pickedFile = await _picker.pickImage(source: ImageSource.camera);

    setState(() {
      if (pickedFile != null) {
        _photo = File(pickedFile.path);
      } else {
        print('No image selected.');
      }
    });
  }

  Future uploadFile() async {
    if (_photo == null) return;
    final fileName = basename(_photo!.path);
    final destination = 'files/$fileName';

    try {
      final ref = firebase_storage.FirebaseStorage.instance.ref(destination);
      await ref.putFile(_photo!);
    } catch (e) {
      print('error occured');
    }

    // ignore: unused_local_variable
    String message = '';

    try {
      final collection = FirebaseFirestore.instance.collection('feedback');

      await collection.doc().set({
        'timestamp': FieldValue.serverTimestamp(),
        'name': nameController.text,
        'relationship': relController.text,
        'url':
            'https://firebasestorage.googleapis.com/v0/b/hacky-e0462.appspot.com/o/files%2F$fileName?alt=media&token=d98c1389-68be-43ff-8c88-029c0bd87043',
      });

      message = 'User added successfully';
    } catch (e) {
      message = 'Error occured';
    }
  }

  @override
  void dispose() {
    nameController.dispose();
    relController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      appBar: AppBar(
        backgroundColor: purple,
      ),
      body: SingleChildScrollView(
        child: Form(
          key: formKey,
          child: Column(
            children: <Widget>[
              const Text(
                "Add new member",
                style: TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    height: 5,
                    color: purple),
                textAlign: TextAlign.start,
              ),
              Center(
                child: GestureDetector(
                  onTap: () {
                    _showPicker(context);
                  },
                  child: CircleAvatar(
                    radius: 55,
                    backgroundColor: purple,
                    child: _photo != null
                        ? ClipRRect(
                            borderRadius: BorderRadius.circular(50),
                            child: Image.file(
                              _photo!,
                              width: 100,
                              height: 100,
                              fit: BoxFit.fitHeight,
                            ),
                          )
                        : Container(
                            decoration: BoxDecoration(
                                color: Colors.grey[200],
                                borderRadius: BorderRadius.circular(50)),
                            width: 100,
                            height: 100,
                            child: Icon(
                              Icons.camera_alt,
                              color: Colors.grey[800],
                            ),
                          ),
                  ),
                ),
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  SizedBox(
                      width: 300,
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
                          controller: nameController,
                          decoration: const InputDecoration(
                            enabledBorder: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                              borderSide: BorderSide(width: 2, color: purple),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                              borderSide: BorderSide(width: 2, color: purple),
                            ),
                            border: OutlineInputBorder(),
                            labelText: 'Name',
                            contentPadding: EdgeInsets.all(20),
                          ),
                        ),
                      )),
                  SizedBox(
                      width: 300,
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: TextFormField(
                          controller: relController,
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
                              borderSide: BorderSide(width: 2, color: purple),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30)),
                              borderSide: BorderSide(width: 2, color: purple),
                            ),
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.all(20),
                            labelText: 'Relationship',
                          ),
                        ),
                      )),
                  Padding(
                      padding: const EdgeInsets.only(top: 30),
                      child: CircleAvatar(
                          radius: 30,
                          backgroundColor: purple,
                          child: IconButton(
                            icon: const Icon(
                              Icons.done,
                              color: Colors.white,
                            ),
                            onPressed: () {
                              uploadFile();
                              if (formKey.currentState!.validate()) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                        content: Text("Uploading...")));
                                Navigator.pushAndRemoveUntil(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            const DraggableApp()),
                                    (Route<dynamic> route) => false);
                              }
                            },
                          )))
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  void _showPicker(context) {
    showModalBottomSheet(
        context: context,
        builder: (BuildContext bc) {
          return SafeArea(
            child: Wrap(
              children: <Widget>[
                ListTile(
                    leading: const Icon(Icons.photo_library),
                    title: const Text('Gallery'),
                    onTap: () {
                      imgFromGallery();
                      Navigator.of(context).pop();
                    }),
                ListTile(
                  leading: const Icon(Icons.photo_camera),
                  title: const Text('Camera'),
                  onTap: () {
                    imgFromCamera();
                    Navigator.of(context).pop();
                  },
                ),
              ],
            ),
          );
        });
  }
}
