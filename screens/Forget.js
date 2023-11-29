import React, { useState } from 'react'
import {  Avatar,Text,TextInput,HelperText } from 'react-native-paper'
import { StyleSheet, View,TouchableHighlight,ImageBackground,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import auth from '@react-native-firebase/auth'
export default ResetPassword = ({navigation}) => {
    imageBackground = { uri: 'https://legacy.reactjs.org/logo-og.png' }
    const [Email,setEmail] = useState('')


    const hasErrors = () => {
        return !Email.includes('@') && Email ;
        
    }    
const sendRePassword = async (email) =>
{
    if(Email.includes('@')){
    try{
        await auth().sendPasswordResetEmail(email);
        Alert.alert("Kiểm tra Email để thay đổi mật khẩu")
        console.log("Done send mail reset password")
    }catch(e)
    {
        Alert.alert("Email không đúng")
    }}else {
        Alert.alert("Email không đúng")
    }
}
  return (
    <View style={styles.container}>
        <ImageBackground source={imageBackground} resizeMode="cover" style={styles.image}>
            <View style={{bottom:'30%',paddingLeft:'2%',paddingRight:'2%'}}>
                <Text style={styles.title}>Đặt lại mật khẩu?</Text>
                <TextInput value={Email} placeholder='Nhập Email của bạn' onChangeText={setEmail} style={{height:60}}></TextInput>
                <HelperText type="error" visible={hasErrors()}>
                    Email chưa đúng định dạng
                </HelperText> 
                <TouchableHighlight style={styles.containerBtnSend} onPress={() => sendRePassword(Email)}>
                    <View style={styles.containerBtnVItem}>
                    <Text style={styles.titleBtnSend}>Gửi mã đặt lại mật khẩu</Text>
                    </View>
                </TouchableHighlight>
                <Text style={{ color: "white", alignSelf: "center", fontWeight:'bold',fontStyle: "italic",fontSize:16, top:'5%' }} onPress={() => navigation.navigate('Signin')} >Quay lại đăng nhập</Text>      
            </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#000000c0',
        
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white'
    },
    titleBtnSend:{
       paddingLeft:'2%' ,
       fontWeight:'bold',
       fontSize:20,
       color:'black'
    },
    containerBtnSend:{
        alignSelf:'center',
        backgroundColor:'aqua',
        top:'2%',
        borderRadius:40
    },
    containerBtnVItem:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:'5%'

    },
    image: {
        flex: 1,
        justifyContent: 'center',
      },
})

