import React, { useState, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import { Image,
         StyleSheet,
         Text,
         TouchableOpacity,
         View, } from 'react-native'

function CardPokemon({ pokemon }) {

    return ( 
        <View 
            style={styles.card}
        >
            <Image source={{uri: 'http://i.imgur.com/91AR0Lo.jpg'}} style={styles.cardImage} />
            <View>
              <Text style={styles.textLeft}>Rabbit, 10</Text>
              <Text style={styles.textRight}>1 Connection</Text>
            </View>
        </View>  
    )
}

const styles = StyleSheet.create ({
    container: {
        marginTop: 30,
    },

    card: {
        borderWidth: 3,
        borderRadius: 3,
        borderColor: '#000',
        width: 300,
        height: 300,
        padding: 10
    },
    cardImage: {
        height: 260,
    },  
    textLeft: {
        position: 'absolute',
        left:0,
        top:0
    },
    textRight: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    title: {
        fontSize: 20,
        color: "#444",
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold',
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },
})

export default withNavigation(CardPokemon);