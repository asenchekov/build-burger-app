import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { auth } from '../../store/actions/auth';
import { setAuthRedirectPath } from '../../store/actions/auth';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email adress',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChengedHandler = (event, controlName) => {
        // console.log(inputIdentifier);
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
        }

        const inputFields = formElementsArray.map(formElement => {
            return (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    elementValue={formElement.config.elementValue}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChengedHandler(event, formElement.id)}
                />
            );
        });
        
        const form = !this.props.loading ? ( <div className={classes.Auth}>
                { this.props.error && <h1>ERROR: {this.props.error.code} {this.props.error.message}</h1> }
                <form onSubmit={this.submitHandler}>
                    {inputFields}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div> ) : (<Spinner />);

        return this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : form;
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);