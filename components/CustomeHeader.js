

import React from 'react';
import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { nameSer } from '../screens/Detail';
import { Role } from '../screens/HomeScreen';
import { useAppState } from '../redux';
const CustomeHeader = ({title}) => {
  const { state, dispatch } = useAppState();
  const navigation = useNavigation();
  console.log(state.ID)

  const handleShowToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Xóa thành công',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  const Service = firestore().collection("Service");
  const handleDeleteService = () => {
    Service.doc(state.ID+"").delete().then(()=>(handleShowToast(),navigation.goBack()))
    .catch(E =>
      console.log(E))
  };
  const handleExit = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có chắc chán xóa không',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận',
          onPress: handleDeleteService
        }
      ],
      { cancelable: false }
    )
  };
  return (
    <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E90FF' }}>
      <View style={{ left: '10%', flex: 1 }}>
        {title==="Chi tiết dịch vụ"?
        <TouchableOpacity onPress={()=>  (navigation.goBack())}>
        <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        :null}
      </View>
      <View style={{ flex: 1, height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E90FF' }}>
        <Text style={{ justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>{title}</Text>
      </View>
      <View style={{ flex: 1, left: '150%' }}>
      {title==="Chi tiết dịch vụ" && Role==="admin"?
        <TouchableOpacity style={{}} onPress={handleExit} >
        <Icon name="dots-vertical" size={24} />
        </TouchableOpacity>:null}
      </View>
    </View>
  );
};

export default CustomeHeader;
