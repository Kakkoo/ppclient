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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
        //const decoded = jwt_decode(token);
        //AsyncStorage.setItem("payload", json.strigify(decoded) );
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
      <StatusBar backgroundColor="#9370DB" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerPart1}>
          <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <View style={styles.headerpart2}>
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
          {/* <Text style={styles.text_footer}>Email</Text> */}
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" style={styles.FontAwesome}  />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />

            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" style={styles.FontAwesome}  />
              </Animatable.View>
            ) : null}
          </View>
          <View>
            <ERROR Error={Error} />
          </View>

          {/* <Text
            style={[
              styles.text_footer,
              {
                marginTop: 11,
              },
            ]}
          >
            Password
          </Text> */}
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" style={styles.FontAwesome}  />
            <TextInput
              placeholder="Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={16} />
              ) : (
                <Feather name="eye" color="grey" style={styles.FontAwesome}  />
              )}
            </TouchableOpacity>
          </View>
          <View>
            <ERRORPASSWORD ErrorPassword={ErrorPassword} />
          </View>
        </View>
        <View style={styles.mid2}>
          <View style={styles.button1}>
            <TouchableOpacity
              onPress={() => {
                loginHandle(data);
              }}
            >
              <Text style={styles.textSign}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Forgot password")}
            style={[styles.signIn1, { marginTop: 30 }]}
          >
            <Text style={styles.textSign1}>Forgot password</Text>
            <MaterialIcons name="navigate-next" style={styles.material} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Sign Up")}
            style={[styles.signIn1, { marginTop: 10 }]}
          >
            <Text style={styles.textSign1}>Sign Up</Text>
            <MaterialIcons name="navigate-next" style={styles.material} />
          </TouchableOpacity>
        </View>
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
    paddingTop: 0
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
  headerpart2: {
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
justifyContent: 'center',
alignItems: "center",
margin: width*0.04,
marginLeft: 0,
padding: width*0.03
  },
  mid2: {
flex: 2,
backgroundColor: "#9370DB",
borderTopLeftRadius: width * 0.08,
borderTopRightRadius: width * 0.08,
borderBottomLeftRadius: width * 0.08,
borderBottomRightRadius: width * 0.08,
justifyContent: 'center',
alignItems: "center",
margin: width*0.13,
marginLeft: 0,
marginRight: 0
//margin: width*0.02
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
    paddingTop: 0
  },
  button1: {
    alignItems: "center",
    marginTop: 0,
  },
  text_header: {
    fontWeight: "bold",
    fontSize: width*0.09,
    color: "#000000",
  },
  action: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: width*0.001,
    borderBottomColor: "#E9E4D4",
    paddingBottom: width*0.01,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: width*0.03,
    color: "#05375a",
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
    fontSize: width*0.06,
    fontWeight: "bold",
    color: 'white'
  },
  textSign1: {
    fontSize: width*0.06,
    fontWeight: "bold",
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
    paddingTop: width*0.01,
    fontSize: width*0.07,
  },
  FontAwesome: {
    fontSize: width*0.07
  }
});
