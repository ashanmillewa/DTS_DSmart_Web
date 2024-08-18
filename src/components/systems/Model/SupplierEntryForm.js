import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {
  PostSupplierDetails,
  GetSupplierDetailsById,
} from 'src/store/systems/supplier/SupplierSlice';
import { useDispatch, useSelector } from 'react-redux';
const statusOptions = [
  { value: 'A', label: 'ACTIVE' },
  { value: 'I', label: 'INACTIVE' },
];

const useStyles = makeStyles({
  formContainer: {
    marginBottom: '20px',
  },
  formLabel: {
    marginTop: '4px',
  },
  actionButtons: {
    justifyContent: 'flex-end',
    marginTop: '16px',
  },
});

const generateSupplierCode = () => {
  return `SUP-${Math.floor(Math.random() * 1000000)}`;
};

const SupplierEntryForm = ({ initialData, onAddNew, onClose }) => {
  const classes = useStyles();
  const [supplierCode, setSupplierCode] = useState('');
  const [isEditMode, setIsEditMode] = useState(!!initialData?.SupCode);
  const { supData } = useSelector((state) => state.supplierReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData?.SupCode) {
      dispatch(GetSupplierDetailsById(initialData?.SupCode));
    } else {
      setSupplierCode(initialData?.SupCode);
      setIsEditMode(true);
    }
  }, [initialData]);

  const validationSchema = yup.object({
    SupName: yup.string().required('Supplier Name is required'),
    SupConPerson: yup.string().required('Contact Person is required'),
    SumEmail: yup.string().email('Invalid email address').required('Email is required'),
    SupPhoneNo: yup
      .string()
      .matches(/^\d+$/, 'Phone Number must be a valid number')
      .required('Phone Number is required'),
    SupAddress: yup.string().required('Address is required'),
    SupRemarks: yup.string().required('Remark is required'),
    SupVatNo: yup.string().required('VAT Number is required'),
    status: yup.string().required('Status is required'),
  });

  const formik = useFormik({
    initialValues: {
      SupCode: supData[0]?.SupCode || '',
      SupName: supData[0]?.SupName || '',
      SupConPerson: supData[0]?.SupConPerson || '',
      SumEmail: supData[0]?.SumEmail || '',
      SupPhoneNo: supData[0]?.SupPhoneNo || '',
      SupAddress: supData[0]?.SupAddress || '',
      SupRemarks: supData[0]?.SupRemarks || '',
      SupVatNo: supData[0]?.SupVatNo || '',
      status: supData[0]?.status || '',
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(PostSupplierDetails(values));
    },
  });

  const handleClear = () => {
    formik.resetForm({
      values: {
        SupCode: supplierCode,
        SupName: '',
        SupConPerson: '',
        SumEmail: '',
        SupPhoneNo: '',
        SupAddress: '',
        SupRemarks: '',
        SupVatNo: '',
        status: '',
      },
    });
    setIsEditMode(false); // Reset to Add New mode
  };

  return (
    <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            {/* Supplier Code */}
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="SupCode" className={classes.formLabel}>
                Supplier Code
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="SupCode"
                name="SupCode"
                placeholder="Supplier Code"
                fullWidth
                value={formik.values.SupCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.SupCode && Boolean(formik.errors.SupCode)}
                helperText={formik.touched.SupCode && formik.errors.SupCode}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Supplier Name */}
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="SupName" className={classes.formLabel}>
                Supplier Name
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="SupName"
                name="SupName"
                placeholder="Supplier Name"
                fullWidth
                value={formik.values.SupName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.SupName && Boolean(formik.errors.SupName)}
                helperText={formik.touched.SupName && formik.errors.SupName}
                variant="outlined"
              />
            </Grid>

            {/* Contact Person */}
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="SupConPerson" className={classes.formLabel}>
                Contact Person
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="SupConPerson"
                name="SupConPerson"
                placeholder="Contact Person"
                fullWidth
                value={formik.values.SupConPerson}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.SupConPerson && Boolean(formik.errors.SupConPerson)}
                helperText={formik.touched.SupConPerson && formik.errors.SupConPerson}
                variant="outlined"
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="SumEmail" className={classes.formLabel}>
                Email
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="SumEmail"
                name="SumEmail"
                placeholder="Email"
                fullWidth
                value={formik.values.SumEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.SumEmail && Boolean(formik.errors.SumEmail)}
                helperText={formik.touched.SumEmail && formik.errors.SumEmail}
                variant="outlined"
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="SupPhoneNo" className={classes.formLabel}>
                Phone Number
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="SupPhoneNo"
                name="SupPhoneNo"
                placeholder="Phone Number"
                fullWidth
                value={formik.values.SupPhoneNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.SupPhoneNo && Boolean(formik.errors.SupPhoneNo)}
                helperText={formik.touched.SupPhoneNo && formik.errors.SupPhoneNo}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            {/* Address */}
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="SupAddress" className={classes.formLabel}>
                Address
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="SupAddress"
                name="SupAddress"
                placeholder="Address"
                fullWidth
                multiline
                rows={3}
                value={formik.values.SupAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.SupAddress && Boolean(formik.errors.SupAddress)}
                helperText={formik.touched.SupAddress && formik.errors.SupAddress}
                variant="outlined"
              />
            </Grid>

            {/* Remarks */}
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="SupRemarks" className={classes.formLabel}>
                Remark
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="SupRemarks"
                name="SupRemarks"
                placeholder="Remark"
                fullWidth
                value={formik.values.SupRemarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.SupRemarks && Boolean(formik.errors.SupRemarks)}
                helperText={formik.touched.SupRemarks && formik.errors.SupRemarks}
                variant="outlined"
              />
            </Grid>

            {/* VAT Number */}
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="SupVatNo" className={classes.formLabel}>
                VAT Number
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="SupVatNo"
                name="SupVatNo"
                placeholder="VAT Number"
                fullWidth
                value={formik.values.SupVatNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.SupVatNo && Boolean(formik.errors.SupVatNo)}
                helperText={formik.touched.SupVatNo && formik.errors.SupVatNo}
                variant="outlined"
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="status" className={classes.formLabel}>
                Status
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                <InputLabel id="status-label">Select Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formik.touched.status && formik.errors.status}</FormHelperText>
              </FormControl>
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
          {initialData ? 'Save' : 'Update'}
        </Button>
      </Stack>
      {/* <Stack direction="row" spacing={2} className={classes.actionButtons}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ClearAllSharpIcon />}
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveAsIcon />}
          type="submit"
        >
          {isEditMode ? 'Update' : 'Save'}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddNew}
        >
          Add New
        </Button>
      </Stack> */}
    </form>
  );
};

export default SupplierEntryForm;
