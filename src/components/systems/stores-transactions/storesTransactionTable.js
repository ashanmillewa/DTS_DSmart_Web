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
  TableRow,
  TablePagination,
  TextField,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogModal from 'src/components/shared/Dialog';
import {
  GetStoresTransactionDetails,
  GetStoresTransactions,
} from 'src/store/systems/storesTransaction/StoresTransactionSlice';
import StoresTransactionEntryForm from '../Model/StoresTransactionEntryForm';
import * as React from 'react';

import Grid from '@mui/material/Grid';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: '#ECECEC',
  },
  tableRow: {
    cursor: 'pointer',
  },
  searchInput: {
    width: '220px',
  },
});

function generateInitialRows(storesTransactionDetails, searchTerm) {
  console.log('Stores Transaction Details 1', storesTransactionDetails);
  return storesTransactionDetails
    .filter((storesTransactionDetails) =>
      Object.values(storesTransactionDetails)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    )
    .map((storesTransactionDetails, index) => ({
      id: `${storesTransactionDetails.WHcode}-${index}`,
      WearHouse_code: storesTransactionDetails.WHcode,
      Doc_Type: storesTransactionDetails.DocType,
      Doc_No: storesTransactionDetails.DocNo,
      Material_Code: storesTransactionDetails.MatCode,
      Material_Desc: storesTransactionDetails.MatDesc,
      Unit: storesTransactionDetails.Unit,
      Quantity: storesTransactionDetails.Qty,
      Value: storesTransactionDetails.Value,
      Project: storesTransactionDetails.Project,
      Originated_By: storesTransactionDetails.OriginatedBy,
      Date: storesTransactionDetails.Date,
      AvgRate: storesTransactionDetails.AvgRate,
    }));
}

function EditToolbar({ handleSearchChange, searchTerm }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [open, setOpen] = React.useState(false);

  const handlestartDate = (newStartDate) => {
    const formattedDate = newStartDate.toISOString().split('T')[0];
    setStartDate(formattedDate);
  };

  const handleEndDate = (newEndDate) => {
    const formattedDate = newEndDate.toISOString().split('T')[0];
    setEndDate(formattedDate);
  };

  const handleLoadData = async () => {
    if (startDate == '' && endDate == '') {
      setOpen(true);
      return;
    }

    await dispatch(
      GetStoresTransactions({
        startDate: startDate,
        endDate: endDate,
      }),
    );
  };

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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={15} sm={8} lg={2}>
              <DatePicker
                label="Select Start Date"
                value={startDate}
                onChange={handlestartDate}
                renderInput={(params) => <TextField {...params} />}
                maxDate={new Date()}
              />
            </Grid>
            <Grid item xs={15} sm={8} lg={2}>
              <DatePicker
                label="Select End Date"
                value={endDate}
                onChange={handleEndDate}
                renderInput={(params) => <TextField {...params} />}
                maxDate={new Date()}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={1}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleLoadData}
                sx={{
                  height: '42px',
                }}
              >
                LOAD
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>

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
    </Box>
  );
}

export default function StoresTransaction() {
  const classes = useStyles();
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const { storesTransactios, storesTransactionDetails } = useSelector(
    (state) => state.storesTransactionReducer,
  );
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(GetStoresTransactions());
  }, [dispatch]);

  useEffect(() => {
    console.log('Stores Transaction Details 2', storesTransactionDetails);
  }, [storesTransactionDetails]);

  const rows = useMemo(
    () => generateInitialRows(storesTransactionDetails, searchTerm),
    [storesTransactionDetails, searchTerm],
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    dispatch(GetStoresTransactionDetails(row.WearHouse_code));
  };

  const handleEditClick = (event, row) => {
    event.stopPropagation();
    setSelectedRowData(row);
    setIsEntryFormOpen(true);
    dispatch(GetStoresTransactionDetails(row.WearHouse_code));
  };

  const handleCloseEntryForm = () => {
    setIsEntryFormOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <EditToolbar handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
      <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="Material Info">
        <StoresTransactionEntryForm initialData={selectedRowData} />
      </DialogModal>
      <TableContainer sx={{ maxHeight: 580 }}>
        <Table aria-label="stores transaction details" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left" className={classes.tableHeader}>
                WAREHOUSE CODE
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}>
                DOC TYPE
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}>
                DOC NO
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}>
                MAT CODE
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}>
                MAT DESCRIPTION
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}>
                UNIT
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}>
                QUANTITY
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}>
                VALUE
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}>
                PROJECT
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}>
                ORIGINATED BY
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}>
                DATE
              </TableCell>
              <TableCell align="left" className={classes.tableHeader}>
                AVERAGE RATE
              </TableCell>
              {/* <TableCell align="center" className={classes.tableHeader}>
                ACTIONS
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleRowClick(row)}
                className={classes.tableRow}
              >
                <TableCell align="left">{row.WearHouse_code}</TableCell>
                <TableCell align="left">{row.Doc_Type}</TableCell>
                <TableCell align="left">{row.Doc_No}</TableCell>
                <TableCell align="left">{row.Material_Code}</TableCell>
                <TableCell align="left">{row.Material_Desc}</TableCell>
                <TableCell align="left">{row.Unit}</TableCell>
                <TableCell align="left">{row.Quantity}</TableCell>
                <TableCell align="left">{row.Value}</TableCell>
                <TableCell align="left">{row.Project}</TableCell>
                <TableCell align="left">{row.Originated_By}</TableCell>
                <TableCell align="left">{row.Date}</TableCell>
                <TableCell align="left">{row.AvgRate}</TableCell>
                {/* <TableCell align="center">
                  <IconButton onClick={(event) => handleEditClick(event, row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
