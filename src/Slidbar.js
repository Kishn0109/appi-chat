import React,{useEffect,useState} from 'react';
import './Slidbar.css';
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from "@material-ui/icons";
import Sidebarchat from './Sidebarchat';
import db from './firebase';

function Slidbar() {
    const [rooms,setrooms]=useState([]);
    useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot=>(
            setrooms(snapshot.docs.map(doc=>
            ({
                id:doc.id,
                data:doc.data()
            })
            ))
        ))
    },[])
    return (
        <div className="sidbar">
            <div className="sidbar_header">
                <Avatar />
                <div className="sidebar_headerright">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>


                </div>
            </div>
            <div className="sidbar_search">
                <div className="sidebar_searchContainer">
                <IconButton>
                <SearchOutlined/>
                </IconButton>
                <input placeholder="search here" type="text"/>
                </div>
            </div>
            <div className="sidbar_chats">
                <Sidebarchat app/>
               {rooms.map(room=>(
                   <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
    ))}
                


            </div>
        </div>
    )
}

export default Slidbar;
