import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogModal from 'src/components/shared/Dialog';
import { GetMaterialDetails, GetMaterials } from 'src/store/systems/materialCatalogue/MaterialCatalogueSlice';
import { insertWarehouseEntry } from 'src/store/systems/materialCatalogue/MaterialDetailsSlice';
import WarehouseEntryForm from '../Model/MaterialDetailsEntryForm';
import MaterialEntryForm from '../Model/MaterialEntryForm';

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: '#ECECEC',
  },
  tableRow: {
    cursor: 'pointer',
    // width: 210,
  },
  searchInput: {
    width: '220px',
    marginLeft: '10px',
  },
});

function generateInitialRows(materials, searchTerm) {
  return materials
    .filter(material =>
      Object.values(material).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((material, index) => ({
      id: `${material.MatCode}-${index}`,
      Category: material.MainCategoryDesc,
      MaterialCode: material.MatCode,
      MaterialDescription: material.Description,
      MaterialSpecification: material.MatSpec,
      UOM: material.Unit,
      Status: material.Status,
    }));
}

function EditToolbar({ handleSearchChange, searchTerm, handleAddClick }) {
  const classes = useStyles();

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
      <TextField
        placeholder="Search ..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={classes.searchInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            '& input': {
              padding: '7px',
            },
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddClick}
        sx={{ marginLeft: 2 }}
      >
        Add New
      </Button>
    </Box>
  );
}

function AdditionalMaterialToolbar({ handleAddClick }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '2px',
        marginBottom: '20px',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddClick}
      >
        Add New
      </Button>
    </Box>
  );
}

export default function MaterialCatalog() {
  const classes = useStyles();
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [isWarehouseEntryFormOpen, setIsWarehouseEntryFormOpen] = useState(false);
  const { materials, materialDetails } = useSelector(state => state.materialCatalogueReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [detailsPage, setDetailsPage] = useState(0);
  const [detailsRowsPerPage, setDetailsRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(GetMaterials());
  }, [dispatch]);

  const rows = useMemo(() => generateInitialRows(materials, searchTerm), [materials, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    dispatch(GetMaterialDetails(row.MaterialCode));
  };

  const handleEditClick = (event, row) => {
    event.stopPropagation();
    setSelectedRowData(row);
    setIsEntryFormOpen(true);
    dispatch(GetMaterialDetails(row.MaterialCode));
  };

  const handleWarehouseEditClick = (event, detail) => {
    event.stopPropagation();
    setSelectedRowData(detail);
    setIsWarehouseEntryFormOpen(true);
  };

  const handleAddClick = () => {
    setSelectedRowData(null);
    setIsEntryFormOpen(true);
  };

  const handleCloseEntryForm = () => {
    setIsEntryFormOpen(false);
  };

  const handleCloseWarehouseEntryForm = () => {
    setIsWarehouseEntryFormOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDetailsPageChange = (event, newPage) => {
    setDetailsPage(newPage);
  };

  const handleDetailsRowsPerPageChange = (event) => {
    setDetailsRowsPerPage(+event.target.value);
    setDetailsPage(0);
  };

  const handleWarehouseAddClick = () => {
    if (selectedRowData) {
      setSelectedRowData(prev => ({ ...prev, MatCode: selectedRowData.MaterialCode }));
    }
    setIsWarehouseEntryFormOpen(true);
  };

  const handleWarehouseFormSubmit = (values) => {
    dispatch(insertWarehouseEntry(values)).then(() => {
      // dispatch(GetMaterialDetails(values.MatCode));
      setIsWarehouseEntryFormOpen(false);
    });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <EditToolbar handleSearchChange={handleSearchChange} searchTerm={searchTerm} handleAddClick={handleAddClick} />
      <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="Material Info">
        <MaterialEntryForm initialData={selectedRowData} />
      </DialogModal>
      <DialogModal open={isWarehouseEntryFormOpen} onClose={handleCloseWarehouseEntryForm} modelTitle="Material Details">
        <WarehouseEntryForm initialData={selectedRowData} onSubmit={handleWarehouseFormSubmit} />
      </DialogModal>
      <TableContainer sx={{ height: 450 }}>
        <Table aria-label="material catalogue table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>CATEGORY</TableCell>
              <TableCell align="center" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>MATERIAL CODE</TableCell>
              <TableCell align="left" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>MATERIAL DESCRIPTION</TableCell>
              <TableCell align="right" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>MATERIAL SPECIFICATION</TableCell>
              <TableCell align="center" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>UOM</TableCell>
              <TableCell align="center" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>STATUS</TableCell>
              <TableCell align="center" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id} hover className={classes.tableRow} onClick={() => handleRowClick(row)}>
                <TableCell align="center">{row.Category}</TableCell>
                <TableCell align="center">{row.MaterialCode}</TableCell>
                <TableCell align="left">{row.MaterialDescription}</TableCell>
                <TableCell align="right">{row.MaterialSpecification}</TableCell>
                <TableCell align="center">{row.UOM}</TableCell>
                <TableCell align="center">{row.Status}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(event) => handleEditClick(event, row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {selectedRowData && (
        <>
          <AdditionalMaterialToolbar handleAddClick={handleWarehouseAddClick} />
          <TableContainer sx={{ maxHeight: 580 }}>
            <Table aria-label="material details table" stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className={classes.tableHeader} sx={{ backgroundColor: '#ECECEC' }}>WAREHOUSE</TableCell>
                  <TableCell align="right" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>BIN LOCATION</TableCell>
                  <TableCell align="right" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>RE_ORDER QUANTITY</TableCell>
                  <TableCell align="right" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>BALANCE QUANTITY</TableCell>
                  <TableCell align="right" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>AVG RATE</TableCell>
                  <TableCell align="right" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>BALANCE VALUE</TableCell>
                  <TableCell align="right" className={classes.tableHeader}sx={{ backgroundColor: '#ECECEC' }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materialDetails.slice(detailsPage * detailsRowsPerPage, detailsPage * detailsRowsPerPage + detailsRowsPerPage).map((detail, index) => (
                  <TableRow key={index} className={classes.tableRow} hover>
                    <TableCell align="left">{detail.WHname}</TableCell>
                    <TableCell align="right">{detail.BinLocation}</TableCell>
                    <TableCell align="right">{detail.RecLevel}</TableCell>
                    <TableCell align="right">{detail.BalQty}</TableCell>
                    <TableCell align="right">{detail.AvgPrice}</TableCell>
                    <TableCell align="right">{detail.BalValuve}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(event) => handleWarehouseEditClick(event, detail)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={materialDetails.length}
            rowsPerPage={detailsRowsPerPage}
            page={detailsPage}
            onPageChange={handleDetailsPageChange}
            onRowsPerPageChange={handleDetailsRowsPerPageChange}
          />
        </>
      )}
    </Paper>
  );
}
