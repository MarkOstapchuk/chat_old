import React, {useState} from 'react';
import Head from "next/head";
import styles from './createRoom.module.scss'
import axios from "axios";
import {router} from "next/client";

const CreateRoom = () => {
    const [checkBox, setCheckBox] = useState<boolean>(false)
    const [visPassword, setVisPassword] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const confirmHandler = async (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        if (name.length < 5) {
            return console.warn('name_length')
        }
        if (!checkBox && password.length < 5) {
            return console.warn('password_length')
        }
        const res = await axios.post('http://localhost:4000/api', {
                name,
                password,
                online: 0,
                participants: [],
                messages: []
}).then(()=>{router.push('/')})
        }
    const setPasswordHandler = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setPassword(e.target?.value)
    }
    const setNameHandler = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setName(e.target?.value)
    }
    const checkBoxHandler = ():void =>{
        setCheckBox(prevState => !prevState)
        setPassword('')
    }
    return (
        <>
        <Head>
            <title>Create a room</title>
        </Head>
        <div>
            <div className={styles.title}>create a room</div>
            <form className={styles.form}>
            <label>identification</label>
            <input value={name} onChange={setNameHandler} className={styles.input} type="text"/>
            <div onClick={checkBoxHandler} className={styles.checkout}><input readOnly checked={checkBox} type="checkbox"/><div>without password</div></div>
            {!checkBox && <div className={styles.inputPassword}>
                <label>password</label>
                <input value={password} onChange={setPasswordHandler} className={styles.input} type={visPassword ? 'text' : 'password'}/>
                {password &&<img onClick={()=>{setVisPassword(prevState => !prevState)}} className={styles.svg} src='/eye.svg' alt='next' /> }
            </div>}
                <button onClick={confirmHandler} className={styles.confirm}>create</button>
            </form>
        </div>
        </>
    );
};

export default CreateRoom;