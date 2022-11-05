import 'dart:io';

import 'package:flutter/material.dart';
import 'fetch_user.dart';
import 'package:image_picker/image_picker.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:draggable_home/draggable_home.dart';

class vault extends StatelessWidget {
  const vault({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Vault',
        theme: ThemeData(
          fontFamily: 'Poppins',
          // primarySwatch: Colors.blue,
        ),
        home: HomePage(),
      );
}

class HomePage extends StatefulWidget {
  HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  GlobalKey<FormState> key = GlobalKey();
  final CollectionReference _reference =
      FirebaseFirestore.instance.collection('Vault');

  String imageUrl = '';

  List<String> docIds = [];

  Future getDocId() async {
    await FirebaseFirestore.instance.collection('Vault').get().then(
          (snapshot) => snapshot.docs.forEach(
            (element) {
              print(element.data());

              docIds.add(element.reference.id);
            },
          ),
        );
  }

  @override
  Widget build(BuildContext context) {
    return DraggableHome(
      floatingActionButton: Form(
        key: key,
        child: SpeedDial(
          animatedIcon: AnimatedIcons.add_event,
          children: [
            SpeedDialChild(
                child: IconButton(
              icon: Icon(Icons.camera_alt),
              color: const Color(0xFF7A87FB),
              onPressed: () async {
                ImagePicker imagePicker = ImagePicker();
                XFile? file =
                    await imagePicker.pickImage(source: ImageSource.camera);
                print('${file?.path}');
                if (file == null) return;

                String uniqueId =
                    DateTime.now().millisecondsSinceEpoch.toString();

                Reference imgRoot = FirebaseStorage.instance.ref();
                Reference imgDir = imgRoot.child('images');
                Reference mainImg = imgDir.child(uniqueId);
                try {
                  await mainImg.putFile(File(file.path));
                  imageUrl = await mainImg.getDownloadURL();
                } catch (error) {
                  //error
                }
                if (imageUrl.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Please upload image first'),
                    ),
                  );
                  return;
                }
                if (key.currentState!.validate()) {
                  Map<String, String> dataToSend = {
                    'image': imageUrl,
                  };
                  _reference.add(dataToSend);
                }
              },
            )),
            SpeedDialChild(
                child: IconButton(
              icon: Icon(Icons.photo_library),
              color: const Color(0xFF7A87FB),
              onPressed: () async {
                ImagePicker imagePicker = ImagePicker();
                XFile? file =
                    await imagePicker.pickImage(source: ImageSource.gallery);
                print('${file?.path}');
                if (file == null) return;

                String uniqueId =
                    DateTime.now().millisecondsSinceEpoch.toString();

                Reference imgRoot = FirebaseStorage.instance.ref();
                Reference imgDir = imgRoot.child('images');
                Reference mainImg = imgDir.child(uniqueId);
                try {
                  await mainImg.putFile(File(file.path));
                  imageUrl = await mainImg.getDownloadURL();
                } catch (error) {
                  //error
                }
                if (imageUrl.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Please upload image first'),
                    ),
                  );
                  return;
                }
                if (key.currentState!.validate()) {
                  Map<String, String> dataToSend = {
                    'image': imageUrl,
                  };
                  _reference.add(dataToSend);
                }
              },
            ))
          ],
        ),
      ),
      // leading: const Icon(Icons.arrow_back_ios),
      title: const Text(""),
      // actions: [
      //   IconButton(
      //       onPressed: () {
      //         Navigator.push(
      //             context, MaterialPageRoute(builder: (_) => const vault()));
      //       },
      //       icon: const Icon(Icons.refresh)),
      // ],
      headerWidget: headerWidget(context),
      headerBottomBar: headerBottomBarWidget(),
      body: [
        listView(context),
      ],
      backgroundColor: Colors.white,
      appBarColor: Color(0xFF7A87FB),
    );
  }

  Row headerBottomBarWidget() {
    return Row(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        IconButton(
          icon: Icon(Icons.refresh),
          color: Colors.white,
          onPressed: () {
            Navigator.push(
                context, MaterialPageRoute(builder: (_) => const vault()));
          },
        ),
      ],
    );
  }

  Widget headerWidget(BuildContext context) {
    return Container(
      color: const Color(0xFF7A87FB),
      child: Center(
        child: Text(
          "Vault",
          style: Theme.of(context)
              .textTheme
              .headline2!
              .copyWith(color: Colors.white70),
        ),
      ),
    );
  }

  Widget listView(context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height,
      child: FutureBuilder(
        future: getDocId(),
        builder: (context, snapshot) {
          return GridView.builder(
            physics: NeverScrollableScrollPhysics(),
            itemCount: docIds.length,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2, crossAxisSpacing: 0, mainAxisSpacing: 20),
            itemBuilder: (context, index) {
              return GridTile(
                child: GetImage(documentId: docIds[index]),
              );
            },
          );
        },
      ),
    );
  }
}
