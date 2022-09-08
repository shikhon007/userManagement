import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Joi from "joi-browser";
import  api from "../api/baseUrl";
import Input from "./Input";




const CreateUser = () => {

    const navigate = useNavigate();
    const [createUser,setCreateUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: ''
    });
    
    const [errors,setErrors] = useState({username: ''});
    
    const schema = {
        firstname : Joi.string().min(4).max(20).required().label("FirstName"),
        lastname  : Joi.string().min(4).max(20).required().label("LastName"),
        email     : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label("Email"),
        username  : Joi.string().min(4).max(20).required().label("UserName"),
        password  : Joi.string().min(8).max(20).required().label("Password")
    }
    
    const validateSignUp = () => {
        const {error} = Joi.validate(createUser,schema,{abortEarly:false});
        if(!error) return null;
        const signUpError = {};
        for(let item of error.details)
        signUpError[item.path[0]] = item.message;
        
        return signUpError;
        
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
        const errors = validateSignUp();
        setErrors({...errors,errors: errors || {} });
        if(errors) return;
        
        const newUser = {
            username    : createUser.username,
            firstname   : createUser.firstname,
            lastname    : createUser.lastname,
            email       : createUser.email,
            password    : createUser.password
        }
        
        try {
            const response = await api.post("/users",newUser);
            console.log(response);
            // setErrors({});
            setCreateUser('');
            //onLogin();
            window.location.reload(false)
            
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
                let createUserData = { ...createUser };
                createUserData[input.name] = input.value;
                setCreateUser(createUserData);
                setErrors(errorData);
                //setSignUp({...signUp,[input.name]: input.value});
                //setErrors({...errors,errors})
            };
        

    return (

    <div className='login-form'>

            <h2 className="login-title">Create New User</h2>
            <form onSubmit={handleSubmit}>
 
                    <Input 
                        type = "text"
                        name  = "username"
                        label = "Username"
                        onChange = {handleChange}
                        value = {createUser.username}
                        placeholder = "Enter your Username"
                        error = {errors.username}
                    />

                    <Input 
                        type = "text"
                        name  = "firstname"
                        label = "Firstname"
                        onChange = {handleChange}
                        value = {createUser.firstname}
                        placeholder = "Enter your firstname"
                        error = {errors.firstname}
                    />

                    <Input 
                        type = "text"
                        name  = "lastname"
                        label = "Lastname"
                        onChange = {handleChange}
                        value = {createUser.lastname}
                        placeholder = "Enter your lastname"
                        error = {errors.lastname}
                    />

                    <Input 
                        type  = "email"
                        name  = "email"
                        label = "Email"
                        onChange = {handleChange}
                        value = {createUser.email}
                        placeholder = "Enter your email"
                        error = {errors.email}
                    />
                    <Input 
                        type = "password"
                        name  = "password"
                        label = "Password"
                        onChange = {handleChange}
                        value = {createUser.password}
                        placeholder = "Enter your password"
                        error = {errors.password}
                    />
                       
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary mt-3 login-btn">Create User</button>
                    </div>
            </form>
    </div>    
  )
}

export default CreateUser