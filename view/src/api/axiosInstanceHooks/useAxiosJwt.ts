import axios from 'axios';

const useAxiosJwt = () => {
    //const { jwt, setJwt } = useContext(JwtContext);
    const BASE_URL = import.meta.env.VITE_API_URL;

    const authApi = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        // headers : {
        //     'Authorization' : `${jwt}`,
        // }
    });

    authApi.interceptors.response.use((response) => {
        // if (response.headers && response.headers['authorization']) {
        //     const jwtStr : string = response.headers['authorization'];
        //     setJwt(jwtStr);
        // }
        return response;
    }, (error) => {
        return error.response;
    });

    return authApi;
};

export default useAxiosJwt;