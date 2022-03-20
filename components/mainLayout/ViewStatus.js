import axios from "axios";
import React, { useState } from "react";
import { View, Text, FlatList, Button, Dimensions, StyleSheet} from "react-native";
import Config from "react-native-config";
import useDeepCompareEffect from "use-deep-compare-effect";
import * as Animatable from "react-native-animatable";

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
            <Text>
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
              <Text>
                {item.name} has work {item.work} for dollar {item.money}
              </Text>
              <Button
                title="Done"
                onPress={() =>
                  workDone({
                    name: item.name,
                    work: item.work,
                    money: item.money,
                  })
                }
              />
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
});
