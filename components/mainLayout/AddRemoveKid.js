import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, TextInput} from "react-native";
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
  })
  const addnameInputChange = val => {
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
  const removenameInputChange = val => {
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
  const updateSecureTextEntry = () => {
    setdata({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmSecureTextEntry = () => {
    setdata({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  useEffect(() => {
    axios
       .get(`${Config.API_URL}/api/kids/getkid`)
     .then((res) => setKids(res.data))
      .catch((err) => console.log(err));
    console.log("kkkk" + kids);
  }, [data.indicator]);

  const Addname = (Data) => {
axios.post(`${Config.API_URL}/api/kids/registerkid`, Data)
.then(setdata({
  ...data,
  indicator: !data.indicator
}))
.then(alert("name added"))
.catch(err => console.log(err))
  }
  const Removename = (Data) => {
    axios.post(`${Config.API_URL}/api/kids/deletekid`, Data)
    .then(setdata({
      ...data,
      indicator: !data.indicator
    }))
    .then(console.log("removed"))
    .catch(err => console.log(err))
  }
  const KIDS = ({ kids }) => {
    let content;
    console.log("k" + kids);
    if (kids) {
      content = (
        <FlatList
          data={kids}
          keyExtractor={(index) => index}
          renderItem={({ item }) => <Text >{item}</Text>}
        />
      );
    } else {
      content = <Text>No Kids</Text>;
    }
    return content;
  };
  return (
    <View style={styles.container}>
      <KIDS kids={kids} />
      <TextInput placeholder="Enter a name" onChangeText={val => addnameInputChange(val)}/>
      <Button title='Add new kid' onPress={() => Addname(data)}/>
      <TextInput placeholder="Enter a name" onChangeText={val => removenameInputChange(val)}/>
      <Button title='Remove a kid' onPress={() => Removename(data)}/>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'pink',
    ustifyContent: 'center',
alignContent: 'center',
fontSize: 12,

  },
})