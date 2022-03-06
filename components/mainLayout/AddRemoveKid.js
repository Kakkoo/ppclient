import React, { useEffect, useState } from "react";
import { View, Text } from "react-native-animatable";
import axios from "axios";

export default function AddRemoveKid() {
  let kk = [];
  const [kids, setKids] = useState(kk);

  useEffect(() => {
      let data = 
    axios
      .get("http://10.0.2.2:7200/api/kids/getkid")
      .then(data => setKids(data))
      .catch((err) => console.log(err));
    console.log("kkkk" + kids);
  });
  const KIDS = (kids) => {
    let content;
    console.log("k" + kids);
    if (kids) {
      content = <Text>{kids}</Text>;
    } else {
      content = <Text>No Kids</Text>;
    }
    return content;
  };
  return (
    <View>
      <KIDS kids={kids} />
    </View>
  );
}
