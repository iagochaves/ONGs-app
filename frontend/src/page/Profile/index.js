import React, {useEffect,useState} from 'react';
import logoimg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi'
import './style.css'
import api from '../../services/api';

export default function Profile(){
    const history = useHistory();
    const ongname = localStorage.getItem('ongName');
    const ongid = localStorage.getItem('ongId');
    const [incidents,setIncidents] = useState([]);

    useEffect(()=>{
        api.get('/profile',{
            headers: {
                Authorization: ongid
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    },[ongid]);

   async function handlerDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongid
                }
            });

            setIncidents(incidents.filter(incident=> incident.id !== id));
        }catch(err){
            alert('Erro ao deletar o caso');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoimg} alt="Be The Hero"></img>
                <span>Bem vindo(a), {ongname}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                <FiPower size={18} color="#E02041"></FiPower>

                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incidents =>(
                      <li key={incidents.id}>
                      <strong>CASO:</strong>
                      <p>{incidents.title}</p>
      
                      <strong>DESCRIÇÃO:</strong>
                <p>{incidents.description}</p>
      
                      <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-BR',{style: 'currency',currency:'BRL'}).format(incidents.value)}</p>
      
                      <button type="button" onClick={()=> handlerDeleteIncident(incidents.id)}>
                      <FiTrash2 size={20} color="#a8a8b3" />
                      </button>
                  </li>
                ))}
            </ul>
        </div>
    )
}