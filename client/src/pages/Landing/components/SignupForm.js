import React from "react";

import { Box, Typography, TextField, Button } from "@material-ui/core";

export default function SignupForm(props) {
  const classes = props.classes;

  return (
    <Box>
      <Typography variant="h1" className={classes.heading}>
        Create an account
      </Typography>
      <form>
        <TextField
          className={classes.input}
          label="Your Name"
          variant="outlined"
          required
        />
        <TextField
          className={classes.input}
          label="Email Address"
          variant="outlined"
          type="email"
          required
        />
        <TextField
          className={classes.input}
          label="Your Password"
          variant="outlined"
          type="password"
          required
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </div>
      </form>
    </Box>
  );
}
