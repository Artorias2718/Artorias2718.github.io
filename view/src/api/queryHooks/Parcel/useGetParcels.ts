import useAxiosJwt from '../../axiosInstanceHooks/useAxiosJwt';
import { useQuery } from '@tanstack/react-query';
import type { IParcelRead } from '@/Types';
const useGetParcelsKey = () => {
    const key = ['Parcels'];
    return key;
}

const useGetParcels = () => {
    const api = useAxiosJwt();
    const key = useGetParcelsKey();

    const fetchFn = async() => {
        const result = await api.get<IParcelRead[]>('parcel/GetParcels');
        return result.data;
    };

    return useQuery({ queryKey: key, queryFn: fetchFn });
}

export default useGetParcels;