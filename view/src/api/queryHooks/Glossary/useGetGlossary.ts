import useAxiosJwt from '../../axiosInstanceHooks/useAxiosJwt';
import { useQuery } from '@tanstack/react-query';
import type { IFAQGroupRead } from '@/Types';
const useGetFAQsKey = () => {
    const key = ['FAQs'];
    return key;
}

const useGetFAQs = () => {
    const api = useAxiosJwt();
    const key = useGetFAQsKey();

    const fetchFn = async() => {
        const result = await api.get<IFAQGroupRead[]>('faq/GetFAQs');
        //console.log(result.data);
        return result.data;
    };

    return useQuery({ queryKey: key, queryFn: fetchFn });
}

export default useGetFAQs;