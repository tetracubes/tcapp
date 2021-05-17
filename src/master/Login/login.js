import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { withRouter } from "react-router-dom";


import AuthService from '../../services/AuthService'
import * as AlertService from "../../services/alert-service"
import LaunchScreen from '../../shared/components/LaunchScreen/LaunchScreen';



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://tetracubes.com/">
                www.tetracubes.com
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = theme => ({
    root: {
        height: '90vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(4, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    notification:{
        color:"red"
    }
});

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            message: '',
            ready:true,
        }

        this.signin = this.Sginin.bind(this);
    }

    componentDidMount() {
        this.props.appConfig.SetAppConfig("showLayout",false);
        if(AuthService.getUserInfo()){
            // this.props.history.push('/dashboard');
        }
    }
    

    Sginin = (e) => {
        e.preventDefault();
        const credentials = { username: this.state.username, password: this.state.password };
        this.setState({ ready: false });
        AuthService.login(credentials).then(res => {
            if (res.status === 200) {
                let userinfo={};
                userinfo["username"]=this.state.username;
                userinfo["token"]=res.data.token;
                userinfo["data"]=res.data;
                localStorage.setItem("userInfo", JSON.stringify(userinfo));
                // alert(res.data.result);
                // console.log(res);
                this.props.appConfig.SetAppConfig("showLayout",true);
                this.props.appConfig.SetAppConfig("user",res.data.UserDetails);
                
                this.setState({ ready: true });
                this.props.history.push('/dashboard');
                
                AlertService.Success("Login Successfull !!!.");
            } else {
                this.setState({ message: res.data.message });
                this.setState({ ready: true });
            }
        }).catch((err)=>{
            this.setState({ ready: true });
            let msg=(err.response.data?err.response.data.message:err.message);
            if (msg.toLowerCase().includes("unauthorized")) msg= msg + " Please check UserName / Password typed correctly.Try again"
            AlertService.Error(msg);
            this.setState({ message: msg });
        });
    };

    handleChange= (e)=> {
        this.setState({[e.target.name]:e.target.value});
    }
    // localStorage.removeItem("userInfo");
    render() {
        // const classes = useStyles();
        const { classes } = this.props;
        return (
            
            <Grid container component="main" className={classes.root} justify="center" alignItems="center">
                <CssBaseline />
                {!this.state.ready && <LaunchScreen />}
                {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
                <Grid item xs={12} sm={7} md={5} component={Paper} elevation={13} square  >
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        {/* #c89666 */}
                        <Typography component="h1" variant="h5" style={{color: "#c89666","fontWeight":"500"}}>
                            Project Management System (PMS)
                        </Typography>
                        <form className={classes.form} noValidate>
                        <Typography variant="caption" style={{color:"red"}}>{this.state.message}</Typography>
                            <TextField variant="outlined" margin="normal" required fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={this.handleChange} value={this.state.username}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange} value={this.state.password}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.signin}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }

}
export default withRouter(withStyles(styles)(Login))
