import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
  Grid,
  IconButton,
  MenuItem,
} from '@mui/material';
import { format } from 'date-fns';
import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomSelect from '../../forms/theme-elements/CustomSelect';

// Utility function to filter materials based on the search term
function generateInitialRows(mtnMaterials, searchTerm) {
  return mtnMaterials.filter((material) =>
    Object.values(material).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
  );
}

function EditToolbar({ handleAddClick }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '2px',
        marginBottom: '20px',
      }}
    >
      <Typography variant="h6">Material Transfer Note (MTN)</Typography>
      <Button color="primary" variant="contained" onClick={handleAddClick}>
        Add New MTN
      </Button>
    </Box>
  );
}

const MaterialEntryForm = ({ handleAddMaterial, formIndex, handleRemoveForm }) => {
  const validationSchema = yup.object({
    MatCode: yup.string().required('Material Code is required'),
    MatDesc: yup.string().required('Material Description is required'),
    Spec: yup.string().required('Material Specification is required'),
    Unit: yup.string().required('Unit of Measurement is required'),
  });

  const formik = useFormik({
    initialValues: {
      MatCode: '',
      MatDesc: '',
      Spec: '',
      Unit: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAddMaterial(values);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="MatCode" style={{ marginTop: '4px' }}>
                Material Code
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="MatCode"
                name="MatCode"
                placeholder="Material Code"
                fullWidth
                value={formik.values.MatCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.MatCode && Boolean(formik.errors.MatCode)}
                variant="outlined"
              />
              {formik.touched.MatCode && formik.errors.MatCode && (
                <Typography color="error">{formik.errors.MatCode}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Spec" style={{ marginTop: '4px' }}>
                Material Specification
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Spec"
                name="Spec"
                placeholder="Material Specification"
                fullWidth
                value={formik.values.Spec}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Spec && Boolean(formik.errors.Spec)}
                variant="outlined"
              />
              {formik.touched.Spec && formik.errors.Spec && (
                <Typography color="error">{formik.errors.Spec}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="MatDesc" style={{ marginTop: '4px' }}>
                Material Description
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="MatDesc"
                name="MatDesc"
                placeholder="Material Description"
                fullWidth
                value={formik.values.MatDesc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.MatDesc && Boolean(formik.errors.MatDesc)}
                variant="outlined"
              />
              {formik.touched.MatDesc && formik.errors.MatDesc && (
                <Typography color="error">{formik.errors.MatDesc}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Unit" style={{ marginTop: '4px' }}>
                Unit of Measurement
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="Unit"
                name="Unit"
                placeholder="Unit of Measurement"
                fullWidth
                value={formik.values.Unit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Unit && Boolean(formik.errors.Unit)}
                variant="outlined"
              />
              {formik.touched.Unit && formik.errors.Unit && (
                <Typography color="error">{formik.errors.Unit}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ClearAllSharpIcon />}
              onClick={formik.handleReset}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<RemoveIcon />}
              onClick={() => handleRemoveForm(formIndex)}
            >
              Remove Form
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default function MtnScreen() {
  const [mtnDetails, setMtnDetails] = useState({
    mtnNo: '',
    mtnDate: format(new Date(), 'yyyy-MM-dd'),
    transferredFrom: 'MAIN STORES',
    transferredTo: '',
    requestedBy: '',
    remarks: '',
    grnNumber: '',
  });

  const [mtnMaterials, setMtnMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mtnForms, setMtnForms] = useState([{ id: Date.now(), number: 1 }]); // Initial MTN form

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMtnDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddMaterial = (values) => {
    setMtnMaterials((prevMaterials) => [
      ...prevMaterials,
      {
        MatCode: values.MatCode,
        MatDesc: values.MatDesc,
        Spec: values.Spec,
        Unit: values.Unit,
        balanceQuantity: '',
        transferredQuantity: '',
      },
    ]);
  };

  const handleAddMTNForm = () => {
    setMtnForms((prevForms) => [{ id: Date.now(), number: prevForms.length + 1 }, ...prevForms]);
  };

  const handleRemoveMTNForm = (formIndex) => {
    setMtnForms((prevForms) => {
      const updatedForms = prevForms.filter((_, index) => index !== formIndex);
      return updatedForms.map((form, index) => ({ ...form, number: index + 1 }));
    });
  };

  const handleSaveAllForms = () => {
    // Logic to save all MTN forms
    console.log('Saving all MTN forms');
    mtnForms.forEach((form) => {
      // Perform save operation for each form
    });
  };

  // Memoize filtered materials based on searchTerm
  const filteredMaterials = useMemo(
    () => generateInitialRows(mtnMaterials, searchTerm),
    [mtnMaterials, searchTerm],
  );

  return (
    <Box sx={{ mt: 4, mx: 2 }}>
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          MTN Details
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {Object.keys(mtnDetails).map((key) =>
            key === 'grnNumber' ? (
              <div className={{ flexGrow: 1 }}>
                <CustomFormLabel htmlFor="name">
                  {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </CustomFormLabel>

                <CustomSelect id="model" name="model" fullWidth variant="outlined">
                  <MenuItem key={'1'} value={'1'}>
                    ssss
                  </MenuItem>
                </CustomSelect>
              </div>
            ) : (
              <CustomTextField
                key={key}
                label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                name={key}
                value={mtnDetails[key]}
                onChange={handleChange}
                type={key === 'mtnDate' ? 'date' : 'text'}
                sx={{ flexGrow: 1 }}
                InputLabelProps={key === 'mtnDate' ? { shrink: true } : undefined}
              />
            ),
          )}
        </Box>
      </Paper>
      <EditToolbar handleAddClick={handleAddMTNForm} />
      {/* {mtnForms.map((form, index) => (
        <Box key={form.id} sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            MTN Form {form.number}
          </Typography>
          <MaterialEntryForm
            handleAddMaterial={handleAddMaterial}
            formIndex={index}
            handleRemoveForm={handleRemoveMTNForm}
          />
        </Box>
      ))} */}
      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveAsIcon />}
          onClick={handleSaveAllForms}
        >
          Save All
        </Button>
      </Stack>
    </Box>
  );
}
