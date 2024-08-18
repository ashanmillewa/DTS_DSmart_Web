import { Alert, AlertTitle, Box, Button, Paper, Snackbar, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  DataGrid,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProjectMatCostService } from 'src/store/systems/materialManagement/ProjectMatCostSlice';

function generateInitialRows(projectmatcosts, searchTerm) {
  return projectmatcosts
    .filter((projectmatcost) =>
      Object.values(projectmatcost).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((projectmatcost) => ({
      id: projectmatcost.LocCode,
      LocCode: projectmatcost.LocCode,
      MatCode: projectmatcost.MatCode,
      DocumentType: projectmatcost.DocumentType,
      DocumentNo: projectmatcost.DocumentNo,
      MatDescription: projectmatcost.MatDescription,
      MatUnit: projectmatcost.MatUnit,
      Quantity: projectmatcost.Quantity,
      Value: projectmatcost.Value,
      ProjectName: projectmatcost.ProjectName,
      OriginatedBy: projectmatcost.OriginatedBy,
      MatDate: projectmatcost.MatDate,
      AvgRate: projectmatcost.AvgRate,
    }));
}

function EditToolbar(props) {
  return (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '2px',
        marginBottom: '20px',
      }}
    >
      {/* Optionally, add additional toolbar buttons here */}
    </GridToolbarContainer>
  );
}

export default function ComMatCost() {
  const [rowModesModel, setRowModesModel] = useState({});
  const { projectmatcosts } = useSelector((state) => state.projectMaterialCostReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });

  const formatDateString = (date) => {
    if (!date) return '';
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const handlestartDate = (newStartDate) => {
    setDate({
      startDate: formatDateString(newStartDate),
      endDate: date.endDate,
    });
  };

  const handleEndDate = (newEndDate) => {
    setDate({
      endDate: formatDateString(newEndDate),
      startDate: date.startDate,
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLoadData();
  };

  const handleLoadData = async () => {
    if (date.startDate === '' || date.endDate === '') {
      setOpen(true);
      return;
    }

    await dispatch(GetProjectMatCostService(date));
  };

  const handleReload = async () => {
    await dispatch(GetProjectMatCostService(date));
  };

  const handleSelectionModelChange = (newSelectionModel) => {};

  useEffect(() => {
    dispatch(GetProjectMatCostService(date));
  }, [dispatch, date]);

  useEffect(() => {
    const initialRows = generateInitialRows(projectmatcosts, searchTerm);
    setRows(initialRows);
  }, [projectmatcosts, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddClick = () => {
    const id = Math.random().toString();
    const newRow = { id, name: '', age: '', isNew: true };
    setRows((oldRows) => [newRow, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: 'MatDate',
      headerName: 'DATE',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      backgroundColor: '#ECECEC',
      headerClassName: 'table-header',
    },
    {
      field: 'LocCode',
      headerName: 'LOCATION CODE',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      backgroundColor: '#ECECEC',
      headerClassName: 'table-header',
    },
    {
      field: 'MatCode',
      headerName: 'MATERIAL CODE',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      backgroundColor: '#ECECEC',
      headerClassName: 'table-header',
    },
    {
      field: 'DocumentType',
      headerName: 'MATERIAL DOCUMENT TYPE',
      width: 180,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      backgroundColor: '#ECECEC',
      headerClassName: 'table-header',
    },
    {
      field: 'DocumentNo',
      headerName: 'DOCUMENT NUMBER',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      backgroundColor: '#ECECEC',
      headerClassName: 'table-header',
    },
    {
      field: 'MatDescription',
      headerName: 'MATERIAL DESCRIPTION',
      width: 160,
      align: 'left',
      headerAlign: 'center',
      backgroundColor: '#ECECEC',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'MatUnit',
      headerName: 'MATERIAL UNIT',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      backgroundColor: '#ECECEC',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'Quantity',
      headerName: 'MATERIAL QUANTITY',
      backgroundColor: '#ECECEC',
      width: 150,
      align: 'right',
      headerAlign: 'center',
      editable: true,
      headerClassName: 'table-header',
    },
    {
      field: 'Value',
      headerName: 'MATERIAL VALUE',
      width: 130,
      align: 'right',
      headerAlign: 'center',
      editable: true,
      backgroundColor: '#ECECEC',
      headerClassName: 'table-header',
    },
    {
      field: 'ProjectName',
      headerName: 'PROJECT NAME',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      backgroundColor: '#ECECEC',
      headerClassName: 'table-header',
    },
    {
      field: 'OriginatedBy',
      headerName: 'ORIGINATED BY',
      width: 230,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      backgroundColor: '#ECECEC',
      headerClassName: 'table-header',
    },
    {
      field: 'AvgRate',
      headerName: 'AVERAGE RATE',
      width: 150,
      align: 'right',
      headerAlign: 'center',
      editable: true,
      backgroundColor: '#ECECEC',
      headerClassName: 'table-header',
    },
  ];

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="warning" sx={{ width: '100%' }}>
          <AlertTitle>Warning</AlertTitle>
          Please select both start and end dates.
        </Alert>
      </Snackbar>

      <form onSubmit={handleFormSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={3}>
                <DatePicker
                  // label="Select Start Date"
                  value={date.startDate ? new Date(date.startDate) : null}
                  onChange={handlestartDate}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: '100%' }} required />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <DatePicker
                  // label="Select End Date"
                  value={date.endDate ? new Date(date.endDate) : null}
                  onChange={handleEndDate}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: '100%' }} required />
                  )}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    width: '20%',
                    marginTop: '3px',
                    fontSize: '14px',
                    backgroundColor: '#blue',
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                >
                  Load
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  onClick={handleReload}
                  sx={{
                    width: '20%',
                    marginTop: '3px',
                    marginRight: '60vh',
                    fontSize: '14px',
                    backgroundColor: '#blue',
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                >
                  Reload
                </Button>
              </Grid>
            </Grid>
          </Box>
        </LocalizationProvider>
      </form>

      <Paper elevation={5} sx={{ borderRadius: '10px', overflow: 'hidden', marginTop: '20px' }}>
        <Box sx={{ height: 570, width: '100%', padding: '16px' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            processRowUpdate={processRowUpdate}
            onRowEditStop={handleRowEditStop}
            // selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
            experimentalFeatures={{ newEditingApi: true }}
            sx={{
              '& .table-header': {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-root': {
                border: 'none',
                borderRadius: '4px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#e0e0e0',
                borderBottom: 'none',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#e0e0e0',
                borderTop: 'none',
              },
              '& .MuiDataGrid-row': {
                borderBottom: '1px solid #e0e0e0',
              },
            }}
            components={{ Toolbar: EditToolbar }}
            componentsProps={{
              toolbar: {
                handleSearchChange,
                searchTerm,
                handleAddClick,
              },
            }}
          />
        </Box>
      </Paper>
    </div>
  );
}
