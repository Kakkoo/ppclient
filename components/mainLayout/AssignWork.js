import axios from 'axios';
import React , {useState, useEffect} from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { Picker } from '@react-native-community/picker';
import Config from 'react-native-config';

export default function AssignWork() {
  const [kids, setKids] = useState("");
  const [response, setResponse] = useState("");
const [data, setdata] = useState({
  name: 'Select name',
  money: '',
  work: 'Select work',
  check_textInputChange: true,
})
const moneyInputChange = val => {
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
  if(data.name !== "Select name" && data.work !== "Select work" && data.money){
    axios.post(`${Config.API_URL}/api/kids/assignwork`,data)
    .then((res) => setResponse(`${res.data.name} is assigned to ${res.data.work} for $ ${res.data.money}`))
    .catch((err) => console.log(err))
    }
  }

useEffect(() => {
  axios
     .get(`${Config.API_URL}/api/kids/getkid`)
   .then((res) => setKids(res.data))
    .catch((err) => console.log(err));
  console.log("kkkk" + kids);
}, []);

const KIDS = ({ kids }) => {
  let content;
  console.log("k" + kids);
  if (kids) {
    content = (
<Picker selectedValue={data.name} onValueChange={(value,itemIndex) => setdata({ ...data, name: value})}>
  <Picker.Item label='Select name' value=""/>
{kids.map((item, index) => (
  <Picker.Item label={item} value={item} />
)
)}
  </Picker> 
    );
  } else {
    content = <Text>No Kids added yet</Text>;
  }
  return content;
};

const RESPONSE = ({response}) =>{
  let content;
if(response){
  content = <Text>{response}</Text>
}else{
  content = <Text>Work to be added...</Text>
}
return content;
}
  return (
    <View><Text>Assign Work</Text>
    <KIDS kids={kids} />
    <Picker
        selectedValue={data.work}
        onValueChange={(value, itemIndex) => setdata({ ...data, work: value})}
      >
        <Picker.Item label="Select Work" value="" />
        <Picker.Item label="Clean your room" value="Clean your room" />
        <Picker.Item label="Dishes" value="Dishes" />
        <Picker.Item label="Mow the front yard" value="Mow the front yard" />
        <Picker.Item label="Mow the back yard" value="Mow the back yard" />
      </Picker>
    <TextInput onChangeText={val => moneyInputChange(val)} placeholder="Enter amount in number only"/>
    <RESPONSE response={response}/>
    
    <Button onPress= {AssignWork(data)} title="assign work" />
    </View>
  )
}
