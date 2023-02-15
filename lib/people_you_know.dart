// ignore_for_file: prefer_const_constructors
import 'package:flutter/material.dart';
import 'package:draggable_home/draggable_home.dart';
import 'package:zuno/main.dart';
import 'upload_form.dart';
import 'data_class.dart';

const purple = Color.fromRGBO(122, 135, 251, 1);
const lightBlue = Color.fromRGBO(220, 231, 253, 1);

class DraggableApp extends StatelessWidget {
  const DraggableApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => MaterialApp(
        debugShowCheckedModeBanner: false,
        title: "Family Members",
        theme: ThemeData(
          fontFamily: 'Poppins',
        ),
        home: const HomePage(),
      );
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List dataList = [];

  @override
  Widget build(BuildContext context) {
    return DraggableHome(
      leading: IconButton(
        icon: Icon(Icons.arrow_back_ios),
        onPressed: () => {
          Navigator.push(context, MaterialPageRoute(builder: (_) => MyApp())),
        },
      ),
      title: const Text(
        "People you know",
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
      actions: [
        IconButton(
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return const ImageUploads();
              }));
            },
            icon: const Icon(Icons.add)),
      ],
      headerWidget: headerWidget(context),
      headerBottomBar: headerBottomBarWidget(),
      body: [getAllData()],
      backgroundColor: Colors.white,
      appBarColor: purple,
    );
  }

  Row headerBottomBarWidget() {
    return Row(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        IconButton(
          onPressed: () => {
            Navigator.push(
                context, MaterialPageRoute(builder: (_) => DraggableApp())),
          },
          icon: const Icon(Icons.refresh),
          color: Colors.white,
        ),
        const Spacer(),
        IconButton(
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return const ImageUploads();
              }));
            },
            icon: const Icon(
              Icons.add,
              color: Colors.white,
            )),
      ],
    );
  }

  Widget headerWidget(BuildContext context) {
    return Container(
      color: purple,
      child: Center(
        child: Text(
          "People \n you know",
          style: Theme.of(context)
              .textTheme
              .headline2!
              .copyWith(color: Colors.white, fontSize: 35),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }

  FutureBuilder getAllData() {
    return FutureBuilder(
      future: FireStoreDb().getData(),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const Text(
            "Something went wrong",
          );
        }
        if (snapshot.hasData) {
          dataList = snapshot.data as List;
          return listView(dataList);
        }
        return const Center(
            child: CircularProgressIndicator(
          color: purple,
        ));
      },
    );
  }

  GridView listView(dataList) => GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2, childAspectRatio: 1),
        padding: const EdgeInsets.only(top: 0),
        physics: const NeverScrollableScrollPhysics(),
        itemCount: dataList.length,
        shrinkWrap: true,
        itemBuilder: (context, index) => Card(
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(100.0),
          ),
          child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                CircleAvatar(
                  backgroundImage: NetworkImage(dataList[index]["url"]),
                  maxRadius: 65,
                  backgroundColor: purple,
                ),
                Text(
                  dataList[index]["name"],
                  style: const TextStyle(
                      color: Colors.black54,
                      height: 1.5,
                      fontWeight: FontWeight.bold),
                ),
                Text(
                  dataList[index]["relationship"],
                  style: const TextStyle(color: Colors.black26),
                ),
              ]),
        ),
      );
}
