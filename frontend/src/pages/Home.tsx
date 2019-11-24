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

const backend = 'ws://pokering.herokuapp.com'

export default class Home extends React.PureComponent<any, any> {
    socket: any

    constructor(props: any, navigation: any) {
        super(props)
        this.state = { 
            connected: false,
            pokemon: {},
            hasToken: false,
        }

        console.log('batata')
        this.socket = io(backend)
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
            this.socket.disconnect()
            this.setState({ hasToken: false })
            return
        }
        // this.socket = io('http://192.168.0.105:3003')
        // this.setListeners()
        this.socket.connect()

    }

    render() {
        const { pokemon, hasToken } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo} source={logo} />
                <CardPokemon  
                    pokemon={pokemon}
                    hasToken={hasToken}
                    socket={this.socket}
                />
                <View style={styles.MainContainer}>
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
