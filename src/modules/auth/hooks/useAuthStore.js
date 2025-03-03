import { useDispatch, useSelector } from "react-redux"
import { onChecking, onLogin, onLogout } from "../../../store/auth/authSlice";
import api from "../../../api/api";


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch(onChecking())
        try {
            const { data } = await api.post('login/', { email, password })
            localStorage.setItem('access_token', data.access)
            localStorage.setItem('refresh_token', data.refresh)

            const userData = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                status: data.status,
                is_active: data.is_active,
                is_admin: data.is_admin
            };
            localStorage.setItem('user_info', JSON.stringify(userData));
            dispatch(onLogin(userData))
        }catch (error) {
            dispatch(onLogout(error.response.data.error))
        }
    }

    const checkoutToken = async() => {
        const refreshToken = localStorage.getItem('refresh_token')
        const userInfoStr = localStorage.getItem('user_info');

        if (!refreshToken) return dispatch(onLogout());
        if (userInfoStr) {
            try {
                const userInfo = JSON.parse(userInfoStr);
                dispatch(onLogin(userInfo));
            } catch (e) {
                console.error("Error al analizar la información del usuario desde localStorage");
            }
        }

        try {
            const { data } = await api.post('token/refresh/', { refresh: refreshToken})
            if (data.first_name || data.email) {
                const userData = {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    status: data.status,
                    is_active: data.is_active,
                    is_admin: data.is_admin
                };
                localStorage.setItem('user_info', JSON.stringify(userData));
                dispatch(onLogin(userData));
            } else if (data.user) {
                localStorage.setItem('user_info', JSON.stringify(data.user));
                dispatch(onLogin(data.user));
            }
        } catch {
            localStorage.clear();
            dispatch(onLogout())
        }
    }

    const startLogout = async() => {
        localStorage.clear();
        dispatch(onLogout())
    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        startLogout,
        checkoutToken
    }
}