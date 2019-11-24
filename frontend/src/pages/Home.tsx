import React, { useState, useEffect } from 'react'
import  { Image,
          SafeAreaView, 
          StyleSheet,  
          Text, 
          View } from 'react-native'

import CardPokemon from '../components/CardPokemon'
import { AppState, YellowBox } from 'react-native'
import io from 'socket.io-client'
import logo from '../assets/logo.png'

YellowBox.ignoreWarnings([ 'Unrecognized WebSocket' ])

export default class Home extends React.PureComponent<any, any> {
    socket: any

    constructor(props: any, navigation: any) {
        super(props)
        this.state = { 
            connected: false,
            pokemon: '',
            hasToken: false,
        }

        console.log('batata')
        this.socket = io('http://192.168.0.103:3040')
        this.setListeners()
    }

    setListeners() {
        this.socket.on('pokemon', pokemon => {
            this.setState({ pokemon })
        })

        this.socket.on('token', hasToken => {
            this.setState({ hasToken })
        })
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
      }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = (nextAppState) => {
        if (nextAppState.match(/inactive|background/)) {
            console.log('WAS INACTIVE')
            this.socket.disconnect()
            this.setState({ hasToken: false })
            return
        }
        
        console.log('AND NOW... ACTIVEEEEEEE')
        this.socket = io('http://192.168.0.105:3003')
        this.setListeners()

    }

    render() {
        const { pokemon, hasToken } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo} source={logo} />
                <CardPokemon  
                    pokemon={pokemon}
                    hasToken={hasToken}
                />
                <View style={styles.MainContainer}>
                    <Text>{ hasToken ? "NÓIS" : "VISH" }</Text>
                </View>
            </SafeAreaView>
        )  
    }        
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
  },
})
