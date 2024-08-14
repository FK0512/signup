import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View, Text, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import CustomButton from '../components/CustomButton'; // Assuming these components exist in your project
import IntroLabel from '../components/IntroLabel';
import Login from './screens/Login';
import OTPScreen from './screens/OTPScreen';

function Signup({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);

    async function handleSignup() {
        if (name && email && phoneNumber.length === 10 && password) {
            try {
                const number = `91${phoneNumber}`;
                const response = await axios.post('http://52.66.11.28/api/user/signup', {
                    name,
                    email,
                    phone: number,
                    password,
                });

                if (response.data.success) {
                    navigation.navigate('OTPScreen', { phoneNumber });
                } else {
                    Alert.alert('Error', 'Signup failed. Please try again.');
                }
            } catch (error) {
                Alert.alert('Error', 'An error occurred. Please try again.');
                console.error(error);
            }
        } else {
            setIsValid(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageBox}>
                <Image style={styles.img} source={require('../assets/signup.png')} resizeMode="contain" />
            </View>
            <View style={styles.label}>
                <IntroLabel
                    text1={'Create an Account'}
                    text2={'Please fill in the details below to create a new account.'}
                />
                <TextInput
                    placeholder="Name"
                    style={[styles.input, !isValid && !name ? { borderColor: '#EA0000' } : { borderColor: '#979797' }]}
                    value={name}
                    onChangeText={txt => {
                        setName(txt);
                        setIsValid(true);
                    }}
                />
                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    style={[styles.input, !isValid && !email ? { borderColor: '#EA0000' } : { borderColor: '#979797' }]}
                    value={email}
                    onChangeText={txt => {
                        setEmail(txt);
                        setIsValid(true);
                    }}
                />
                <TextInput
                    placeholder="Phone Number"
                    keyboardType="number-pad"
                    style={[styles.input, !isValid && phoneNumber.length !== 10 ? { borderColor: '#EA0000' } : { borderColor: '#979797' }]}
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={txt => {
                        setPhoneNumber(txt);
                        setIsValid(true);
                    }}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    style={[styles.input, !isValid && !password ? { borderColor: '#EA0000' } : { borderColor: '#979797' }]}
                    value={password}
                    onChangeText={txt => {
                        setPassword(txt);
                        setIsValid(true);
                    }}
                />
                {!isValid && <Text style={styles.errorText}>Please fill in all fields correctly.</Text>}
            </View>
            <CustomButton title={'Sign Up'} onPress={handleSignup} />
        </View>
    );
}

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="OTPScreen" component={OTPScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageBox: {
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 20
    },
    img: {
        width: 264,
        height: 274,
    },
    label: {
        flex: 0.5,
        paddingHorizontal: 20
    },
    input: {
        borderBottomWidth: 1.5,
        marginVertical: 10,
        borderColor: '#979797',
        padding: 5,
        fontSize: 16,
        color: 'black'
    },
    errorText: {
        fontSize: 12,
        color: '#EA0000',
        textAlign: 'center',
        marginTop: 10,
    },
});
