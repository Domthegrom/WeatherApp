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
  Default: 'ios-time',
  Clear: 'ios-sunny' ,
  Rain: 'ios-rainy' ,
  Thunderstorm: 'ios-thunderstorm' ,
  Clouds: 'ios-cloudy' ,
  Snow: 'ios-snow' ,
  Drizzle: 'ios-umbrella' ,
}

const phrases = {
  Default: {
    title: "Fetching the Fucking Weather",
    subtitle: "Be patient you're witnessing a miracle",
    highlight: "Fucking",
    color: "#636363",
    background: "#9C9C9C"
  },
  Clear: {
    title: "It's fucking Amaze Balls",
    subtitle: "Rock that Shit!",
    highlight: "fucking",
    color: "#E35200",
    background: "#FFD017"
  },
  Rain: {
    title: "Rain rain go away",
    subtitle: "Stay inside and code all day",
    highlight: "away",
    color: "#004A96",
    background: "#2F343A"
  },
  Thunderstorm:{
    title: "Fucking Thunderstrike",
    subtitle: "Unplug those devices",
    highlight: "Thunderstrike",
    color: "#FBFF46",
    background: "#020202"
  },
  Clouds: {
    title: "Cloud storage limit reached",
    subtitle: "error: 500 - cirrocumuls",
    highlight: "limit",
    color: "#0044FF",
    background: "#939393"
  },
  Snow: {
    title: "Brain Fucking Freeze",
    subtitle: "You're not suppose to eat it",
    highlight: "Fucking",
    color: "#021D4C",
    background: "#15A678"
  },
  Drizzle: {
    title: "Meh... don't even ask",
    subtitle: "What did I just say?",
    highlight: "don't",
    color: "#B3F6E4",
    background: "#1FBB68"
  },
}

class App extends Component {

componentWillMount() {
  this.state = {
    temp: 0,
    weather: 'Default',
  }
}

componentDidMount() {
  this.getLocation()
}
  getLocation () {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude,posData.coords.longitude)
      .then(res => this.setState({
        temp:Math.round(res.temp),
        weather: res.weather
      })),
      (error) => alert(error),
      {timeout: 10000}
    )
  }


  render() {
    return (
      <View style={[styles.container,{backgroundColor: phrases[this.state.weather].background}]}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
        <Icon name={iconNames[this.state.weather]} color={'white'} size={80}/>
        <Text style={styles.temp}>{this.state.temp}°</Text>
        </View>
        <View style={styles.body}>
        <Highlight
        style={styles.title}
        highlightStyle={{color: phrases[this.state.weather].color}}
        searchWords={[phrases[this.state.weather].highlight]}
        textToHighlight={phrases[this.state.weather].title}
        />
        <Text style={styles.subtitle}>
          {phrases[this.state.weather].subtitle}
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

