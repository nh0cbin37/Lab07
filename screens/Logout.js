import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const Logout = ({navigation}) => {
    const handleSignOut = async () => {
        try {
          // Đăng xuất khỏi Firebase
          await auth().signOut();
    
          // Nếu bạn sử dụng Google Sign-In, đăng xuất khỏi Google Sign-In
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
    
          // Thực hiện các công việc khác sau khi đăng xuất (nếu cần)
          console.log('Đã đăng xuất thành công');
          navigation.navigate('Signin');
        } catch (error) {
            console.log(error)
            navigation.navigate('Signin');
        }
      };
  return (
    <View style={{flex:1}}>
        <TouchableOpacity onPress={handleSignOut} style={{borderRadius:8,marginTop:5,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',width:'100%',height:'7%',borderWidth:1}}>
            <Icon name="exit-to-app" size={24} />
            <Text style={{fontWeight:'bold',fontSize:20}}>Đăng xuất</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Logout