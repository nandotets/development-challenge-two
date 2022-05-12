import * as React from 'react';
import {
    GridToolbarColumnsButton, GridToolbarContainer,
    GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarFilterButton, DataGrid
} from '@mui/x-data-grid';
import {
    Button, IconButton, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PatientDialog from '../../../components/PatientDialog';
import { useSnackbar } from 'notistack';
import { getAllPatient } from '../../../services/patient.service'
import ConfirmDialog from './config/ConfirmDialog';

function PageManagementPatient() {
    /* Dialog props */
    const [addDialog, setAddDialog] = React.useState(false);
    const [editDialog, setEditDialog] = React.useState(false);
    const [viewDialog, setViewDialog] = React.useState(false);
    const [confirmDialog, setConfirmDialog] = React.useState(false);
    const [typeOfDialog, setTypeOfDialog] = React.useState(false);
    const [descriptionOfDialog, setDescriptionOfDialog] = React.useState(false);
    const [titleOfDialog, setTitleOfDialog] = React.useState([]);

    const showAddDialog = () => {
        setAddDialog(true);
    };
    const showEditDialog = () => {
        setEditDialog(true);
    };
    const showViewDialog = () => {
        setViewDialog(true);
    };
    function showConfirmDialog(title, description, type) {
        setConfirmDialog(true)
        setTitleOfDialog(title)
        setDescriptionOfDialog(description)
        setTypeOfDialog(type)
    };
    const closeAllDialog = () => {
        setAddDialog(false);
        setEditDialog(false);
        setViewDialog(false);
        setConfirmDialog(false);
    };
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
    /* ------------ */

    const [patient, setPatient] = React.useState({});
    const [patients, setPatients] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const prevSelectionModel = React.useRef(selectionModel);

    const { enqueueSnackbar } = useSnackbar();
    function showAlert(variant, message) {
        // variant could be: success, error, warning, info or default
        enqueueSnackbar(message, { variant });
    };

    const [rows, setRows] = React.useState([]);

    const columns = [
        { field: 'fullname', headerName: 'Full Name', minWidth: 300 },
        {
            field: 'gender',
            headerName: 'Gender',
            minWidth: 70,
            renderCell: (params) => (
                <Typography variant="body1" component="h6">
                    {params.value === 'male' && "Male"}
                    {params.value === 'female' && "Female"}
                    {params.value === 'other' && "Other"}
                </Typography>
            )
        },
        {
            field: 'birth',
            headerName: 'Date of Birth',
            type: 'date',
            valueGetter: ({ value }) => value && new Date(value),
            minWidth: 120,
        },
        {
            field: 'actions', headerName: 'Actions', minWidth: 200,
            renderCell: (params) => (
                <strong>

                    <IconButton
                        color='secondary'
                        onClick={() => {
                            setFullWidth(true);
                            setMaxWidth('lg');
                            setPatient(params.row)
                            showViewDialog()
                        }}
                    >
                        <InfoIcon />
                    </IconButton >

                    <IconButton
                        color="primary"
                        style={{ marginLeft: 10 }}
                        onClick={() => {
                            setFullWidth(true);
                            setMaxWidth('lg');
                            setPatient(params.row)
                            showEditDialog()
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Button
                    size="small"
                    color='success'
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setFullWidth(true);
                        setMaxWidth('lg');
                        showAddDialog();
                    }}
                >
                    Add Patient
                </Button>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />

                {/* Delete button appears if an item is selected */}
                {
                    selectionModel.length > 0 &&
                    <Button
                        size="small"
                        color='error'
                        startIcon={<DeleteIcon />}
                        onClick={async () => {
                            while (patients.length > 0) { patients.splice(0, 1); }
                            for (let i = 0; i < selectionModel.length; i++) {
                                patients.push(rows.find(patient => patient.id === selectionModel[i]))
                            }
                            setPatients(patients);
                            setFullWidth(true);
                            setMaxWidth('sm');
                            showConfirmDialog('Delete patients',
                                'Do you really want to delete patients?',
                                'warning');

                        }}>
                        Delete
                    </Button>

                }

                {/* Dialog */}
                <PatientDialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    closeAllDialog={closeAllDialog}
                    addDialog={addDialog}
                    editDialog={editDialog}
                    viewDialog={viewDialog}
                    patient={patient}
                    setRows={setRows}
                />
                <ConfirmDialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    closeAllDialog={closeAllDialog}
                    type={typeOfDialog}
                    title={titleOfDialog}
                    description={descriptionOfDialog}
                    open={confirmDialog}
                    patients={patients}
                />
            </GridToolbarContainer >
        )
    }

    return (
        <div style={{ height: 500, width: '100%' }}>
            {
                React.useEffect(() => {
                    getAllPatient()
                        .then(function (response) {
                            setRows(response);
                        })
                        .catch(function (error) {
                            showAlert('error', error);
                        });
                }, [])
            }
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                components={{ Toolbar: CustomToolbar }}
                onPageChange={(newPage) => {
                    prevSelectionModel.current = selectionModel;
                    setPage(newPage);
                }}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
            />
        </div>
    );
}

export default PageManagementPatient;