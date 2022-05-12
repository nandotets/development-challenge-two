import {
    Avatar, Box, Button, Grid, Stack,
    Table, TableBody, TableCell, TableContainer,
    TableRow, Typography
} from "@mui/material";
import { stringAvatar } from './config/avatar'
import { Cancel } from '@mui/icons-material';

function ViewPatientInfo({ closeAllDialog, patient }) {
    return (
        <div>
            <Grid container spacing={3} alignItems="center" justify="center" direction="column">
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Avatar
                            alt={patient.fullname}
                            src={'data:image/jpeg;base64,' + patient.avatar}
                            {...stringAvatar(patient.fullname, 100, 100)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table sx={{ width: 700 }}>
                            <TableBody>

                                <TableRow key={patient.fullname}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="h6" component="h6">
                                            Fullname
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body1" component="h6">
                                            {patient.fullname}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={patient.gender}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="h6" component="h6">
                                            Gender
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body1" component="h6">
                                            {patient.gender === 'male' && "Male"}
                                            {patient.gender === 'female' && "Female"}
                                            {patient.gender === 'other' && "Other"}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={patient.birth}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="h6" component="h6">
                                            Date of Birth
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body1" component="h6">
                                            {new Date(patient.birth).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={patient.email}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="h6" component="h6">
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body1" component="h6">
                                            {patient.email}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={patient.address}>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="h6" component="h6">
                                            Address
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body1" component="h6">
                                            {patient.address}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} >
                    <Stack
                        direction="row"
                        alignItems='center'
                        spacing={3}
                        justifyContent="flex-end"
                    >
                        <Button
                            startIcon={<Cancel />}
                            variant="contained"
                            color="primary"
                            onClick={closeAllDialog}
                        >
                            Close
                        </Button>
                    </Stack>
                </Grid>
            </Grid>

        </div>
    );
}

export default ViewPatientInfo;