import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-community/async-storage";

const SplashScreen = ({ navigation }) => {
  const [userToken, setToken] = useState("");

  useEffect(() => {
    const Token = AsyncStorage.getItem("userToken");
    if (Token !== null) {
      setToken(Token);
    }
  }, []);
  const mainORsignin = () => {
    if (userToken !== "") {
      navigation.navigate("Main");
    }
    navigation.navigate("Sign In");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#9370DB" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.h1}>
          <Animatable.Image
            animation="bounceIn"
            source={require("./images/logo.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.F1}>
          <View style={styles.T1}>
            <Text style={styles.title1}>Parent</Text>
          </View>
          <View style={styles.T2}>
            <Text style={styles.title2}>Children</Text>
          </View>
          <View style={styles.T3}>
            <Text style={styles.title3}>Portal</Text>
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => mainORsignin()}
          >
            <Text style={styles.textsign}>Get Started</Text>
            <MaterialIcons name="navigate-next" style={styles.material} />
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
export default SplashScreen;

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: width * 0.06,
    paddingTop: 0,
  },
  header: {
    flex: 1,
    padding: width * 0.02,
    flexDirection: "row",
    backgroundColor: "#E6E6FA",
    borderTopLeftRadius: width * 0.06,
    borderTopRightRadius: width * 0.06,
    borderBottomLeftRadius: width * 0.06,
    borderBottomRightRadius: width * 0.06,
    margin: height * 0.06,
    marginTop: 0,
  },
  h1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
  },
  F1: {
    backgroundColor: "#9370DB",
    borderTopLeftRadius: width * 0.06,
    borderTopRightRadius: width * 0.06,
    borderBottomLeftRadius: width * 0.06,
    borderBottomRightRadius: width * 0.06,
    justifyContent: "center",
    //padding: width * 0.06,
    marginRight: width * 0.03,
    marginTop: 0,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title1: {
    color: "white",
    fontSize: width * 0.07,
    fontWeight: "bold",
    margin: width * 0.07,
    marginRight: width*0.001,
    marginBottom: 0,
    padding: width*0.01,
    paddingLeft: width*0.04,
    borderTopLeftRadius: width * 0.06,
  //  borderTopRightRadius: width * 0.06,
    borderBottomLeftRadius: width * 0.06,
  //  borderBottomRightRadius: width * 0.06,


    backgroundColor: "#9172EC"
  },
  title2: {
    color: "white",
    fontSize: width * 0.07,
    fontWeight: "bold",
    margin: width * 0.07,
    marginLeft: width*0.001,
    marginBottom: 0,
    padding: width*0.01,
    paddingLeft: width*0.04,
   // borderTopLeftRadius: width * 0.06,
   borderTopRightRadius: width * 0.06,
    //borderBottomLeftRadius: width * 0.06,
  borderBottomRightRadius: width * 0.06,


    backgroundColor: "#9E7BFF"
  },
  title3: {
    color: "white",
    fontSize: width * 0.07,
    fontWeight: "bold",
    margin: width * 0.07,
  },
  T1: {
  marginLeft: -width*0.03
  },
  T2: {
  
  },
  T3: {},

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD700",
    borderTopLeftRadius: width * 0.06,
    borderTopRightRadius: width * 0.06,
    borderBottomLeftRadius: width * 0.06,
    borderBottomRightRadius: width * 0.06,
    padding: width * 0.001,
    marginLeft: width * 0.03,
    marginTop: 0,
  },
  signIn: {
    padding: width * 0.02,
    justifyContent: "center",
    flexDirection: "row",
  },
  textsign: {
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  material: {
    color: "#9370DB",
    paddingTop: width * 0.016,
    fontSize: width * 0.06,
  },
});
