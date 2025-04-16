import apiClient from './apiClient'

const getAllLeads = () => apiClient.get('/api/leads')

const addNewLead = (body) => apiClient.post('/api/leads', body)

const deleteLead = (id) => apiClient.delete(`/api/leads/${id}`)

const updateLead = (id, body) => apiClient.put(`/api/leads/${id}`, body)

export default {
    getAllLeads,
    addNewLead,
    deleteLead,
    updateLead
}
