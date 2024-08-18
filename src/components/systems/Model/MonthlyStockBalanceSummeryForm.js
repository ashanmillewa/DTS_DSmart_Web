import React, { useState } from 'react';
import { Box, Button, Collapse, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';

const headCells = [
  { id: 'materialCode', label: 'MATERIAL CODE' },
  { id: 'materialDescription', label: 'MATERIAL DESCRIPTION' },
  { id: 'materialSpecification', label: 'MATERIAL SPECIFICATION' },
  { id: 'uom', label: 'UOM' },
  { id: 'openingQuantity', label: 'OPENING QUANTITY' },
  { id: 'issuedQuantity', label: 'ISSUED QUANTITY' },
  { id: 'balanceQuantity', label: 'BALANCE QUANTITY' },
];

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const MonthlyStockBalanceEntryForm = () => {
  const classes = useRowStyles();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([
    { materialCode: '', materialDescription: '', materialSpecification: '', uom: '', openingQuantity: '', issuedQuantity: '', balanceQuantity: '' }
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [name]: value };
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { materialCode: '', materialDescription: '', materialSpecification: '', uom: '', openingQuantity: '', issuedQuantity: '', balanceQuantity: '' }]);
  };

  const handleSave = () => {
    console.log('Saved Data:', rows);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>Show Monthly Summary</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: '80%', mx: 'auto', mt: 5, bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
          <Paper variant="outlined">
            <TableContainer>
              <Table aria-label="collapsible table" stickyHeader>
                <TableHead>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <TableCell key={headCell.id}>
                        <TableSortLabel>
                          {headCell.label}
                          <Box component="span" sx={visuallyHidden}>
                          </Box>
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index} className={classes.root}>
                      {headCells.map((headCell) => (
                        <TableCell key={headCell.id}>
                          <TextField
                            name={headCell.id}
                            value={row[headCell.id]}
                            onChange={(event) => handleChange(index, event)}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Modal>
    </>
  );
};

export default MonthlyStockBalanceEntryForm;
