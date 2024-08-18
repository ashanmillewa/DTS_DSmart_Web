import axios from "axios";

export const GetStockBalance = async () => {
    let config = {
        method: "get",
        url: "https://esystems.cdl.lk/backend-Test/InventoryManagement/Materials/GetStockBalance",
    };
    return await axios.request(config).then((response) => {
        return response;
    });
};

export default {
    GetStockBalance,
};