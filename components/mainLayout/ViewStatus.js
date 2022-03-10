import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import Config from "react-native-config";

export default function ViewStatus() {
  const [earned, setEarned] = useState([]);
    
  useEffect(() => {
    axios
      .get(`${Config.API_URL}/api/kids/earned`)
      .then((res) => setEarned(res.data))
      .catch((err) => console.log(err));
    console.log(earned);
  }, []);
 
  return (
    <View>
      <FlatList
          data={earned}
          keyExtractor= {(item) => item.key}
          renderItem={({item})=> (
            <Text>{item.value.name} has earned {item.value.money}</Text>
      )}
        />
      </View>
  );
}
