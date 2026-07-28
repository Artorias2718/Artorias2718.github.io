import { createContext } from 'react';
// eslint-disable-next-line @typescript-eslint/no-empty-function
export default createContext<{jwt: string | null, setJwt: (jwt: string | null) => void }>({jwt: null, setJwt: () =>{}});