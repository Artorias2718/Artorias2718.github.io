import useAxiosJwt from '../../axiosInstanceHooks/useAxiosJwt';
import { useQuery } from '@tanstack/react-query';
import type { IGlossaryRead } from '@/Types';
const useGetGlossaryKey = () => {
    const key = ['Glossary'];
    return key;
}

const useGetGlossary = () => {
    const api = useAxiosJwt();
    const key = useGetGlossaryKey();

    const fetchFn = async() => {
        const result = await api.get<IGlossaryRead[]>('glossary/GetGlossary');
        return result.data;
    };

    return useQuery({ queryKey: key, queryFn: fetchFn });
}

export default useGetGlossary;