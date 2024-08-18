import axios from "axios";

export const GetBinCardDetails = async (MaterialCode,LocationCode) => {
    let config = {
        method: "get",        
        url: `https://esystems.cdl.lk/backend-Test/InventoryManagement/Materials/GetBinTransDetails?loc=${LocationCode}&matcode=${MaterialCode}`,
        // url: "https://esystems.cdl.lk/backend-Test/InventoryManagement/Materials/GetBinTransDetails?loc=BIN&matcode=MED00001",
    };
    return await axios.request(config).then((response) => {
        return response;
    });
};

export default {
    GetBinCardDetails,
};