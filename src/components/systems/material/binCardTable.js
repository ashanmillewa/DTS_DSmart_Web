import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetBinCardDetails } from 'src/store/systems/materialManagement/binCardSlice';
//import BinCardEntryForm from '../Model/BinCardEntryForm';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  matDesRow: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
  matDesCell: {
    fontWeight: 'bold',
  },
});

function generateInitialRows(binCards, searchTerm) {
  return binCards
    .filter((binCard) =>
      Object.values(binCard).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((binCard, index) => ({
      id: `${binCard.MatCode}-${index}`,
      LocCode: binCard.LocCode,
      MatCode: binCard.MatCode,
      BalQty: binCard.BalQty,
      BalValue: binCard.BalValue,
      AvgPrice: binCard.AvgPrice,
      LastPurPrice: binCard.LastPurPrice,
      Status: binCard.Status,
      Line: binCard.Line,
      MatDes: binCard.MatDes,
      MatSpec: binCard.MatSpec,
      Unit: binCard.Unit,
    }));
}

function groupRowsByMatDes(rows) {
  const groupedRows = {};
  rows.forEach((row) => {
    if (!groupedRows[row.MatDes]) {
      groupedRows[row.MatDes] = [];
    }
    groupedRows[row.MatDes].push(row);
  });
  return groupedRows;
}

function BinCard() {
  const classes = useRowStyles();
  const { binCards } = useSelector((state) => state.binCardReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(GetBinCardDetails());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(binCards)) {
      const initialRows = generateInitialRows(binCards, searchTerm);
      setRows(initialRows);
    }
  }, [binCards, searchTerm]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const groupedRows = groupRowsByMatDes(rows);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="Bin Card Info">
        <BinCardEntryForm initialData={selectedRowData} />
      </DialogModal> */}
      <TableContainer sx={{ maxHeight: 580 }}>
        <Table aria-label="collapsible table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC' }}>
                MATERIAL CODE
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC' }}>
                LOCATION CODE
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>
                BALANCE QUANTITY
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>
                BALANCE VALUE
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>
                AVG PRICE
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC' }}>
                STATUS
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC' }}>
                UNIT
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>
                LINE NO
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(groupedRows)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((matDes, index) => (
                <React.Fragment key={index}>
                  <TableRow className={classes.matDesRow}>
                    <TableCell colSpan={8} align="left" className={classes.matDesCell}>
                      {matDes}
                    </TableCell>
                  </TableRow>
                  {groupedRows[matDes].map((row, rowIndex) => (
                    <TableRow key={rowIndex} className={classes.root}>
                      <TableCell align="center">{row.MatCode}</TableCell>
                      <TableCell align="center">{row.LocCode}</TableCell>
                      <TableCell align="right">{row.BalQty}</TableCell>
                      <TableCell align="right">{row.BalValue}</TableCell>
                      <TableCell align="right">{row.AvgPrice}</TableCell>
                      <TableCell align="center">{row.Status}</TableCell>
                      <TableCell align="center">{row.Unit}</TableCell>
                      <TableCell align="right">{row.Line}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={Object.keys(groupedRows).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default BinCard;
