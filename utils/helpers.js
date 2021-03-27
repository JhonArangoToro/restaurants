import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'
import * as Location from 'expo-location'

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const loadImageFromGallery = async (array) =>{
    const response = {status: false, image: null}

    /*Preguntar por los permisos a la camara */
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)

    /*Si el usuario no dio permisos le mandamos un mensaje */
    if(resultPermissions.status === "denied"){
        Alert.alert("Debes de darle permiso para acceder a las imagenes del telefono.")
        return response
    }

    /*Lanzar una libreria de imagenes */
    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array /*Aspecto de la imagen 3:4, 2:2 */
    })

    if(result.cancelled){
        return response
    }

    response.status = true
    response.image = result.uri //URL donde nos queda la imagen

    return response
}

export const fileToBlob = async(path) =>{
    const file = await fetch(path)
    const blob = await file.blob()
    return blob
}

export const getCurrentLocation = async() =>{
    const response  ={status: false, location:null}
    const resultPermissions = await Permissions.askAsync(Permissions.LOCATION)
    if(resultPermissions.status =="denied"){
        Alert.alert("Debes dar permisos para la localización")
        return response
    }
    const position = await Location.getCurrentPositionAsync({})
    const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta : 0.001,
        longitudeDelta :0.001
    }
    response.status = true
    response.location = location
    return response
}