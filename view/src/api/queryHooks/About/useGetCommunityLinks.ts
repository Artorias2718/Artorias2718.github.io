import useAxiosJwt from '../../axiosInstanceHooks/useAxiosJwt';
import { useQuery } from '@tanstack/react-query';
import type { ICommunityLinkRead } from '@/Types';
const useGetCommunityLinksKey = () => {
    const key = ['CommunityLinks'];
    return key;
}

const useGetCommunityLinks = () => {
    const api = useAxiosJwt();
    const key = useGetCommunityLinksKey();

    const fetchFn = async() => {
        const result = await api.get<ICommunityLinkRead[]>('about/GetCommunityLinks');
        return result.data;
    };

    return useQuery({ queryKey: key, queryFn: fetchFn });
}

export default useGetCommunityLinks;