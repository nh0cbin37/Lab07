import React, { useState, useEffect } from 'react'
import Home from './screens/Home';
import Signin from './screens/SignIn';
import Signup from './screens/SignUp';
import Forget from './screens/Forget';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import Transaction from './screens/Transaction';
import Customer from './screens/Customer';
import Setting from './screens/Setting';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddService from './screens/AddService';
import CustomeHeader from './components/CustomeHeader';
import Logout from './screens/Logout';
import Detail from './screens/Detail';
import Main from './screens/Main';
import UpdateService from './screens/updateService';


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabScreen = () => {
    return (
        <Tab.Navigator initialRouteName='Home'
            screenOptions={{
                tabBarShowLabel: false,
            }}
            barStyle={{
                backgroundColor: '#1E90FF',
            }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => (<Icon name="home" size={24} />) }} />
            <Tab.Screen name="Transaction" component={Transaction} options={{ tabBarIcon: () => (<Icon name="view-list" size={24} />) }} />
            <Tab.Screen name="Customer " component={Customer} options={{ tabBarIcon: () => (<Icon name="person" size={24} />) }} />
            <Tab.Screen name="Setting" component={Logout} options={{ tabBarIcon: () => (<Icon name="settings" size={24} />) }} />
        </Tab.Navigator>
    );
}

const App = ({navigation}) => {

    // useEffect(() => {
    //     initial();
    // }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Signin"
            screenOptions={{
                headerStyle: {
                  backgroundColor: '#1E90FF', // Đặt màu sắc cho header
                },}}
            >
                <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Forget" component={Forget} options={{ headerShown: false }} /> 
                {/* <Stack.Screen name="Home" component={TabScreen} /> */}
                <Stack.Screen name="HomeScreen" component={TabScreen} options={{ header: () => <CustomeHeader title={'Trang chủ'} />, }}/>
                <Stack.Screen name="AddSer" component={AddService} options={{headerTitle:'Thêm dịch vụ',headerTintColor:'white'}} />
                <Stack.Screen name="DeService" component={Detail} options={{ header: () => <CustomeHeader title={'Chi tiết dịch vụ'} />, }}/>
                <Stack.Screen name="MainApp" component={Main} options={{headerTitle:'Trang chủ',headerTintColor:'white'}}/>
                <Stack.Screen name="Update" component={UpdateService} options={{headerTitle:'Sửa dịch vụ',headerTintColor:'white'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

