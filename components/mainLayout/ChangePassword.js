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

export default function ChangePassword({ navigation }) {
  const [Error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
    newPassword: "",
  });

  const textemailInputChange = (val) => {
    setData({ ...data, email: val });
  };
  const textpasswordInputChange = (val) => {
    setData({ ...data, password: val });
  };
  const textnewpasswordInputChange = (val) => {
    setData({ ...data, newPassword: val });
  };

  const changePasswordHandle = (userData) => {
    axios
      .post(`${Config.API_URL}/api/users/changePassword`, userData)
      .then(() => {
        navigation.navigate("SignInScreen");
        alert("Please check your email for new Password");
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
        {/* <Text style={styles.text_footer}>Email</Text> */}
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textemailInputChange(val)}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Old Password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textpasswordInputChange(val)}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="New Password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textnewpasswordInputChange(val)}
          />
        </View>

        <View>
          <ERROR Error={Error} />
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() =>
              changePasswordHandle({
                email: data.email,
                password: data.password,
                newPassword: data.newPassword,
              })
            }
          >
            <LinearGradient
              colors={["#158FAD", "#43C6DB"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const { height } = Dimensions.get("screen");
const height_logo = height * 0.07;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#158FAD",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 3,
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
    justifyContent: 'center',
   alignItems: 'center',
    marginTop: 0,
    padding: 30
  },
  signIn: {
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    margin: 10
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
