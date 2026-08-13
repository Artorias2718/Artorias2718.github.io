import useAxiosJwt from '../../axiosInstanceHooks/useAxiosJwt';
import { useQuery } from '@tanstack/react-query';
import type { IRegionTierTableRead } from '@/Types';
const useGetRegionTiersKey = () => {
    const key = ['RegionTiers'];
    return key;
}

const useGetRegionTiers = () => {
    const api = useAxiosJwt();
    const key = useGetRegionTiersKey();

    const fetchFn = async() => {
        const result = await api.get<IRegionTierTableRead[]>('boosttier/GetRegionTiers');
        return result.data;
    };

    return useQuery({ queryKey: key, queryFn: fetchFn });
}

export default useGetRegionTiers;