import React, { useState } from "react";
import Config from "react-native-config";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import axios from "axios";
export default function SignUPScreen({ navigation }) {
  const [Error, setError] = useState("");
  const [Data, setData] = useState({
    email: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const emailInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...Data,
        email: val,
        check_textInputChange: true,
      });
      setError("");
    } else {
      setData({
        ...Data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const registerUser = (userData) => {
    axios
      .post(Config.API_URL + "/api/users/register", userData)
      .then((res) => {
        navigation.navigate("SignInScreen");
        alert("Please check your eamil to find temporary password");
      })
      .catch((err) => {
        if (err) {
          setError(err.response.data.email);
        }
      });
  };
  const ERROR = ({ Error }) => {
    let content;
    if (Error) {
      content = <Text style={styles.danger}>{Error}</Text>;
    } else {
      content = <Text></Text>;
    }
    return content;
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#9370DB" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerPart1}>
          <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <View style={styles.headerPart2}>
          <Animatable.Image
            animation="bounceIn"
            source={require("./images/logo.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
      </View>
      <View style={styles.mid}>
        <View style={styles.mid1}>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#05375a"
              style={styles.FontAwesome}
            />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => emailInputChange(val)}
            />

            {Data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
            <ERROR Error={Error} />
          </View>
        </View>
        <View style={styles.mid2}>
          <TouchableOpacity
            onPress={() => {
              registerUser(Data);
            }}
          >
            <Text style={[styles.textSign, {color: "white"}]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Sign In")}
          >
            <Text style={styles.textSign}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View>
          <MaterialIcons name="navigate-next" style={styles.material} />
        </View>
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
    paddingTop: 0,
  },
  header: {
    flex: 1,
    //paddingHorizontal: width * 0.05,
    // paddingBottom: height * 0.01,
    flexDirection: "row",
    //margin: height*0.01
  },
  headerPart1: {
    flex: 2,
    backgroundColor: "#E6E6FA",
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
    borderBottomLeftRadius: width * 0.08,
    borderBottomRightRadius: width * 0.08,
    padding: width * 0.04,
    justifyContent: "center",
    alignItems: "center",
  },
  headerPart2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: height*0.01,
    // paddingLeft: width*0.45,
  },
  mid: {
    flex: 2,
    flexDirection: "row",
  },
  mid1: {
    flex: 3,
    backgroundColor: "#FFC0CB",
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
    borderBottomLeftRadius: width * 0.08,
    borderBottomRightRadius: width * 0.08,
    justifyContent: "center",
    alignItems: "center",
    margin: width * 0.04,
    marginLeft: 0,
    padding: width * 0.03,
  },
  mid2: {
    flex: 2,
    backgroundColor: "#9370DB",
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
    borderBottomLeftRadius: width * 0.08,
    borderBottomRightRadius: width * 0.08,
    justifyContent: "center",
    alignItems: "center",
    margin: width * 0.13,
    marginLeft: 0,
    marginRight: 0,
    //margin: width*0.02
  },
  text_header: {
    fontWeight: "bold",
    fontSize: width * 0.09,
    color: "#454545",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: width * 0.001,
    borderBottomColor: "#E9E4D4",
    paddingBottom: width * 0.02,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  button1: {
    alignItems: "center",
    marginTop: 0,
  },
  signIn: {
    width: width * 0.5,
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  signIn1: {
    width: width * 0.8,
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textSign: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#454545",
  },
  textSign1: {
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  danger: {
    color: "white",
    backgroundColor: "pink",
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  signIn1: {
    width: width * 0.8,
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#FFD700",
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
    borderBottomLeftRadius: width * 0.08,
    borderBottomRightRadius: width * 0.08,
    paddingHorizontal: height * 0.01,
    paddingVertical: height * 0.04,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
  },
  danger: {
    backgroundColor: "#E2A76F",
    color: "white",
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  material: {
    color: "#9370DB",
    paddingTop: width * 0.08,
    fontSize: width * 0.07,
  },
  FontAwesome: {
    fontSize: width * 0.07,
  },
});
