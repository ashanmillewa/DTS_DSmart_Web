import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetReorderLevelDetails } from 'src/store/systems/Report/recorderLevelSlice';
import EditToolbar from 'src/views/systems/report/EditToolbar';

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  categoryRow: {
    backgroundColor: '#f5f5f5',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  header: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caption: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
  },
});

function generateInitialRows(reorderLevels, searchTerm) {
  return reorderLevels
    .filter((level) =>
      Object.values(level).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((level, index) => ({
      id: `${level.materialCode}-${index}`,
      category: level.category,
      warehouse: level.warehouse,
      materialCode: level.materialCode,
      materialDescription: level.materialDescription,
      uom: level.uom,
      avgRate: level.avgRate,
      reorderLevel: level.reorderLevel,
      balanceQuantity: level.balanceQuantity,
      balanceValue: level.balanceValue,
    }));
}

function groupRowsByCategory(rows) {
  const groupedRows = {};
  rows.forEach(row => {
    if (!groupedRows[row.category]) {
      groupedRows[row.category] = [];
    }
    groupedRows[row.category].push(row);
  });
  return groupedRows;
}

function RecorderLevelTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { reorderLevels } = useSelector((state) => state.reorderLevel);
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(GetReorderLevelDetails());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(reorderLevels)) {
      const initialRows = generateInitialRows(reorderLevels, searchTerm);
      setRows(initialRows);
    }
  }, [reorderLevels, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const groupedRows = groupRowsByCategory(rows);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div className={classes.header}>
        <Typography className={classes.caption} variant="h4" component="div">Reorder Level Reach Details</Typography>
        <EditToolbar handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
      </div>
      <TableContainer sx={{ maxHeight: 580 }}>
        <Table aria-label="collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC', fontWeight: 'bold' }}>CATEGORY</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC' }}>WAREHOUSE</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC' }}>MATERIAL CODE</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC' }}>MATERIAL DESCRIPTION</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#ECECEC' }}>UOM</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>AVG RATE</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>REORDER LEVEL</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>BALANCE QUANTITY</TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#ECECEC' }}>BALANCE VALUE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(groupedRows).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
              <React.Fragment key={index}>
                <TableRow className={classes.categoryRow}>
                  <TableCell colSpan={9} align="left">
                    {category}
                  </TableCell>
                </TableRow>
                {groupedRows[category].map((row, rowIndex) => (
                  <TableRow key={rowIndex} className={classes.root}>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.warehouse}</TableCell>
                    <TableCell align="center">{row.materialCode}</TableCell>
                    <TableCell align="center">{row.materialDescription}</TableCell>
                    <TableCell align="center">{row.uom}</TableCell>
                    <TableCell align="right">{row.avgRate}</TableCell>
                    <TableCell align="right">{row.reorderLevel}</TableCell>
                    <TableCell align="right">{row.balanceQuantity}</TableCell>
                    <TableCell align="right">{row.balanceValue}</TableCell>
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

export default RecorderLevelTable;
