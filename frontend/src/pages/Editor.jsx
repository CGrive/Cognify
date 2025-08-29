// pages/Editor.jsx
import React, { useEffect, useState } from "react";
import {
    Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, IconButton,
    Button, TextField, Divider, Snackbar, Paper
} from "@mui/material";
import {
    Menu as MenuIcon,
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
    FileDownload as FileDownloadIcon,
    Bolt as BoltIcon,
    FormatBold, FormatItalic, FormatUnderlined
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const drawerWidth = 260;

export default function Editor() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [content, setContent] = useState("");
    const [snack, setSnack] = useState("");

    // Mock load by id (replace with API later)
    useEffect(() => {
        if (id) {
            const mock = {
                1: { title: "Deep Learning in NLP", abstract: "NLP abstract", content: "Some notes..." },
                2: { title: "Climate Data Analysis", abstract: "Climate abstract", content: "Data findings..." },
            }[id];
            if (mock) {
                setTitle(mock.title);
                setAbstract(mock.abstract);
                setContent(mock.content);
            }
        }
    }, [id]);

    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

    const handleSave = () => setSnack("Saved (stub)");
    const handleExport = () => setSnack("Exported (stub)");
    const handleAiReview = () => setSnack("AI Review (stub)");
    const handleDrawerToggle = () => setMobileOpen((s) => !s);

    // Sidebar with AI tools
    const drawer = (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Toolbar />
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>AI Tools</Typography>
                <Button fullWidth sx={{ mb: 1 }} variant="outlined">Summarizer</Button>
                <Button fullWidth sx={{ mb: 1 }} variant="outlined">Citation Generator</Button>
                <Button fullWidth sx={{ mb: 1 }} variant="outlined">Plagiarism Check</Button>
                <Button fullWidth sx={{ mb: 1 }} variant="outlined">Hypothesis Validator</Button>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <CssBaseline />

            {/* Header */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    {/* Mobile: open AI drawer */}
                    <IconButton
                        color="inherit" edge="start" onClick={handleDrawerToggle}
                        sx={{ mr: 1, display: { md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Back to Dashboard */}
                    <IconButton color="inherit" edge="start" onClick={() => navigate("/app/dashboard")} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {id ? "Edit Project" : "New Project"}
                    </Typography>

                    <Button color="inherit" startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
                    <Button color="inherit" startIcon={<FileDownloadIcon />} onClick={handleExport}>Export</Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<BoltIcon />}
                        onClick={handleAiReview}
                        sx={{ ml: 1 }}
                    >
                        AI Review
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Sidebar (AI Tools) */}
            <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
                {/* Mobile temporary */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": { width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop permanent */}
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": { width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main editor area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    bgcolor: "background.default",
                }}
            >
                <Toolbar /> {/* spacing under AppBar */}

                <Paper sx={{ p: 3 }}>
                    <TextField
                        label="Project Title"
                        fullWidth
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <TextField
                        label="Abstract"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        value={abstract}
                        onChange={(e) => setAbstract(e.target.value)}
                    />

                    <Divider sx={{ my: 2 }} />

                    {/* Formatting toolbar */}
                    <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                        <IconButton><FormatBold /></IconButton>
                        <IconButton><FormatItalic /></IconButton>
                        <IconButton><FormatUnderlined /></IconButton>
                    </Box>

                    <TextField
                        placeholder="Start writing..."
                        fullWidth
                        multiline
                        minRows={16}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Word count: {wordCount}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
                            <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={handleExport}>Export</Button>
                            <Button variant="contained" startIcon={<BoltIcon />} onClick={handleAiReview}>AI Review</Button>
                        </Box>
                    </Box>
                </Paper>

                <Snackbar open={!!snack} autoHideDuration={2000} onClose={() => setSnack("")} message={snack} />
            </Box>
        </Box>
    );
}
