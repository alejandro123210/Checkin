import React from 'react'
import { View, TextInput, Button, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { querryUserData } from './User'

class LaunchScreen extends React.Component {

    componentWillMount(){

        //I should NOT have to do this like this but this thing REFUSES to give an error...
        querryUserData().then((userData) => {
            const userDatum = userData[0]
            if (userDatum == undefined){
                Actions.Signup();
            } else {
                Actions.Checkin({
                    userData: userDatum
                });
            }
        }).catch((error) => {
            alert(error)
            Actions.Signup();
        })
    }


    render () {
        return (
            <View style={{backgroundColor: '#629bf7'}}/>
        )
    }
}

export default LaunchScreen;