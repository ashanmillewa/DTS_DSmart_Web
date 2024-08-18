import { Button, Box, TextField, Snackbar, Alert, AlertTitle } from '@mui/material';
import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockBalanceDetails } from 'src/store/systems/materialManagement/StockBalanceTableSlice';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Define the styles to match projectMatCost.js
const styles = {
  dataGrid: {
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: '#f0f0f0',
      borderBottom: '2px solid #dcdcdc',
    },
    '& .MuiDataGrid-cell': {
      borderBottom: '1px solid #dcdcdc',
    },
    '& .MuiDataGrid-row:nth-of-type(even)': {
      backgroundColor: '#f9f9f9',
    },
    '& .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  snackbar: {
    '& .MuiAlert-root': {
      backgroundColor: '#ffebee',
      color: '#d32f2f',
    },
  },
  bottomButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    marginTop: '10px',
  },
};

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

function generateInitialRows(stockBalances, searchTerm) {
  return stockBalances
    .filter((stockBalance) =>
      Object.values(stockBalance).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((stockBalance) => ({
      id: stockBalance.Warehouse,
      LocCode: stockBalance.LocCode,
      MatCode: stockBalance.MatCode,
      MatDesc: stockBalance.MatDesc,
      Category: stockBalance.Category,
      UOM: stockBalance.UOM,
      AvgPrice: stockBalance.AvgPrice,
      BalQty: stockBalance.BalQty,
      BalValue: stockBalance.BalValue,
    }));
}

function EditToolbar(props) {
  const { handleSearchChange, searchTerm } = props;

  return (
    <GridToolbarContainer sx={styles.toolbar}>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ width: '30%' }}
      />
    </GridToolbarContainer>
  );
}

export default function StockBalanceTable() {
  const [rowModesModel, setRowModesModel] = useState({});
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);

  const { stockBalances = [] } = useSelector((state) => state.stockBalance || {});

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDateString = (date) => {
    if (!date) return '';
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const handleStartDate = (newStartDate) => {
    setStartDate(formatDateString(newStartDate));
  };

  const handleEndDate = (newEndDate) => {
    setEndDate(formatDateString(newEndDate));
  };

  const [open, setOpen] = React.useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLoadData();
  };

  const handleLoadData = async () => {
    if (startDate === "" || endDate === "") {
      setOpen(true);
      return;
    }
    await dispatch(fetchStockBalanceDetails({ startDate, endDate }));
  };

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(fetchStockBalanceDetails({ startDate, endDate }));
    }
  }, [dispatch, startDate, endDate]);

  useEffect(() => {
    const initialRows = generateInitialRows(stockBalances, searchTerm);
    setRows(initialRows);
  }, [stockBalances, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'StockBalance');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
    saveAs(data, 'StockBalance.xlsx');
  };

  const columns = [
    {
      field: 'LocCode',
      headerName: 'WAREHOUSE',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'MatCode',
      headerName: 'MATERIAL CODE',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'MatDesc',
      headerName: 'MATERIAL DESCRIPTION',
      width: 160,
      align: 'left',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'Category',
      headerName: 'CATEGORY',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'UOM',
      headerName: 'UOM',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'AvgPrice',
      headerName: 'AVG RATE',
      width: 150,
      align: 'right',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'BalQty',
      headerName: 'BALANCE QUANTITY',
      width: 150,
      align: 'right',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'BalValue',
      headerName: 'BALANCE VALUE',
      width: 130,
      align: 'right',
      headerAlign: 'center',
      editable: true,
    },
  ];

  return (
    <div>
      <Box sx={{ height: 400, width: '100%', mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          sx={styles.dataGrid}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: {
              handleSearchChange,
              searchTerm,
            },
          }}
        />
      </Box>
      <Box sx={styles.bottomButtons}>
        <Button
          variant="contained"
          size="large"
          sx={styles.button}
          onClick={() => console.log('Monthly Summary Clicked')}
        >
          Monthly Summary
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={styles.button}
          onClick={handleExportToExcel}
        >
          Excel
        </Button>
      </Box>
    </div>
  );
}
