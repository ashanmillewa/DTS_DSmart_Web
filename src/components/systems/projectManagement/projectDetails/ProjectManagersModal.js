import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { fetchProjectManagers } from 'src/store/systems/projectManagement/ProjectManagerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 30,
  p: 4,
  '& .table-header': {
    backgroundColor: '#ECECEC',
  },
};

const ProjectManagersModal = ({ isOpen, onClose, handlePMAssign }) => {
  function generateGetProjectManagers(projectManagers, searchTerm) {
    return projectManagers
      .filter((projectManager) =>
        Object.values(projectManager).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .map((projectManager) => ({
        id: projectManager.ServiceNo,
        ServiceNo: projectManager.ServiceNo,
        Name: projectManager.Name,
      }));
  }

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState([]);
  const { projectManagers } = useSelector((state) => state.projectManagerReducer);
  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectManagers());
  }, [dispatch]);

  useEffect(() => {
    const getProjectManagers = generateGetProjectManagers(projectManagers, searchTerm);
    setRows(getProjectManagers);
  }, [projectManagers, searchTerm]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = rows.filter(
      (row) =>
        row.serviceNumber.toLowerCase().includes(term.toLowerCase()) ||
        row.name.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredRows(filtered);
  };

  const columns = [
    {
      field: 'ServiceNo',
      headerName: 'Service Number',
      // flex: 1,
      // width : 'auto
      headerClassName: 'table-header',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'Name',
      headerName: 'Name',
      flex: 1,
      // width : 'auto',
      width: 40,
      headerClassName: 'table-header',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'action',
      headerName: 'Action',
      // flex: 1,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'table-header',
      renderCell: (params) => (
        <Button
          size="small"
          aria-label="add"
          onClick={() => {
            handleRowCellClick(params);
          }}
        >
          <AddIcon />
        </Button>
      ),
    },
  ];

  // const handleRowCellClick = (data) => {
  //   console.log(data.row);
  //   handlePMAssign(data.row);
  // };

  const handleRowCellClick = (params) => {
    // console.log(params.row);
    // Assuming handlePMAssign expects the name of the project manager
    handlePMAssign(params.row.Name);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mt: 1, mb: 2, ml: 0.2 }}
          >
            Project Managers
          </Typography>
          <TextField
            placeholder="Search Project..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '96.5%', marginBottom: '10px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& input': {
                padding: '7px',
              },
            }}
          />
          <div style={{ height: 460, width: '100%' }}>
            <DataGrid
              rows={filteredRows.length > 0 ? filteredRows : rows}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 7 } },
              }}
              pageSizeOptions={[7, 25, 50, 100]}
            />
          </div>{' '}
        </Box>
      </Modal>
    </div>
  );
};
export default ProjectManagersModal;
