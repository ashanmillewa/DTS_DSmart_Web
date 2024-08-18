import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TextField, Typography, Tooltip
} from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { IconDotsVertical } from '@tabler/icons';
import DialogModal from 'src/components/shared/Dialog'; // Update this path if needed
import MrqEntryForm from 'src/components/systems/Model/MrqEntryForm'; // Update this path if needed
import MrqService from 'src/store/service/MrqService'; // Update the path accordingly

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
        placeholder="Search MRQ Materials"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={classes.searchInput}
      />
      <Button color="primary" variant="contained" className={classes.toolbarButton} onClick={handleAddClick}>
        Add New MRQ
      </Button>
    </Box>
  );
};

const MRQScreen = () => {
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
        const initialData = await MrqService.loadMRQMaterialDetails(whCode);
        setMaterials(Array.isArray(initialData) ? initialData : []);
      } catch (error) {
        console.error('Failed to load initial data', error);
      }
    };

    loadData();
  }, []);

  const handleAddMRQ = () => {
    setIsEntryFormOpen(true);
  };

  const handleCloseEntryForm = () => {
    setIsEntryFormOpen(false);
  };

  const handleSave = async () => {
    try {
      const whCode = 'STM'; // Replace with the actual warehouse code if needed

      // Save MRQ details
      const response = await MrqService.saveMRQDetails(whCode, materials);

      if (response && response.success) {
        alert('MRQ details saved successfully');
      } else {
        alert('Failed to save MRQ details');
      }
    } catch (error) {
      console.error('Failed to save MRQ details', error);
      alert('An error occurred while saving MRQ details');
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
      <EditToolbar handleAddClick={handleAddMRQ} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>MRQ Details</Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>MRQ NO</TableCell>
                <TableCell>MRQ DATE</TableCell>
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
        <Typography variant="h6" sx={{ mb: 1 }}>MRQ Materials</Typography>
        <Paper variant="outlined">
          <TableContainer sx={{ maxHeight: 580 }}>
            <Table aria-label="MRQ materials table" stickyHeader>
              <TableHead>
                <TableRow>
                  {['MATERIAL CODE', 'MATERIAL DESCRIPTION', 'MATERIAL SPECIFICATION', 'UOM', 'BALANCE QUANTITY', 'ISSUED QUANTITY', 'ACTIONS'].map((header) => (
                    <TableCell key={header} align="center" className={classes.tableHeader}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((material, index) => (
                  <TableRow key={index} className={classes.tableRow}>
                    {Object.keys(material).map((key) => (
                      <TableCell key={key} align="center">
                        <TextField
                          size="small"
                          value={material[key]}
                          onChange={(e) => {
                            const newMaterials = [...materials];
                            newMaterials[index][key] = e.target.value;
                            setMaterials(newMaterials);
                          }}
                        />
                      </TableCell>
                    ))}
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
          Print MRQ
        </Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </Box>
      <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="New MRQ Entry">
        <MrqEntryForm />
      </DialogModal>
    </Box>
  );
};

export default MRQScreen;







// import { makeStyles } from '@material-ui/core/styles';
// import { Add as AddIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
// import { Box, Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
// import { useEffect, useMemo, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import DialogModal from 'src/components/shared/Dialog';
// import { loadMrqMaterials } from 'src/store/systems/stores-transactions/MrqSlice';
// import MrqEntryForm from 'src/components/systems/Model/MrqEntryForm';

// const useStyles = makeStyles({
//   tableHeader: {
//     backgroundColor: '#ECECEC',
//   },
//   tableRow: {
//     cursor: 'pointer',
//     width: 210,
//   },
//   searchInput: {
//     width: '220px',
//     marginLeft: '10px',
//   },
// });

// function generateInitialRows(materials, searchTerm) {
//   return materials
//     .filter(material =>
//       Object.values(material).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .map((material, index) => ({
//       id: `${material.MatCode}-${index}`,
//       MatCode: material.MatCode,
//       MatDesc: material.MatDesc,
//       Unit: material.Unit,
//       BalQuantity: material.BalQuantity,
//       Spec: material.Spec,
//     }));
// }

// function EditToolbar({ handleSearchChange, searchTerm, handleAddClick }) {
//   const classes = useStyles();
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingRight: '2px',
//         marginBottom: '20px',
//       }}
//     >
//       <TextField
//         placeholder="Search ..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className={classes.searchInput}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//           sx: {
//             '& input': {
//               padding: '7px',
//             },
//           },
//         }}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<AddIcon />}
//         onClick={handleAddClick}
//         sx={{ marginLeft: 2 }}
//       >
//         Add
//       </Button>
//     </Box>
//   );
// }

// export default function MrqMaterials() {
//   const classes = useStyles();
//   const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
//   const { mrqMaterials } = useSelector(state => state.mrq);
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     dispatch(loadMrqMaterials());
//   }, [dispatch]);

//   const rows = useMemo(() => generateInitialRows(mrqMaterials, searchTerm), [mrqMaterials, searchTerm]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleRowClick = (row) => {
//     setSelectedRowData(row);
//     dispatch(loadMrqMaterials(row.MatCode));
//   };

//   const handleEditClick = (event, row) => {
//     event.stopPropagation();
//     setSelectedRowData(row);
//     setIsEntryFormOpen(true);
//     dispatch(loadMrqMaterials(row.MatCode));
//   };

//   const handleAddClick = () => {
//     setSelectedRowData(null);
//     setIsEntryFormOpen(true);
//   };

//   const handleCloseEntryForm = () => {
//     setIsEntryFormOpen(false);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <EditToolbar handleSearchChange={handleSearchChange} searchTerm={searchTerm} handleAddClick={handleAddClick} />
//       <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="MRQ details">
//         <MrqEntryForm initialData={selectedRowData} />
//       </DialogModal>
//       <TableContainer sx={{ maxHeight: 580 }}>
//         <Table aria-label="MRQ details" stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell align="center" className={classes.tableHeader}>MATERIAL CODE</TableCell>
//               <TableCell align="left" className={classes.tableHeader}>MATERIAL DESCRIPTION</TableCell>
//               <TableCell align="right" className={classes.tableHeader}>MATERIAL SPECIFICATION</TableCell>
//               <TableCell align="center" className={classes.tableHeader}>UOM</TableCell>
//               <TableCell align="center" className={classes.tableHeader}>BALANCE QUANTITY</TableCell>
//               <TableCell align="center" className={classes.tableHeader}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//               <TableRow key={row.id} hover className={classes.tableRow} onClick={() => handleRowClick(row)}>
//                 <TableCell align="center">{row.MatCode}</TableCell>
//                 <TableCell align="left">{row.MatDesc}</TableCell>
//                 <TableCell align="right">{row.Spec}</TableCell>
//                 <TableCell align="center">{row.Unit}</TableCell>
//                 <TableCell align="center">{row.BalQuantity}</TableCell>
//                 <TableCell align="center">
//                   <IconButton onClick={(event) => handleEditClick(event, row)}>
//                     <EditIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {/* Uncomment if you need pagination
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 50]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={(event, newPage) => setPage(newPage)}
//         onRowsPerPageChange={(event) => {
//           setRowsPerPage(+event.target.value);
//           setPage(0);
//         }}
//       />
//       */}
//     </Paper>
//   );
// }














// import { makeStyles } from '@material-ui/core/styles';
// import {
//   Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TablePagination, TableRow, TextField, Typography, Tooltip
// } from '@mui/material';
// import { useState, useEffect, useMemo } from 'react';
// import { IconDotsVertical } from '@tabler/icons';
// import DialogModal from 'src/components/shared/Dialog'; // Update this path if needed
// import MrqEntryForm from 'src/components/systems/Model/MrqEntryForm'; // Update this path if needed
// import MrqService from 'src/store/service/MrqService'; // Update the path accordingly
// import {getSuppliers} from 'src/store/systems/stores-transactions/MrqSlice';


// const useStyles = makeStyles({
//   tableHeader: {
//     backgroundColor: '#ECECEC',
//   },
//   tableRow: {
//     cursor: 'pointer',
//   },
//   searchInput: {
//     width: '120px',
//   },
//   toolbar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '20px',
//   },
//   toolbarButton: {
//     marginLeft: 'auto',
//   },
// });

// const generateInitialRows = (materials, searchTerm) => {
//   return materials
//     .filter(material =>
//       Object.values(material).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .map((material, index) => ({
//       id: `${material.MatCode}-${index}`,
//       MatCode: material.MatCode,
//       MatDesc: material.MatDesc,
//       Unit: material.Unit,
//       BalQuantity: material.BalQuantity,
//       Spec: material.Spec,
       
//     }));
// };

// const EditToolbar = ({ handleAddClick, searchTerm, setSearchTerm }) => {
//   const classes = useStyles();
//   return (
//     <Box className={classes.toolbar}>
//       <TextField
//         variant="outlined"
//         size="small"
//         placeholder="Search MRQ Materials"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className={classes.searchInput}
//       />
//       <Button color="primary" variant="contained" className={classes.toolbarButton} onClick={handleAddClick}>
//         Add New MRQ
//       </Button>
//     </Box>
//   );
// };

// const MRQScreen = () => {
//   const classes = useStyles();
//   const [materials, setMaterials] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);

//   // useEffect(() => {
//   //   const loadData = async () => {
//   //     try {
//   //       const whCode = 'STM'; // Replace with the actual warehouse code as needed
//   //       const initialData = await MrqService.loadMRQMaterialDetails(whCode);
//   //       setMaterials(Array.isArray(initialData) ? initialData : []);
//   //     } catch (error) {
//   //       console.error('Failed to load initial data', error);
//   //     }
//   //   };

//   //   loadData();
//   // }, []);

//   const handleAddMRQ = () => {
//     setIsEntryFormOpen(true);
//   };

//   const handleCloseEntryForm = () => {
//     setIsEntryFormOpen(false);
//   };

//   // const handleSave = async () => {
//   //   try {
//   //     const whCode = 'STM'; // Replace with the actual warehouse code if needed

//   //     // Save MRQ details
//   //     const response = await MrqService.saveMRQDetails(whCode, materials);

//   //     if (response && response.success) {
//   //       alert('MRQ details saved successfully');
//   //     } else {
//   //       alert('Failed to save MRQ details');
//   //     }
//   //   } catch (error) {
//   //     console.error('Failed to save MRQ details', error);
//   //     alert('An error occurred while saving MRQ details');
//   //   }
//   // };

//   const rows = useMemo(() => generateInitialRows(materials, searchTerm), [materials, searchTerm]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Box sx={{ mt: 4, mx: 2 }}>
//       <EditToolbar handleAddClick={handleAddMRQ} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h6" sx={{ mb: 1 }}>MRQ Materials</Typography>
//         <Paper variant="outlined">
//           <TableContainer sx={{ maxHeight: 580 }}>
//             <Table aria-label="MRQ materials table" stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   {['MATERIAL CODE', 'MATERIAL DESCRIPTION', 'MATERIAL SPECIFICATION', 'UOM', 'BALANCE QUANTITY', 'ACTIONS'].map((header) => (
//                     <TableCell key={header} align="center" className={classes.tableHeader}>
//                       {header}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((material, index) => (
//                   <TableRow key={index} className={classes.tableRow}>
//                     <TableCell align="center">
//                       <TextField
//                         size="small"
//                         value={material.MatCode}
//                         onChange={(e) => {
//                           const newMaterials = [...materials];
//                           newMaterials[index].MatCode = e.target.value;
//                           setMaterials(newMaterials);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         size="small"
//                         value={material.MatDesc}
//                         onChange={(e) => {
//                           const newMaterials = [...materials];
//                           newMaterials[index].MatDesc = e.target.value;
//                           setMaterials(newMaterials);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         size="small"
//                         value={material.Spec}
//                         onChange={(e) => {
//                           const newMaterials = [...materials];
//                           newMaterials[index].Spec = e.target.value;
//                           setMaterials(newMaterials);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         size="small"
//                         value={material.Unit}
//                         onChange={(e) => {
//                           const newMaterials = [...materials];
//                           newMaterials[index].Unit = e.target.value;
//                           setMaterials(newMaterials);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         size="small"
//                         value={material.BalQuantity}
//                         onChange={(e) => {
//                           const newMaterials = [...materials];
//                           newMaterials[index].BalQuantity = e.target.value;
//                           setMaterials(newMaterials);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         size="small"
//                         value={material.IssuedQuantity}
//                         onChange={(e) => {
//                           const newMaterials = [...materials];
//                           newMaterials[index].IssuedQuantity = e.target.value;
//                           setMaterials(newMaterials);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Tooltip title="Edit">
//                         <IconButton size="small">
//                           <IconDotsVertical size="1.1rem" />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 80]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </Box>
//       <Box mt={2} display="flex" justifyContent="flex-end">
//         <Button variant="contained" sx={{ mr: 2 }}>
//           Print MRQ
//         </Button>
//         <Button variant="contained" onClick={handleSave}>Save</Button>
//       </Box>
//       <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="New MRQ Entry">
//         <MrqEntryForm />
//       </DialogModal>
//     </Box>
//   );
// };

// export default MRQScreen;












