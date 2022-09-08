import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Joi from "joi-browser";
import  api from "../api/baseUrl";
import Input from "./Input";




const SignUp = () => {

    const navigate = useNavigate();
    const [signUp,setSignUp] = useState({
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
        const {error} = Joi.validate(signUp,schema,{abortEarly:false});
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
            username    : signUp.username,
            firstname   : signUp.firstname,
            lastname    : signUp.lastname,
            email       : signUp.email,
            password    : signUp.password
        }
        
        try {
            const response = await api.post("/users",newUser);
            console.log(response);
            localStorage.setItem('token',response.headers['x-auth-token']);
            // setErrors({});
            setSignUp('');
            //onLogin();
            navigate('/');
            
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
                let signUpData = { ...signUp };
                signUpData[input.name] = input.value;
                setSignUp(signUpData);
                setErrors(errorData);
                //setSignUp({...signUp,[input.name]: input.value});
                //setErrors({...errors,errors})
            };
        

    return (

    <div className='login-form'>

            <h2 className="login-title">SignUp Form</h2>
            <form onSubmit={handleSubmit}>
 
                    <Input 
                        type = "text"
                        name  = "username"
                        label = "Username"
                        onChange = {handleChange}
                        value = {signUp.username}
                        placeholder = "Enter your Username"
                        error = {errors.username}
                    />

                    <Input 
                        type = "text"
                        name  = "firstname"
                        label = "Firstname"
                        onChange = {handleChange}
                        value = {signUp.firstname}
                        placeholder = "Enter your firstname"
                        error = {errors.firstname}
                    />

                    <Input 
                        type = "text"
                        name  = "lastname"
                        label = "Lastname"
                        onChange = {handleChange}
                        value = {signUp.lastname}
                        placeholder = "Enter your lastname"
                        error = {errors.lastname}
                    />

                    <Input 
                        type  = "email"
                        name  = "email"
                        label = "Email"
                        onChange = {handleChange}
                        value = {signUp.email}
                        placeholder = "Enter your email"
                        error = {errors.email}
                    />
                    <Input 
                        type = "password"
                        name  = "password"
                        label = "Password"
                        onChange = {handleChange}
                        value = {signUp.password}
                        placeholder = "Enter your password"
                        error = {errors.password}
                    />
                       
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary mt-3 login-btn">sign up</button>
                    </div>
            </form>
    </div>    
  )
}

export default SignUp