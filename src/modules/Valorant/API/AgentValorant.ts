import axios from 'axios'

const agentValorantApi = axios.create({
  baseURL: 'https://valorant-api.com/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export { agentValorantApi }
