import React from 'react';
import type {RoomsT} from '../types/roomsT'

interface props {
    rooms: RoomsT[]
}
const RenderRooms:React.FC<props>  = ({rooms}) => {
    return (
        <div style={{width:'70%', margin: '20px auto 0', height: '300px', overflowY: 'scroll'}}>
            {rooms.map((item)=>(
                <div style={{width:'100%', height:'50px', display:'flex',justifyContent:'space-between', alignItems: 'center', backgroundColor: '#D9D9D9', marginTop:'10px'}} key={item._id}>
                    <div style={{marginLeft:'20px'}}>{item.name}</div>
                    <button style={{width: '150px',display:'block', cursor:'pointer', height: '40px', borderRadius: '7px', backgroundColor:'#3AF2D1', marginRight: '40px'}}>connect</button>
                </div>
            ))}
        </div>
    );
};

export default RenderRooms;