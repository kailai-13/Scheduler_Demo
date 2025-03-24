import axios from 'axios';

const URL = "http://localhost:5000";

export const get = async () => {
    try {
        const response = await axios.get(`${URL}/get_task`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const post = async (data) => {
    try {
        const response = await axios.post(`${URL}/add_task`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const put = async (id, data) => {
    try {
        const response = await axios.put(`${URL}/update_task/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const remove = async (id) => {
    try {
        const response = await axios.delete(`${URL}/delete_task/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getQuotes = async () => {
    try {
        const response = await axios.get(`${URL}/quote`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
