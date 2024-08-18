import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';

const MaterialEntryForm = ({ initialData }) => {
  const validationSchema = yup.object({
    WearHouse_code: yup.string().required('WearHouse code is required'),
    Doc_Type: yup.string().required('Doc Type is required'),
    Doc_No: yup.string().required('Doc No is required'),
    Material_Code: yup.string().required('Material Code is required'),
    Material_Desc: yup.string().required('Material Desc is required'),
    Unit: yup.string().required('Unit is required'),
    Quantity: yup.string().required('Quantity is required'),
    Value: yup.string().required('Value is required'),
    Project: yup.string().required('Project is required'),
    Originated_By: yup.string().required('Originated By is required'),
    Date: yup.string().required('Date is required'),
    AvgRate: yup.string().required('AvgRate is required'), 
  });

  const formik = useFormik({
    initialValues: {
      WearHouse_code: initialData?.WearHouse_code || '',
      Doc_Type: initialData?.Doc_Type || '',
      Doc_No: initialData?.Doc_No || '',
      Material_Code: initialData?.Material_Code || '',
      Material_Desc: initialData?.Material_Desc || '',
      Unit: initialData?.Unit || '',
      Quantity: initialData?.Quantity || '',
      Value: initialData?.Value || '',
      Project: initialData?.Project || '',
      Originated_By: initialData?.Originated_By || '',
      Date: initialData?.Date || '',
      AvgRate: initialData?.AvgRate || '',     
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
  });

  const handleClear = () => {
    formik.resetForm({
      values: {
        WearHouse_code: '',
        Doc_Type: '',
        Doc_No: '',
        Material_Code: '',
        Material_Desc: '',
        Unit: '',
        Quantity: '',
        Value: '',
        Project: '',
        Originated_By: '',
        Date: '',
        AvgRate: '',
      },
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="WearHouse_code" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>WearHouse Code</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="WearHouse_code"
                name="WearHouse_code"
                placeholder="WearHouse_code"
                fullWidth
                value={formik.values.WearHouse_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.WearHouse_code && Boolean(formik.errors.WearHouse_code)}
                variant="outlined"
              />
              {formik.touched.WearHouse_code && formik.errors.WearHouse_code && (
                <Typography color="error">{formik.errors.WearHouse_code}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Doc_Type" sx={{ mt: 0, mb: { xs: '-10px', sm:0}}}>Doc Type</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Doc_Type"
                name="Doc_Type"
                placeholder="Doc_Type"
                fullWidth
                value={formik.values.Doc_Type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Doc_Type && Boolean(formik.errors.Doc_Type)}
                variant="outlined"
              />
              {formik.touched.Doc_Type && formik.errors.Doc_Type && (
                <Typography color="error">{formik.errors.Doc_Type}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Doc_No" sx={{ mt: 0, mb: { xs: '-10px', sm:0}}}>Doc No</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Doc_No"
                name="Doc_No"
                placeholder="Doc_No"
                fullWidth
                value={formik.values.Doc_No}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Doc_No && Boolean(formik.errors.Doc_No)}
                variant="outlined"
              />
              {formik.touched.Doc_No && formik.errors.Doc_No && (
                <Typography color="error">{formik.errors.Doc_No}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Material_Code" sx={{ mt: 0, mb: { xs: '-10px', sm:0}}}>Material Code</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Material_Code"
                name="Material_Code"
                placeholder="Material_Code"
                fullWidth
                value={formik.values.Material_Code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Material_Code && Boolean(formik.errors.Material_Code)}
                variant="outlined"
              />
              {formik.touched.Material_Code && formik.errors.Material_Code && (
                <Typography color="error">{formik.errors.Material_Code}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Material_Desc" sx={{ mt: 0, mb: { xs: '-10px', sm:0}}}>Material Desc</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Material_Desc"
                name="Material_Desc"
                placeholder="Material_Desc"
                fullWidth
                value={formik.values.Material_Desc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Material_Desc && Boolean(formik.errors.Material_Desc)}
                variant="outlined"
              />
              {formik.touched.Material_Desc && formik.errors.Material_Desc && (
                <Typography color="error">{formik.errors.Material_Desc}</Typography>
              )}
            </Grid>
            
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Unit" sx={{ mt: 0, mb: { xs: '-10px', sm:0}}}>Unit</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Unit"
                name="Unit"
                placeholder="Unit"
                fullWidth
                value={formik.values.Unit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Unit && Boolean(formik.errors.Unit)}
                variant="outlined"
              />
              {formik.touched.Unit && formik.errors.Status && (
                <Typography color="error">{formik.errors.Unit}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Quantity" sx={{ mt: 0, mb: { xs: '-10px', sm:0}}}>Quantity</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Quantity"
                name="Quantity"
                placeholder="Quantity"
                fullWidth
                value={formik.values.Quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Quantity && Boolean(formik.errors.Quantity)}
                variant="outlined"
              />
              {formik.touched.Quantity && formik.errors.Quantity && (
                <Typography color="error">{formik.errors.Quantity}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Value" sx={{ mt: 0, mb: { xs: '-10px', sm:0}}}>Value</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Value"
                name="Value"
                placeholder="Value"
                fullWidth
                value={formik.values.Value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Value && Boolean(formik.errors.Value)}
                variant="outlined"
              />
              {formik.touched.Value && formik.errors.Value && (
                <Typography color="error">{formik.errors.Value}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Project" sx={{ mt: 0, mb: { xs: '-10px', sm:0}}}>Project</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Project"
                name="Project"
                placeholder="Project"
                fullWidth
                value={formik.values.Project}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Project && Boolean(formik.errors.Project)}
                variant="outlined"
              />
              {formik.touched.Project && formik.errors.Project && (
                <Typography color="error">{formik.errors.Project}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Originated_By" sx={{ mt: 0, mb: { xs: '-10px', sm:0}}}>Originated_By</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Originated_By"
                name="Originated_By"
                placeholder="Originated_By"
                fullWidth
                value={formik.values.Originated_By}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.WearHouse_code && Boolean(formik.errors.Originated_By)}
                variant="outlined"
              />
              {formik.touched.Originated_By && formik.errors.Originated_By && (
                <Typography color="error">{formik.errors.Originated_By}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Date" sx={{ mt: 0, mb: { xs: '-10px', sm:0}}}>Date</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Date"
                name="Date"
                placeholder="Date"
                fullWidth
                value={formik.values.Date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Date && Boolean(formik.errors.Date)}
                variant="outlined"
              />
              {formik.touched.Date && formik.errors.Date && (
                <Typography color="error">{formik.errors.Date}</Typography>
              )}
            </Grid>
            
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="AvgRate" sx={{ mt: 0, mb: { xs: '-10px', sm:0}}}>AvgRate</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="AvgRate"
                name="AvgRate"
                placeholder="AvgRate"
                fullWidth
                value={formik.values.AvgRate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.AvgRate && Boolean(formik.errors.AvgRate)}
                variant="outlined"
              />
              {formik.touched.AvgRate && formik.errors.AvgRate && (
                <Typography color="error">{formik.errors.AvgRate}</Typography>
              )}
            </Grid>

          </Grid>
        </Grid>

        
        <Grid item xs={12} sm={12}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end" mt={2}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ClearAllSharpIcon />}
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                startIcon={<SaveAsIcon />}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                startIcon={<SaveAsIcon />}
              >
                Add New
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default MaterialEntryForm;
