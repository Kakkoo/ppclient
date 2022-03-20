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
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export default function SignInScreen({ navigation }) {
  const [Error, setError] = useState("");
  const [ErrorPassword, setErrorPassword] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const loginHandle = (userData) => {
    axios
      .post(`${Config.API_URL}/api/users/login`, userData)
      .then((res) => {
        const { token } = res.data;
        AsyncStorage.setItem("userToken", token);

        navigation.navigate("Main");
        setAuthToken(token);
        //decode token
        const decoded = jwt_decode(token);
        AsyncStorage.setItem("payload", decoded);
      })
      .catch((err) => {
        if (err) {
          if (err.response.data.email) {
            setError(err.response.data.email);
          } else if (err.response.data.password) {
            setErrorPassword(err.response.data.password);
          }
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
  const ERRORPASSWORD = ({ ErrorPassword }) => {
    let content;
    if (ErrorPassword) {
      content = <Text style={styles.danger}>{ErrorPassword}</Text>;
    } else {
      content = <Text></Text>;
    }
    return content;
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#158FAD" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
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
            onChangeText={(val) => textInputChange(val)}
          />

          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <View>
          <ERROR Error={Error} />
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <ERRORPASSWORD ErrorPassword={ErrorPassword} />
        </View>
        <View style={styles.button1}>
          <TouchableOpacity
            onPress={() => {
              loginHandle(data);
            }}
          >
            <LinearGradient
              colors={["#158FAD", "#43C6DB"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity
            onPress={() => navigation.navigate("Forgot password")}
            style={[
              styles.signIn1,
              { marginTop: 30 },
            ]}
          >
            <LinearGradient
              colors={["#E8A317", "#E1D9D1"]}
              style={styles.signIn1}
            >
            <Text style={styles.textSign1}>
              Forgot password
            </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Sign Up")}
            style={[
              styles.signIn1,
              { marginTop: 15 },
            ]}
          >
             <LinearGradient
              colors={["#E8A317", "#E1D9D1"]}
              style={styles.signIn1}
            >
            <Text style={styles.textSign1}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* <FixedBottom>
          <Button title="Parent Portal" />
        </FixedBottom> */}
      </Animatable.View>
    </View>
  );
}
const {height} = Dimensions.get('screen');
const height_logo = height * 0.07;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#158FAD",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  button1: {
    alignItems: "center",
    marginTop: 0,
  },
  text_header: {
    color: "#F5F5F5",
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
    borderBottomColor: "#E9E4D4",
    paddingBottom: 3,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    //color: "#05375a",
    color: "#25383C",
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signIn: {
    padding: 8,
    width: 200,
    height: 40,
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  signIn1: {
    padding: 4,
    width: 350,
    height: 30,
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textSign1: {
    fontSize: 15,
    fontWeight: "bold",
  },
  danger: {
    backgroundColor: "#E2A76F",
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
