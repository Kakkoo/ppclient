import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FixedBottom from "./FixedBottom";

export default function Main({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => navigation.navigate("AddRemoveKid")}
          >
            <LinearGradient style={styles.btn2} colors={["#08d4c4", "#01ab9d"]}>
              <Text style="styles.textsign">Add or remove kid name...</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => navigation.navigate("AssignWork")}
          >
            <LinearGradient style={styles.btn2} colors={["#08d4c4", "#01ab9d"]}>
              <Text style="styles.textsign">Assign work to kid...</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => navigation.navigate("ViewStatus")}
          >
            <LinearGradient style={styles.btn2} colors={["#08d4c4", "#01ab9d"]}>
              <Text style="styles.textsign">View Status of work...</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => navigation.navigate("EarnedMoney")}
          >
            <LinearGradient style={styles.btn2} colors={["#08d4c4", "#01ab9d"]}>
              <Text style="styles.textsign">Earned Money</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <FixedBottom>
          <TouchableOpacity onPress={() => navigation.navigate("SplashScreen")}>
            <LinearGradient colors={["#08d4c4", "#01ab9d"]}>
              <Text style="styles.textsign">Sign out!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </FixedBottom>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "white",
  },
  header: {
    flex: 4,
  },
  footer: {
    flex: 1,
  },
  btn: {
    flex: 1,
    padding: 0,
    margin: 20,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "pink",
  },
  btn1: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "pink",
  },
  btn2: {
    justifyContent: "center",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
