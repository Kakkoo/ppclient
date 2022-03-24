import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FixedBottom from "./FixedBottom";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-community/async-storage";

export default function Main({ navigation }) {
  const SignOut = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Sign In");
    } catch (error) {
      console.log(error);
    }
  };
  const [tkn, setTkn] = useState("");
  useEffect(() => {
const Tkn = AsyncStorage.getItem("userToken");
if(Tkn !== ""){
  setTkn(Tkn);
}
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#9370DB" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.header1}>
          <Text style={styles.text_header}>Main</Text>
        </View>
        <View style={styles.header2}>
          <Animatable.Image
            animation="bounceIn"
            source={require("./images/logo.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.upper}>
          <View style={styles.btn}>
            <LinearGradient style={styles.Lbtn} colors={["#E8A317", "#E1D9D1"]}>
              <TouchableOpacity
                style={styles.Tbtn}
                onPress={() => navigation.navigate("Add or Remove a Kid name")}
              >
                <LinearGradient
                  style={styles.Lbtn1}
                  colors={["#158FAD", "#43C6DB"]}
                >
                  <Text style={styles.text}>Add or remove kid name</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.btn}>
            <LinearGradient style={styles.Lbtn} colors={["#E8A317", "#E1D9D1"]}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Assign work to a kid")}
              >
                <LinearGradient
                  style={styles.Lbtn1}
                  colors={["#158FAD", "#43C6DB"]}
                >
                  <Text style={styles.text}>Assign work to kid</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.btn}>
            <LinearGradient style={styles.Lbtn} colors={["#E8A317", "#E1D9D1"]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    "View Status of earned money and assigned work"
                  )
                }
              >
                <LinearGradient
                  style={styles.Lbtn1}
                  colors={["#158FAD", "#43C6DB"]}
                >
                  <Text style={styles.text}>View Status of work</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.btn}>
            <LinearGradient style={styles.Lbtn} colors={["#E8A317", "#E1D9D1"]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("History of completed works")
                }
              >
                <LinearGradient
                  style={styles.Lbtn1}
                  colors={["#158FAD", "#43C6DB"]}
                >
                  <Text style={styles.text}>History</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.btn}>
            <LinearGradient style={styles.Lbtn} colors={["#E8A317", "#E1D9D1"]}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Add Guardian")}
              >
                <LinearGradient
                  style={styles.Lbtn1}
                  colors={["#158FAD", "#43C6DB"]}
                >
                  <Text style={styles.text}>Add new guardian</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.btn}>
            <LinearGradient style={styles.Lbtn} colors={["#E8A317", "#E1D9D1"]}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Change Password")}
              >
                <LinearGradient
                  style={styles.Lbtn1}
                  colors={["#158FAD", "#43C6DB"]}
                >
                  <Text style={styles.text}>ChangePassword</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
      <View>
        <FixedBottom>
          <TouchableOpacity onPress= {() => 
          //navigation.navigate("Sign In")}
          {SignOut()}}
          >
            <LinearGradient
              style={styles.fixed}
              colors={["#E8A317", "#E1D9D1"]}
            >
              <Text>Sign out!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </FixedBottom>
      </View>
    </View>
  );
}
const { height } = Dimensions.get("screen");
const height_logo = height * 0.07;
const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: width * 0.036,
    paddingTop: 0
  },
  header: {
    flex: 1,
    // paddingHorizontal: 30,
    // paddingBottom: 10,
    flexDirection: "row",
  },
  header1: {
    flex: 2,
    backgroundColor: "#E6E6FA",
    justifyContent: 'center',
    alignItems: 'center',
    padding: width*0.01,
    borderTopLeftRadius: width * 0.08,
borderTopRightRadius: width * 0.08,
borderBottomLeftRadius: width * 0.08,
borderBottomRightRadius: width * 0.08,
  },
  header2: {
    flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
  },
  text_header: {
    fontWeight: "bold",
    fontSize: 30,
  },
  text: {
    color: "#3A3B3C",
  },
  footer: {
    flex: 5,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  btn: {
    marginTop: 20,
    width: 300,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Tbtn: {
    padding: 0,
  },
  Lbtn: {
    padding: 1,
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderTopRightRadius: 7,
    alignItems: "center",
    width: 299,
  },
  Lbtn1: {
    padding: 8,
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderTopRightRadius: 7,
    alignItems: "center",
    width: 297,
  },
  upper: {
    alignItems: "center",
  },
  fixed: {
    padding: 5,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
