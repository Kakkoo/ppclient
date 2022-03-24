import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import Config from "react-native-config";
import LinearGradient from "react-native-linear-gradient";

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
        navigation.navigate("Sign In");
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
        <View style={styles.headerPart1}>
          <Text style={styles.text_header}>No problem</Text>
        </View>
        <View style={styles.headerPart2}>
          <Animatable.Image
            animation="bounceIn"
            source={require("../images/logo.png")}
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
              size={20}
            />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
          </View>
          <ERROR Error={Error} />
        </View>
        <View style={styles.mid2}>
          <TouchableOpacity onPress={() => forgotPasswordHandle({ email })}>
            <Text style={styles.textSign}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            loginHandle(data);
          }}
        >
          <Text style={[styles.textSign, {color: "#454545"}]}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const height_logo = height * 0.07;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: width * 0.036,
    paddingTop: 0,
  },
  header: {
    flex: 1,

    flexDirection: "row",
  },
  footer: {
    flex: 1,
    backgroundColor: "#FFD700",
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
    borderBottomLeftRadius: width * 0.08,
    borderBottomRightRadius: width * 0.08,
    //  margin: height * 0.03,
    paddingHorizontal: height * 0.01,
    paddingVertical: height * 0.04,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
  },
  text_header: {
    fontWeight: "bold",
    fontSize: width * 0.09,
    color: "#000000",
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
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: width * 0.001,
    borderBottomColor: "#E9E4D4",
    paddingBottom: width * 0.03,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: width * 0.03,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: width * 0.5,
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSign: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "white",
  },
  danger: {
    backgroundColor: "pink",
    color: "white",
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  material: {
    color: "#9370DB",
    paddingTop: width * 0.01,
    fontSize: width * 0.07,
  },
  FontAwesome: {
    fontSize: width * 0.07,
  },
});
