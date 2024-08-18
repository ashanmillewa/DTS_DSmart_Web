import { makeStyles } from '@material-ui/core/styles';
import { TextField, Toolbar } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  searchInput: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

function EditToolbar({ handleSearchChange, searchTerm }) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <TextField
        className={classes.searchInput}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        variant="outlined"
        size="small"
      />
    </Toolbar>
  );
}

export default EditToolbar;
