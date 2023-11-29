import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert,StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { nameservice } from './HomeScreen';
import { useAppState } from '../redux';
export let nameSer = ""
export const setnameser = value =>{
    nameSer=value
}
const Detail = ({ route,navigation }) => {
    const handleChangeTime = (timeData) => {
        const milliseconds = timeData.seconds * 1000 + Math.floor(timeData.nanoseconds / 1e6);

        // Tạo đối tượng Date từ milliseconds
        const date = new Date(milliseconds);
        return date
    }
    // const [services, setServices] = useState({
    //     name: "",
    //     price: "",
    //     date: "",
    //     update: "",
    //     creator: "",
    // });
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [date, setdate] = useState("")
    const [update, setupdate] = useState("")
    const [creator, setcreator] = useState("")
    const { state, dispatch } = useAppState();
    console.log(state.Creator)  
    // Inside the useEffect

    // const Service = firestore().collection("Service");
    // useEffect(() => {
    //     Service.doc(nameservice).onSnapshot(u => {
    //         if (u.exists) {
    //              setname(u.data().name),
    //                 setprice(u.data().price),
    //                 setdate(u.data().Date),
    //                 setupdate(u.data().update),
    //                 setcreator(u.data().Creator)
    //         }
    //     }
    //     )

    // }, [nameSer])
    // const handleUpdate = ()=>
    // {
    //     Service.doc(nameSer).update({
    //         name: nameService,
    //         price: priceService,
    //         Date: date,
    //         Creator: emailUser,
    //         update: date
    //     })
    // }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.navigate('Update')}>
            <Text style={styles.text}>Service name: <Text style={styles.textdata}>{`${state.name}`}</Text></Text>
            <Text style={styles.text}>Price: <Text style={styles.textdata} >{`${state.price}`}</Text></Text>
            <Text style={styles.text}>Creator: <Text style={styles.textdata}>{`${state.Creator}`}</Text></Text>
            <Text style={styles.text}>Time:  <Text style={styles.textdata}>{`${handleChangeTime(state.Date)}`}</Text></Text>
            <Text style={styles.text}>FinalUpdate: <Text style={styles.textdata}>{`${handleChangeTime(state.update)}`}</Text></Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:5
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'black'
    },
    textdata:{
        fontSize:15,
        color:'black'

    }
})
export default Detail