import { makeStyles } from '@material-ui/core/styles';
import { Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogModal from 'src/components/shared/Dialog';
import { GetSupplierDetails } from 'src/store/systems/supplier/SupplierSlice';
import SupplierEntryForm from '../Model/SupplierEntryForm';

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: '#ECECEC',
  },
  tableRow: {
    cursor: 'pointer',
  },
  searchInput: {
    width: '180px',
    marginRight: '16px',
  },
  remarkCell: {
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

function generateInitialRows(suppliers, searchTerm) {
  return suppliers
    .filter((supplier) =>
      Object.values(supplier).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((supplier, index) => ({
      id: `${supplier.SupCode}-${index}`,
      SupCode: supplier.SupCode,
      SupName: supplier.SupName,
      SupConPerson: supplier.SupConPerson,
      SumEmail: supplier.SumEmail,
      SupPhoneNo: supplier.SupPhoneNo,
      SupAddress: supplier.SupAddress,
      // SupCity: supplier.SupCity,
      // SupCountry: supplier.SupCountry,
      SupRemarks: supplier.SupRemarks,
      SupVatNo: supplier.SupVatNo,
      status: supplier.SupStatus,
    }));
}

function EditToolbar({ handleSearchChange, searchTerm, handleAddClick }) {
  const classes = useStyles();

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
      <Box sx={{ flexGrow: 1, textAlign: 'left', fontSize: '1.2rem', fontWeight: 'bold' }}></Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
        <Button color="primary" variant="contained" onClick={handleAddClick} sx={{ marginLeft: 1 }}>
          Add Supplier
        </Button>
      </Box>
    </Box>
  );
}

export default function SupplierCatalog() {
  const classes = useStyles();
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const { supDataList } = useSelector((state) => state.supplierReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(GetSupplierDetails());
  }, [dispatch]);

  const rows = useMemo(() => generateInitialRows(supDataList, searchTerm), [supDataList, searchTerm]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleRowClick = useCallback((row) => {
    setSelectedRowData(row);
  }, []);

  const handleEditClick = useCallback((event, row) => {
    event.stopPropagation();
    setSelectedRowData(row);
    setIsEntryFormOpen(true);
  }, []);

  const handleCloseEntryForm = useCallback(() => {
    setIsEntryFormOpen(false);
    setSelectedRowData(null);
  }, []);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  const handleAddClick = () => {
    const newSupplierCode = `S${String(supDataList.length + 1).padStart(4, '0')}`;
    setSelectedRowData({ SupCode: newSupplierCode });
    setIsEntryFormOpen(true);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <EditToolbar
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        handleAddClick={handleAddClick}
      />
      <TableContainer sx={{ maxHeight: 580 }}>
        <Table aria-label="supplier catalogue table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableHeader}>
                CODE
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                NAME
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                CONTACT PERSON
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                EMAIL
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                NUMBER
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                ADDRESS
              </TableCell>
              {/* <TableCell align="center" className={classes.tableHeader}>CITY</TableCell>
              <TableCell align="center" className={classes.tableHeader}>COUNTRY</TableCell> */}
              <TableCell align="left" className={classes.tableHeader}>
                REMARK
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                VAT NUMBER
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                STATUS
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((supplier, index) => (
                <TableRow
                  key={index}
                  className={classes.tableRow}
                  hover
                  onClick={() => handleRowClick(supplier)}
                >
                  <TableCell align="center">{supplier.SupCode}</TableCell>
                  <TableCell align="left">{supplier.SupName}</TableCell>
                  <TableCell align="center">{supplier.SupConPerson}</TableCell>
                  <TableCell align="left">{supplier.SumEmail}</TableCell>
                  <TableCell align="left">{supplier.SupPhoneNo}</TableCell>
                  <TableCell align="left">{supplier.SupAddress}</TableCell>
                  {/* <TableCell align="center">{supplier.SupCity}</TableCell>
                <TableCell align="center">{supplier.SupCountry}</TableCell> */}
                  <TableCell align="left" className={classes.remarkCell}>
                    {supplier.SupRemarks}
                  </TableCell>
                  <TableCell align="center">{supplier.SupVatNo}</TableCell>
                  <TableCell align="center">{supplier.status}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(event) => handleEditClick(event, supplier)}>
                      <EditIcon />
                    </IconButton>
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
      <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="Supplier Info">
        <SupplierEntryForm initialData={selectedRowData} />
      </DialogModal>
    </Paper>
  );
}
