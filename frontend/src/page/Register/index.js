import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import Logoimg from '../../assets/logo.svg';
import api from '../../services/api';


export default function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState(''); 
    const [city,setCity] = useState('');
    const [uf,setUf] = useState('');

    const history = useHistory();

   async function handlerRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try{
      const respose = await api.post('/ongs', data);
      alert('Seu ID: '+respose.data.id);
      history.push('/');
        }catch(err){
            alert('Erro no cadastro -> '+err);
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={Logoimg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link to="/" className="back-link">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Não tenho cadastro
                </Link>

                </section>

                <form onSubmit={handlerRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}></input>
                    <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="Whatsapp"  value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>

                    <div className="input-group">
                        <input placeholder="Cidade"  value={city} onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" style={{width: 80}}  value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>
    )
}