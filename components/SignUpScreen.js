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
  Dimensions
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
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
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
        <Animatable.Image animation="bounceIn" source={require('./images/nemo.png')} style={styles.logo} resizeMode='stretch' />
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
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
        </View>
        <ERROR Error={Error} />
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              registerUser(Data);
            }}
          >
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={(styles.signIn, { color: "#fff" })}
            >
              <Text style={styles.textSign}>Sign up</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Sign In")}
            style={[
              styles.signIn,
              { borderColor: "#009387", borderWidth: 1, marginTop: 10 },
            ]}
          >
            <Text style={[styles.textSign, { color: "#009387" }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
const {height} = Dimensions.get('screen');
const height_logo = height * 0.07;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 11,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 3,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  danger: {
    color: "white",
    backgroundColor: "pink",
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
