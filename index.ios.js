import React, {Component} from 'react';
import {
  Text,
  AppRegistry,
  StyleSheet,
  View,
  StatusBar, 
  Switch,
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';
import {fetchWeather} from './weatherAPI';
import Highlight from 'react-native-highlight-words'

const iconNames = {
  Clear: 'ios-sunny' ,
  Rain: 'ios-rainy' ,
  Thunderstorm: 'ios-thunderstorm' ,
  Clouds: 'ios-cloudy' ,
  Snow: 'ios-snow' ,
  Drizzle: 'ios-umbrella' ,
}

const phrases = {
  Clear: {
    title: "It's fucking Amaze Balls",
    subtitle: "Rock that Shit!",
  },
  Rain: {
    title: "Rain rain go away",
    subtitle: "Stay inside and code all day",
  },
  Thunderstorm:{
    title: "Fucking Thunderstrike",
    subtitle: "Unplug those devices",
  },
  Clouds: {
    title: "Cloud storage limit reached",
    subtitle: "error: 500 - cirrocumuls",
  },
  Snow: {
    title: "Brain Fucking Freeze",
    subtitle: "You're not suppose to eat it",
  },
  Drizzle: {
    title: "Meh... don't even ask",
    subtitle: "What did I just say?"
  },
}

class App extends Component {

componentWillMount() {
  this.state = {
    temp: 0,
    weather: 'clear',
  }
}

componentDidMount() {
  this.getLocation()
}
  getLocation () {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude,posData.coords.longitude)
      .then(res => this.setState({
        temp: res.temp,
        weather: res.weather
      })),
      (error) => alert(error),
      {timeout: 10000}
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
        <Icon name={iconNames[this.state.weather]} color={'white'} size={80}/>
        <Text style={styles.temp}>{this.state.temp}°</Text>
        </View>
        <View style={styles.body}>
        <Highlight
        style={styles.title}
        highlightStyle={{color: 'red'}}
        searchWords={['random']}
        textToHighlight={"Some Random Text"}
        />
        <Text style={styles.subtitle}>
          Let's Make it rain
        </Text>
        </View>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFD017',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'blue',
    flex: 1,
  },
  temp: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 45,
    color: 'white',

  },
  title: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 78,
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16,
    color: 'white',

  },
  body: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    flex: 5,
    margin: 10
  }
})


AppRegistry.registerComponent('Weather', () => App)

