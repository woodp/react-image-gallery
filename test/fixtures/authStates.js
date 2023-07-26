export const initialState= {
    status: 'checking',
    user: undefined,
    images: [],
}
export const authenticatedState= {
    status: 'authenticated',
    user:{
        email:"franco@gmail.com",
    },
    images: [],
}
export const notAuthenticatedState= {
    status: 'not-authenticated',
    user: undefined,
    images: [],
}