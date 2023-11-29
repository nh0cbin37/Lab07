import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { StyleSheet, View, TextInput, Text, Alert, ToastAndroid } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { emailUser } from './SignIn';
import { nameSer, setnameser } from './Detail';
import { setnameserHome } from './HomeScreen';
import { useAppState } from '../redux';

const UpdateService = ({ navigation }) => {
    const Service = firestore().collection("Service");
    const { state, dispatch } = useAppState();
    const [nameService, setnameService] = useState("")
    const [priceService, setpriceService] = useState("")
    useEffect(() => {
        setnameService(state.name)
        setpriceService(state.price)
    }, [])

    const handleShowToast = () => {
        ToastAndroid.showWithGravityAndOffset(
          'Sửa thành công',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      };
    let date = new Date();
    const handleUpdate = () => {
        Service.doc(state.ID+"").update({
            name: nameService,
            price: priceService,
            Creator: emailUser,
            date:state.Date,
            update: date
        }).then(() => {
            handleShowToast
           const item = ({
            name:nameService,
            price:priceService,
            update:date
           })
           dispatch({type:"UPDATE_DATA",payload:item})
            console.log('Item updated successfully');
            navigation.goBack()
        })
            .catch((error) => {
                console.error('Error updating item: ', error);
            });
    }
    return (
        <View style={{ justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'black' }}>Thêm dịch vụ</Text>
            <TextInput style={styles.textInput} value={nameService} onChangeText={setnameService} placeholder='Nhập tên dịch vụ' />
            <TextInput style={styles.textInput} value={priceService} onChangeText={setpriceService} placeholder='Nhập giá' />
            <Button disabled={nameService.length > 0 && priceService.length > 0 ? false : true} style={{ backgroundColor: 'aqua', width: 100, height: 50, borderRadius: 8, alignSelf: 'center', marginTop: 15 }} onPress={handleUpdate}>Xác nhận</Button>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10

    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5
    }
})
export default UpdateService