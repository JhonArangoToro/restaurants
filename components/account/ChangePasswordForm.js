import React,{useState} from 'react'
import { isEmpty, size } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import { reauthenticate, updateEmail, updateProfile } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangePasswordForm({ setShowModal, toasRef}) {

    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setconfirmPassword] = useState(null)

    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const [loading, setLoading] = useState(false)

    const onSubmit = async() =>{ //metodo asincrono
        if(!validateForm()){
            return
        }

        // setLoading(true)    
        
        // const resultReauthenticate = await reauthenticate(password) 

        // if(!resultReauthenticate.statusResponse){
        //     setErrorPassword("Contraseña incorrecta.")
        //     setLoading(false)
        //     return
        // }

        // const resultupdateEmail = await updateEmail(newEmail) 
        // setLoading(false)
      

        // if(!resultupdateEmail.statusResponse){
        //     setErrorEmail("No se pudo cambiar por este correo, ya se encuentra en uso.")
        //     return
        // }

        // setReloadUser(true) //Para que recargue la pantalla una vez se actualice el nombre
        
        // //Primer parametro = Mensaje, Segundo parametro = Duracion del mensaje en milisegundos
        // toasRef.current.show("Se ha actualizado el email.",3000) 
        // setShowModal(false)
    }

    const validateForm = () =>{
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid = true

        if(isEmpty(currentPassword)){ //Valida si es correcto o valido
            setErrorCurrentPassword("Debes ingresar tu contraseña actual.")
            isValid = false
        }

        
        if(size(newPassword) < 6){ 
            setErrorNewPassword("Debes ingresar una nueva contraseña de al menos 6 caracteres.")
            isValid = false
        }

        if(size(confirmPassword) < 6){ 
            setErrorConfirmPassword("Debes ingresar una confirmacion de tu contraseña de al menos 6 caracteres.")
            isValid = false
        }

        if(newPassword !== confirmPassword){ 
            setErrorNewPassword("La contraseña y la confirmación deben coincidir.")
            setErrorConfirmPassword("La contraseña y la confirmación deben coincidir.")
            isValid = false
        }

        if(newPassword === currentPassword){
            setErrorCurrentPassword("Debes ingresar una contraseña diferente a la actual.")
            setErrorNewPassword("Debes ingresar una contraseña diferente a la actual.")
            setErrorConfirmPassword("Debes ingresar una contraseña diferente a la actual.")
            isValid = false
        }

        return isValid

    }

    return (
        <View style={styles.view}>
            
            <Input 
                placeholder="Ingresa tu contraseña actual..."
                containerStyle={styles.input}
                defaultValue ={currentPassword}   // valor que va tener
                onChange={(e) =>  setCurrentPassword(e.nativeEvent.text)} //Obtenemos lo que digite en el cuadro de texto
                errorMessage= {errorCurrentPassword}
                password={true}
                secureTextEntry={!showPassword} //Para que se vea la contraseña o no
                rightIcon={
                    <Icon
                        type="material-community"
                        name = {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconPassWord}
                        onPress={()  => setShowPassword(!showPassword)} //si esta activo lo apaga, si esta desactivo lo prende
                    />

                   
                }
            />
            <Input 
                placeholder="Ingresa tu nueva contraseña.."
                containerStyle={styles.input}
                defaultValue ={newPassword}   // valor que va tener
                onChange={(e) =>  setNewPassword(e.nativeEvent.text)} //Obtenemos lo que digite en el cuadro de texto
                errorMessage= {errorNewPassword}
                password={true}
                secureTextEntry={!showPassword} //Para que se vea la contraseña o no
                rightIcon={
                    <Icon
                        type="material-community"
                        name = {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconPassWord}
                        onPress={()  => setShowPassword(!showPassword)} //si esta activo lo apaga, si esta desactivo lo prende
                    />

                   
                }
            />
            <Input 
                placeholder="Ingresa tu confirmacion de nueva contraseña..."
                containerStyle={styles.input}
                defaultValue ={confirmPassword}   // valor que va tener
                onChange={(e) =>  setconfirmPassword(e.nativeEvent.text)} //Obtenemos lo que digite en el cuadro de texto
                errorMessage= {errorConfirmPassword}
                password={true}
                secureTextEntry={!showPassword} //Para que se vea la contraseña o no
                rightIcon={
                    <Icon
                        type="material-community"
                        name = {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconPassWord}
                        onPress={()  => setShowPassword(!showPassword)} //si esta activo lo apaga, si esta desactivo lo prende
                    />

                   
                }
            />

            <Button
                title="Cambiar Contraseña"
                containerStyle= {styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
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
    },
    iconPassWord:{
        color: "#c2c2c2"
    }
})
