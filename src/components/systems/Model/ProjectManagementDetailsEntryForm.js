import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import {
  GetProjects,
  InsertProject,
  UpdateProjectDetails,
  GetProjectCategories,
} from 'src/store/systems/projectManagement/ProjectManagerSlice';
import * as yup from 'yup';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';


const categoryOptions = [
  {value: "BI", label: "BINGIRIYA"},
  {value: "CF", label: "CEVITA FARM"},
  {value: "FR", label: "FARMERS"},
  {value: "KU", label: "KUMARAKATTUWA"},
  {value: "MS", label: "MAIN STORE"},
  {value: "PF", label: "PALEICHOLEI FARM"},
  {value: "PP", label: "POULTRY PROCESSING SYSTEM"},
  {value: "SW", label: "SAMAN WATHTHA"},
  {value: "TA", label: "TRANSPORT - COACHES"},
  {value: "TB", label: "TRANSPORT- BIRD COLLECTION"},
  {value: "TC", label: "TRANSPORT- CHICKEN DELIVERY"},
  {value: "TH", label: "THARAWILLUWA"},
  {value: "TK", label: "TRANSPORT - CHICKS DELIVERY"},
  {value: "TO", label: "TRANSPORT - OTHER VEHICLES"},
  {value: "TR", label: "TRANSPORT - FEED DELIVERY"},
  {value: "TT", label: "TEST"},
  {value: "TW", label: "TRANSPORT"},
  {value: "WE", label: "WEERAPOKUNA"},
  {value: "WK", label: "WEERAKODIYANA"},
];


const ProjectManagementDetailsEntryForm = ({ initialData, handleCloseEntryForm }) => {
  const dispatch = useDispatch();
  // const projectCategories = useSelector((state) => state.ProjectManager.projectCategories);

  useEffect(() => {
    dispatch(GetProjectCategories());
  }, [dispatch]);

  const validationSchema = yup.object({
    projectid: initialData ? yup.string().required('Project ID is required') : yup.string(),
    projectname: yup.string().required('Project Name is required'),
    projectspecification: yup.string().required('Project Specification is required'),
    projectmanager: yup.string().required('Project Manager is required'),
    status: yup.string().required('Status is required'),
    ...(initialData
      ? {}
      : {
          category: yup.string().required('Category is required'),
        }),
  });

  const formik = useFormik({
    initialValues: {
      category: initialData?.category || '',
      projectid: initialData?.projectid || '',
      projectname: initialData?.projectname || '',
      projectspecification: initialData?.projectspecification || '',
      projectmanager: initialData?.projectmanager || '',
      status: initialData?.status || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          ProjectName: values.projectname,
          ProjectSpec: values.projectspecification,
          ProjManager: values.projectmanager,
          Status: values.status,
          ProCat: values.category,
        };

        if (initialData) {
          payload.ProjectID = values.projectid;
          await dispatch(UpdateProjectDetails(payload));
        } else {
          await dispatch(InsertProject(payload));
        }

        dispatch(GetProjects());
        handleCloseEntryForm();
        formik.resetForm({
          values: {
            category: '',
            projectid: '',
            projectname: '',
            projectspecification: '',
            projectmanager: '',
            status: '',
          },
        });
      } catch (error) {
        console.error('Failed to save project details', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      }
    },
  });

  const handleClear = () => {
    formik.resetForm({
      values: {
        category: '',
        projectid: '',
        projectname: '',
        projectspecification: '',
        projectmanager: '',
        status: '',
      },
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>

          {initialData && (
              <>
                <Grid item xs={12} sm={4} display="flex" alignItems="center">
                  <CustomFormLabel htmlFor="projectid" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Project ID</CustomFormLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <CustomTextField
                    id="projectid"
                    name="projectid"
                    placeholder=" Project ID"
                    fullWidth
                    value={formik.values.projectid}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.projectid && Boolean(formik.errors.projectid)}
                    InputProps={{ readOnly: true }}
                  />
                  {formik.touched.projectid && formik.errors.projectid && (
                    <Typography color="error">{formik.errors.projectid}</Typography>
                  )}
                </Grid>
              </>
            )}

            {!initialData && (
              <>
                <Grid item xs={12} sm={4} display="flex" alignItems="center">
                  <CustomFormLabel htmlFor="Category" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Project Category</CustomFormLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Select
                    id="category"
                    name="category"
                    placeholder='Select category'
                    fullWidth
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Select Category</MenuItem>
                    {categoryOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                  {formik.touched.category && formik.errors.category && (
                    <Typography color="error">{formik.errors.category}</Typography>
                  )}
                </Grid>
              </>
            )}

            {/* <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="category" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                Project category
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Select
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.category && Boolean(formik.errors.category)}
                fullWidth
                displayEmpty
              >
                <MenuItem value="" disabled>Select category</MenuItem>
                {categoryOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <Typography color="error">{formik.errors.category}</Typography>
              )}
            </Grid> */}
{/*           
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="projectid" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                Project ID
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="projectid"
                name="projectid"
                placeholder="Project ID"
                fullWidth
                value={formik.values.projectid}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.projectid && Boolean(formik.errors.projectid)}
              />
              {formik.touched.projectid && formik.errors.projectid && (
                <Typography color="error">{formik.errors.projectid}</Typography>
              )}
            </Grid> */}

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="projectname" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                Project Name
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="projectname"
                name="projectname"
                placeholder="Project Name"
                fullWidth
                value={formik.values.projectname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.projectname && Boolean(formik.errors.projectname)}
              />
              {formik.touched.projectname && formik.errors.projectname && (
                <Typography color="error">{formik.errors.projectname}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Status" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                Status
              </CustomFormLabel>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Select
                id="status"
                name="status"
                placeholder="Select Status"
                fullWidth
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
              >
                <MenuItem value="A">Active</MenuItem>
                <MenuItem value="I">Inactive</MenuItem>
              </Select>
              {formik.touched.status && formik.errors.status && (
                <Typography color="error">{formik.errors.status}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel
                htmlFor="projectspecification"
                sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}
              >
                Project Specification
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="projectspecification"
                name="projectspecification"
                placeholder="Project Specification"
                fullWidth
                value={formik.values.projectspecification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.projectspecification && Boolean(formik.errors.projectspecification)
                }
              />
              {formik.touched.projectspecification && formik.errors.projectspecification && (
                <Typography color="error">{formik.errors.projectspecification}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="projectmanager" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                Project Manager
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="projectmanager"
                name="projectmanager"
                placeholder="Project Manager"
                fullWidth
                value={formik.values.projectmanager}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.projectmanager && Boolean(formik.errors.projectmanager)}
              />
              {formik.touched.projectmanager && formik.errors.projectmanager && (
                <Typography color="error">{formik.errors.projectmanager}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="right" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<ClearAllSharpIcon />}
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button type="submit" variant="contained" color="primary" startIcon={<SaveAsIcon />}>
          {initialData ? 'Update' : 'Save'}
        </Button>
      </Stack>
    </form>
  );
};

export default ProjectManagementDetailsEntryForm;
