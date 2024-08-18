import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Button, Grid, MenuItem, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetLoadUnitsWHDetails, insertWarehouseEntry } from 'src/store/systems/materialCatalogue/MaterialDetailsSlice';
import * as yup from 'yup';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';

const MaterialDetailsForm = ({ initialData }) => {
  const dispatch = useDispatch();
  const { loadUnitsWH = [], error = '' } = useSelector((state) => state.materialCatalogue) || {};

  useEffect(() => {
    dispatch(GetLoadUnitsWHDetails());
  }, [dispatch]);

  const enhancedLoadUnitsWH = [{ LocCode: 'STM', LocName: 'STM' }, ...loadUnitsWH];

  const validationSchema = yup.object({
    LocCode: yup.string().required('Location Code is required'),
    MatCode: yup.string().required('Material Code is required'),
    BinLocation: yup.string().required('Bin Location is required'),
    RecLevel: yup.string().required('Re-Order Level is required'),
  });

  const formik = useFormik({
    initialValues: {
      LocCode: initialData?.LocCode || '',
      MatCode: initialData?.MatCode || '',
      BinLocation: initialData?.BinLocation || '',
      RecLevel: initialData?.RecLevel || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      dispatch(insertWarehouseEntry(values));
    },
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6} container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={3} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="LocCode" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Location Code</CustomFormLabel>
          </Grid>
          <Grid item xs>
            <CustomTextField
              select
              id="LocCode"
              name="LocCode"
              fullWidth
              value={formik.values.LocCode}
              onChange={formik.handleChange}
              error={formik.touched.LocCode && Boolean(formik.errors.LocCode)}
              helperText={formik.touched.LocCode && formik.errors.LocCode}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Location Code</MenuItem>
              {enhancedLoadUnitsWH?.map((unit) => (
                <MenuItem key={unit.LocCode} value={unit.LocCode}>
                  {unit.LocName}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={3} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="MatCode" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Material Code</CustomFormLabel>
          </Grid>
          <Grid item xs>
            <CustomTextField
              id="MatCode"
              name="MatCode"
              variant="outlined"
              fullWidth
              value={formik.values.MatCode}
              onChange={formik.handleChange}
              error={formik.touched.MatCode && Boolean(formik.errors.MatCode)}
              helperText={formik.touched.MatCode && formik.errors.MatCode}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={3} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="BinLocation" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Bin Location</CustomFormLabel>
          </Grid>
          <Grid item xs>
            <CustomTextField
              id="BinLocation"
              name="BinLocation"
              placeholder="Bin Location"
              fullWidth
              value={formik.values.BinLocation}
              onChange={formik.handleChange}
              error={formik.touched.BinLocation && Boolean(formik.errors.BinLocation)}
              helperText={formik.touched.BinLocation && formik.errors.BinLocation}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={3} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="RecLevel" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Re-Order Level</CustomFormLabel>
          </Grid>
          <Grid item xs>
            <CustomTextField
              id="RecLevel"
              name="RecLevel"
              placeholder="Record Level"
              fullWidth
              value={formik.values.RecLevel}
              onChange={formik.handleChange}
              error={formik.touched.RecLevel && Boolean(formik.errors.RecLevel)}
              helperText={formik.touched.RecLevel && formik.errors.RecLevel}
            />
          </Grid>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: '30px',
        }}
      >
        <Button
          type="reset"
          variant="contained"
          color="error"
          size="large"
          startIcon={<ClearAllSharpIcon />}
          onClick={() => formik.resetForm()}
        >
          Clear
        </Button>
        <Button type="submit" variant="contained" color="primary" startIcon={<SaveAsIcon />}>
          {initialData && Object.keys(initialData).length > 0 ? 'Save' : 'Update'}
        </Button>
      </Stack>
    </form>
  );
};

export default MaterialDetailsForm;
