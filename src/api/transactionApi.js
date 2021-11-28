import axios from 'axios'

const transactionApi = axios.create({
	baseURL: 'https://budget-vue-app-13ca5-default-rtdb.firebaseio.com/'
})

export default transactionApi
