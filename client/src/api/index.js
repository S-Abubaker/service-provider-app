import axios from 'axios'

const url = 'your backend_url'

export const getProviders = () => axios.get(`${url}/api/providers`)
export const addProvider = (newProvider) => axios.post(`${url}/api/providers`, newProvider)
export const deleteProvider = (id) => axios.delete(`${url}/api/providers/${id}`)
export const updateProvider = (id, updatedProvider) => axios.patch(`${url}/api/providers/${id}`, updatedProvider)