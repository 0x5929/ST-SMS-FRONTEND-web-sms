import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function useLogin (AuthContext) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    // this will replace handleSubmit 
    const handleLogin = (event) => {

        // from mui
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });

        // custom implementation
        auth.login(data).then(()=>{
            console.log(auth)
            navigate('/')
        });
    }

    // login form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
    };



        return {
            handleSubmit,
            handleLogin,

        }
}