import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Check, Cancel } from '@mui/icons-material';
import { deletePatient } from '../../../../services/patient.service';
import { useSnackbar } from 'notistack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { stringAvatar } from './avatar';

function confirmDelete(patients, { setLoading }, { showAlert }, { closeAllDialog }) {
    setLoading(true);
    const ids = [];
    if (patients) {
        patients.forEach(patient => {
            ids.push(patient.id)
        })
        ids.forEach((id, index, array) => {
            deletePatient(id)
                .then(function (response) {
                    if (index + 1 === array.length) {
                        showAlert('success', 'Patients deleted');
                        closeAllDialog();
                    }
                })
                .catch(function (error) {
                    setLoading(false);
                    showAlert('error', `Error to delete patient ${patients.find(pt => pt.id === id).fullname}`);
                })
                .finally(() => {
                });
        })
    }
}

function ConfirmDialog({ closeAllDialog, apiRefDatagrid, fullWidth, maxWidth, open, title, description, type, patients }) {

    const [loading, setLoading] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    function showAlert(variant, message) {
        // variant could be: success, error, warning, info or default
        enqueueSnackbar(message, { variant });
    };

    const typeColors = {
        warning: '#f7dc6d',
        info: '#4f91d1',
        danger: '#fa848e',
    }
    return (
        <div>
            <Dialog
                open={open}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                BackdropProps={{ style: { backgroundColor: "transparent" } }}
                PaperProps={{ style: { backgroundColor: typeColors[type] ?? '#fff' } }}
            >
                <DialogTitle>
                    <Typography component="h2" variant="h6">
                        {title}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography component="span" variant="body1">
                            {description}
                        </Typography>
                        <Typography component="span" variant="body1">
                            {patients.map(p => {
                                return (
                                    <List dense={true}>
                                        <ListItem key={p.id}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={p.fullname}
                                                    src={'data:image/jpeg;base64,' + p.avatar}
                                                    {...stringAvatar(p.fullname, 50, 50)}
                                                >
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={p.fullname}
                                            />
                                        </ListItem>
                                    </List>
                                )
                            })}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        color="success"
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<Check />}
                        variant="contained"
                        onClick={() => {
                            confirmDelete(patients, { setLoading },
                                { showAlert }, { closeAllDialog })
                        }}
                    >
                        Confirm
                    </LoadingButton>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={closeAllDialog}
                        startIcon={<Cancel />}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default ConfirmDialog;