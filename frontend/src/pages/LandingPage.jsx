// LandingPage.jsx
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, Container, Stack } from "@mui/material";

function LandingPage() {
    return (
        <Box
            className="landing"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
                textAlign: "center",
                py: 4,
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                    Welcome to Cognify
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        maxWidth: 600,
                        mx: "auto",
                        mb: 4,
                        fontSize: "1.1rem",
                        lineHeight: 1.6,
                    }}
                >
                    Your intelligent research companion — Summarize, analyze, validate,
                    and share your research with ease.
                </Typography>

                {/* Call-to-Action Buttons */}
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    flexWrap="wrap"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/login"
                        sx={{ px: 3, py: 1 }}
                    >
                        Login
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        component={RouterLink}
                        to="/register"
                        sx={{ px: 3, py: 1 }}
                    >
                        Get Started
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}

export default LandingPage;
