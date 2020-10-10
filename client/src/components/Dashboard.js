import React, { useRef } from "react";
import {
  Typography,
  Paper,
  Divider,
  makeStyles,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Container,
  Link,
} from "@material-ui/core";
import copy from "clipboard-copy";
import Snackbar from "../components/Snackbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  button: {
    height: 55,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const amount = useRef();

  const handleLogOut = () => {
    props.logOut();
  };

  const handleInvest = () => {
    let value = amount.current.value;
    props.invest(value > 0 ? value : 0);
    amount.current.value = "";
  };

  const copyReferralLink = () => {
    let link = `http://localhost:4000/register?referral_code=${props.user._id}`;
    copy(link).then(() => props.setMessage("Link copied to clipboard"));
  };

  return (
    <Container component="main" maxWidth="sm">
      <Snackbar message={props.message} setMessage={props.setMessage} />

      <CssBaseline />
      <div className={classes.paper}>
        <Grid
          container
          direction="column"
          spacing={3}
          style={{ marginTop: 50 }}
        >
          <Grid item container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">
                Welcome Back, {props.user ? props.user.first_name : ""}
              </Typography>
              <Divider style={{ marginTop: 10 }}></Divider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper variant="outlined" className={classes.paper}>
                <Typography variant="h6">Invested</Typography>
                <Typography variant="h4">
                  ₹ {props.user ? props.user.amount_invested : ""}
                </Typography>
                <Typography variant="caption">Total money invested</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper variant="outlined" className={classes.paper}>
                <Typography variant="h6">Earnings</Typography>
                <Typography variant="h4">
                  ₹ {props.user ? props.user.amount_earned : ""}
                </Typography>
                <Typography variant="caption">
                  @ 2% per minute <br />
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={amount}
                type="Number"
                name="Amount"
                variant="outlined"
                required
                fullWidth
                label="Amount"
                className={classes.button}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                color="primary"
                className={classes.button}
                onClick={handleInvest}
              >
                Invest
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="outlined"
              disableElevation
              color="primary"
              className={classes.button}
              onClick={copyReferralLink}
            >
              Copy referral link
            </Button>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                style={{ paddingRight: 15 }}
                onClick={handleLogOut}
              >
                Log Out
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
