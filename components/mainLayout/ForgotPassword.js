import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import Config from "react-native-config";

export default function ForgotPassword({ navigation }) {
  const [Error, setError] = useState("");
  const [email, setEmail] = useState();

  const textInputChange = (val) => {
    setEmail(val);
  };
  const forgotPasswordHandle = (userData) => {
    axios
      .post(`${Config.API_URL}/api/users/forgotPassword`, userData)
      .then((res) => {
        navigation.navigate("SignInScreen");
        alert("Please check your email for password");
      })
      .catch((err) => {
        setError(err.response.data.email);
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
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          source={require("../images/nemo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.footer}>
      <Text style={styles.text_footer}>Email</Text>
      <View style={styles.action}>
        <FontAwesome name="user-o" color="#05375a" size={20} />
        <TextInput
          placeholder="Your Email"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
        />
      </View>
      <ERROR Error={Error} />
      <TouchableOpacity
        onPress={() => forgotPasswordHandle({ email })}
        style={[
          styles.signIn,
          { borderColor: "#009387", borderWidth: 1, marginTop: 15 },
        ]}
      >
        <Text style={[styles.textSign, { color: "#009387" }]}>Submit</Text>
      </TouchableOpacity>
      </View>
     
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
    paddingBottom: 50,
  },
  footer: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
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
    backgroundColor: "pink",
    color: "white",
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
