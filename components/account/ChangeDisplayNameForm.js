import React,{useState} from 'react'
import { isEmpty } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

import { updateProfile } from '../../utils/actions'

export default function ChangeDisplayNameForm({ displayName, setShowModal, toasRef, setReloadUser}) {

    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() =>{ //metodo asincrono
        if(!validateForm()){
            return
        }

        setLoading(true)    
        const result = await updateProfile({ displayName: newDisplayName}) //Vamos a cambiar un atributo llamado displayName
        setLoading(false)

        if(!result.statusResponse){
            setError("Error al actulizar nombres y apellidos, intenta mas tarde.")
            return
        }

        setReloadUser(true) //Para que recargue la pantalla una vez se actualice el nombre
        
        //Primer parametro = Mensaje, Segundo parametro = Duracion del mensaje en milisegundos
        toasRef.current.show("Se han actualizado nombres y apellidos.",3000) 
        setShowModal(false)
    }

    const validateForm = () =>{
        setError(null)

        if(isEmpty(newDisplayName)){
            setError("Debes ingresar nombres y apellidos.")
            return false
        }
        if(newDisplayName === displayName){ //Si nombre que ingreso es igual al nombre actual
            setError("Debes ingresar nombres y apellidos diferentes a los actuales.")
            return false
        }

        return true

    }

    return (
        <View style={styles.view}>
            <Input 
                placeholder="Ingresa nombres y apellidos"
                containerStyle={styles.input}
                defaultValue ={displayName}   // valor que va tener
                onChange={(e) =>  setNewDisplayName(e.nativeEvent.text)} //Obtenemos lo que digite en el cuadro de texto
                errorMessage= {error}
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
    }
})
