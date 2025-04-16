import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  CircularProgress,
  Snackbar
} from '@mui/material';
import useApi from '../hooks/useApi';
import leadsApi from '../client/leads';
import { useFormik } from 'formik';
import LeadsTable from './LeadTable';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  company_name: '',
  notes: ''
};

const LeadManagementApp = () => {
  const [view, setView] = useState('form');
  const [updateLead, setUpdateLead] = useState(null);

  const { values, setValues, resetForm, errors, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      if (updateLead) handleUpdate(values)
      else {
        const flag = await submitLead(values);
        if(flag) resetForm()
      }
    }
  });

  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const getLeadsApi = useApi(leadsApi.getAllLeads);

  useEffect(() => {
    setStatus({ ...status, loading: true });
    getLeadsApi.request();
  }, []);

  useEffect(() => {
    if (getLeadsApi.data) {
      setLeads(getLeadsApi.data);
    }
    setStatus({ loading: false, success: true, error: null });
  }, [getLeadsApi.data]);

  const submitLead = async (leadData) => {
    setStatus({ ...status, loading: true });
    try {
      const newLead = { ...leadData };
      await leadsApi.addNewLead(newLead);
      getLeadsApi.request();
      setStatus({ loading: false, success: true, error: null });
      setSnackbar({
        open: true,
        message: 'Lead submitted successfully!',
        severity: 'success'
      });
      setUpdateLead(null)
      return true;
    } catch (error) {
      setStatus({ loading: false, success: false, error: 'Failed to submit lead' });
      setSnackbar({
        open: true,
        message: 'Failed to submit lead',
        severity: 'error'
      });
      setUpdateLead(null)
      return false;
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleEdit = (id) => {
    const lead = leads.find((lead) => lead.id === id)
    setUpdateLead(lead);
    setValues({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company_name: lead.company_name,
      notes: lead.notes
    });
    setView('form');
  };

  const handleDelete = async (id) => {
    setStatus({ ...status, loading: true });
    try {
      await leadsApi.deleteLead(id);
      getLeadsApi.request();
      setStatus({ loading: false, success: true, error: null });
      setSnackbar({
        open: true,
        message: 'Lead deleted successfully!',
        severity: 'success'
      });
      setUpdateLead(null)
    } catch (error) {
      setStatus({ loading: false, success: false, error: 'Failed to delete lead' });
      setSnackbar({
        open: true,
        message: 'Failed to delete lead',
        severity: 'error'
      });
      setUpdateLead(null)
    }
  };

  const handleUpdate = async (values) => {
    setStatus({ ...status, loading: true });
    try {
      await leadsApi.updateLead(updateLead.id, values);
      resetForm()
      getLeadsApi.request();
      setStatus({ loading: false, success: true, error: null });
      setSnackbar({
        open: true,
        message: 'Lead updated successfully!',
        severity: 'success'
      });
      setUpdateLead(null)
      return true;
    } catch (error) {
      setStatus({ loading: false, success: false, error: 'Failed to submit lead' });
      setSnackbar({
        open: true,
        message: 'Failed to submit lead',
        severity: 'error'
      });
      setUpdateLead(null)
      return false;
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Lead Management System
      </Typography>

      {/* Toggle Buttons */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant={view === 'form' ? 'contained' : 'outlined'}
          onClick={() => setView('form')}
        >
          Show Lead Form
        </Button>
        <Button
          variant={view === 'table' ? 'contained' : 'outlined'}
          onClick={() => setView('table')}
        >
          Show Leads Table
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Lead Form */}
        {view === 'form' && (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Add New Lead
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="company_name"
                  label="Company Name"
                  name="company_name"
                  value={values.company_name}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="notes"
                  label="Notes"
                  name="notes"
                  multiline
                  rows={3}
                  value={values.notes}
                  onChange={handleChange}
                />
                <Box display={'flex'} gap={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 3, flex: 1 }}
                    disabled={status.loading}
                  >
                    {status.loading ? (
                      <>
                        <CircularProgress size={24} sx={{ mr: 1 }} />
                        Submitting...
                      </>
                    ) : (
                      'Submit Lead'
                    )}
                  </Button>
                  {
                    updateLead &&
                    <Button
                      type='submit'
                      fullWidth
                      variant="contained"
                      color="secondary"
                      size="large"
                      sx={{ mt: 3, flex: 1 }}
                      disabled={status.loading}
                    >
                      {status.loading ? (
                        <>
                          <CircularProgress size={24} sx={{ mr: 1 }} />
                          Updating...
                        </>
                      ) : (
                        'Update Lead'
                      )}
                    </Button>
                  }
                </Box>
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Leads List */}
        {view === 'table' && (
          <LeadsTable leads={leads} status={status} handleDelete={handleDelete} handleEdit={handleEdit}/>
        )}
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LeadManagementApp;