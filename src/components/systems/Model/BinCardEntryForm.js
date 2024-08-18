import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addBinCardEntry } from 'src/store/systems/materialManagement/binCardSlice';
import * as yup from 'yup';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';

const BinCardEntryForm = ({ initialData }) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    materialCode: yup.string().required('Material Code is required'),
    locationCode: yup.string().required('Location Code is required'),
    balanceQuantity: yup.string().required('Balance Quantity is required'),
    balanceValue: yup.string().required('Balance Value is required'),
    avgPrice: yup.string().required('Average Price is required'),
    status: yup.string().required('Status is required'),
    unit: yup.string().required('Unit is required'),
    lineNo: yup.string().required('Line Number is required'),
  });

  const formik = useFormik({
    initialValues: {
      materialCode: initialData?.MatCode || '',
      locationCode: initialData?.LocCode || '',
      balanceQuantity: initialData?.BalQty || '',
      balanceValue: initialData?.BalValue || '',
      avgPrice: initialData?.AvgPrice || '',
      status: initialData?.Status || '',
      unit: initialData?.Unit || '',
      lineNo: initialData?.Line || '',
      description: initialData?.MatDes || '',
      createdDate: initialData?.createdDate || new Date().toLocaleString(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addBinCardEntry(values));
    },
  });

  const handleClear = () => {
    formik.resetForm({
      values: {
        materialCode: '',
        locationCode: '',
        balanceQuantity: '',
        balanceValue: '',
        avgPrice: '',
        status: '',
        unit: '',
        lineNo: '',
        description: '',
      },
    });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="materialCode" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Material Code
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="materialCode"
                  name="materialCode"
                  placeholder="Material Code"
                  fullWidth
                  value={formik.values.materialCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.materialCode && Boolean(formik.errors.materialCode)}
                  variant="outlined"
                />
                {formik.touched.materialCode && formik.errors.materialCode && (
                  <Typography color="error">{formik.errors.materialCode}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="locationCode" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Location Code
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="locationCode"
                  name="locationCode"
                  placeholder="Location Code"
                  fullWidth
                  value={formik.values.locationCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.locationCode && Boolean(formik.errors.locationCode)}
                  variant="outlined"
                />
                {formik.touched.locationCode && formik.errors.locationCode && (
                  <Typography color="error">{formik.errors.locationCode}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="balanceQuantity" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Balance Quantity
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="balanceQuantity"
                  name="balanceQuantity"
                  placeholder="Balance Quantity"
                  fullWidth
                  value={formik.values.balanceQuantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.balanceQuantity && Boolean(formik.errors.balanceQuantity)}
                  variant="outlined"
                />
                {formik.touched.balanceQuantity && formik.errors.balanceQuantity && (
                  <Typography color="error">{formik.errors.balanceQuantity}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="balanceValue" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Balance Value
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="balanceValue"
                  name="balanceValue"
                  placeholder="Balance Value"
                  fullWidth
                  value={formik.values.balanceValue}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.balanceValue && Boolean(formik.errors.balanceValue)}
                  variant="outlined"
                />
                {formik.touched.balanceValue && formik.errors.balanceValue && (
                  <Typography color="error">{formik.errors.balanceValue}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* 2nd column */}
          
          <Grid item xs={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="avgPrice" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  AVG Price
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="avgPrice"
                  name="avgPrice"
                  placeholder="Average Price"
                  fullWidth
                  value={formik.values.avgPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.avgPrice && Boolean(formik.errors.avgPrice)}
                  variant="outlined"
                />
                {formik.touched.avgPrice && formik.errors.avgPrice && (
                  <Typography color="error">{formik.errors.avgPrice}</Typography>
                )}
              </Grid>
            
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="status" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Status
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="status"
                  name="status"
                  placeholder="Status"
                  fullWidth
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  variant="outlined"
                />
                {formik.touched.status && formik.errors.status && (
                  <Typography color="error">{formik.errors.status}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="unit" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Unit
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="unit"
                  name="unit"
                  placeholder="Unit"
                  fullWidth
                  value={formik.values.unit}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.unit && Boolean(formik.errors.unit)}
                  variant="outlined"
                />
                {formik.touched.unit && formik.errors.unit && (
                  <Typography color="error">{formik.errors.unit}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="lineNo" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Line No
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="lineNo"
                  name="lineNo"
                  placeholder="Line Number"
                  fullWidth
                  value={formik.values.lineNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lineNo && Boolean(formik.errors.lineNo)}
                  variant="outlined"
                />
                {formik.touched.lineNo && formik.errors.lineNo && (
                  <Typography color="error">{formik.errors.lineNo}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* New Grid item for description */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="description" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  Description
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField
                  id="description"
                  name="description"
                  placeholder="Description"
                  fullWidth
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  variant="outlined"
                  multiline
                  rows={4} // Adding multiple rows to give a box-like feel
                />
                {formik.touched.description && formik.errors.description && (
                  <Typography color="error">{formik.errors.description}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="end">
              <Button variant="contained" color="error" onClick={handleClear} startIcon={<ClearAllSharpIcon />}>
                Clear
              </Button>
              <Button variant="contained" type="submit" startIcon={<SaveAsIcon />}>
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default BinCardEntryForm;
