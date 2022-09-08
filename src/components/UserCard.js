import userDefault from "../userDefault.png";
import api from "../api/baseUrl";


const UserCard = ({user,onShow}) => {




    const {user_id,username,firstname,lastname} = user;

    const handleDelete = async(id) => {
       try {
          await api.delete(`/users/${id}`);
          window.location.reload(false)
       } catch (error) {
           console.log(error);
       }
    }

  return (
    <div className="card" style={{width: "18rem"}}>
        <img  className = "userImage" src = {userDefault} alt="default" />
        <div className="card-body">
            <h5 className="card-title">Username: {username}</h5>
            <p className="card-text">Name: {firstname + ' ' + lastname}</p>
             <div className="text-center">
                <button className="btn btn-primary m-2" onClick={onShow}>Update</button>
                <button className="btn btn-danger" onClick = {() => handleDelete(user_id)}>Delete</button>
             </div>
        </div>
  </div>
  )
}

export default UserCard