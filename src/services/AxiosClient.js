import axios from "axios";

class AxiosClient {

    async getData(url) {
        return await axios.get(url);
    }
    async postData(url, data) {
        return await axios.post(url, data);
    }
    async updateData(url, data) {
        return await axios.put(url, data);
    }
    async delete(url) {
        return await axios.delete(url);
    }

}

export default new AxiosClient();