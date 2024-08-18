import axios from 'axios';

const GetProjectMatCostService = (startDate, endDate) => {
  return axios
    .get(
      `Admin/ProjectMaterialCostDetails/GetProjectMaterialCostDetails?startDate=${startDate}&endDate=${endDate}`,
    )
    .then((response) => {
      return response.data;
    });
};

const ProjectMatCostService = {
  GetProjectMatCostService,
};

export default ProjectMatCostService;
