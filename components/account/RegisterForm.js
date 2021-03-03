
import React,{useState} from 'react'
import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import { Button, Input,Divider, Icon } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import {registerUser} from '../../utils/actions'




export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false)

    /* Un Estado Para Todos Los Campos Del Formulario */
    const [formData, setFormData] = useState(defaultFormValues())

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")

    //Navegacion
    const navigation = useNavigation()

   
    /*Cuando cambie algun campo me almacenara dinamicamente dicho campo */
    const onChange =(e, type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text}) /* Para que el JSON sea dinamico se envuelve en corchete, el type */
    }

    const doregisterUser = async() =>{
        /*Validar la data */
        if(!validateData()){
            return;
        }
        
        const result = await registerUser(formData.email,formData.password) 

        if(!result.statusResponse){
            setErrorEmail(result.error)
        }

        navigation.navigate("account")
    }

    const validateData = () =>{
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")

        let isValid = true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debes de ingresar un email valido.")
            isValid = false
        }

        if(size(formData.password)<6){
            setErrorPassword("Debes ingresar una contraseña de al menos seis caracteres.")
            isValid = false
        }

        if(size(formData.confirm)<6){
            setErrorConfirm("Debes ingresar una confirmación de contraseña de al menos seis caracteres.")
            isValid = false
        }

        if(formData.password !== formData.confirm){
            setErrorPassword("La contraseña y la confirmacion no son iguales")
            setErrorConfirm("La contraseña y la confirmacion no son iguales")
            isValid = false
        }


        return isValid
    }

    return (

            <View style={styles.form}>
            <Input 
                containerStyle={styles.input}
                placeholder ="Ingresa tu email..."
                onChange={(e) => onChange(e,"email")}  
                keyboardType= "email-address"
                errorMessage ={errorEmail} 
                defaultValue ={formData.email}       
            />
            <Input 
                containerStyle={styles.input}
                placeholder ="Ingresa tu contraseña..."
                onChange={(e) => onChange(e,"password")}
                errorMessage ={errorPassword} 
                defaultValue ={formData.password}    
                password={true}
                secureTextEntry={!showPassword}
                rightIcon ={
                            <Icon 
                                type="material-community"
                                name ={ showPassword ? "eye-off-outline" : "eye-outline"}
                                iconStyle={styles.icon}
                                onPress={() => setShowPassword(!showPassword)}
                            />
                }
            />
            <Input 
                containerStyle={styles.input}
                placeholder ="Confirma tu contraseña..."
                onChange={(e) => onChange(e,"confirm")}
                errorMessage ={errorConfirm} 
                defaultValue ={formData.confirm}    
                password={true}
                secureTextEntry={!showPassword}
                rightIcon ={
                            <Icon 
                                type="material-community"
                                name ={ showPassword ? "eye-off-outline" : "eye-outline"}
                                iconStyle={styles.icon}
                                onPress={() => setShowPassword(!showPassword)}
                            />
                }               
            />
            <Button 
                title="Registrar nuevo usuario"
                containerStyle ={styles.btnContainer}
                buttonStyle = {styles.btn}
                onPress={() => doregisterUser()}
            />
        </View>
      

        
    )
}

const defaultFormValues =() =>{
    return { email: "", password: "", confirm: ""}
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
    icon:{
        color: "#c1c1c1"
    }

})
