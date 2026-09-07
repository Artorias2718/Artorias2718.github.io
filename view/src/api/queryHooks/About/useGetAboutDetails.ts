import useAxiosJwt from '../../axiosInstanceHooks/useAxiosJwt';
import { useQuery } from '@tanstack/react-query';
import type { IAboutDetailRead } from '@/Types';
const useGetAboutDetailsKey = (includeIcons: boolean) => {
    const key = ['AboutDetails', includeIcons];
    return key;
}

const useGetAboutDetails = (includeIcons: boolean) => {
    const api = useAxiosJwt();
    const key = useGetAboutDetailsKey(includeIcons);

    const fetchFn = async() => {
        const result = await api.get<IAboutDetailRead[]>(`about/GetAboutDetails?includeIcons=${includeIcons}`);
        return result.data;
    };

    return useQuery({ queryKey: key, queryFn: fetchFn });
}

export default useGetAboutDetails;