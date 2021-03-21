import React from 'react';
import { Form, FormGroup, FormFeedback, Spinner } from 'reactstrap';
// import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';

//material-ui objects
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const ErrorsAlert = ({errors}) => (
    <div className="alert alert-warning" role="alert">
      <ul className="list-unstyled">
        {errors.map((err, index) => (<li key={index}>{err}</li>))}
      </ul>
    </div>
  );


class SignInOrUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false, //spinner制御用
            switchSingInorUp: 'signIn',
            feedBuck: false, //feedbuck制御用

            // Authentification
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: [],
        };
        this.reachTheDashboard = this.reachTheDashboard.bind(this);
        this.manageLoginErrors = this.manageLoginErrors.bind(this);
        this.manageRegistrationErrors = this.manageRegistrationErrors.bind(this);
        this.handleOnSubmitOfSignIn = this.handleOnSubmitOfSignIn.bind(this);
        this.handleOnSubmitOfSignUp = this.handleOnSubmitOfSignUp.bind(this);
        this.handleClickOfFeedbuck = this.handleClickOfFeedbuck.bind(this);
        this.handleClickOfSwitchSignInAndUp = this.handleClickOfSwitchSignInAndUp.bind(this);
        this.handleOfSubmit = this.handleOfSubmit.bind(this);
    }


    reachTheDashboard(){
        this.props.history.push('/dashboard');
    }

    manageLoginErrors(error) {
        //display errors to the user
        this.setState({ errors: [error.error] });
    }

    manageRegistrationErrors(errors) {
        //display errors to the user
        this.setState({ errors });
    }

    handleOnSubmitOfSignIn(values) {
        //login(success, fail)
        // this.props.loginClicked(this.state, this.reachTheDashboard, this.manageLoginErrors);
        this.props.loginClicked(values, this.reachTheDashboard, this.manageLoginErrors);
    }

    handleOnSubmitOfSignUp(values) {
        //register(success, fail)
        // this.props.onRegister(this.state, this.reachTheDashboard, this.manageRegistrationErrors);
        this.props.onRegister(values, this.reachTheDashboard, this.manageRegistrationErrors);
    }

    componentDidUpdate = () => {
        // this.handleOfSubmit();
        this.state.switchSingInorUp
    }

    handleClickOfFeedbuck() {
        this.setState(state => {
            state.feedBuck == false ? state.feedBuck = true : null;
        });
    }

    handleClickOfSwitchSignInAndUp() {
        this.setState(state => {
            state.switchSingInorUp == 'signIn' ? state.switchSingInorUp = 'signUp' : state.switchSingInorUp = 'signIn';
            state.feedBuck == true ? state.feedBuck = false : null;
        }, () => { this.forceUpdate() });
    }

    handleOfSubmit(values) {
        this.setState(state => {
            if(state.switchSingInorUp == 'signIn') {
                this.handleOnSubmitOfSignIn(values)
            } else if(state.switchSingInorUp == 'signUp'){
                this.handleOnSubmitOfSignUp(values)
            }
        })
    }


    render() {

        //HANDLE INPUT ERRORS
        const {errors} = this.state;
        let userFeedback;
        if (errors.length !== 0) {
            userFeedback = (<ErrorsAlert errors={errors} />)
        }

        return (
            <div className="authPane">
                {userFeedback}
                <div className="formPane">
                {this.state.switchSingInorUp == 'signUn' ?
                    <Formik
                        initialValues={{ name:'' }}
                        onSubmit={this.handleOfSubmit}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required(),
                        })}
                    >
                        {
                            ({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                                <Form onSubmit={handleSubmit} className="signInorUpForm">
                                    <FormGroup>
                                        <TextField
                                            id="name"
                                            name="name"
                                            type="name"
                                            label="Name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // invalid={touched.email && errors.name ? true : false}
                                            variant="outlined"/>
                                        <FormFeedback>
                                            { this.state.feedBuck == true && errors.name }
                                        </FormFeedback>
                                    </FormGroup>
                                </Form>
                            )
                        }
                    </Formik>
                : null }
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={this.handleOfSubmit}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email().required(),
                                password: Yup.string().required(),
                            })}
                        >
                        {
                            ({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                                <Form onSubmit={handleSubmit} className="signInorUpForm">
                                    <p>{this.state.switchSingInorUp == 'signIn' ? "Sign in" : "Sign up" }</p>
                                    <FormGroup>
                                        <TextField
                                            id="email"
                                            name="email"
                                            type="email"
                                            label="Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // invalid={touched.email && errors.email ? true : false}
                                            variant="outlined"/>
                                        <FormFeedback>
                                            { this.state.feedBuck == true && errors.email }
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <TextField
                                            id="password"
                                            name="password"
                                            type="password"
                                            label="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // invalid={touched.password && errors.password ? true : false}
                                            variant="outlined"/>
                                        <FormFeedback>
                                            { this.state.feedBuck == true && errors.password }
                                        </FormFeedback>
                                    </FormGroup>
                                    {/* <div style={{ textAlign: 'center' }}>
                                        <Button className="SignInButton" variant="contained" type="submit" disabled={this.state.loading} onClick={this.handleClickOfFeedbuck}>
                                            <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!this.state.loading}/>
                                            <a>{this.state.switchSingInorUp == 'signIn' ? "Sign in" : "Sign up"}</a>
                                        </Button>
                                    </div> */}
                                </Form>
                            )
                        }
                    </Formik>

                    {this.state.switchSingInorUp == 'signUn' ?
                    <Formik
                        initialValues={{ password_confirmation:'' }}
                        onSubmit={this.handleOfSubmit}
                        validationSchema={Yup.object().shape({
                            password_confirmation: Yup.string().required(),
                        })}
                    >
                        {
                            ({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                                <Form onSubmit={handleSubmit} className="signInorUpForm">
                                    <FormGroup>
                                        <TextField
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password_confirmation"
                                            label="Check Password"
                                            value={values.password_confirmation}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // invalid={touched.password_confirmation && errors.password_confirmation ? true : false}
                                            variant="outlined"/>
                                        <FormFeedback>
                                            { this.state.feedBuck == true && errors.password_confirmation }
                                        </FormFeedback>
                                    </FormGroup>
                                </Form>
                            )
                        }
                    </Formik>
                : null }

                <div style={{ textAlign: 'center' }}>
                    <Button className="SignInButton" variant="contained" type="submit" disabled={this.state.loading} onClick={this.handleClickOfFeedbuck}>
                        <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!this.state.loading}/>
                        <a>{this.state.switchSingInorUp == 'signIn' ? "Sign in" : "Sign up"}</a>
                    </Button>
                </div>

                </div>
                <div className="signInOrUpSwitchText">
                    <Button className="SwitchSignInAndUpButton" color="primary" onClick={this.handleClickOfSwitchSignInAndUp}>{this.state.switchSingInorUp == 'signIn' ? "Sign up" : "Sign in" }</Button>
                </div>
            </div>
        );
    }
}

export default SignInOrUp;
// export default withRouter(SignInOrUp);
