/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { FormEventHandler, useState } from 'react'
import './Login.scss'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { getActionChangeImgData, getActionChangeUserData } from '../actions/actions'
import { imgStore, userStore } from '../store/store'




export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');     

    const router = useRouter();

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        
        try {
           const response = await axios.post('/api/login', {email, password})
           
            localStorage.setItem('token', response.data.token);

            console.log( 'Response from API/login',response);
            
            // On envoi l'action au store pour qu'il le voit et qu'il l'execute le reducer
            const actionChangeUserData = getActionChangeUserData(response.data.user)
            
            userStore.dispatch(actionChangeUserData)

        

            router.push('/home')

            
        } catch (error) { console.error('Login Failed', error);
            setErrorMessage('Identifiants incorrects ou erreur de connexion.');  
        }
    }
    

    
    return (
        <div className='login'>
            <div className='loginTitle'>
            <h1>Bienvenue</h1>
            </div>
            <div>
            <form  className='form'action="" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='E-mail'
                onChange={(event) => {
                    setEmail(event.currentTarget.value)
                }} />
                <label htmlFor="">Mot de passe</label>
                <input type="password" placeholder='Mot de passe'
                onChange={(event) => {
                    setPassword(event.currentTarget.value)                    
                }} />
                <div className='link'>
                    <button>Valider</button>
                </div>
            </form>
            </div>
        </div>
    )
}