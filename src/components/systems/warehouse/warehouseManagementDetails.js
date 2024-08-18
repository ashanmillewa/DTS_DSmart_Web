import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWarehouses } from 'src/store/systems/warehouse/WarehouseManagementDetailsSlice';
import { IconSearch, IconTrash } from '@tabler/icons';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'LocCode', numeric: false, disablePadding: false, label: 'WAREHOUSE CODE' },
  { id: 'LocName', numeric: false, disablePadding: false, label: 'WAREHOUSE NAME' },
  { id: 'Status', numeric: false, disablePadding: false, label: 'STATUS' },
  { id: 'EntrySDate', numeric: false, disablePadding: false, label: 'DATA ENTRY START DATE' },
  { id: 'EntryEDate', numeric: false, disablePadding: false, label: 'DATA ENTRY END DATE' }
];

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ backgroundColor: '#ECECEC' }}
          >
            {headCell.id === 'warehouseCode' ? (
              <>{headCell.label}</>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = ({ numSelected, handleSearch, search, handleReload }) => (
  <Toolbar
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
      ...(numSelected > 0 && {
        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      }),
    }}
  >
    {numSelected > 0 ? (
      <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
        {numSelected} selected
      </Typography>
    ) : (
      <Box sx={{ flex: '1 1 100%', display: 'flex', alignItems: 'center' }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size="1.1rem" />
              </InputAdornment>
            ),
          }}
          placeholder="Search Warehouse"
          size="small"
          onChange={handleSearch}
          value={search}
        />
      </Box>
    )}

    {numSelected > 0 ? (
      <Tooltip title="Delete">
        <IconButton>
          <IconTrash width="18" />
        </IconButton>
      </Tooltip>
    ) : (
      <Button variant="contained" onClick={handleReload} sx={{ ml: 2 }}>
        Reload
      </Button>
    )}
  </Toolbar>
);

const WarehouseManagementDetails = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('warehouseCode');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const  { warehouses } = useSelector((state) => state.warehouseManagementDetailsReducer);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  useEffect(() => {
    setRows(warehouses);
  }, [warehouses]);

  const handleSearch = (event) => {
    const filteredRows = warehouses.filter((row) =>
      row.warehouseName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRows(filteredRows);
  };

  const handleReload = () => {
    dispatch(fetchWarehouses());
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.warehouseName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleSave = () => {
    // Implement save functionality here
    console.log("Save button clicked");
  };

  return (
    <Box>
      <EnhancedTableToolbar
        numSelected={selected.length}
        handleSearch={handleSearch}
        search=""
        handleReload={handleReload}
      />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.warehouseName);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.warehouseName)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.warehouseName}
                    selected={isItemSelected}
                  >
                  
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.warehouseCode}
                    </TableCell>
                    <TableCell align="left">{row.warehouseName}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">{row.dataEntryStartDate}</TableCell>
                    <TableCell align="left">{row.dataEntryEndDate}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default WarehouseManagementDetails;
