import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../../store/slices/authSlice"
import { resetErrors, setError } from "../../store/slices/errorsSlice"
import userAPI from "../../apis/user-api"
import { toast } from "react-toastify"

export const useAuth = () => {
    const { status, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const checkLoginStatus = async () => {
        try {
            const data = localStorage.getItem('user')
            const jsonData = await JSON.parse(data)
            if(jsonData!==null){
                dispatch(login(jsonData))
                localStorage.setItem('user', JSON.stringify(data))
            }
        } catch (error) {
            dispatch(setError('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(resetErrors())
            }, 100);
        }
    }

    const doLogin = async (email, password) => {
        dispatch(resetErrors())
        try {
            const user = { 
                email,
                password
            }
            const { data } = await userAPI.post('/login', user)
            dispatch(login(data))
            localStorage.setItem('user', JSON.stringify(data))
        } catch (e) {
            toast.error('Login failed. Please check email and password.')
            console.log(e)
            dispatch(setError(e.message))
        }
    }

    const doLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout())
    }

    const doRegister = async (name, surname, email, password) => {
        dispatch(resetErrors())
        try {
            const user = { name, surname, email, password }
            const { data } = await userAPI.post('/register', user)
            dispatch(login(data))
            localStorage.setItem('user', JSON.stringify(data))
        } catch (e) {
            toast.error(e.message)
            console.log(e)
            dispatch(setError(e.message))
        }
    }
 
    return{
        user,
        status,
        checkLoginStatus,
        doLogout,
        doLogin,
        doRegister,
    }
}