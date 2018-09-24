import React from 'react'
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, ScrollView, Keyboard } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { insertUserData } from './User'

class Signup extends React.Component {

    state = {
        firstName: '',
        lastName: ''
    }

    render() {
        return (
            <ScrollView style={styles.mainView}>
                <View style={styles.titleView}>
                    <Text style={styles.title}> 
                        Checkin 
                    </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        placeholder = 'first name'
                        onChangeText={(text) => this.setState({firstName: text})}
                        style={styles.textInputs}
                    />
                    <TextInput
                        placeholder = 'last name'
                        onChangeText={(text) => this.setState({lastName: text})}
                        style={styles.textInputs}
                    />
                </View>
                <TouchableOpacity onPress={this.onNextTapped} style={styles.nextButton}>
                    <Text style={{color: 'white', fontSize: 20}}> Done! </Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    onNextTapped = () => {

        const userID = parseInt(this.generateID());

        const userInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            id: userID
        }

        insertUserData(userInfo).then().catch((error) => {
            alert(error);
        });

        Keyboard.dismiss();
        Actions.Checkin({
            userData: userInfo
        });
    }

    generateID = () => {
        const set1 = String(Math.floor((Math.random() * 100) + 1));
        const set2 = String(Math.floor((Math.random() * 100) + 1));
        const set3 = String(Math.floor((Math.random() * 100) + 1));
        const set4 = String(Math.floor((Math.random() * 100) + 1));
        const set5 = String(Math.floor((Math.random() * 100) + 1));
        return set1 + set2 + set3 + set4 + set5

    }

}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#629bf7',
    },
    nextButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    textInputs: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        color: 'white',
        width: '43%',
        marginRight: '5%',
        marginLeft: '1%',
        marginTop: 50
    },
    title: {
        fontSize: 70,
        color: 'white'
    },
    titleView: {
        alignItems: 'center',
        marginTop: 60,
        backgroundColor: '#629bf7'
    }
})



export default Signup;