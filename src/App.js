import {useState,useEffect} from "react";
import {Routes,Route} from "react-router-dom";
import jwtDecode from "jwt-decode";
// import { Buffer } from "buffer";
//import Joi from "joi-browser";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
// import Loading from "./components/Loading";
import  api from "./api/baseUrl";



function App() {

  const [isLogin,setIsLogin]            = useState(JSON.parse(localStorage.getItem('status')) || false);
  const [username,setUsername]          = useState({});
  const [allUser,setAllUser]            = useState([]);
  const [updateUser,setUpdateUser]      = useState([]);

  useEffect(() => {

        const getAllUser = async() => {

           try {
            const response = await api.get('/users');
            //console.log(response.data);
            setAllUser(response.data);
           } catch (error) {
             console.log(error);
           }

        }
        getAllUser();

        const getUpdateUser = async() => {

          try {
           const response = await api.get('/update');
           console.log(response.data);
           setUpdateUser(response.data);
          } catch (error) {
            console.log(error);
          }

       }
       getUpdateUser();

  },[]);

  useEffect(() => {
    const token  =  localStorage.getItem('token');  
    if(token){
      const username  = jwtDecode(token);
      setUsername({username});
    } 
    
  },[isLogin])

  return (
       <div className="app">
              {/* {updateUser.map((update,index) => {
                 const {imageBase64} = update;
                 
                 console.log(encode(imageBase64,'base64'));
                 
                //  console.log(data)
                //  return <img key={index} src={imageBase64} alt=""/>
              })} */}
              <Routes>
                { console.log(isLogin)}
                  {isLogin && <Route path="/dashboard" element={<Dashboard  allUser = {allUser} user = {username} onLogOut = {() => setIsLogin(!isLogin)}/>}/>}
                  <Route path="/" element={<Login onLogin ={() => setIsLogin(!isLogin)} />}/>
                  <Route path="/signup" element={<SignUp onLogin ={() => setIsLogin(!isLogin)}/>} />
                  <Route path="*" element={<NotFound/>}/>
              </Routes>
          
       </div>
  );
}

export default App;
