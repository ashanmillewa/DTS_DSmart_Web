import { useState, useMemo } from 'react';
import { Box, Button, Paper, TextField, Typography, Stack, Grid, IconButton } from '@mui/material';
import { format } from 'date-fns';
import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';

// Utility function to filter materials based on the search term
function generateInitialRows(mrqMaterials, searchTerm) {
  return mrqMaterials.filter(material =>
    Object.values(material).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
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
      <Typography variant="h6">Material Requisition (MRQ)</Typography>
      <Button color="primary" variant="contained" onClick={handleAddClick}>
        Add New MRQ
      </Button>
    </Box>
  );
}

const MaterialEntryForm = ({ handleAddMaterial, formIndex, handleRemoveForm }) => {
  const validationSchema = yup.object({
    materialCode: yup.string().required('Material Code is required'),
    materialDescription: yup.string().required('Material Description is required'),
    materialSpecification: yup.string().required('Material Specification is required'),
    uom: yup.string().required('Unit of Measurement is required'),
  });

  const formik = useFormik({
    initialValues: {
      materialCode: '',
      materialDescription: '',
      materialSpecification: '',
      uom: '',
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
              <CustomFormLabel htmlFor="materialCode" style={{ marginTop: '4px' }}>Material Code</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
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

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="materialSpecification" style={{ marginTop: '4px' }}>Material Specification</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="materialSpecification"
                name="materialSpecification"
                placeholder="Material Specification"
                fullWidth
                value={formik.values.materialSpecification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.materialSpecification && Boolean(formik.errors.materialSpecification)}
                variant="outlined"
              />
              {formik.touched.materialSpecification && formik.errors.materialSpecification && (
                <Typography color="error">{formik.errors.materialSpecification}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="materialDescription" style={{ marginTop: '4px' }}>Material Description</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="materialDescription"
                name="materialDescription"
                placeholder="Material Description"
                fullWidth
                value={formik.values.materialDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.materialDescription && Boolean(formik.errors.materialDescription)}
                variant="outlined"
              />
              {formik.touched.materialDescription && formik.errors.materialDescription && (
                <Typography color="error">{formik.errors.materialDescription}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="uom" style={{ marginTop: '4px' }}>Unit of Measurement</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="uom"
                name="uom"
                placeholder="Unit of Measurement"
                fullWidth
                value={formik.values.uom}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.uom && Boolean(formik.errors.uom)}
                variant="outlined"
              />
              {formik.touched.uom && formik.errors.uom && (
                <Typography color="error">{formik.errors.uom}</Typography>
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

export default function MRQScreen() {
  const [mrqDetails, setMrqDetails] = useState({
    mrqNo: '',
    mrqDate: format(new Date(), 'yyyy-MM-dd'),
    requestedBy: '',
    project: '',
    remarks: '',
    warehouse: 'STM',
    mainStores: 'MAIN STORES',
  });
  const [mrqMaterials, setMrqMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mrqForms, setMrqForms] = useState([{ id: Date.now(), number: 1 }]); // Initial MRQ form

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMrqDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddMaterial = (values) => {
    setMrqMaterials((prevMaterials) => [
      ...prevMaterials,
      {
        materialCode: values.materialCode,
        materialDescription: values.materialDescription,
        materialSpecification: values.materialSpecification,
        uom: values.uom,
        balanceQuantity: '',
        issuedQuantity: '',
      },
    ]);
  };

  const handleAddMRQForm = () => {
    setMrqForms((prevForms) => [
      { id: Date.now(), number: prevForms.length + 1 },
      ...prevForms,
    ]);
  };

  const handleRemoveMRQForm = (formIndex) => {
    setMrqForms((prevForms) => {
      const updatedForms = prevForms.filter((_, index) => index !== formIndex);
      return updatedForms.map((form, index) => ({ ...form, number: index + 1 }));
    });
  };

  const handleSaveAllForms = () => {
    // Logic to save all MRQ forms
    console.log('Saving all MRQ forms');
    mrqForms.forEach((form) => {
      // Perform save operation for each form
    });
  };

  // Memoize filtered materials based on searchTerm
  const filteredMaterials = useMemo(() => 
    generateInitialRows(mrqMaterials, searchTerm), 
    [mrqMaterials, searchTerm]
  );

  return (
    <Box sx={{ mt: 4, mx: 2 }}>
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          MRQ Details
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {Object.keys(mrqDetails).map((key) => (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
              name={key}
              value={mrqDetails[key]}
              onChange={handleChange}
              type={key === 'mrqDate' ? 'date' : 'text'}
              sx={{ flexGrow: 1 }}
              InputLabelProps={key === 'mrqDate' ? { shrink: true } : undefined}
            />
          ))}
        </Box>
      </Paper>
      <EditToolbar handleAddClick={handleAddMRQForm} />
      {mrqForms.map((form, index) => (
        <Box key={form.id} sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            MRQ Form {form.number}
          </Typography>
          <MaterialEntryForm
            handleAddMaterial={handleAddMaterial}
            formIndex={index}
            handleRemoveForm={handleRemoveMRQForm}
          />
        </Box>
      ))}
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
