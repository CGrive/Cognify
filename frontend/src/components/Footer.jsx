// Footer.jsx
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "background.paper", // matches card-bg
                py: 2,
                textAlign: "center",
                fontSize: "0.9rem",
                mt: "auto", // pushes footer to bottom
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Cognify. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;
