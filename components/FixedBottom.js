import React from 'react';
import { View, text, StyleSheet} from 'react-native';

export default function FixedBottom({children}) {
  return (
   <View style = {styles.container}>
       {children && React.cloneElement(children, {style: styles.btn})}
   </View>
  )
}
const styles = StyleSheet.create({
 container: {
    // backgroundColor: '#009387',
     position: 'absolute',
     bottom: 0,
     left: 0,
     right: 0,
     padding: 10,
     height: 50,
 },
 btn: {
     height: '100%',
     justifyContent: 'center',
 }
})