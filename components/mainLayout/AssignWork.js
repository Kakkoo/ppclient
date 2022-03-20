import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import Config from "react-native-config";
import * as Animatable from "react-native-animatable";

export default function AssignWork() {
  const [kids, setKids] = useState("");
  const [response, setResponse] = useState("");
  const [data, setdata] = useState({
    name: "Select name",
    money: "",
    work: "Select work",
    check_textInputChange: true,
  });
  const moneyInputChange = (val) => {
    if (val.length !== 0) {
      setdata({
        ...data,
        money: val,
        check_textInputChange: true,
      });
    } else {
      setdata({
        ...data,
        money: val,
        check_textInputChange: false,
      });
    }
  };
  const AssignWork = (data) => {
    axios
      .post(`${Config.API_URL}/api/kids/assignwork`, data)
      .then((res) =>
        setResponse(
          `${res.data.name} is assigned to ${res.data.work} for $ ${res.data.money}`
        )
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${Config.API_URL}/api/kids/getkid`)
      .then((res) => setKids(res.data))
      .catch((err) => console.log(err));
  }, []);

  const KIDS = ({ kids }) => {
    let content;
    if (kids) {
      content = (
        <Picker
          selectedValue={data.name}
          onValueChange={(value, itemIndex) =>
            setdata({ ...data, name: value })
          }
        >
          <Picker.Item label="Select name" value="" />
          {kids.map((item, index) => (
            <Picker.Item label={item} value={item} />
          ))}
        </Picker>
      );
    } else {
      content = <Text>No Kids added yet</Text>;
    }
    return content;
  };

  const RESPONSE = ({ response }) => {
    let content;
    if (response) {
      content = <Text>{response}</Text>;
    } else {
      content = <Text>Work to be added...</Text>;
    }
    return content;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image animation="bounceIn" source={require('../images/nemo.png')} style={styles.logo} resizeMode='stretch' />
      </View>
      <View style={styles.footer}>
        <View>
          <KIDS kids={kids} />
        </View>
        <View>
          <Picker
            selectedValue={data.work}
            onValueChange={(value, itemIndex) =>
              setdata({ ...data, work: value })
            }
          >
            <Picker.Item label="Select Work" value="" />
            <Picker.Item label="Clean your room" value="Clean your room" />
            <Picker.Item label="Dishes" value="Dishes" />
            <Picker.Item
              label="Mow the front yard"
              value="Mow the front yard"
            />
            <Picker.Item label="Mow the back yard" value="Mow the back yard" />
          </Picker>
        </View>
        <View>
          <TextInput
            onChangeText={(val) => moneyInputChange(val)}
            placeholder="Enter amount in number only"
          />
        </View>
        <View>
          <RESPONSE response={response} />
        </View>
        <Button onPress={() => AssignWork(data)} title="assign work" />
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
    // justifyContent: "center",
    // alignItems: "center",
    // fontSize: 12,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 3,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
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
