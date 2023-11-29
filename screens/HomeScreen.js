import { sizeHeight } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { FlatList, Alert, Image, ImageBackground, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, View, TouchableHighlight } from 'react-native'
import { Button, Provider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { emailUser } from './SignIn';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MyContextControllerProvider, useAppState, useMyContextController } from '../redux';
export let Role = ""
export let Id = ""
const HomeScreen = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    const [isVisible, setisVisible] = useState(0)
    const { state, dispatch } = useAppState();
    console.log(state.index)
    const fetchData = async (value) => {
        try {
            const querySnapshot = await firestore()
                .collection('Service') // Thay 'your_collection_name' bằng tên của bảng dữ liệu của bạn
                .where('name', '==', value+"") // Lọc các documents có thuộc tính 'name' giống '1'
                .get();

            const matchingDocuments = querySnapshot.docs.map(doc => doc.data());
            const ID = querySnapshot.docs.map(doc => doc.id);
            console.log("ID "+ID)
            const item = ({
                ID:ID,
                Creator:matchingDocuments[0].Creator,
                Date:matchingDocuments[0].Date,
                name:matchingDocuments[0].name,
                price:matchingDocuments[0].price,
                update:matchingDocuments[0].update
            })
            dispatch({type:"SET_DATA",payload:item})
            console.log(state.Creator)
        } catch (error) {
            console.error('Lỗi khi truy vấn Firestore:', error);
        }
    };
    const USERS = firestore().collection("USERS");
    useEffect(() => {
        USERS.doc(emailUser).onSnapshot(u => {
            // console.log(u.data())
            Role = u.data().Role;
            if (u.data().Role === "Customers")
                setisVisible(1)
        })
        const subscriber = firestore()
            .collection('Service')
            .onSnapshot(querySnapshot => {
                const items = [];
                querySnapshot.forEach(documentSnapshot => {
                    // console.log(documentSnapshot.data())
                    items.push({
                        id: documentSnapshot.id,
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setData(items)
            });
        return () => subscriber();
    }, []);
    const imageOnFront = { uri: 'https://techvccloud.mediacdn.vn/2020/7/13/137-1594616701190893786687-crop-15946167118531494150206.png' }
    return (
        <SafeAreaProvider style={{ flex: 1, marginBottom: 5 }}>
            <ScrollView style={{ felx: 1 }} >
                <View style={{ flex: 1, alignItems: 'center', top: '5%' }}>
                    <Image style={{ width: 200, height: 100 }} source={require('../assets/137-1594616701190893786687-crop-15946167118531494150206.webp')} />
                    {isVisible === 0 ?
                        <View style={{ flexDirection: 'row',top:'5%' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>Danh sách các dịch vụ</Text>
                           <TouchableOpacity onPress={()=> navigation.navigate('AddSer')} style={{ marginLeft: '30%', width: 60, height: 60,top:'2%' }}>
                            <Icon name={"plus-circle-outline"} size={24} color={"red"}/>
                           </TouchableOpacity>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', marginBottom: 25, alignSelf: 'flex-start', left: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', top: '2%', left: '1%' }}>Danh sách các dịch vụ</Text>
                        </View>
                    }
                    <View style={{ ...styles.viewContainer, flexDirection: 'column', width: '100%', marginBottom: 30, top: -30 }}>

                        <FlatList
                            scrollEnabled={false}
                            data={data}
                            renderItem={({ item }) =>
                                <TouchableOpacity key={item.index} style={styles.Touchable} onPress={() => { fetchData(item.name), navigation.navigate('DeService') }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ ...styles.text, fontWeight: 'bold' }}>{item.name}</Text>
                                        <Text style={{ ...styles.text, marginLeft: 30 }}>{item.price}</Text>
                                    </View>
                                </TouchableOpacity>}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        marginRight: 50,
        color: 'black'
    },
    viewContainer: {
        padding: 10,
        margin: 5,
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5
    },
    Touchable: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        height: 60,
        justifyContent: 'center'
    }
})
export default HomeScreen