import React, { useState, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import { Image,
         StyleSheet,
         Text,
         TouchableOpacity,
         View, } from 'react-native'
import { any } from 'prop-types'

this.state = {
    pokemon: 'http://i.imgur.com/91AR0Lo.jpg',
}

const capturePokemon = () => {
    alert("Pokémon Captured!")
    this.state = {
        pokemon: 'https://loremflickr.com/320/240'
    }
}
function CardPokemon({ pokemon , hasToken }) {

    return ( 
        <View style={styles.container}>
            <View
                style={styles.card}
            >
                <Image source={{uri: this.state.pokemon }} style={styles.cardImage} />
                <View>
                    <Image 
                        source={ (hasToken) ? require('../assets/unlocked_padlock.png') :
                            require('../assets/locked_padlock.png') }
                        style={styles.padlock}                
                    />
                    <Text style={styles.pokeName}> Catassalto </Text>
                    <TouchableOpacity 
                        activeOpacity={ .5 } 
                        onPress={ capturePokemon }  
                    >                    
                        <Image 
                            source={ require('../assets/pokeball.jpg') }
                            style={styles.pokeball}                
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>  
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        borderWidth: 2,
        borderRadius: 3,
        borderColor: '#000',
        width: 300,
        height: 320,
        padding: 10
    },
    cardImage: {
        height: 250,
    },
    padlock: {
        position: 'absolute',
        left: 0,
        top: 5,
        height: 50,
        width: 50,
    },
    pokeball: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 50,
        width: 50,
    },
    pokeName: {
        position: 'absolute',
        marginTop: 15,
        left: 70,
        alignContent: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#333',
    },
})

export default withNavigation(CardPokemon);
