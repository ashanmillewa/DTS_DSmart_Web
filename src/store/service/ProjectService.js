import axios from "axios";

const GetProjectDetails = async () => {
    let config = {
        method: "get",
        url: `https://esystems.cdl.lk/backend-Test/InventoryManagement/GetProjectDetails`,
    };
    return await axios.request(config).then((response) => {
        return response;
    });
};

export default {
    GetProjectDetails,
};