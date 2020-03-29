import React, {useEffect, useState} from 'react';
// import 'intl';
// import 'intl/locale-data/jsonp/pt-BR';

import {Feather} from '@expo/vector-icons';
import {View,FlatList, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

export default function Incidents(){
    const [incidents, SetIncidents] = useState([]);
    const [count,setCounter] = useState(0);
    const [page,setPage] = useState(1); 
    const [loading,setLoading] = useState(false);

    const navigation = useNavigation();
    

    function NavigateToDetail(incident){
        navigation.navigate('Detail',{incident});
    }
    async function loadIncidents(){
        if(loading) return;
        if(count > 0 && incidents.length == count) return;

        setLoading(true);

        try{
            const respose = await api.get('/incidents',{
                params:{page}
            });
            SetIncidents([...incidents, ...respose.data]);
            setCounter(respose.headers['x-count-total']);
            setPage(page +1);
            setLoading(false);
        }catch(err){
            console.log(err);
        }
      
    }
    useEffect(()=>{
        loadIncidents();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/> 
                <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold}>{count} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>


            <FlatList style={styles.incidentsList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}   
            data={incidents}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({item:incident})=>(
                <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}:</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}:</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>R${incident.value},00</Text>
                
                <TouchableOpacity style={styles.detailsButton}
                 onPress={()=>NavigateToDetail(incident)}
                 >
                     <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                     <Feather name="arrow-right" size={16} color="#E02041" />
                </TouchableOpacity>
            </View>
            )}
            />


          
        </View>
    )
}