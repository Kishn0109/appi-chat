
import React,{useEffect,useState} from 'react'

import "./Chat.css";
import { Avatar, Button, IconButton, Input } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {AttachFile, InsertEmoticon, Mic, SearchOutlined} from "@material-ui/icons";
import {useParams} from 'react-router-dom'
import db from './firebase'
// import userEvent from '@testing-library/user-event';
import firebase from "firebase";
// import {user} from 
import {useStateValue} from "./StateProvider";
function Chat() {
    const [send,setsend]=useState("");
    const [input,setInput]=useState("");
    const {roomId}=useParams();
    const [roomname,setroomname]=useState("");
    const [messages,setmessages]=useState([]);
    const [{user},dispatch]=useStateValue();
    useEffect(()=>{
if(roomId){
    db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
        setroomname(snapshot.data().name)
    ))
    db.collection('rooms'). doc(roomId).collection("Messages").orderBy("timestamp","asc").onSnapshot(snapshot=>{
        setmessages(snapshot.docs.map(doc=>doc.data()))
    })

}
    },[roomId])
    useEffect(()=>{
        setsend(Math.floor(Math.random()*5000));
        console.log(send);
    },[]);
    const sendMessage=(e)=>{
        e.preventDefault();
        console.log("You typeds",input);
        db.collection('rooms').doc(roomId).collection('Messages').add(
            {
                message:input,
                name:user.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            }
        )
        setInput("");
    }
    return (
        <div className="chat">
          <div className="chat_header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${send}.svg`}/>
            <div className="chat_headerinfo">
                <h3>{roomname}</h3>
                {/* <p>{new Date(messages[messages.length-1]?.timestamp?.toDate().toUTCString())}</p> */}
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
           
            </div>
              <div className="chat_heaserright">
              <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
              </div>
            </div>  
          <div className="chat_body">
              {messages.map((message)=>(
                  <p className={`chat_message ${message.name==user.displayName && 'chat_receiver'}`}>
                  <span className="chat_peoplename">{message.name}</span>
                    {message.message}
                  <span className="chat_bodytimestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                  </span>
              </p>
              ))}
              
            </div>  
          <div className="chat_search">
              <InsertEmoticon/>
              <form className="footer_form">
                  <input value={input} onChange={e=>{setInput(e.target.value)}} type="text" placeholder="Type here....."/>
                  <button onClick={sendMessage} type="submit">search</button>
              </form>
              <Mic/>
            </div>  
        </div>
    )
}

export default Chat


