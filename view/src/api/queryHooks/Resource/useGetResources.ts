import useAxiosJwt from '../../axiosInstanceHooks/useAxiosJwt';
import { useQuery } from '@tanstack/react-query';
import type { IResourceGroupRead } from '@/Types';
const useGetResourcesKey = () => {
    const key = ['Resources'];
    return key;
}

const useGetResources = () => {
    const api = useAxiosJwt();
    const key = useGetResourcesKey();

    const fetchFn = async() => {
        const result = await api.get<IResourceGroupRead[]>('resource/GetResources');
        return result.data;
    };

    return useQuery({ queryKey: key, queryFn: fetchFn });
}

export default useGetResources;