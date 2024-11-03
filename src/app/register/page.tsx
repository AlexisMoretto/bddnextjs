/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import './Register.scss'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function Register () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter();

     const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()

        try {
            
            const response = await axios.post('/api/register', {email, password,})
            router.push('/login')

            
        } catch (error) { console.error('Registration Failed', error);
        }
        
    }
    

    return(

        <div className='register'>
            <h1>Bienvenue, enregistres toi</h1>
        <form onSubmit={handleSubmit}>
            <div className='input'>
            <input type="email" placeholder="email"
            onChange={(event) => {setEmail(event.target.value)}}
            required
            />
            <input type="text" placeholder="password" 
            onChange={(event) => {
                setPassword(event.currentTarget.value)                    
            }}
            required
            />
            </div>
            
            
            <div className='submitButton'>
                    <button type='submit'>Valider</button>
                </div>
        </form>
        </div>
    )
}


