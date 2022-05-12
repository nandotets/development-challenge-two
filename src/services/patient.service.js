import axios from 'axios';

export const getAllPatient = () => new Promise((resolve, reject) => {
    axios.get("https://z7jbh88ouj.execute-api.sa-east-1.amazonaws.com/medcloud-challenge/patient", {
        headers: {}
    }).then((res) => {
        // return a response data
        if (res.data.errorType) {
            reject(res.data.errorMessage);
        }
        resolve(res.data);
    }).catch((error) => {
        // return only error message
        reject(error.message);
    })
})

export const addPatient = (patient) => new Promise((resolve, reject) => {
    axios.post("https://z7jbh88ouj.execute-api.sa-east-1.amazonaws.com/medcloud-challenge/patient", patient,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((res) => {
        // return a response data
        if (res.data.errorType) {
            reject(res.data.errorMessage);
        }
        resolve(res.data);
    }).catch((error) => {
        // return only error message
        reject(error.message);
    })
})

export const updatePatient = (patient) => new Promise((resolve, reject) => {
    axios.put(`https://z7jbh88ouj.execute-api.sa-east-1.amazonaws.com/medcloud-challenge/patient`, { patient }).then((res) => {
        // return a response data
        if (res.data.errorType) {
            reject(res.data.errorMessage);
        }
        resolve(res.data);
    }).catch((error) => {
        // return only error message
        reject(error.message);
    })
})

export const deletePatient = (id) => new Promise((resolve, reject) => {
    axios.delete(`https://z7jbh88ouj.execute-api.sa-east-1.amazonaws.com/medcloud-challenge/patient/${id}`, {}).then((res) => {
        // return a response data
        if (res.data.affectedRows < 1) {
            reject(res.data.errorMessage);
        }
        resolve(res.data);
    }).catch((error) => {
        // return only error message
        reject(error.message);
    })
})
