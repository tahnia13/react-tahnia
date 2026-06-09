import axios from 'axios'

const API_URL = "https://pieaztciivjqdodnsikw.supabase.co/rest/v1/notes" // GANTI DENGAN URL API SUPABASE ANDA
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZWF6dGNpaXZqcWRvZG5zaWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDUwNzAsImV4cCI6MjA5NjUyMTA3MH0.VmTB-nmaUolfIr_Z6Bfn4Mo_717Ej44WwwVOH2pv3Oc"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    }
,

    async deleteNote(id) {
        // Supabase REST: delete by primary key using query param
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    }
}