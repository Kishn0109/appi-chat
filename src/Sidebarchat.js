import React,{useEffect,useState} from 'react'
import './Siderbarchat.css';
import { Avatar } from "@material-ui/core";
import db from './firebase'
import {Link} from "react-router-dom"

function Sidebarchat({app,id,name}) {
    const [send,setsend]=useState("");
     const [messages, setMessages] = useState("");
    useEffect(() => {
            if(id){
                db.collection('rooms').doc(id).collection('Messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                })
            }
        }, [id]);

    useEffect(()=>{
        setsend(Math.floor(Math.random()*5000));
        console.log(send);
    },[]);
    const creatchat=()=>{
        const roomName=prompt("Please enter your name ");
        if(roomName){
            db.collection('rooms').add({
                name: roomName,

            })
        }
    }

    return ! app?(
        <Link to={`/room/${id}`}>
        
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${send}.svg`}/>
            <div className="sidebarchat_info">
                <h2>{name}</h2>
                 <p>{messages[0]?.message}</p>


            </div>
            
        </div>
        </Link>
    ):(
        <div onClick={creatchat} className="sidebarChat" id="text">
        <h2>Add New group</h2>

         </div>
    )
}

export default Sidebarchat
