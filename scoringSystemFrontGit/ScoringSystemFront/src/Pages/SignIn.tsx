import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import UrlLink from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import ProjectApi from "../API/ProjectApi";
import { jwtDecode } from "jwt-decode";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <UrlLink color="inherit" target="_blank" href="https://tn.talan.com/">
        Talan Tunisie
      </UrlLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const myAPI = new ProjectApi();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    if (email && password) {
      try {
        const response: any = await myAPI.signIn({
          username: email,
          password: password,
        });

        if (response) {
          const token: string = response.body.accessToken;
          localStorage.setItem("accessToken", token);
          localStorage.setItem("DecodeToken", JSON.stringify(jwtDecode(token)));
          const DecodeToken = localStorage.getItem("DecodeToken");

          if (DecodeToken) {
            const DecodeTokennnnn = JSON.parse(DecodeToken);
            let clientRole = null;
            let reviewerRole = null;
            let adminRole = null;

            for (const key in DecodeTokennnnn) {
              if (key==="Client") {
                clientRole = "client";
              }
              else if (key === "Reviewer") {
                reviewerRole = DecodeTokennnnn[key];
              }
              
              else if (key === "Admin") {
                adminRole = DecodeTokennnnn[key];
              }
            }
          
            if(clientRole=== "client"){
              navigate("/feed", { replace: true });
            }else{
              navigate("/", { replace: true });
            }
          }
          
        }
      } catch (error) {
        console.error("An error occurred during sign in:", error);
        console.log("Sign in failed");
      }
    } else {
      console.log("Fill input");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              padding={7}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
             
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
