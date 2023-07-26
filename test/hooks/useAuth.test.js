/* eslint-disable no-undef */
import { configureStore } from "@reduxjs/toolkit"
import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { notAuthenticatedState } from "../fixtures/authStates"
import { testUserCredentials } from "../fixtures/testUser"
import { authSlice } from "../../src/store/slices/authSlice"
import { useAuth } from "../../src/hooks/auth/useAuth"

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}
describe('Pruebas de useAuth', () => {
    beforeEach(()=>localStorage.clear())

    test('doLogin debe de realizar el login correctamente', async() => {
        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuth(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        await act(async()=>{
            await result.current.doLogin(testUserCredentials.email, testUserCredentials.password)
        })

        const {status, user}=result.current;
        expect({status, user}).toEqual({
            status: 'authenticated',
            user: expect.any(Object)
        })
    })

    test('startLogin debe de fallar la autenticación', async() => {
        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuth(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        await act(async()=>{
            await result.current.doLogin( "test@gmail.com", "456789")
        })
        const { status, user}=result.current;
        expect({ status, user}).toEqual({
            status: 'not-authenticated',
            user: undefined
        })
        expect(localStorage.getItem('token')).toBe(null)
        waitFor(
            ()=>expect(result.current.errorMessage).toBe(undefined)
        )
    })
})