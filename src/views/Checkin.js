import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as firebase from 'firebase';
import { deleteAllData } from './User'


class Checkin extends React.Component {
    
    state = {
        topText: 'Checkin'
    }

    render() {
        return (
            <QRCodeScanner 
                onRead={this.onSuccess.bind(this)}
                fadeIn={false}
                style={styles.mainView}
                topContent={
                    <View style={{backgroundColor: '#629bf7', height: '100%', width: '100%', alignItems:'center'}}>
                        <Text style={{marginTop: '13%', fontSize: 40, color: 'white'}}>
                            {this.state.topText}
                        </Text>
                    </View>
                }   
                bottomContent = {
                    <View style={styles.resetDataButton}>
                        <TouchableOpacity onPress={this.clearData}>
                            <Text style={{color: 'white', fontSize: 20, marginTop: 30}}>
                                change info
                            </Text>
                        </TouchableOpacity>
                    </View>
                } 
            />
        )
    }


    clearData = () => {
        deleteAllData().then().catch(error => {
          alert("Sorry, we couldn't delete your data!")
        })
        Actions.Signup();
    }

    onSuccess(e) {

        //processing QR code into usable data
        var dataString = String(e.data);
        var centerString = dataString.substring('http://'.length);

        //adding data to the database
        var db = firebase.database();
        var doneBool = true
        var userContent = this.props.userData
        var date = new Date().toLocaleDateString('en-US')
        var time = new Date().toLocaleTimeString('en-US') 
        userContent.timeChecked = String(time) + ' ' + String(date)
        db.ref(centerString + '/' + this.props.userData.id).set({
            userData: userContent
        }).then().catch((error) => {
            alert('there was an issue checking you in, sorry!')
            doneBool = false
        })
        if (doneBool == true){
            this.setState({
                topText: 'Done!'
            })
        }
    }

}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#629bf7'
    }, 
    resetDataButton : {
        backgroundColor: '#629bf7', 
        height: '100%', 
        width: '100%', 
        alignItems: 'center', 
    
    }
})



export default Checkin; 