import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AddPatientForm from "../pages/management/patient/addForm";
import EditPatientForm from "../pages/management/patient/editForm";
import ViewPatientInfo from "../pages/management/patient/viewForm";

function PatientDialog({ closeAllDialog, fullWidth, maxWidth, addDialog, editDialog, viewDialog, patient, setRows }) {
    return (
        <div>

            <Dialog
                open={addDialog}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>Add patient</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To register a new patient, fill in the form fields.
                    </DialogContentText>
                    <AddPatientForm
                        closeAllDialog={closeAllDialog}
                        setRows={setRows}
                    />
                </DialogContent>
            </Dialog>
            <Dialog
                open={editDialog}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>Edit patient</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To update patient, change the form fields.
                    </DialogContentText>
                    <EditPatientForm
                        closeAllDialog={closeAllDialog}
                        patient={patient}
                        setRows={setRows}
                    />
                </DialogContent>
            </Dialog>
            <Dialog
                open={viewDialog}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>Patient Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        More patient information
                    </DialogContentText>
                    <ViewPatientInfo
                        closeAllDialog={closeAllDialog}
                        patient={patient}
                    />
                </DialogContent>
            </Dialog>
        </div>

    )
}


export default PatientDialog;