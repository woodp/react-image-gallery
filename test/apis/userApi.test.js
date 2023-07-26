/* eslint-disable no-undef */
import userAPI from "../../src/apis/user-api"

describe('Pruebas de userAPI', () => {
    test("Debe de tener el baseURL correcto",()=>{
        expect(userAPI.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })
 })