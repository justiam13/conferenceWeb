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
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import api from '../services/api';

const NavbarManager = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [navItems, setNavItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: '',
    url: '',
    order: 0,
    visible: true,
    children: [],
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newChild, setNewChild] = useState({
    title: '',
    url: '',
    order: 0,
    visible: true,
  });
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchNavItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/navbar');
      setNavItems(response.data);
    } catch (err) {
      setError('Failed to fetch navigation items. Please try again.');
      console.error('Navbar data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavItems();
  }, []);

  const handleAddItem = async () => {
    if (!newItem.title.trim() || !newItem.url.trim()) {
      setError('Title and URL are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/navbar', newItem);
      setNavItems([...navItems, response.data]);
      setNewItem({
        title: '',
        url: '',
        order: navItems.length,
        visible: true,
        children: [],
      });
      setSuccess('New navigation item added successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add new item. Please try again.');
      console.error('Add item error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setEditDialogOpen(true);
  };

  const handleUpdateItem = async () => {
    try {
      setLoading(true);
      setError(null);
      await api.put(`/navbar/${editingItem._id}`, editingItem);
      setNavItems(
        navItems.map((item) =>
          item._id === editingItem._id ? editingItem : item
        )
      );
      setEditDialogOpen(false);
      setSuccess('Navigation item updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update item. Please try again.');
      console.error('Update item error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/navbar/${itemId}`);
      setNavItems(navItems.filter((item) => item._id !== itemId));
      setSuccess('Navigation item deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete item. Please try again.');
      console.error('Delete item error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddChild = async (parentId) => {
    if (!newChild.title.trim() || !newChild.url.trim()) {
      setError('Title and URL are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.post(`/navbar/${parentId}/children`, newChild);
      setNavItems(
        navItems.map((item) =>
          item._id === parentId
            ? { ...item, children: [...item.children, response.data] }
            : item
        )
      );
      setNewChild({
        title: '',
        url: '',
        order: 0,
        visible: true,
      });
      setSuccess('New child item added successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add new child item. Please try again.');
      console.error('Add child error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChild = async (parentId, childId) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/navbar/${parentId}/children/${childId}`);
      setNavItems(
        navItems.map((item) =>
          item._id === parentId
            ? {
                ...item,
                children: item.children.filter((child) => child._id !== childId),
              }
            : item
        )
      );
      setSuccess('Child item deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete child item. Please try again.');
      console.error('Delete child error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (itemId, isChild = false, parentId = null) => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = isChild
        ? `/navbar/${parentId}/children/${itemId}/visibility`
        : `/navbar/${itemId}/visibility`;
      await api.put(endpoint, { visible: !isChild ? navItems.find(item => item._id === itemId).visible : navItems.find(item => item._id === parentId).children.find(child => child._id === itemId).visible });
      
      setNavItems(
        navItems.map((item) =>
          isChild
            ? item._id === parentId
              ? {
                  ...item,
                  children: item.children.map((child) =>
                    child._id === itemId
                      ? { ...child, visible: !child.visible }
                      : child
                  ),
                }
              : item
            : item._id === itemId
            ? { ...item, visible: !item.visible }
            : item
        )
      );
      setSuccess(`Item ${isChild ? 'child ' : ''}visibility updated successfully!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update visibility. Please try again.');
      console.error('Visibility toggle error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(navItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    setNavItems(updatedItems);

    try {
      await api.put('/navbar/reorder', { items: updatedItems });
      setSuccess('Navigation order updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update navigation order. Please try again.');
      console.error('Reorder error:', err);
      // Revert to original order if update fails
      fetchNavItems();
    }
  };

  const handleMenuOpen = (event, item) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedItem(null);
  };

  if (loading && !navItems.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Navbar Manager</Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={fetchNavItems}
          disabled={loading}
        >
          Refresh
        </Button>
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

      {/* Add New Item */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add New Navigation Item
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="URL"
              value={newItem.url}
              onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={newItem.visible}
                  onChange={(e) =>
                    setNewItem({ ...newItem, visible: e.target.checked })
                  }
                />
              }
              label="Visible"
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddItem}
              disabled={loading || !newItem.title.trim() || !newItem.url.trim()}
            >
              Add Item
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Navigation Items List */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Navigation Items
        </Typography>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="navbar-items">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {navItems.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DragIndicatorIcon sx={{ mr: 2, color: 'text.secondary' }} />
                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="center">
                              <Typography
                                sx={{
                                  textDecoration: item.visible ? 'none' : 'line-through',
                                  color: item.visible ? 'text.primary' : 'text.disabled',
                                }}
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ ml: 2 }}
                              >
                                {item.url}
                              </Typography>
                            </Box>
                          }
                          secondary={`${item.children.length} child items`}
                        />
                        <ListItemSecondaryAction>
                          <Tooltip title="More options">
                            <IconButton
                              edge="end"
                              onClick={(e) => handleMenuOpen(e, item)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Navigation Item</DialogTitle>
        <DialogContent>
          {editingItem && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Title"
                value={editingItem.title}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, title: e.target.value })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="URL"
                value={editingItem.url}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, url: e.target.value })
                }
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editingItem.visible}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        visible: e.target.checked,
                      })
                    }
                  />
                }
                label="Visible"
                sx={{ mt: 2 }}
              />

              <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
                Child Items
              </Typography>
              <List>
                {editingItem.children.map((child) => (
                  <ListItem key={child._id}>
                    <ListItemText
                      primary={child.title}
                      secondary={child.url}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteChild(editingItem._id, child._id)}
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
                  label="New Child Title"
                  value={newChild.title}
                  onChange={(e) =>
                    setNewChild({ ...newChild, title: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="New Child URL"
                  value={newChild.url}
                  onChange={(e) =>
                    setNewChild({ ...newChild, url: e.target.value })
                  }
                  margin="normal"
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddChild(editingItem._id)}
                  disabled={
                    loading || !newChild.title.trim() || !newChild.url.trim()
                  }
                  sx={{ mt: 1 }}
                >
                  Add Child
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateItem}
            variant="contained"
            disabled={loading}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Item Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        {selectedItem && (
          <>
            <MenuItem onClick={() => {
              handleEditItem(selectedItem);
              handleMenuClose();
            }}>
              <EditIcon fontSize="small" sx={{ mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem onClick={() => {
              handleToggleVisibility(selectedItem._id);
              handleMenuClose();
            }}>
              <Switch
                size="small"
                checked={selectedItem.visible}
                sx={{ mr: 1 }}
              />
              {selectedItem.visible ? 'Hide' : 'Show'}
            </MenuItem>
            <MenuItem onClick={() => {
              handleDeleteItem(selectedItem._id);
              handleMenuClose();
            }}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default NavbarManager;
