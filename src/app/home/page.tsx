'use client'
import { userStore } from '../store/store'
import './home.scss'

export default function Home() {

    const userData = userStore.getState()

    return(
        <div className="homeDiv">
            <div className='homeTitle'>
                <h1>Félicitation {userData.email}  tu es tout loggé et tu as meme un ID qui est {userData.id} et tu as meme un token </h1>
            </div>            
        </div>
    )
}