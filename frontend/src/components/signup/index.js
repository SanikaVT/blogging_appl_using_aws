import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import UserPool from "../auth/UserPool";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { getJwtToken, getUserId } from "../../localStorage";
import hostUrl from '../../constants';
const theme = createTheme();

const signUpVaraibles = {
  given_name: {
    required: true,
  },
  family_name: {
    required: true,
  },
  email: {
    required: true,
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  phone_number: {
    required: true,
  },
  password: {
    required: true,
    minLength: 8,
    regex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  },
};

export default function SignUp() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const onFormChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    validateSubmission(event.target.name, event.target.value);
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    for (const signUpProperty in signUpVaraibles) {
      if (!validateSubmission(signUpProperty, data.get(signUpProperty))) {
        return;
      }
    }

    const UserAttributes = [
      {
        Name: "email",
        Value: data.get("email"),
      },
      {
        Name: "given_name",
        Value: data.get("given_name"),
      },
      {
        Name: "family_name",
        Value: data.get("family_name"),
      },
      {
        Name: "phone_number",
        Value: data.get("phone_number"),
      },
    ];
    axios({
      method: "post",
      url: hostUrl + "/subscribeEmail",
      data: {
        Endpoint: data.get("email"),
        userID: getUserId(),
      },
      headers: {
        Authorization: getJwtToken(),
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log("Error while calling Subscribe email api: ", err);
      });

    UserPool.signUp(email, password, UserAttributes, null, (err, data) => {
      if (err) {
        const errors = {};
        console.log(err);
        if (err.message.match === "Invalid email address format.") {
          console.log("Check: ", err.message);
          alert(err);
          errors["email"] = "Please provide a valid email address";
        }
        setFormErrors(errors);
      } else {
        console.log(data);
        navigate("/");
      }
    });
  };

  const validateSubmission = (property, value) => {
    let isValid = true;
    if (signUpVaraibles[property] && signUpVaraibles[property]["required"]) {
      setFormErrors({
        ...formErrors,
        [property]: {
          required: !value || value === "",
          valid: false,
          minLength: false,
        },
      });
      isValid = isValid && !(!value || value === "");
    }

    if (
      isValid &&
      signUpVaraibles[property] &&
      signUpVaraibles[property]["minLength"]
    ) {
      setFormErrors({
        ...formErrors,
        [property]: {
          required: false,
          valid: false,
          minLength: !!(value.length < signUpVaraibles[property]["minLength"]),
        },
      });
      isValid =
        isValid && !(value.length < signUpVaraibles[property]["minLength"]);
    }

    if (
      isValid &&
      signUpVaraibles[property] &&
      signUpVaraibles[property]["regex"]
    ) {
      setFormErrors({
        ...formErrors,
        [property]: {
          required: false,
          valid: !value.match(signUpVaraibles[property]["regex"]),
          minLength: false,
        },
      });
      isValid = isValid && value.match(signUpVaraibles[property]["regex"]);
    }
    return isValid;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="given_name"
                  required
                  fullWidth
                  id="given_name"
                  label="First Name"
                  autoFocus
                  onChange={onFormChange}
                />
                {formErrors?.given_name?.required && (
                  <p className="error">First name is required!</p>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="family_name"
                  label="Last Name"
                  name="family_name"
                  autoComplete="family-name"
                  onChange={onFormChange}
                />
                {formErrors?.family_name?.required && (
                  <p className="error">Last name is required!</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onFormChange}
                />
                {formErrors?.email?.required && (
                  <p className="error">Email is required!</p>
                )}
                {formErrors?.email?.valid && (
                  <p className="error">Email is invalid!</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  onChange={onFormChange}
                  autoComplete="phone_number"
                />
                {formErrors?.phone_number?.valid && (
                  <p className="error">Phone number is invalid!</p>
                )}
                {formErrors?.phone_number?.required && (
                  <p className="error">Phone number is required!</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onFormChange}
                  value={password}
                />
                {formErrors?.password?.valid && (
                  <p className="error">Password is invalid!</p>
                )}
                {formErrors?.password?.minLength && (
                  <p className="error">
                    Password length must be min. 8 characters
                  </p>
                )}
                {formErrors?.password?.required && (
                  <p className="error">Password is required!</p>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
