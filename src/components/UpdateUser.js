import {useState} from "react";
// import {useNavigate} from "react-router-dom";
import Joi from "joi-browser";
import  api from "../api/baseUrl";
import { Buffer } from "buffer";
import Input from "./Input";
import UploadImage from "./UploadImage";




const UpdateUser = () => {

    // const navigate = useNavigate();
    const [updateUser,setupdateUser] = useState({
        firstname: '',
        lastname: '',
        username: ''
    });
    
    const [base64URL,setBase64URL] = useState("");
    const [errors,setErrors] = useState({username: ''});
    
    const schema = {
        username  : Joi.string().min(4).max(20).required().label("UserName"),
        firstname : Joi.string().min(4).max(20).required().label("FirstName"),
        lastname  : Joi.string().min(4).max(20).required().label("LastName")
    }
    
    const validateupdateUser = () => {
        const {error} = Joi.validate(updateUser,schema,{abortEarly:false});
        if(!error) return null;
        const updateUserError = {};
        for(let item of error.details)
        updateUserError[item.path[0]] = item.message;
        
        return updateUserError;
        
    }
    
    const validateProperty = ({name,value}) => {
        //const { name, value } = event.target;
        const obj = {[name]:value};
             const subSchema = {[name]: schema[name]}
             const {error} = Joi.validate(obj,subSchema);
             return error ? error.details[0].message : null;
    }
            
    const handleSubmit = async(e) => {
               
        e.preventDefault();
        const errors = validateupdateUser();

        setErrors({...errors,errors: errors || {} });
        if(errors) return;


        const newUser = {
            username    : updateUser.username,
            firstname   : updateUser.firstname,
            lastname    : updateUser.lastname,
            image       : base64URL
        }

        console.log('baseUrl',newUser.image);

        try {
            const response = await api.post("/update",newUser);
            console.log(response);
            
        } catch (err) {
             if(err.response && err.response.status === 409){
                  setErrors({...errors,username: err.response.data.message})
             }
             if(err.response && err.response.status === 400){
                console.log("validation error")
             }
        }        
                
    }
            
            
            
            const handleChange = ({target: input}) => {
                //const { name, value } = event.target;
                let errorData = { ...errors };
                const errorMessage = validateProperty(input);
                if (errorMessage) {
                    errorData[input.name] = errorMessage;
                } else {
                    delete errorData[input.name];
                }
                let updateUserData = { ...updateUser };
                updateUserData[input.name] = input.value;
                setupdateUser(updateUserData);
                setErrors(errorData);
                //setupdateUser({...updateUser,[input.name]: input.value});
                //setErrors({...errors,errors})
            };


            const handleSelectd = (value) => {
                setBase64URL(value);
            }
        

    return (

    <div className='login-form'>

            <h2 className="login-title">updateUser Form</h2>
            <form onSubmit={handleSubmit}>
 
                    <Input 
                        type = "text"
                        name  = "username"
                        label = "Username"
                        onChange = {handleChange}
                        value = {updateUser.username}
                        placeholder = "Enter your Username"
                        error = {errors.username}
                    />

                    <Input 
                        type = "text"
                        name  = "firstname"
                        label = "Firstname"
                        onChange = {handleChange}
                        value = {updateUser.firstname}
                        placeholder = "Enter your firstname"
                        error = {errors.firstname}
                    />

                    <Input 
                        type = "text"
                        name  = "lastname"
                        label = "Lastname"
                        onChange = {handleChange}
                        value = {updateUser.lastname}
                        placeholder = "Enter your lastname"
                        error = {errors.lastname}
                    />

                    <UploadImage onSelected = {handleSelectd}/>
                    
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary mt-3 login-btn">Update</button>
                    </div>
            </form>
    </div>    
  )
}

export default UpdateUser