import React from 'react'
import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
    
    return (
        <ScrollView>
            <Image  
                source={require("../../assets/restaurant-logo.png")}
                resizeMode= "contain"
                style={styles.image}
            />
            <View style={styles.container}>
                <Text>Login Form</Text>
                <CreateAccount />
            </View>
            <Divider style={styles.divider}/>
        </ScrollView>
     
    )
}

function CreateAccount(props){
    const navigation = useNavigation()

    return(
        <Text 
            style={styles.register}
            onPress={() => navigation.navigate("register")}
        >
            ¿Aun no tienes una cuenta?{" "}
            <Text style={styles.btnRegister}>
                Régistrate!
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image:{
        height: 150, 
        width: "100%",
        marginBottom: 20
    },
    container:{
        marginHorizontal: 40 //para que quede a los dos lados 
    },
    divider:{
        backgroundColor: "#442484",
        margin: 40  //Aplica para los 4 lados
    },
    register:{
        marginTop:15,
        marginHorizontal:10,
        alignSelf: "center"
    },
    btnRegister:{
        color: "#442484",
        fontWeight: "bold"
    }
    
})
