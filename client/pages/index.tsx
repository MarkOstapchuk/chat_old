import type { NextPage } from 'next'
import styles from '../styles/Main.module.scss'
import Head from "next/head";
import {useEffect, useState} from "react";
import type {RoomsT} from '../types/roomsT'
import RenderRooms from "../components/renderRooms";
import { useRouter } from 'next/router'
import socket from './../components/socket'
interface props {
    rooms: RoomsT[]
}
const Home: NextPage<props> = (props) => {
    const [rooms, setRooms] = useState<RoomsT[]>()
    const router = useRouter()
        useEffect(()=>{
            setRooms(props.rooms)
        }, [])
    const createRoomHandler = ():void=> {
        router.push('/createRoom')
    }
    const connectRoomHandler = ():void=> {
        router.push('/connect')
    }

  return (
      <>
      <Head>
          <title>Roommate</title>
      </Head>
    <div className={styles.main}>
      <div className={styles.controlButtons}>
          <button onClick={createRoomHandler} className={styles.controlBtn}>create a room</button>
          <button onClick={connectRoomHandler} className={styles.controlBtn}>connect to the room</button>
      </div>
        <button className={styles.allRoomsBtn}>opened rooms</button>
        {rooms && <RenderRooms rooms={rooms}/>}
    </div>
      </>
  )
}
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('http://localhost:4000/api')
    const rooms = await res.json()

    // Pass data to the page via props
    return { props: { rooms } }
}

export default Home
