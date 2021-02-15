import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    PermissionsAndroid,
    Platform,
    ToastAndroid
} from 'react-native';
import styles from './style';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class Laporan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            kejadian: "",
            alamat: "",
            keterangan: ""
        }
    }

    registerLaporan = () => {
        console.log('test laporan')
        auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.kejadian)
            .then((response) => {
                console.log('laporan created');
                console.log("Response" + response)


                firestore()
                    .collection('users')
                    .doc(this.state.kejadian)
                    .set({
                        name: this.state.name,
                        kejadian: this.state.kejadian,
                        alamat: this.state.alamat
                    })
                    .then(() => {
                        this.props.navigation.navigate("Dashboard")
                        console.log('laporan added!');
                    }).catch((error) => {
                        Alert.alert("gagal nyimpen", JSON.stringify(error))
                    });

            })

    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Laporan</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(name) => this.setState({ name: name })}

                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='email'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(email) => this.setState({ email: email })}

                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Kejadian'
                        onChangeText={(kejadian) => this.setState({ kejadian: kejadian })}

                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Alamat'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(alamat) => this.setState({ alamat: alamat })}

                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Keterangan</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Keterangan'
                        onChangeText={(keterangan) => this.setState({ keterangan: keterangan })}

                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.registerLaporan}>
                        <Text style={styles.buttonTitle}>Laporkan</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

export default Laporan;