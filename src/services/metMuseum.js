import axios from "axios";

const BASE_URL = "https://collectionapi.metmuseum.org";

const fetchAllData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/public/collection/v1/objects`);
        console.log(response)
        return response.data
    } catch(error) {
        console.log(error)
    }
};

const fetchSingleDepartmentData = async (departmentId) => {
    // acceptable params = 1-21
    try {
        const response = await axios.get(`${BASE_URL}/public/collection/v1/objects?departmentIds=${departmentId}`);
        console.log(response)
        return response.data
    } catch(error) {
        console.log(error)
    }
};

const fetchDataAfterDate = async (date) => {
    // date param = datetime e.g. YYYY-MM-DD
    try {
        const response = await axios.get(`${BASE_URL}/public/collection/v1/objects?metadataDate=${date}`);
        console.log(response)
        return response.data
    } catch(error) {
        console.log(error)
    }
};

const fetchDepartmentAndDataAfterDate = async (date, departmentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/public/collection/v1/objects?metadataDate=${date}&departmentIds=${departmentId}`);
        console.log(response)
        return response.data
    } catch(error) {
        console.log(error)
    }
};

const fetchDataById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/public/collection/v1/objects/${id}`);
        console.log(response)
        return response.data
    } catch(error) {
        console.log(error)
    }
};

const fetchAllDeparmentsList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/public/collection/v1/departments`);
        console.log(response)
        return response.data
    } catch(error) {
        console.log(error)
    }
};

const fetchDataBySearchQuery = async (search) => {
    try{
        const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`)
        console.log(response)
        return response.data
    } catch(error) {
        console.log(error)
    }
}

export default {
    fetchAllData,
    fetchSingleDepartmentData,
    fetchDataAfterDate,
    fetchDepartmentAndDataAfterDate,
    fetchDataById,
    fetchAllDeparmentsList,
    fetchDataBySearchQuery
};