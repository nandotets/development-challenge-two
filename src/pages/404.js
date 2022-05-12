import { Box, Container, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

function Page404() {
    return (
        <div>

            <Container maxWidth="sm">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <ErrorIcon fontSize="large" />
                    <Typography component="h1" variant="h6" align="center" >
                        Page Not Found (404)
                    </Typography>
                </Box>


            </Container>

        </div>
    );
}

export default Page404;