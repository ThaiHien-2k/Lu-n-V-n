import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, View, DrawerLayoutAndroidBase } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import db from '../../Database/';

export default function SingUp({ navigation }) {

    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erorSingUp, setErrorSingUp] = useState(false)
    const [cfPass, setCfPass] = useState('');
    async function singUp() {
        if(password===cfPass){
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
     
            .then((value) => {
                // Signed in 
                const user = value.user;
                if (user) {
                    navigation.navigate('myTabs', { userID: user.uid })
                  } else { console.log('error'); }
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
                setErrorSingUp(true)
            });
    }
    else  setErrorSingUp(true);
}

    useEffect(() => {
    }, [])

    return (
        <KeyboardAvoidingView style={styles.container}
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
            <TouchableWithoutFeedback>

                <SafeAreaView style={styles.container}>
                    <StatusBar style="light" />

                    <Text style={styles.textMain}>Đăng ký</Text>
                 

                    <TextInput style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#90D700"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='email-address'
                        value={email}
                        variant="outlined" label="Label"
                        onChangeText={(text) => setEmail(text)}
                    />

                    <TextInput style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#90D700"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        variant="outlined" label="Label"
                        keyboardType='numeric'
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />

                    <TextInput style={styles.TextInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#90D700"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={cfPass}
                        variant="outlined" label="Label"
                        keyboardType='numeric'
                        secureTextEntry
                        onChangeText={(t) => setCfPass(t)}
                    />  

                    {erorSingUp === true
                        ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons
                                name="info"
                                size={25}
                                color="#dbdbdb"
                            />
                            <Text style={styles.info}>
                                Email không tồn tại
                            </Text>
                        </View>
                        : <View></View>}

                    <TouchableOpacity style={styles.buttonSingUp} onPress={singUp}>
                        <Text style={styles.textSingUp}>Đăng ký</Text>
                    </TouchableOpacity>


                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B0B0B',
    },
    TextInput: {
        margin: 10,
        fontSize: 18,
        width: 300,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#232323',
        padding: 10,
        color: '#90D700',
    },
    buttonSingUp: {
        width: 300,
        height: 50,
        borderRadius: 5,
        margin: 5,
        backgroundColor: '#90D700',
    },
    textSingUp: {
        color: '#232323',
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
    },
    info: {
        color: '#dbdbdb',
        fontSize: 18,
    },
    textMain: {
        color: '#90D700',
        fontSize: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 30,
    },
});
