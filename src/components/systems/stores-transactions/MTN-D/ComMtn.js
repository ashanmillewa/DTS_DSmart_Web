import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TextField, Typography, Tooltip
} from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { IconDotsVertical } from '@tabler/icons';
import DialogModal from 'src/components/shared/Dialog'; // Update this path if needed
import MtnEntryForm from 'src/components/systems/Model/MtnEntryForm'; // Update this path if needed
import MtnService from 'src/store/service/MtnService'; // Update the path accordingly

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: '#ECECEC',
  },
  tableRow: {
    cursor: 'pointer',
  },
  searchInput: {
    width: '120px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  toolbarButton: {
    marginLeft: 'auto',
  },
});

const generateInitialRows = (materials, searchTerm) => {
  if (!Array.isArray(materials)) return [];
  return materials.filter(material =>
    Object.values(material).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const EditToolbar = ({ handleAddClick, searchTerm, setSearchTerm }) => {
  const classes = useStyles();
  return (
    <Box className={classes.toolbar}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search MTN Materials"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={classes.searchInput}
      />
      <Button color="primary" variant="contained" className={classes.toolbarButton} onClick={handleAddClick}>
        Add New MTN
      </Button>
    </Box>
  );
};

const MTNScreen = () => {
  const classes = useStyles();
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const whCode = 'STM'; // Replace with the actual warehouse code as needed
        const initialData = await MtnService.loadMTNMaterialDetails(whCode);
        setMaterials(Array.isArray(initialData) ? initialData : []);
      } catch (error) {
        console.error('Failed to load initial data', error);
      }
    };

    loadData();
  }, []);

  const handleAddMTN = () => {
    setIsEntryFormOpen(true);
  };

  const handleCloseEntryForm = () => {
    setIsEntryFormOpen(false);
  };

  const handleSave = async () => {
    try {
      const whCode = 'STM'; // Replace with the actual warehouse code if needed

      // Save MTN details
      const response = await MtnService.saveMTNDetails(whCode, materials);

      if (response && response.success) {
        alert('MTN details saved successfully');
      } else {
        alert('Failed to save MTN details');
      }
    } catch (error) {
      console.error('Failed to save MTN details', error);
      alert('An error occurred while saving MTN details');
    }
  };

  const rows = useMemo(() => generateInitialRows(materials, searchTerm), [materials, searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ mt: 4, mx: 2 }}>
      <EditToolbar handleAddClick={handleAddMTN} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>MTN Details</Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>MTN NO</TableCell>
                <TableCell>MTN DATE</TableCell>
                <TableCell>REQUESTED BY</TableCell>
                <TableCell>WAREHOUSE</TableCell>
                <TableCell>PROJECT</TableCell>
                <TableCell>REMARKS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <TextField size="small" variant="outlined" type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} />
                </TableCell>
                <TableCell>
                  <TextField size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <TextField size="small" variant="outlined" defaultValue="STM" />
                </TableCell>
                <TableCell>
                  <TextField size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <TextField size="small" variant="outlined" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>MTN Materials</Typography>
        <Paper variant="outlined">
          <TableContainer sx={{ maxHeight: 580 }}>
            <Table aria-label="MTN materials table" stickyHeader>
              <TableHead>
                <TableRow>
                  {['MATERIAL CODE', 'MATERIAL DESCRIPTION', 'MATERIAL SPECIFICATION', 'UOM', 'BALANCE QUANTITY','ACTIONS'].map((header) => (
                    <TableCell key={header} align="center" className={classes.tableHeader}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((material, index) => (
                  <TableRow key={index} className={classes.tableRow}>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.MatCode}
                        onChange={(e) => {
                          const newMaterials = [...materials];
                          newMaterials[index].MatCode = e.target.value;
                          setMaterials(newMaterials);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.MatDesc}
                        onChange={(e) => {
                          const newMaterials = [...materials];
                          newMaterials[index].MatDesc = e.target.value;
                          setMaterials(newMaterials);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.Spec}
                        onChange={(e) => {
                          const newMaterials = [...materials];
                          newMaterials[index].Spec = e.target.value;
                          setMaterials(newMaterials);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.Unit}
                        onChange={(e) => {
                          const newMaterials = [...materials];
                          newMaterials[index].Unit = e.target.value;
                          setMaterials(newMaterials);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        value={material.BalQuantity}
                        onChange={(e) => {
                          const newMaterials = [...materials];
                          newMaterials[index].BalQuantity = e.target.value;
                          setMaterials(newMaterials);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton size="small">
                          <IconDotsVertical size="1.1rem" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 80]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" sx={{ mr: 2 }}>
          Print MTN
        </Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </Box>
      <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="New MTN Entry">
        <MtnEntryForm />
      </DialogModal>
    </Box>
  );
};

export default MTNScreen;



/*import React, { useState } from 'react';
import { TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import DialogModal from 'src/components/shared/Dialog'; // Adjust the path as per your project structure
import MaterialEntryForm from 'src/components/systems/Model/MtnEntryForm'; // Adjust the path as per your project structure

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  tableContainer: {
    marginTop: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const MaterialTransferNote = () => {
  const classes = useStyles();

  // State for materials
  const [materials, setMaterials] = useState([]);

  // State for dialog
  const [openMaterialEntryForm, setOpenMaterialEntryForm] = useState(false);

  // Handler for opening material entry form dialog
  const handleOpenMaterialEntryForm = () => {
    setOpenMaterialEntryForm(true);
  };

  // Handler for closing material entry form dialog
  const handleCloseMaterialEntryForm = () => {
    setOpenMaterialEntryForm(false);
  };

  // Handler for adding new material
  const handleAddMaterial = (newMaterial) => {
    setMaterials([...materials, newMaterial]);
  };

  // Handler for saving materials
  const handleSave = () => {
    console.log('Materials:', materials);
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h6" className={classes.title}>Material Transfer Note (MTN)</Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Material Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Specification</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell>Balance Quantity</TableCell>
              <TableCell>Transferred Quantity</TableCell>
              <TableCell>Avg Rate</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material, index) => (
              <TableRow key={index}>
                <TableCell>{material.materialCode}</TableCell>
                <TableCell>{material.description}</TableCell>
                <TableCell>{material.specification}</TableCell>
                <TableCell>{material.uom}</TableCell>
                <TableCell>{material.balanceQty}</TableCell>
                <TableCell>{material.transferredQty}</TableCell>
                <TableCell>{material.avgRate}</TableCell>
                <TableCell>{material.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleOpenMaterialEntryForm} className={classes.button}>Add Material</Button>
      <Button variant="contained" color="secondary" onClick={handleSave} className={classes.button}>Save</Button>
      
      {/* Dialog for adding material */
    /*}
      <DialogModal open={openMaterialEntryForm} onClose={handleCloseMaterialEntryForm} modelTitle="Add Material">
        <MaterialEntryForm
          open={openMaterialEntryForm}
          onClose={handleCloseMaterialEntryForm}
          onAddMaterial={handleAddMaterial}
        />
      </DialogModal>
    </Paper>
  );
};

export default MaterialTransferNote;
*/






























/*import React, { useState } from 'react';
import { TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import DialogModal from 'src/components/shared/Dialog'; // Adjust the path as per your project structure
import MaterialEntryForm from 'src/components/systems/Model/MtnEntryForm'; // Adjust the path as per your project structure

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  tableContainer: {
    marginTop: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const MaterialTransferNote = () => {
  const classes = useStyles();

  // State for MTN details
  const [mtnDetails, setMtnDetails] = useState({
    mtnNo: '',
    refNo: '',
    remarks: '',
    transferredFrom: 'MAIN STORES',
    transferredTo: '',
    requestedBy: '',
    mtnDate: '',
  });

  // State for materials
  const [materials, setMaterials] = useState([]);

  // State for dialog
  const [openMaterialEntryForm, setOpenMaterialEntryForm] = useState(false);

  // Handlers for input changes in MTN details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMtnDetails({
      ...mtnDetails,
      [name]: value,
    });
  };

  // Handler for opening material entry form dialog
  const handleOpenMaterialEntryForm = () => {
    setOpenMaterialEntryForm(true);
  };

  // Handler for closing material entry form dialog
  const handleCloseMaterialEntryForm = () => {
    setOpenMaterialEntryForm(false);
  };

  // Handler for adding new material
  const handleAddMaterial = (newMaterial) => {
    setMaterials([...materials, newMaterial]);
  };

  // Handler for saving MTN details and materials
  const handleSave = () => {
    console.log('MTN Details:', mtnDetails);
    console.log('Materials:', materials);
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h6" className={classes.title}>Material Transfer Note (MTN)</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="MTN No"
            name="mtnNo"
            value={mtnDetails.mtnNo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Ref No"
            name="refNo"
            value={mtnDetails.refNo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Remarks"
            name="remarks"
            value={mtnDetails.remarks}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Transferred From"
            name="transferredFrom"
            value={mtnDetails.transferredFrom}
            onChange={handleChange}
            fullWidth
            select
          >
            <MenuItem value="MAIN STORES">MAIN STORES</MenuItem>
            <MenuItem value="STM">STM</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Transferred To"
            name="transferredTo"
            value={mtnDetails.transferredTo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Requested By"
            name="requestedBy"
            value={mtnDetails.requestedBy}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="MTN Date"
            name="mtnDate"
            value={mtnDetails.mtnDate}
            onChange={handleChange}
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Material Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Specification</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell>Balance Quantity</TableCell>
              <TableCell>Transferred Quantity</TableCell>
              <TableCell>Avg Rate</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material, index) => (
              <TableRow key={index}>
                <TableCell>{material.materialCode}</TableCell>
                <TableCell>{material.description}</TableCell>
                <TableCell>{material.specification}</TableCell>
                <TableCell>{material.uom}</TableCell>
                <TableCell>{material.balanceQty}</TableCell>
                <TableCell>{material.transferredQty}</TableCell>
                <TableCell>{material.avgRate}</TableCell>
                <TableCell>{material.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleOpenMaterialEntryForm} className={classes.button}>Add Material</Button>
      <Button variant="contained" color="secondary" onClick={handleSave} className={classes.button}>Save</Button>
      
      {/* Dialog for adding material }/*
      <DialogModal open={openMaterialEntryForm} onClose={handleCloseMaterialEntryForm} modelTitle="Add Material">
        <MaterialEntryForm
          open={openMaterialEntryForm}
          onClose={handleCloseMaterialEntryForm}
          onAddMaterial={handleAddMaterial}
        />
      </DialogModal>
    </Paper>
  );
};

export default MaterialTransferNote;*/


