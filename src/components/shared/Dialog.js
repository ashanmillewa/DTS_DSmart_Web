import { Dialog, DialogActions, DialogContent, Fab, Grid, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import { IconX } from '@tabler/icons';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../container/PageContainer';
import ParentCard from './ParentCard';

const DialogModal = ({ open, onClose, children, modelTitle}) => {
  const BCrumb = [
    {
      to: '/',
      title: '',
    },
    {
      title: modelTitle,
    },
  ];

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={onClose}>
      {/* <DialogTitle>Add New Ticket</DialogTitle> */}
      <DialogContent>
        <PageContainer title="Entry Form" description="this is Ticket Info page">
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingBottom: 1,
            }}
          >
            <Box>
              <Tooltip title="Close">
                <Fab size="small" color="error" aria-label="Close" onClick={onClose}>
                  <IconX width={20} />
                </Fab>
              </Tooltip>
            </Box>
          </Grid>

          <Breadcrumb title={modelTitle} items={BCrumb} />
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <ParentCard title={modelTitle}>{children}</ParentCard>
            </Grid>
          </Grid>
        </PageContainer>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={onClose} color="primary">
          Cancel
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;

