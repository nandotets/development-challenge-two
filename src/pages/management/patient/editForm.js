import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { Email, AccountCircle, Info, LocationOn, Save, Cancel } from '@mui/icons-material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'notistack';
import { updatePatient } from '../../../services/patient.service';

function EditPatientForm({ patient, closeAllDialog, setRows }) {
    patient.birthInput = "";
    const [values, setValues] = React.useState(patient);
    const [loading, setLoading] = React.useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })
    }

    const convertToChange = (name, value) => ({
        target: {
            name, value
        }
    })

    const { enqueueSnackbar } = useSnackbar();
    function showAlert(variant, message) {
        // variant could be: success, error, warning, info or default
        enqueueSnackbar(message, { variant });
    };

    const submit = (event) => {
        event.preventDefault();
        setLoading(true);
        values.birth = `${values.birthInput.getUTCFullYear()}-${values.birthInput.getMonth() + 1 < 10 ? `0${values.birthInput.getMonth() + 1}` : `${values.birthInput.getMonth() + 1}`}-${values.birthInput.getUTCDate() < 10 ? `0${values.birthInput.getUTCDate()}` : `${values.birthInput.getUTCDate()}`}`;
        updatePatient(values)
            .then(function (response) {
                var rowsTemp = [];
                setRows((rows) => {
                    rows.forEach((row) => {
                        if (row.id === response.id)
                            row = response;
                        rowsTemp.push(row);
                    })
                })
                setRows(rowsTemp);
                showAlert('success', 'Patient updated');
                closeAllDialog();
            })
            .catch(function (error) {
                setLoading(false);
                showAlert('error', error);
            });
    }

    return (
        < form onSubmit={submit} >
            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            required
                            margin="dense"
                            id="fullname"
                            label="Full Name"
                            value={values.fullname}
                            name='fullname'
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleInputChange}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Email sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            required
                            margin="dense"
                            id="email"
                            label="Email"
                            value={values.email}
                            name='email'
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={handleInputChange}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-center' }}>
                        <Info sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <FormControl>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                label="Gender"
                                value={values.gender}
                                name='gender'
                                onChange={handleInputChange}
                            >
                                <FormControlLabel label='Male' value='male' control={<Radio />} />
                                <FormControlLabel label='Female' value='female' control={<Radio />} />
                                <FormControlLabel label='Other' value='other' control={<Radio />} />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} alignItems="center" justifyContent="center" >
                    <Box >
                        {
                            React.useEffect((event) => {
                                setValues({ ...values, birthInput: new Date(values.birth) });
                            }, [])
                        }
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date of Birth"
                                inputFormat="dd/MM/yyyy"
                                name='birthInput'
                                value={values.birthInput}
                                onChange={data => { handleInputChange((convertToChange('birthInput', data))) }}
                                renderInput={(params) => <TextField required {...params} name='birthInput' helperText={params?.inputProps?.placeholder} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <LocationOn sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            required
                            margin="dense"
                            id="address"
                            label="Address"
                            value={values.address}
                            name='address'
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleInputChange}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Stack
                        direction="row"
                        alignItems='center'
                        spacing={3}
                        justifyContent="flex-end"
                    >
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<Save />}
                            variant="contained"
                        >
                            Save
                        </LoadingButton>
                        <Button
                            startIcon={<Cancel />}
                            variant="contained"
                            color="error"
                            onClick={closeAllDialog}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </form >
    );
}

export default EditPatientForm;