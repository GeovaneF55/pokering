import React, { useState, useEffect } from 'react'
import { Image,
         StyleSheet,
         Text,
         TouchableOpacity,
         View, } from 'react-native'

function CardPokemon({ pokemon }) {

    return ( 
        <View style={styles.container}>
            <Image style={styles.pokemon} source={{ uri: item.thumbnail_url }} />

        </View>  
    )
}

const styles = StyleSheet.create ({
    container: {
        marginTop: 30,
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