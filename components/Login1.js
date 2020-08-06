import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Platform, PermissionsAndroid} from 'react-native';
import DeviceInfo from 'react-native-device-info';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  updateValue(text, field) {
    if (field == 'email') {
      this.setState({
        email: text,
      });
    } else if (field == 'password') {
      this.setState({
        password: text,
      });
    }
  }
  submit() {
    var collection = {};
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        (collection.mac = DeviceInfo.getMacAddress().then()),
          (collection.uq = DeviceInfo.getUniqueId());
        (collection.usn = this.state.email),
          (collection.password = this.state.password),
          (collection.lat = position.coords.latitude);
        collection.long = position.coords.longitude;
        fetch(`http://abhinavanand500.pythonanywhere.com/writedata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(collection),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data['message']);
          })
          .catch((error) => {
            alert(error);
            console.error('Error:', error);
          });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 0},
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Attendance</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="USN"
            placeholderTextColor="rgba(255,255,255,0.8)"
            onChangeText={(text) => this.updateValue(text, 'email')}
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.8)"
            autoCorrect={false}
            onChangeText={(text) => this.updateValue(text, 'password')}
          />
        </View>
        <TouchableOpacity onPress={() => this.submit()} style={styles.loginBtn}>
          <Text style={styles.loginText}>MARK YOUR ATTENDANCE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 30,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    textAlign: 'center',
    fontWeight: 'bold',
    height: 50,
    color: 'white',
    fontSize: 18,
  },
  forgot: {
    color: 'white',
    fontSize: 13,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
