import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Config from "react-native-config";
import axios from "axios";

export default function AddRemoveKid() {
  const [kids, setKids] = useState("");
  const [data, setdata] = useState({
    name: "",
    removename: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    indicator: true,
  });
  const addnameInputChange = (val) => {
    if (val.length !== 0) {
      setdata({
        ...data,
        name: val,
        check_textInputChange: true,
      });
    } else {
      setdata({
        ...data,
        name: val,
        check_textInputChange: false,
      });
    }
  };
  const removenameInputChange = (val) => {
    if (val.length !== 0) {
      setdata({
        ...data,
        removename: val,
        check_textInputChange: true,
      });
    } else {
      setdata({
        ...data,
        removename: val,
        check_textInputChange: false,
      });
    }
  };
  useEffect(() => {
    axios
      .get(`${Config.API_URL}/api/kids/getkid`)
      .then((res) => setKids(res.data))
      .catch((err) => console.log(err));
  }, [data.indicator]);

  const Addname = (Data) => {
    axios
      .post(`${Config.API_URL}/api/kids/registerkid`, Data)
      .then(
        setdata({
          ...data,
          indicator: !data.indicator,
        })
      )
      .then(alert("name added"))
      .catch((err) => console.log(err));
  };
  const Removename = (Data) => {
    axios
      .post(`${Config.API_URL}/api/kids/deletekid`, Data)
      .then(
        setdata({
          ...data,
          indicator: !data.indicator,
        })
      )
      .then(console.log("removed"))
      .catch((err) => console.log(err));
  };
  const KIDS = ({ kids }) => {
    let content;
    if (kids) {
      content = (
        <FlatList
          data={kids}
          keyExtractor={(index) => index}
          renderItem={({ item }) => <Text style={styles.kid}>{item}</Text>}
        />
      );
    } else {
      content = <Text>No Kids</Text>;
    }
    return content;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Animatable.Image animation="bounceIn" source={require('../images/nemo.png')} style={styles.logo} resizeMode='stretch' />
      </View>
      <View style={styles.footer}>
        <KIDS kids={kids} />
        <View style={styles.text1}>
          <TextInput
            placeholder="Enter a name to add"
            onChangeText={(val) => addnameInputChange(val)}
          />
        </View>
        {/* <Button title="Add new kid" onPress={() => Addname(data)} /> */}
        <View style={styles.button1}>
          <TouchableOpacity
            onPress={() => {
              Addname(data);
            }}
          >
            <LinearGradient
              colors={["#158FAD", "#43C6DB"]}
              style={styles.signIn}
            >
              <View style={styles.text1}>
                <Text style={styles.textSign}>Add</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.text1}>
        <TextInput
          placeholder="Enter a name to remove"
          onChangeText={(val) => removenameInputChange(val)}
        />
</View>
        {/* <Button title="Remove a kid" onPress={() => Removename(data)} /> */}
        <View style={styles.button1}>
          <TouchableOpacity
            onPress={() => {
              Removename(data);
            }}
          >
            <LinearGradient
              colors={["#158FAD", "#43C6DB"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Remove</Text>
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
    justifyContent: "center",
    alignContent: "center",
    fontSize: 12,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
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
  signIn: {
    padding: 8,
    width: 200,
    height: 40,
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  kid: {
    backgroundColor: "#E1D9D1",
    margin: 5,
    padding: 3,
    paddingLeft: 5,
    marginLeft: 10,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    color: "#806517",
  },
  text1: {
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
