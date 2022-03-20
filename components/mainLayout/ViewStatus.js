import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Config from "react-native-config";
import useDeepCompareEffect from "use-deep-compare-effect";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";

export default function ViewStatus() {
  const [earned, setEarned] = useState([]);
  const [assignedwork, setassignedwork] = useState([]);
  const [indicator, setIndicator] = useState(true);

  useDeepCompareEffect(() => {
    axios
      .get(`${Config.API_URL}/api/kids/earned`)
      .then((res) => setEarned(res.data))
      .catch((err) => console.log(err));
  }, [earned, indicator]);
  useDeepCompareEffect(() => {
    axios
      .get(`${Config.API_URL}/api/kids/assignedwork`)
      .then((res) => setassignedwork(res.data))
      .catch((err) => console.log(err));
  }, [assignedwork, indicator]);
  const workDone = (data) => {
    axios
      .post(`${Config.API_URL}/api/kids/assignedtodone`, data)
      .then(setIndicator(() => !indicator))
      .then(alert("complete successfully"))
      .catch((err) => console.log(err));
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
        <FlatList
          data={earned}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Text style={styles.content}>
              {item.value.name} has earned {item.value.money}
            </Text>
          )}
        />
        <Text />
        <Text />
        <FlatList
          data={assignedwork}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.content}>
                {item.name} has work {item.work} for dollar {item.money}
              </Text>
              <View style={styles.button}>
              <TouchableOpacity
                onPress={() =>
                  workDone({
                    name: item.name,
                    work: item.work,
                    money: item.money,
                  })
                }
              >
                <LinearGradient
                  colors={["#158FAD", "#43C6DB"]}
                  style={styles.signIn}
                >
                  <Text style={styles.textSign}>Done</Text>
                </LinearGradient>
              </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
    flex: 2,
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
  title: {
    color: "#7E3817",
    fontSize: 30,
    fontWeight: "bold",
  },
  content: {
    margin: 6,
    backgroundColor: "#E5E4E2",
    padding: 4,
    paddingLeft: 7,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    color: "white",
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
