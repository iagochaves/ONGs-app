import React from 'react';
import {View, TouchableOpacity, Image, Text, Linking} from 'react-native';
import {Feather} from '@expo/vector-icons';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native'
import logoImg from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';


export default function Detail(){
    const Route = useRoute();
    const navigation = useNavigation();
    const message = 'Olá Iago, como vai?';
    const incident = Route.params.incident;

    function navigateBack(){
        navigation.goBack();
    }

    function SendMail(){
        MailComposer.composeAsync({
            subject: 'Herói do caso: Caso 1',
            recipients: ['iagovieirachaves@gmail.com'],
            body: message
        }); 
    }
    function SendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=5581988337057&text=${message}`);
    }
    return(
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg}/> 
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />    
                </TouchableOpacity> 
            </View>

            <View style={styles.incident}>
            <Text style={[styles.incidentProperty,{marginTop: 0}]}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}:</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}:</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>R$ {incident.value},00</Text>     
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói deste caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato!</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={SendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={SendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
    }