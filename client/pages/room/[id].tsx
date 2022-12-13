import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {messageT, RoomsT} from "../../types/roomsT";
import {NextPage} from "next";
import { GetStaticPaths, GetStaticProps } from 'next'
import axios from "axios";
import socket from "../../components/socket";
import styles from './room.module.scss'

interface props {
    room: RoomsT
}

const Index: NextPage<props> = ({room}) => {
    const [users, setUsers] = React.useState<string[]>([])
    const [messages, setMessages] = React.useState<messageT[]>([])
    const [inputText, setInputText] = useState<string>('')
    const ulRef = React.useRef<null | HTMLDivElement>(null)
    const router = useRouter()
    useEffect(() => {
        ulRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);
    useEffect(()=>{

        if(localStorage.getItem('userName') === null) {
           router.push('/connect')
       }
       if (room.participants && room.messages) {
           setUsers(room.participants)
           setMessages(room.messages)
       }
       socket.emit('ROOM:JOIN', {
           userName:localStorage.getItem('userName'),
           _id:localStorage.getItem('room'),
       })
        socket.on('ROOM:SET', (data)=> {
            setUsers(data.participants)
            setMessages(data.messages)
            console.log('set')
        })
    }, [])
    const sendMessage = () => {
        socket.emit('ROOM:MESSAGE_SEND', {
            text:inputText,
            id: localStorage.getItem('room'),
            from: localStorage.getItem('userName')
        })
    }
        const exit = () => {
            if (typeof window !== "undefined") {
                socket.emit('ROOM:DISCONNECTED', {id:localStorage.getItem('room'), userName: localStorage.getItem('userName')})
                const res = axios.post('http://localhost:4000/api/disconnect', {
                    _id:localStorage.getItem('room'),
                    userName:localStorage.getItem('userName')
                })
                localStorage.removeItem('room')
                localStorage.removeItem('userName')
                router.push('/connect')
            }
        }
    return (
        <div className={styles.room}>
            <div className={styles.members}>
                <ul>
                    {users && users.map((item, index)=><li key={index}>{item}</li>)}
                </ul>
                <button onClick={exit}>exit</button>
            </div>
            <div className={styles.messages}>
                <div>
                    {messages && messages.map((item, index)=><div className={styles.message_item} key={index}>
                        <li>{item.text}</li>
                        <span>from: {item.from}</span> </div>)}
                    <div ref={ulRef} />
                </div>
                <input value={inputText} onChange={(e)=>{setInputText(e.target?.value)}} type="text"/>
                <button onClick={sendMessage}>emit</button>
            </div>
        </div>
    );
};

export const getStaticPaths:GetStaticPaths  = async()=> {
    const res = await fetch('http://localhost:4000/api')
    const rooms = await res.json()

    const paths = rooms.map((item: RoomsT) => ({
        params: { id: item._id },
    }))

    return { paths, fallback: false }
}
export const getStaticProps:GetStaticProps = async(context) => {
    const res = await fetch('http://localhost:4000/api/'+context.params?.id).then(data=>data.json())
   return {props: {room: res}}
}
export default Index;