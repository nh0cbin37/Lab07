import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import { StyleSheet, View, TextInput, Text, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { emailUser } from './SignIn';
import { useAppState } from '../redux';

const AddService = ({ navigation }) => {
  const [nameService, setnameService] = useState("")
  const [priceService, setpriceService] = useState("")
  const { state, dispatch } = useAppState();

  let date = new Date();
  console.log(state.index)
  const handleExit = () => {
    Alert.alert(
      'Thông báo',
      'Đã thêm dịch vụ',
      [
        { text: 'Xác nhận', style: 'cancel' },
        {
          text: 'Trở lại',
          onPress: () => {
            navigation.goBack();
          },
        }
      ],
      { cancelable: true }
    )
  };
  const fetchData = async (value) => {
    try {
      const querySnapshot = await firestore()
        .collection('Service') // Thay 'your_collection_name' bằng tên của bảng dữ liệu của bạn
        .where('name', '==', value + "") // Lọc các documents có thuộc tính 'name' giống '1'
        .get();

      const matchingDocuments = querySnapshot.docs.map(doc => doc.data());
      matchingDocuments.length === 0 ? addDataToFirestore() :
        Alert.alert(
          'Thông báo',
          'Dịch vụ đã có ',
          [
            { text: 'Xác nhận', style: 'cancel' }
          ],
          { cancelable: false }
        )

    } catch (error) {
      console.error('Lỗi khi truy vấn Firestore:', error);
    }
  };
  const addDataToFirestore = () => {
    const Service = firestore().collection("Service");
    const lastDocumentData = [];
    Service.doc(state.index + "").onSnapshot(u => {

      console.log(lastDocumentData)
      if (!u.exists) {
        firestore()
          .collection('Service')
          .doc(state.index + "") // Replace with your actual collection name
          .set({
            name: nameService,
            price: priceService,
            Date: date,
            Creator: emailUser,
            update: date
          })
          .then(() => {
            console.log('Data added!');
            dispatch({ type: "SET_INDEX", payload: state.index + 1 })
            Alert.alert(
              'Thông báo',
              'Đã thêm dịch vụ',
              [
                { text: 'Xác nhận', style: 'cancel' },
                {
                  text: 'Trở lại',
                  onPress: () => {
                    navigation.goBack();
                  },
                }
              ],
              { cancelable: false }
            )
            return;
          })
      }
    })
  };
  return (
    <View style={{ justifyContent: 'center', marginTop: 10 }}>
      <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'black' }}>Thêm dịch vụ</Text>
      <TextInput style={styles.textInput} value={nameService} onChangeText={setnameService} placeholder='Nhập tên dịch vụ' />
      <TextInput style={styles.textInput} value={priceService} onChangeText={setpriceService} placeholder='Nhập giá' />
      <Button disabled={nameService.length > 0 && priceService.length > 0 ? false : true} style={{ backgroundColor: 'aqua', width: 100, height: 50, borderRadius: 8, alignSelf: 'center', marginTop: 15 }} onPress={()=>fetchData(nameService)}>Xác nhận</Button>
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
export default AddService