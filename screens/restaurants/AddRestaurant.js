import React,{useRef,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../components/Loading'

import AddRestaurantForm from '../../components/restaurants/AddRestaurantForm'

 

export default function AddRestaurant({navigation}) {
    const toasRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
        <KeyboardAwareScrollView>
            <AddRestaurantForm  toasRef={toasRef} setLoading={setLoading} />
            <Loading isVisible={loading} text="Creando Restaurante..." />
            <Toast ref={toasRef} position= "center" opacity={0.9} navigation ={navigation} />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
