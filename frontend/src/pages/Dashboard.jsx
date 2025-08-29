// Dashboard.jsx
import React, { useState } from "react";
import {
    Box,
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Grid,
    Card,
    CardContent,
    Button,
    Badge,
    Menu,
    MenuItem,
    Avatar,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    ListItem,
} from "@mui/material";

import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Description as DescriptionIcon,
    Article as ArticleIcon,
    Settings as SettingsIcon,
    Notifications as NotificationsIcon,
    Add as AddIcon,
    Send as SendIcon,
    Logout as LogoutIcon,
    AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Dashboard() {
    const navigate = useNavigate();

    // states
    const [page, setPage] = useState("overview");
    const [mobileOpen, setMobileOpen] = useState(false);

    const [projects, setProjects] = useState([
        { id: 1, title: "Research on AI (Draft)", status: "Draft" },
        { id: 2, title: "Climate Data Analysis", status: "Completed" },
        { id: 3, title: "Quantum Computing Notes", status: "Ongoing" },
    ]);

    const [posts, setPosts] = useState([
        { id: 1, author: "John", text: "Published initial draft on NLP.", time: "3h ago" },
    ]);
    const [newPostText, setNewPostText] = useState("");

    const [notifications, setNotifications] = useState([
        { id: 1, text: "Anna commented on your project", time: "1d ago", read: false },
        { id: 2, text: "Your dataset finished uploading", time: "2d ago", read: false },
    ]);

    const [projectDialogOpen, setProjectDialogOpen] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState("");
    const [newProjectStatus, setNewProjectStatus] = useState("Draft");

    const [anchorElNotif, setAnchorElNotif] = useState(null);
    const [anchorElAvatar, setAnchorElAvatar] = useState(null);

    const unreadCount = notifications.filter((n) => !n.read).length;

    // handlers
    const handleDrawerToggle = () => setMobileOpen((s) => !s);
    const handleSelectPage = (p) => {
        setPage(p);
        setMobileOpen(false);
    };

    const handleAddProject = () => {
        if (!newProjectTitle.trim()) return;
        const next = {
            id: Date.now(),
            title: newProjectTitle.trim(),
            status: newProjectStatus,
        };
        setProjects((prev) => [next, ...prev]);
        setNewProjectTitle("");
        setNewProjectStatus("Draft");
        setProjectDialogOpen(false);
        navigate(`/app/editor/${next.id}`);
    };

    const handleCreatePost = () => {
        if (!newPostText.trim()) return;
        const post = { id: Date.now(), author: "You", text: newPostText.trim(), time: "just now" };
        setPosts((p) => [post, ...p]);
        setNewPostText("");
    };

    const handleLogout = () => navigate("/", { replace: true });

    const openNotifMenu = (e) => setAnchorElNotif(e.currentTarget);
    const closeNotifMenu = () => setAnchorElNotif(null);
    const openAvatarMenu = (e) => setAnchorElAvatar(e.currentTarget);
    const closeAvatarMenu = () => setAnchorElAvatar(null);
    const markAllNotificationsRead = () => {
        setNotifications((n) => n.map((x) => ({ ...x, read: true })));
    };

    // Sidebar
    const drawer = (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Toolbar>
                <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
                    Cognify
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {[
                    { key: "overview", label: "Overview", icon: <DashboardIcon /> },
                    { key: "projects", label: "My Projects", icon: <DescriptionIcon /> },
                    { key: "feed", label: "Feed", icon: <ArticleIcon /> },
                    { key: "settings", label: "Settings", icon: <SettingsIcon /> },
                ].map((item) => (
                    <ListItemButton
                        key={item.key}
                        selected={page === item.key}
                        onClick={() => handleSelectPage(item.key)}
                        sx={{
                            borderRadius: 1,
                            mx: 1,
                            mb: 0.5,
                            "&.Mui-selected": {
                                bgcolor: "primary.main",
                                color: "#fff",
                                "& .MuiListItemIcon-root": { color: "#fff" },
                            },
                            "&:hover": { bgcolor: "primary.light", color: "#fff" },
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <List>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
        </Box>
    );

    // Pages
    const Overview = (
        <Box>
            <Grid container spacing={3} mb={3}>
                <Grid container spacing={3} mb={3}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent sx={{ textAlign: "center", py: 3 }}>
                                <DashboardIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Projects
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    {projects.length}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent sx={{ textAlign: "center", py: 3 }}>
                                <StorageIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Storage
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    3.2 GB
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Recent Projects
                                </Typography>
                                <Button startIcon={<AddIcon />} onClick={() => setProjectDialogOpen(true)}>
                                    New Project
                                </Button>
                            </Box>
                            <List>
                                {projects.map((p) => (
                                    <ListItem key={p.id} disableGutters>
                                        <ListItemText primary={p.title} secondary={p.status} />
                                        <Button size="small" onClick={() => navigate(`/app/editor/${p.id}`)}>Open</Button>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Recent Activity
                            </Typography>
                            <List>
                                {[
                                    { id: 1, text: "Published a draft on NLP", time: "3h ago" },
                                    { id: 2, text: "Commented on 'Transformer Survey'", time: "1d ago" },
                                    { id: 3, text: "Uploaded dataset Climate-2024.csv", time: "2d ago" },
                                ].map((a) => (
                                    <ListItem key={a.id} disableGutters>
                                        <ListItemText primary={a.text} secondary={a.time} />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );

    const ProjectsPage = (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    My Projects
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setProjectDialogOpen(true)}>
                    Create Project
                </Button>
            </Box>
            <Grid container spacing={3}>
                {projects.map((p) => (
                    <Grid item xs={12} sm={6} md={4} key={p.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {p.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {p.status}
                                </Typography>
                                <Box mt={2} display="flex" gap={1}>
                                    <Button size="small" variant="outlined" onClick={() => navigate(`/app/editor/${p.id}`)}>
                                        Open
                                    </Button>
                                    <Button size="small" color="error" onClick={() => setProjects((prev) => prev.filter((x) => x.id !== p.id))}>
                                        Remove
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    const FeedPage = (
        <Box>
            <Typography variant="h5" mb={3} sx={{ fontWeight: 700 }}>
                Feed
            </Typography>
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="subtitle1">Create a post</Typography>
                    <Box display="flex" gap={1} mt={2}>
                        <TextField
                            placeholder="Share something..."
                            fullWidth
                            size="small"
                            value={newPostText}
                            onChange={(e) => setNewPostText(e.target.value)}
                        />
                        <Button variant="contained" endIcon={<SendIcon />} onClick={handleCreatePost}>
                            Post
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <Stack spacing={2}>
                {posts.map((p) => (
                    <Card key={p.id}>
                        <CardContent>
                            <Box display="flex" gap={2} alignItems="center" mb={1}>
                                <Avatar sx={{ bgcolor: "primary.main" }}>{p.author[0]}</Avatar>
                                <Box>
                                    <Typography fontWeight={700}>{p.author}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {p.time}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography>{p.text}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );

    const SettingsPage = (
        <Box>
            <Typography variant="h5" mb={3} sx={{ fontWeight: 700 }}>
                Settings
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="subtitle1">Account</Typography>
                    <List>
                        <ListItem disableGutters>
                            <ListItemText primary="Name" secondary="John Doe" />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Email" secondary="john@example.com" />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Role" secondary="Researcher" />
                        </ListItem>
                    </List>
                    <Box mt={2}>
                        <Button variant="outlined">Change password</Button>
                        <Button sx={{ ml: 2 }} color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar position="fixed" sx={{ ml: { sm: drawerWidth } }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Welcome back,
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            John — here’s your workspace
                        </Typography>
                    </Box>

                    <TextField size="small" placeholder="Search..." sx={{ bgcolor: "background.paper", borderRadius: 1, mr: 2 }} />

                    <IconButton color="inherit" onClick={openNotifMenu}>
                        <Badge badgeContent={unreadCount} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <Menu anchorEl={anchorElNotif} open={Boolean(anchorElNotif)} onClose={closeNotifMenu}>
                        <MenuItem onClick={() => { markAllNotificationsRead(); closeNotifMenu(); }}>
                            Mark all as read
                        </MenuItem>
                        <Divider />
                        {notifications.length === 0 && <MenuItem disabled>No notifications</MenuItem>}
                        {notifications.map((n) => (
                            <MenuItem key={n.id}>
                                <ListItemText primary={n.text} secondary={n.time} />
                            </MenuItem>
                        ))}
                    </Menu>

                    <IconButton color="inherit" onClick={openAvatarMenu} sx={{ ml: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
                    </IconButton>

                    <Menu anchorEl={anchorElAvatar} open={Boolean(anchorElAvatar)} onClose={closeAvatarMenu}>
                        <MenuItem onClick={() => { handleSelectPage("settings"); closeAvatarMenu(); }}>
                            <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, top: 64 } }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main */}
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                {page === "overview" && Overview}
                {page === "projects" && ProjectsPage}
                {page === "feed" && FeedPage}
                {page === "settings" && SettingsPage}
            </Box>

            {/* Project Dialog */}
            <Dialog open={projectDialogOpen} onClose={() => setProjectDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Project Title"
                        fullWidth
                        value={newProjectTitle}
                        onChange={(e) => setNewProjectTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Status"
                        fullWidth
                        value={newProjectStatus}
                        onChange={(e) => setNewProjectStatus(e.target.value)}
                        helperText="e.g. Draft, Ongoing, Completed"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setProjectDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddProject}>Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

// StorageIcon (custom SVG)
function StorageIcon(props) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
            <rect x="3" y="3" width="18" height="6" rx="1" />
            <rect x="3" y="10" width="18" height="6" rx="1" />
            <rect x="3" y="17" width="18" height="4" rx="1" />
        </svg>
    );
}
