import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import Joi from "joi-browser";
import  api from "../api/baseUrl";
import Input from "./Input";
const Login = ({onLogin}) => {


    const navigate = useNavigate();
    const [login,setLogin] = useState({username: '', password: ''});
    const [errors,setErrors] = useState({username:''});


    const schema = {
        username  : Joi.string().required().label("UserName"),
        password  : Joi.string().required().label("Password")
    }


    const validateLogin = () => {
        const {error} = Joi.validate(login,schema,{abortEarly:false});
        if(!error) return null;

        const loginError = {};
        for(let item of error.details)
        loginError[item.path[0]] = item.message;
        
        return loginError;
        
    }

    const handleLogin = async() => {
        const errors = validateLogin();
        setErrors({...errors,errors: errors || {} });
        if(errors) return;

        const userLogin = {
            username: login.username,
            password: login.password
        }

        try {
           
          const {data} = await api.post('/auth',userLogin);
          localStorage.setItem('token',data);
          const status = localStorage.getItem('status');
          if(!status){
              localStorage.setItem('status',JSON.stringify(true));
              onLogin();
          }
          
          setLogin('');
          navigate('/dashboard',{replace:true});
         
        } catch (err) {
          // setLoading(false);
           if(err.response && err.response.status === 400){
              setErrors({...errors,username:err.response.data.message})

           }
          
        }


    }

    const validateProperty = ({name,value}) => {
    //const { name, value } = event.target;
    const obj = {[name]:value};
         const subSchema = {[name]: schema[name]}
         const {error} = Joi.validate(obj,subSchema);
         return error ? error.details[0].message : null;
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
        let loginData = { ...login };
        loginData[input.name] = input.value;
        setLogin(loginData);
        setErrors(errorData);
        //setSignUp({...signUp,[input.name]: input.value});
        //setErrors({...errors,errors})
    };


  return (
    <div className='login-form'>
        <h2 className="login-title">Login Form</h2>
        <form onSubmit={(e)=> e.preventDefault()}>

            <Input 
               type = "text"
               name  = "username"
               label = "Username"
               onChange = {handleChange}
               value = {login.username}
               placeholder = "Enter your Username"
               error = {errors.username}
            />
            <Input 
               type = "password"
               name  = "password"
               label = "Password"
               onChange = {handleChange}
               value = {login.password}
               placeholder = "Enter your password"
               error = {errors.password}
            />

            <div className="mb-3">
                <button type="submit" onClick={handleLogin} className="btn btn-primary mt-3 login-btn">Login</button>
            </div>
            <div className='underline'></div>
            <div className="mb-3">
                 <Link to="/signup">
                    <button type="submit" className="btn btn-secondary mt-3 login-btn">signUp</button>
                 </Link>
            </div>
        </form>
    </div>    
  )
}

export default Login