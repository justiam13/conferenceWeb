import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import api from '../services/api';

const FooterManager = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [footerData, setFooterData] = useState({
    companyInfo: {
      name: '',
      description: '',
      address: '',
      email: '',
      phone: '',
    },
    sections: [],
    visible: true,
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    order: 0,
    visible: true,
  });

  const fetchFooterData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/footer');
      setFooterData(response.data || {
        companyInfo: {
          name: '',
          description: '',
          address: '',
          email: '',
          phone: '',
        },
        sections: [],
        visible: true,
      });
    } catch (err) {
      setError('Failed to fetch footer data. Please try again.');
      console.error('Footer data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  const handleCompanyInfoChange = (field, value) => {
    setFooterData((prev) => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        [field]: value,
      },
    }));
  };

  const handleSaveCompanyInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      await api.put('/footer/company-info', footerData.companyInfo);
      setSuccess('Company information updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update company information. Please try again.');
      console.error('Update company info error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSection = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/footer/sections', {
        title: 'New Section',
        links: [],
      });
      setFooterData((prev) => ({
        ...prev,
        sections: [...prev.sections, response.data],
      }));
      setSuccess('New section added successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add new section. Please try again.');
      console.error('Add section error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSection = (section) => {
    setEditingSection(section);
    setEditDialogOpen(true);
  };

  const handleUpdateSection = async () => {
    try {
      setLoading(true);
      setError(null);
      await api.put(`/footer/sections/${editingSection._id}`, editingSection);
      setFooterData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section._id === editingSection._id ? editingSection : section
        ),
      }));
      setEditDialogOpen(false);
      setSuccess('Section updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update section. Please try again.');
      console.error('Update section error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/footer/sections/${sectionId}`);
      setFooterData((prev) => ({
        ...prev,
        sections: prev.sections.filter((section) => section._id !== sectionId),
      }));
      setSuccess('Section deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete section. Please try again.');
      console.error('Delete section error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async (sectionId) => {
    if (!newLink.title.trim() || !newLink.url.trim()) {
      setError('Title and URL are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.post(`/footer/sections/${sectionId}/links`, newLink);
      setFooterData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section._id === sectionId
            ? { ...section, links: [...section.links, response.data] }
            : section
        ),
      }));
      setNewLink({
        title: '',
        url: '',
        order: 0,
        visible: true,
      });
      setSuccess('New link added successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add new link. Please try again.');
      console.error('Add link error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (sectionId, linkId) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/footer/sections/${sectionId}/links/${linkId}`);
      setFooterData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section._id === sectionId
            ? {
                ...section,
                links: section.links.filter((link) => link._id !== linkId),
              }
            : section
        ),
      }));
      setSuccess('Link deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete link. Please try again.');
      console.error('Delete link error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async () => {
    try {
      setLoading(true);
      setError(null);
      await api.put('/footer/visibility', { visible: !footerData.visible });
      setFooterData((prev) => ({ ...prev, visible: !prev.visible }));
      setSuccess(`Footer ${footerData.visible ? 'hidden' : 'shown'} successfully!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update footer visibility. Please try again.');
      console.error('Visibility toggle error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !footerData.companyInfo) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Footer Manager</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={footerData.visible}
              onChange={handleToggleVisibility}
              disabled={loading}
            />
          }
          label="Footer Visible"
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      {/* Company Information */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Company Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Company Name"
              value={footerData.companyInfo.name}
              onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={footerData.companyInfo.email}
              onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              value={footerData.companyInfo.phone}
              onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address"
              value={footerData.companyInfo.address}
              onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={footerData.companyInfo.description}
              onChange={(e) => handleCompanyInfoChange('description', e.target.value)}
              margin="normal"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveCompanyInfo}
              disabled={loading}
            >
              Save Company Info
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Footer Sections */}
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Footer Sections</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddSection}
            disabled={loading}
          >
            Add Section
          </Button>
        </Box>

        <Grid container spacing={3}>
          {footerData.sections.map((section) => (
            <Grid item xs={12} md={6} key={section._id}>
              <Paper sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle1">{section.title}</Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditSection(section)}
                      disabled={loading}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteSection(section._id)}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <List>
                  {section.links.map((link) => (
                    <ListItem key={link._id}>
                      <ListItemText
                        primary={link.title}
                        secondary={link.url}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteLink(section._id, link._id)}
                          disabled={loading}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="New Link Title"
                    value={newLink.title}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    margin="normal"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="New Link URL"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    margin="normal"
                    size="small"
                  />
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddLink(section._id)}
                    disabled={loading || !newLink.title.trim() || !newLink.url.trim()}
                    sx={{ mt: 1 }}
                  >
                    Add Link
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Edit Section Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Section</DialogTitle>
        <DialogContent>
          {editingSection && (
            <TextField
              fullWidth
              label="Section Title"
              value={editingSection.title}
              onChange={(e) =>
                setEditingSection({ ...editingSection, title: e.target.value })
              }
              margin="normal"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateSection}
            variant="contained"
            disabled={loading}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FooterManager;
