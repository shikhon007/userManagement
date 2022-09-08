import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UpdateUser from "./UpdateUser";
import UserCard from './UserCard';
import CreateUser from "./CreateUser";



const Dashboard = ({onLogOut,user,allUser}) => {

  //const {username:name} = user.username;
  //const {username,firstname,lastname,email} = allUser;
  const navigate = useNavigate();
  const [showUser,setShowUser] = useState(false);
  const [updateUser,setUpdateUser] = useState(false);
  const [isCreate,setIsCreate] = useState(false);

  const handleLogOut = () => {
          navigate('/');
          onLogOut();
          localStorage.clear();
  }

  const handleUpdateUser = () => {
       setShowUser(false);
       setUpdateUser(true);
       setIsCreate(false);
  }

  const handleShowUser = () => {
        setShowUser(true);
        setUpdateUser(false);
        setIsCreate(false);
  }

  const handleCreateUser = () => {
    setShowUser(false);
    setUpdateUser(false);
    setIsCreate(true);
  }

  return (
     <>
     <div className='header'>
          <nav className='nav'>
                <h2>Dashboard</h2>
                <button className="logout" onClick={handleLogOut}>{Object.keys(user).length > 0  ? user.username.username : ""} Logout</button>
          </nav>
    </div>
    <div className='row menu'>
      <div className='col-auto sideber'>
        <div className="dropdown-menu-right p-2">
              <button className="btn btn-secondary mt-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                User
              </button>
              <ul className="dropdown-menu" style={{right: '0',left: 'auto'}}>
                <li className="dropdown-item" onClick={handleShowUser}>User</li>
                <li className="dropdown-item" onClick={handleCreateUser} >Create User</li>
                
              </ul>
        </div>
        {/* <div className='p-2'>
          <button className="btn btn-secondary mt-3" type="button" onClick = {() => setIsCreate(!isCreate)}>
              User
          </button>
        </div>                 */}
      </div>
      <div className='col-9'>
          <div className='alluser'>
            {showUser 
            &&  allUser.map((user) => {
              return <UserCard onShow = {handleUpdateUser} key = {user.user_id} user = {user}/>
            })}
            {updateUser && <UpdateUser />}
            {isCreate && <CreateUser />}
          </div>
      </div>
    </div>
     </>
    
  )
}

export default Dashboard