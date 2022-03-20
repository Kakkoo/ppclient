import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Dimensions, StyleSheet} from "react-native";
import Config from "react-native-config";
import * as Animatable from 'react-native-animatable';
export default function History() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    axios
      .get(`${Config.API_URL}/api/kids/completedWork`)
      .then((res) => setHistory(res.data))
      .catch((err) => console.log(err));
  }, []);

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
          data={history}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Text>
              {item.name} has earned dollar{item.money} for work {item.work} on{" "}
              {item.date}
            </Text>
          )}
        />
      </View>
    </View>
  );
}
const {height} = Dimensions.get('screen');
const height_logo = height * 0.07;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#158FAD", // teal
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
