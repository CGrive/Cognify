import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    Stack
} from "@mui/material";

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulated login (replace with backend later)
        if (formData.email === "test@test.com" && formData.password === "1234") {
            console.log("Logged in:", formData);
            navigate("/app/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Paper elevation={3} sx={{ p: 4, width: 400 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <Button type="submit" variant="contained" fullWidth>
                            Login
                        </Button>

                        <Typography variant="body2" align="center">
                            Don’t have an account? <Link to="/register">Sign Up</Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}

export default LoginPage;
