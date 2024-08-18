import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetMaterials, GetUOMOptions, InsertMaterial, UpdateMaterialDetails } from 'src/store/systems/materialCatalogue/MaterialCatalogueSlice';
import * as yup from 'yup';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';

const statusOptions = [
  {value: "A", label: 'ACTIVE'},
  {value: "I", label: 'INACTIVE'},
];
const categoryOptions = [
  { value: '1', label: 'Medicine' },
  { value: '2', label: 'Transport' },
  { value: '3', label: 'Poultry Processing System' }
];

const subCategoryOptions = [
  { value: '10', label: 'GIZZARD INSPECTION / PEELING TABLE . MODEL- MT-D. 1168000' },
  { value: '11', label: 'STUNNER/ HDII-2.5F RH' },
  { value: '12', label: 'CRATE WASHER' },
  { value: '13', label: 'COMPACT GRADER' },
  { value: '14', label: 'DRIP DRUM' },
  { value: '15', label: 'SCREW CHILLER' },
  { value: '16', label: 'BLOWER' },
  { value: '17', label: 'CRATE WASHER ELBV800-5' },
  { value: '18', label: 'OVERHEAD CONVEYER. MODEL - RVS' },
  { value: '19', label: 'OVERHEAD CONVEYER. MODEL - T-50' },
  { value: '20', label: 'COUNTER' },
  { value: '21', label: 'UNLOADING STATION - D' },
  { value: '22', label: 'SHACKLE WASHER' },
  { value: '23', label: 'COMPACT GRADER' },
  { value: '24', label: 'KILLING SHACKLE - DS' },
  { value: '25', label: 'WATER BATH STUNNER HF 2.5F RH' },
  { value: '26', label: 'EVISCERATING SHACKLE ES NUOVA' },
  { value: '27', label: 'HIGH PRESSURE WATER PUMP 3M3/H-1100 KPA' },
  { value: '28', label: 'EVISCERATING SYSTEM NUOVA 20' },
  { value: '29', label: 'SCALDER. SA-7.2 SW3' },
  { value: '30', label: 'UNLOADING STATION - BR-III R KET' },
  { value: '31', label: 'SLATTED BELT CONVEYOR M7' },
  { value: '32', label: 'GIZZARD HARVESTER . MG-150' },
  { value: '33', label: 'CONTROL PANEL. C220201 CP1' },
  { value: '34', label: 'HOT WATER BOILER' },
  { value: '35', label: 'FILLING CHUTE' },
  { value: '36', label: 'BAG CLOSER' },
  { value: '37', label: 'PLUCKER' },
  { value: '38', label: 'PORTION CUTTER MC -30' },
  { value: '4', label: 'NUOVA 10 CORETECH MACHINE . S/No.4024602' },
  { value: '5', label: 'NECK SKIN INSPECTION MACHINE . MODEL - NIC NT 20+M' },
  { value: '6', label: 'OVERHEAD CONVEYER. MODEL - RVS' },
  { value: '7', label: 'SCALDER. S/N.370397' },
  { value: '8', label: 'LEG CUTTER. LC II . TYPE 1044305. SERIA' },
  { value: '9', label: 'PLUCKER FINISHER. MODEL- F201S/T' },
];

const MaterialEntryForm = ({ initialData, handleCloseEntryForm }) => {
  const dispatch = useDispatch();
  const uomOptions = useSelector(state => state.materialCatalogue.uomOptions);

  useEffect(() => {
    dispatch(GetUOMOptions());
  }, [dispatch]);

  const validationSchema = yup.object({
    MaterialCode: initialData ? yup.string().required('Material Code is required') : yup.string(),
    MaterialDescription: yup.string().required('Material Description is required'),
    MaterialSpecification: yup.string().required('Material Specification is required'),
    UOM: yup.string().required('Unit of Measurement is required'),
    Status: yup.string().required('Status is required'),
    ...(initialData ? {} : {
      Category: yup.string().required('Category is required'),
      SubCategory: yup.string().when('Category', {
        is: '3',
        then: yup.string().required('Sub-category is required'),
      })
    })
  });

  const formik = useFormik({
    initialValues: {
      Category: initialData?.Category || '',
      SubCategory: initialData?.SubCategory || '',
      MaterialCode: initialData?.MaterialCode || '',
      MaterialDescription: initialData?.MaterialDescription || '',
      MaterialSpecification: initialData?.MaterialSpecification || '',
      UOM: initialData?.UOM || '',
      Status: initialData?.Status || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          Description: values.MaterialDescription,
          MatSpec: values.MaterialSpecification,
          Unit: values.UOM,
          Status: values.Status,
          CatCode: values.Category,
        };

        if (initialData) {
          payload.MatCode = initialData.MaterialCode;
          await dispatch(UpdateMaterialDetails(payload));
        } else {
          if (values.Category === '3') {
            payload.SubCategory = values.SubCategory;
          }
          await dispatch(InsertMaterial(payload));
        }

        dispatch(GetMaterials());
        handleCloseEntryForm();
        formik.resetForm({
          values: {
            Category: '',
            SubCategory: '',
            MaterialCode: '',
            MaterialDescription: '',
            MaterialSpecification: '',
            UOM: '',
            Status: '',
          },
        });
      } catch (error) {
        console.error('Failed to save material details', error);
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
        Category: '',
        SubCategory: '',
        MaterialCode: '',
        MaterialDescription: '',
        MaterialSpecification: '',
        UOM: '',
        Status: '',
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
                  <CustomFormLabel htmlFor="MaterialCode" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Material Code</CustomFormLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <CustomTextField
                    id="MaterialCode"
                    name="MaterialCode"
                    placeholder="Material Code"
                    fullWidth
                    value={formik.values.MaterialCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.MaterialCode && Boolean(formik.errors.MaterialCode)}
                    InputProps={{ readOnly: true }}
                  />
                  {formik.touched.MaterialCode && formik.errors.MaterialCode && (
                    <Typography color="error">{formik.errors.MaterialCode}</Typography>
                  )}
                </Grid>
              </>
            )}

            {!initialData && (
              <>
                <Grid item xs={12} sm={4} display="flex" alignItems="center">
                  <CustomFormLabel htmlFor="Category" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Category</CustomFormLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Select
                    id="Category"
                    name="Category"
                    placeholder='Select Category'
                    fullWidth
                    value={formik.values.Category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.Category && Boolean(formik.errors.Category)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Select Category</MenuItem>
                    {categoryOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                  {formik.touched.Category && formik.errors.Category && (
                    <Typography color="error">{formik.errors.Category}</Typography>
                  )}
                </Grid>

                {formik.values.Category === '3' && (
                  <>
                    <Grid item xs={12} sm={4} display="flex" alignItems="center">
                      <CustomFormLabel htmlFor="SubCategory" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Sub Category</CustomFormLabel>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Select
                        id="SubCategory"
                        name="SubCategory"
                        placeholder='Select Sub Category'
                        fullWidth
                        value={formik.values.SubCategory}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.SubCategory && Boolean(formik.errors.SubCategory)}
                      >
                        {subCategoryOptions.map(option => (
                          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                      </Select>
                      {formik.touched.SubCategory && formik.errors.SubCategory && (
                        <Typography color="error">{formik.errors.SubCategory}</Typography>
                      )}
                    </Grid>
                  </>
                )}
              </>
            )}

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="MaterialDescription" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Material Description</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="MaterialDescription"
                name="MaterialDescription"
                placeholder="Material Description"
                fullWidth
                value={formik.values.MaterialDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.MaterialDescription && Boolean(formik.errors.MaterialDescription)}
              />
              {formik.touched.MaterialDescription && formik.errors.MaterialDescription && (
                <Typography color="error">{formik.errors.MaterialDescription}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="Status" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Status</CustomFormLabel>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Select
                id="Status"
                name="Status"
                value={formik.values.Status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Status && Boolean(formik.errors.Status)}
                fullWidth
                displayEmpty
              >
                <MenuItem value="" disabled>Select Status</MenuItem>
                {statusOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
              {formik.touched.Status && formik.errors.Status && (
                <Typography color="error">{formik.errors.Status}</Typography>
              )}
            </Grid>

          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="MaterialSpecification" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Material Specification</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <CustomTextField
                id="MaterialSpecification"
                name="MaterialSpecification"
                placeholder="Material Specification"
                fullWidth
                value={formik.values.MaterialSpecification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.MaterialSpecification && Boolean(formik.errors.MaterialSpecification)}
              />
              {formik.touched.MaterialSpecification && formik.errors.MaterialSpecification && (
                <Typography color="error">{formik.errors.MaterialSpecification}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="UOM" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>Unit of Measurement</CustomFormLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Select
                id="UOM"
                name="UOM"
                value={formik.values.UOM}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.UOM && Boolean(formik.errors.UOM)}
                fullWidth
                displayEmpty
              >
                <MenuItem value="" disabled>Select UOM</MenuItem>
                {uomOptions.map((option) => (
                  <MenuItem key={option.UnitCode} value={option.UnitCode}>{option.Discription}</MenuItem>
                ))}
              </Select>
              {formik.touched.UOM && formik.errors.UOM && (
                <Typography color="error">{formik.errors.UOM}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="right" sx={{ mt: 3 }}>
        <Button variant="contained" color="error" startIcon={<ClearAllSharpIcon />} onClick={handleClear}>
          Clear
        </Button>
        <Button type="submit" variant="contained" color="primary" startIcon={<SaveAsIcon />}>
          {initialData ? 'Update' : 'Save'}
        </Button>
      </Stack>
    </form>
  );
};

export default MaterialEntryForm;
