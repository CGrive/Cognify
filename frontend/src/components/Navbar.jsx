// Navbar.jsx
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Navbar() {
    return (
        <AppBar position="static" color="default" sx={{ bgcolor: "background.paper" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Logo */}
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        textDecoration: "none",
                        color: "primary.main",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                    }}
                >
                    Cognify
                </Typography>

                {/* Navigation Links */}
                <Box sx={{ display: "flex", gap: 3 }}>
                    <Button component={RouterLink} to="/" color="inherit">
                        Home
                    </Button>
                    <Button component={RouterLink} to="/login" color="inherit">
                        Login
                    </Button>
                    <Button component={RouterLink} to="/register" color="inherit">
                        Register
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
