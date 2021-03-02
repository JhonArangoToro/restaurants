import React from 'react'
import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import { Button, Input,Divider } from 'react-native-elements'


export default function RegisterForm() {
    return (


<ScrollView>
            <Image  
                source={require("../../assets/restaurant-logo.png")}
                resizeMode= "contain"
                style={styles.image}
            />
            
            <Divider style={styles.divider}/>

            <View style={styles.form}>
            <Input 
                containerStyle={styles.input}
                placeholder ="Ingresa tu email..."               
            />
            <Input 
                containerStyle={styles.input}
                placeholder ="Ingresa tu contraseña..."
                password={true}
                secureTextEntry={true}
            />
            <Input 
                containerStyle={styles.input}
                placeholder ="Confirma tu contraseña..."
                password={true}
                secureTextEntry={true}
            />
            <Button 
                title="Registrar nuevo usuario"
                containerStyle ={styles.btnContainer}
                buttonStyle = {styles.btn}
            />
        </View>
        </ScrollView>

        
    )
}

const styles = StyleSheet.create({
    form:{
        marginTop: 30,
    },
    input:{
        width: "100%"
    },
    btnContainer:{
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn:{
        backgroundColor: "#442484"
    },
    divider:{
        backgroundColor: "#442484",
        margin: 20  //Aplica para los 4 lados
    },
    image:{
        height: 150, 
        width: "100%",
        marginBottom: 20
    }
})
