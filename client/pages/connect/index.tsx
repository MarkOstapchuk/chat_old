import React, {useState} from 'react';
import Head from "next/head";
import styles from './connect.module.scss'
import axios from "axios";
import { useRouter } from 'next/router'

const CreateRoom = () => {
    const router = useRouter()
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const confirmHandler = async (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        const res = axios.post('http://localhost:4000/api/connect', {
                name,
                password,
                userName
        }).then(data=>{
            if (data.data.mess === 'connected') {
                localStorage.setItem('room', data.data.res2._id)
                localStorage.setItem('userName', data.data.res2.userName)
                router.push(`/room/${data.data.res2._id}`)
            }
        })
    }
    const setPasswordHandler = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setPassword(e.target?.value)
    }
    const setNameHandler = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setName(e.target?.value)
    }
    const setUserNameHandler = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setUserName(e.target?.value)
    }

    return (
        <>
            <Head>
                <title>connect to the room</title>
            </Head>
            <div>
                <div className={styles.title}>connect to the room</div>
                <form className={styles.form}>
                    <label>identification</label>
                    <input value={name} onChange={setNameHandler} className={styles.input} type="text"/>
                    <div className={styles.inputPassword}>
                        <label>password</label>
                        <input value={password} onChange={setPasswordHandler} className={styles.input} type={'text'}/>
                    </div>
                    <label>your name</label>
                    <input value={userName} onChange={setUserNameHandler} className={styles.input} type="text"/>
                    <button onClick={confirmHandler} className={styles.confirm}>connect</button>
                </form>
            </div>
        </>
    );
};

export default CreateRoom;