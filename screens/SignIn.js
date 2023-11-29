import { TextInput, Button } from 'react-native-paper';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableHighlight, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import auth from '@react-native-firebase/auth'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

export let emailUser = ""
const Login = ({ navigation }) => {
    imageBackground = { uri: 'https://legacy.reactjs.org/logo-og.png' }
    imageOnFront = { uri: 'https://techvccloud.mediacdn.vn/2020/7/13/137-1594616701190893786687-crop-15946167118531494150206.png' }
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [isLoad, setIsLoad] = useState(false)
    const [setSecurity, IsSetcurity] = useState(true)
    const handleShowToast = () => {
        ToastAndroid.showWithGravityAndOffset(
          'Đăng nhập thành công.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      };
    const signInWithEmailAndPassword = async (email, password) => {
        if (Email.includes('@') && Password.length > 0) {
            try {
                await auth().signInWithEmailAndPassword(email, password);
                navigation.navigate('HomeScreen')
                emailUser = email
                handleShowToast();
            } catch (error) {
                Alert.alert("Email hoặc mật khẩu không đúng")
            }
        } else {
            Alert.alert("Email hoặc mật khẩu không đúng")
        }
    };
    GoogleSignin.configure({
        webClientId: '120712118691-am2qt37ava7qnrhs2qijgn2i2eke6n66.apps.googleusercontent.com',
    });
    const USERS = firestore().collection("USERS");
    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            try {

                await auth().signInWithCredential(googleCredential)
                .then(()=>
                USERS.doc(auth().currentUser.email)
                    .onSnapshot(u => {
                        if (!u.exists) {
                            const user = {
                                Email: auth().currentUser.email,
                                Role: "Customers"
                            }
                            USERS.doc(auth().currentUser.email).set(user)
                                .then(() => handleShowToast())
                            navigation.navigate("HomeScreen")
                            emailUser = auth().currentUser.email
                            console.log('DangNhap thanh cong');
                        }else {
                            navigation.navigate("HomeScreen")
                            handleShowToast();
                            emailUser = auth().currentUser.email 
                            console.log(auth().currentUser.email);
                        }
                    }))

            }
            catch (e) { console.log(e) }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log("1 " + statusCodes.SIGN_IN_CANCELLED)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log("2 " + statusCodes.IN_PROGRESS)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log("3 " + statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
            } else {
                // some other error happened
                console.log("4 " + error.message)
            }
        }
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={imageBackground} resizeMode="cover" style={styles.image}>
                <View style={styles.containerTilte}>
                    <Image source={imageOnFront} resizeMode="center" style={styles.imageOnFront} />
                    <Text style={styles.text}>Đặng Nhập</Text>
                    <TextInput
                        style={styles.textInput}
                        lable="Email"
                        value={Email}
                        placeholder="Email"

                        underlineColorAndroid="transparent"
                        onChangeText={text => setEmail(text)}></TextInput>
                    <TextInput
                        style={styles.textInput}
                        lable="Mật khẩu"
                        value={Password}
                        placeholder="Password"
                        mode='outlined'
                        secureTextEntry={setSecurity}
                        right={
                            <TextInput.Icon
                                name="eye-settings"
                                onPress={() => {
                                    IsSetcurity(!setSecurity);
                                }}
                            />}
                        underlineColorAndroid="transparent"
                        onChangeText={text => setPassword(text)}>
                    </TextInput>
                    <Text style={{ color: "white", alignSelf: "flex-end", paddingRight: 60, fontStyle: "italic", fontSize: 15 }} onPress={() => navigation.navigate('Signup')} >Đăng kí ngay</Text>
                    <Text style={{ color: "white", alignSelf: "flex-start", paddingLeft: 60, bottom: 18, fontStyle: "italic", fontSize: 15 }} onPress={() => navigation.navigate('Forget')} >Quên mật khẩu?</Text>
                    <Button
                        style={{ backgroundColor: 'aqua' }}
                        icon="login"
                        mode="contained-tonal"
                        onPress={() => { signInWithEmailAndPassword(Email, Password) }}>Đăng nhập</Button>
                    <TouchableOpacity style={{ width: 40, height: 40, top: 10 }} onPress={
                        onGoogleButtonPress
                    }>
                        <Image style={{ width: 40, height: 40, top: 10 }} source={require('../assets/google.png')} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    text:
    {

        color: '#fff',
        fontSize: 42,

    },
    imageOnFront:
    {
        width: 500,
        height: 200,
    },
    containerTilte: {
        flexDirection: "column",
        backgroundColor: '#000000c0',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textInput:
    {

        height: 40,
        width: 300,
        borderWidth: 1
    }
});


export default Login 