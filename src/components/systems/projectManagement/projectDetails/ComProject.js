import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogModal from 'src/components/shared/Dialog';
import { GetProjectDetails, GetProjects } from 'src/store/systems/projectManagement/ProjectManagerSlice';
import ProjectManagementDetailsEntryForm from '../../Model/ProjectManagementDetailsEntryForm';
 


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

function generateInitialRows(projects, searchTerm) {
  return projects
    .filter(projects =>
      Object.values(projects).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((projects, index) => ({
      id: `${projects.ProjectID}-${index}`,
      category: projects.ProCat,
      projectid: projects.ProjectID,
      projectname: projects.ProjectName,
      projectspecification: projects.ProjectSpec,
      projectmanager: projects.ProjManager,
      startdate: projects.StartDate,
      enddate: projects.EndDate,
      status: projects.Status,
    }));
}
function EditToolbar({ handleSearchChange, searchTerm ,handleAddClick}) {
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
      <Box sx={{ flexGrow: 1, textAlign: 'left', fontSize: '1.2rem', fontWeight: 'bold' }}>
        PROJECT MANAGEMENT DETAILS
      </Box>
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
          className={classes.addButton}
          sx={{ marginLeft: 2 }}
        >
          Add
        </Button>
    </Box>
  );
}



export default function ComProject() {
  const classes = useStyles();
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const { projects, projectDetails } = useSelector(state => state.projectManagerReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [detailsPage, setDetailsPage] = useState(0);
  const [detailsRowsPerPage, setDetailsRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(GetProjects());
  }, [dispatch]);

 const rows = useMemo(() => generateInitialRows(projects, searchTerm), [projects, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    dispatch(GetProjectDetails(row.ProjectID));
  };

  const handleEditClick = (event, row) => {
    event.stopPropagation();
    setSelectedRowData(row);
    setIsEntryFormOpen(true);
    dispatch(GetProjectDetails(row.ProjectID));
  };

  const handleCloseEntryForm = () => {
    setIsEntryFormOpen(false);
  };

  useEffect(() => {
  }, [projects]);

  const handleAddClick = () => {
    setSelectedRowData(null);
    setIsEntryFormOpen(true);
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
      <EditToolbar handleSearchChange={handleSearchChange} searchTerm={searchTerm} handleAddClick={handleAddClick} />
      <DialogModal open={isEntryFormOpen} onClose={handleCloseEntryForm} modelTitle="Project Management Info">
        <ProjectManagementDetailsEntryForm initialData={selectedRowData} />
      </DialogModal>
      <TableContainer sx={{ maxHeight: 580 }}>
        <Table aria-label="Project Management Details" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left" className={classes.tableHeader}>CATEGORY</TableCell>
              <TableCell align="left" className={classes.tableHeader}>PROJECT ID</TableCell>
              <TableCell align="left" className={classes.tableHeader}>PROJECT NAME</TableCell>
              <TableCell align="left" className={classes.tableHeader}>PROJECT SPECIFICATION</TableCell>
              <TableCell align="left" className={classes.tableHeader}>PROJECT MANAGER</TableCell>
              <TableCell align="left" className={classes.tableHeader}>START DATE</TableCell>
              <TableCell align="left" className={classes.tableHeader}>END DATE</TableCell>
              <TableCell align="left" className={classes.tableHeader}>STATUS</TableCell>
              <TableCell align="left" className={classes.tableHeader}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} className={classes.tableRow} hover onClick={() => handleRowClick(row)}>
                <TableCell align="left">{row.category}</TableCell>
                <TableCell align="left">{row.projectid}</TableCell>
                <TableCell align="left">{row.projectname}</TableCell>
                <TableCell align="left">{row.projectspecification}</TableCell>
                <TableCell align="left">{row.projectmanager}</TableCell>
                <TableCell align="left">{row.startdate}</TableCell>
                <TableCell align="left">{row.enddate}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">
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
