import axios from 'axios'

const api = axios.create({
    baseURL: ' http://localhost:3000'
})

export const crearDatos = (datos) => {
    return api.post('/datos', datos)
}

export const obtenerDatos = () => {
    return api.get('/datos')
}

export const actualizarDatos = (id, datos) => {
    return api.put(`/datos/${id}`, datos)
}

export const eliminarDatos = (id) => {
    return api.delete(`/datos/${id}`)
}