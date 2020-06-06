import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Grid, Container, CssBaseline, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#5b5b5b'
    }
}));
const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [userName, setUserName] = React.useState('');
    const [userNameError, setUserNameError] = React.useState('');
    const [password, setPassword] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')

    const { from } = location.state as { from: { pathname: string } } || { from: { pathname: "/" } };

    const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value !== undefined) {
            setUserName(value)
        }
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value !== undefined) {
            setPassword(value)
        }
    }

    const login = () => {
        if (!userName) {
            setUserNameError('User name should not be empty!')
            return;
        }

        setUserNameError('')

        if (!password) {
            setPasswordError('Password should not be empty!')
            return;
        }

        setPasswordError('')
        // fakeAuth.authenticate(() => {
        //     history.replace(from);
        // });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        onChange={onUserNameChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        error={userNameError !== ''}
                        helperText={userNameError ? userNameError : ''}
                    />
                    <TextField
                        onChange={onPasswordChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={passwordError !== ''}
                        helperText={passwordError ? passwordError : ''}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={login}
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/sign-up">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default React.memo(Login);