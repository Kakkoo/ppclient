import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FixedBottom from "./FixedBottom";
import * as Animatable from 'react-native-animatable';

export default function Main({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#158FAD" barStyle="light-content" />
      <View style={styles.header}>
      <Animatable.Image animation="bounceIn" source={require('./images/nemo.png')} style={styles.logo} resizeMode='stretch' />
      </View>

      <View style={styles.footer}>
        <View style={styles.upper}>
        <View style={styles.btn}>
        <LinearGradient style={styles.Lbtn} colors={["#E8A317", "#E1D9D1"]}>
          <TouchableOpacity
            style={styles.Tbtn}
            onPress={() => navigation.navigate("Add or Remove a Kid name")}
          >
            <LinearGradient style={styles.Lbtn1} colors={["#158FAD", "#43C6DB"]}>
              <Text>Add or remove kid name...</Text>
            </LinearGradient>
          </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.btn}>
        <LinearGradient style={styles.Lbtn} colors={["#E8A317", "#E1D9D1"]}>
          <TouchableOpacity onPress={() => navigation.navigate("Assign work to a kid")}>
            <LinearGradient style={styles.Lbtn1} colors={["#158FAD", "#43C6DB"]}>
              <Text>Assign work to kid...</Text>
            </LinearGradient>
          </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.btn}>
        <LinearGradient style={styles.Lbtn} colors={["#E8A317", "#E1D9D1"]}>
          <TouchableOpacity onPress={() => navigation.navigate("View Status of earned money and assigned work")}>
            <LinearGradient style={styles.Lbtn1} colors={["#158FAD", "#43C6DB"]}>
              <Text>View Status of work...</Text>
            </LinearGradient>
          </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.btn}>
        <LinearGradient style={styles.Lbtn} colors={["#E8A317", "#E1D9D1"]}>
          <TouchableOpacity onPress={() => navigation.navigate("History of completed works")}>
            <LinearGradient style={styles.Lbtn1} colors={["#158FAD", "#43C6DB"]}>
              <Text style="styles.textsign">History</Text>
            </LinearGradient>
          </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.btn}>
        <LinearGradient style={styles.Lbtn} colors={["#E8A317", "#E1D9D1"]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Change Password")}
          >
            <LinearGradient style={styles.Lbtn1} colors={["#158FAD", "#43C6DB"]}>
              <Text>ChangePassword</Text>
            </LinearGradient>
          </TouchableOpacity>
          </LinearGradient>
        </View>
        
        </View>
      </View>
      <View>
          <FixedBottom>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignInScreen")}
            >
              <LinearGradient style={styles.fixed} colors={["#E8A317", "#E1D9D1"]}>
                <Text >Sign out!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </FixedBottom>
        </View>
    </View>
  );
}
const {height} = Dimensions.get('screen');
const height_logo = height * 0.07;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#158FAD",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  footer: {
    flex: 5,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
    
  },
  btn: {
    marginTop: 20,
    width: 300,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  Tbtn: {
    padding: 0,
   
  },
  Lbtn: {
    padding: 3,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
   width: 300,
  },
  Lbtn1: {
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
   width: 294
  },
  upper: {
    alignItems: 'center'
  },
  fixed: {
    padding: 5,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20, 
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
