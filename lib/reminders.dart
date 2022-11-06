import 'package:flutter/material.dart';
import 'data_class_rem.dart';
import 'package:draggable_home/draggable_home.dart';
import 'reminder_form.dart';

const purple = Color.fromRGBO(122, 135, 251, 1);
const lightBlue = Color.fromRGBO(220, 231, 253, 1);
const yellow = Color.fromRGBO(240, 187, 82, 1);
const lightYellow = Color.fromRGBO(254, 229, 178, 1);

class RemindersApp extends StatelessWidget {
  const RemindersApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => MaterialApp(
        debugShowCheckedModeBanner: false,
        title: "Reminders",
        theme: ThemeData(
          fontFamily: 'Poppins',
        ),
        home: const Reminder(),
      );
}

class Reminder extends StatefulWidget {
  const Reminder({super.key});

  @override
  State<Reminder> createState() => _ReminderState();
}

class _ReminderState extends State<Reminder> {
  List dataList = [];

  @override
  Widget build(BuildContext context) {
    return DraggableHome(
      leading: IconButton(
        icon: Icon(Icons.arrow_back_ios),
        onPressed: () => {},
      ),
      title: const Text(
        "Reminders",
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
      actions: [
        IconButton(
            onPressed: () {
              Navigator.push(
                  context, MaterialPageRoute(builder: (_) => RemindersApp()));
            },
            icon: const Icon(Icons.refresh)),
      ],
      headerWidget: headerWidget(context),
      headerBottomBar: headerBottomBarWidget(),
      body: [getAllData()],
      backgroundColor: Colors.white,
      appBarColor: purple,
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
              context, MaterialPageRoute(builder: (_) => const ImageUploads()));
        },
        child: const Icon(Icons.add),
        backgroundColor: purple,
      ),
    );
  }

  Row headerBottomBarWidget() {
    return Row(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        IconButton(
          onPressed: () => {
            Navigator.push(
                context, MaterialPageRoute(builder: (_) => RemindersApp())),
          },
          icon: const Icon(Icons.refresh),
          color: Colors.white,
        ),
      ],
    );
  }

  Widget headerWidget(BuildContext context) {
    return Container(
      color: purple,
      child: Center(
        child: Text(
          "Reminders",
          style: Theme.of(context)
              .textTheme
              .headline2!
              .copyWith(color: Colors.white, fontSize: 40),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }

  FutureBuilder getAllData() {
    return FutureBuilder(
      future: FireStoreDbRem().getData(),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const Text(
            "Something went wrong",
          );
        }
        if (snapshot.connectionState == ConnectionState.done) {
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

  ListView listView(dataList) => ListView.builder(
      padding: const EdgeInsets.only(top: 0, right: 10, left: 10),
      physics: const NeverScrollableScrollPhysics(),
      itemCount: dataList.length,
      shrinkWrap: true,
      itemBuilder: (context, index) => Card(
            margin: EdgeInsets.all(10),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30.0),
            ),
            color: dataList[index]["priority"] == "low"
                ? lightBlue
                : dataList[index]["priority"] == "high"
                    ? const Color(0xFFFEE0DF)
                    : lightYellow,
            child: ListTile(
              contentPadding: const EdgeInsets.all(20),
              title: Text(
                dataList[index]["title"],
                style: const TextStyle(
                    color: Colors.black87,
                    height: 1.5,
                    fontWeight: FontWeight.bold),
              ),
              subtitle: Text(
                dataList[index]["description"],
                style: const TextStyle(color: Colors.black54),
              ),
              trailing: Text(
                dataList[index]["time"],
                style: const TextStyle(
                    color: Colors.black87,
                    height: 1.5,
                    fontWeight: FontWeight.bold),
              ),
            ),
          ));
}
