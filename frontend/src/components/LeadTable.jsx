import {
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
    Box,
    CircularProgress,
    Snackbar,
    IconButton,
    Tooltip
  } from '@mui/material';
import leadsApi from '../client/leads';
import useApi from '../hooks/useApi';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const LeadsTable = ({leads, status, handleDelete, handleEdit}) => {
    const getLeadsApi = useApi(leadsApi.getAllLeads);

    return (
        <Grid item xs={12} width={'100%'}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" component="h2">
                  Leads
                </Typography>
                <IconButton
                  onClick={getLeadsApi.request}
                  color="primary"
                  disabled={status.loading}
                >
                  <RefreshIcon />
                </IconButton>
              </Box>
              {status.loading && !leads.length && (
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              )}
              {status.error && !leads.length && (
                <Alert
                  severity="error"
                  action={
                    <Button color="inherit" size="small" onClick={getLeadsApi.request}>
                      Try Again
                    </Button>
                  }
                >
                  {status.error}
                </Alert>
              )}
              {!status.loading && !status.error && !leads.length && (
                <Box py={4} textAlign="center">
                  <Typography color="textSecondary">No leads found.</Typography>
                </Box>
              )}
              {leads.length > 0 && (
                <TableContainer>
                  <Table size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Notes</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id} hover>
                          <TableCell>
                            <Typography variant="body1">{lead.name}</Typography>
                          </TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>
                            <Typography variant="body2">{lead.company_name || '—'}</Typography>
                          </TableCell>
                          <TableCell>{lead.phone}</TableCell>
                          <TableCell>{lead.notes || '—'}</TableCell>
                          <TableCell>{new Date(lead.created_at).toISOString()}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="Edit">
                              <IconButton color="primary" onClick={() => handleEdit(lead.id)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton color="error" onClick={() => handleDelete(lead.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
    )
}

export default LeadsTable