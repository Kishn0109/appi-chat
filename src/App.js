import React,{useState} from "react"
import './App.css';
import Chat from "./Chat";
import Slidbar from './Slidbar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './Login'
import {useStateValue} from './StateProvider';
function App(){
  // const [user,setuser]=useState(null);
  const [{user},dispatch]=useStateValue();

  return(
    <div className="app">
    {!user ? (
      <Login/>
    ):(
       <div className="app_body"> 
      <Router>
          <Slidbar/>
         <Switch>
       
            <Route path="/room/:roomId">   <Chat/>  </Route>
            <Route path="/">   <Chat/> </Route>
        
        
        </Switch>
      </Router>
      </div>
    )}
    </div>
     
  );
}

export default App;
