import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

export default function ChangeDisplayNameForm({ displayName, setShowModal, toasRef}) {
    return (
        <View style={styles.view}>
            <Input 
                placeholder="Ingresa nombres y apellidos"
                containerStyle={styles.input}
                defaultValue ={displayName}   // valor que va tener
                rightIcon={{  //Como es un objeto abrimos doble llave
                    type:"material-community",
                    name:"account-circle-outline",
                    color :"#c2c2c2"
                }}
            />
            <Button
                title="Cambiar Nombres y Apellidos"
                containerStyle= {styles.btnContainer}
                buttonStyle={styles.btn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems:"center",
        paddingVertical: 10
    },
    input:{
        marginBottom: 10, //para que no se pegue el boton del input
    },
    btnContainer:{
        width: "95%"
    },
    btn:{
        backgroundColor: "#442484"
    }
})
