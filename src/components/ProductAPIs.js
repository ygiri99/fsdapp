import axios from "axios";

//function to get products from API
export async function getProducts() {
    try {
        const response = await axios.get(process.env.REACT_APP_BASE_API_URL);
        return (response.data);
    } catch (error) {
        console.log(`Erro while retrieving data: ${error}`);
    }
}

//function to add products to API
export async function addProduct(data) {
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_API_URL + `/products`, data);
        return response.data;
    } catch (error) {
        console.log(`Erro while adding data: ${error}`);
    }
}

//function to update product to API
export const updateProduct = async ({ data, id }) => {
    try {
        const response = await axios.put(process.env.REACT_APP_BASE_API_URL + `/products/${id}`, { data });
        return response.data;
    } catch (error) {
        console.log(`Error while updating data: ${error}`);
    }
}

//funciton to delete product to API
export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_BASE_API_URL + `/products/${id}`);
        return response.data;
    } catch (error) {
        console.log(`Error while deleting product ${error}`);

    }
}