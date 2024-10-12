
import { Dialog,DialogContentText,DialogTitle,DialogActions, DialogContent,Button } from '@mui/material'
import React from 'react'

const confirmDeleteDialog = ({open,handleClose,deleteHandler}) => {
  return (
<Dialog  open={open}
    onClose={handleClose}>
    <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
    <DialogContent>
    <DialogContentText>Are you sure you want to delete this group?</DialogContentText>
    </DialogContent>   
    <DialogActions>
        <Button onClick={handleClose} color="primary">
        Disagree
        </Button>
        <Button onClick={deleteHandler} color='error' autoFocus>
        Agree
        </Button>
    </DialogActions>
</Dialog>
  )
}

export default confirmDeleteDialog