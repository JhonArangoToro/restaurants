import React,{useState} from 'react'
import { isEmpty } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

import { updateProfile } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailForm({ email, setShowModal, toasRef, setReloadUser}) {

    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)

    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const [loading, setLoading] = useState(false)

    const onSubmit = async() =>{ //metodo asincrono
        if(!validateForm()){
            return
        }

        // setLoading(true)    
        // const result = await updateProfile({ displayName: newDisplayName}) //Vamos a cambiar un atributo llamado displayName
        // setLoading(false)

        // if(!result.statusResponse){
        //     setError("Error al actulizar nombres y apellidos, intenta mas tarde.")
        //     return
        // }

        // setReloadUser(true) //Para que recargue la pantalla una vez se actualice el nombre
        
        // //Primer parametro = Mensaje, Segundo parametro = Duracion del mensaje en milisegundos
        // toasRef.current.show("Se han actualizado nombres y apellidos.",3000) 
        // setShowModal(false)
    }

    const validateForm = () =>{
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true

        if(!validateEmail(newEmail)){ //Valida si es correcto o valido
            setErrorEmail("Debes ingresar un email valido.")
            isValid = false
        }

        if(newEmail === email){ //Si nombre que ingreso es igual al nombre actual
            setErrorEmail("Debes ingresar un email diferente al actual.")
            isValid = false
        }

        if(isEmpty(password)){ 
            setErrorPassword("Debes ingresar tu contraseña.")
            isValid = false
        }

        return isValid

    }

    return (
        <View style={styles.view}>
            <Input 
                placeholder="Ingresa el nuevo correo..."
                containerStyle={styles.input}
                defaultValue ={email}   // valor que va tener
                onChange={(e) =>  setNewEmail(e.nativeEvent.text)} //Obtenemos lo que digite en el cuadro de texto
                errorMessage= {errorEmail}
                keyboardType="email-address"
                rightIcon={{  //Como es un objeto abrimos doble llave
                    type:"material-community",
                    name:"at", //Arroba
                    color :"#c2c2c2"
                }}
            />
            <Input 
                placeholder="Ingresa tu contraseña..."
                containerStyle={styles.input}
                defaultValue ={password}   // valor que va tener
                onChange={(e) =>  setPassword(e.nativeEvent.text)} //Obtenemos lo que digite en el cuadro de texto
                errorMessage= {errorPassword}
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
                title="Cambiar Email"
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
