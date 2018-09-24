import React from "react";
import { Router, Scene, Actions } from "react-native-router-flux";
import * as firebase from 'firebase';
import Signup from './src/views/Signup';
import Checkin from './src/views/Checkin';
import LaunchScreen from './src/views/LaunchScreen';


export default class App extends React.Component {
  componentWillMount() {
    // Initialize Firebase
    const firebase = require("firebase");
    var config = {
      apiKey: "AIzaSyDRLaX7__pVwCEDIq6I5Kf5YEGKxXU7v_o",
      authDomain: "checkin-eccc8.firebaseapp.com",
      databaseURL: "https://checkin-eccc8.firebaseio.com",
      projectId: "checkin-eccc8",
      storageBucket: "checkin-eccc8.appspot.com",
      messagingSenderId: "675005248345"
    };
    firebase.initializeApp(config);
  }

  render() {

    return (
      <Router>
        <Scene key='root'>
          <Scene
            key = 'LaunchScreen'
            component = { LaunchScreen }
            hideNavBar = { true }
          />
          <Scene
            key = 'Signup'
            component = { Signup }
            hideNavBar = { true }
            // renderBackButton = { null }
            // renderRightButton = { null } 
            // renderLeftButton = {() => 
            //   <Text />
            // }
            // titleStyle={{ alignSelf: 'center' }}
          />
          <Scene
            key = 'Checkin'
            component = { Checkin }
            hideNavBar = { true }
            // renderBackButton = { null }
            // renderRightButton = { null }
            // renderLeftButton = {() =>
            //   <Text />
            // }
            // titleStyle={{ alignSelf: 'center' }}
          />
        </Scene>
      </Router>
    );
  }
}

