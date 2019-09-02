import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { IonContent, IonCardTitle, IonCard, IonCardContent, IonButton, IonInput, IonItem, IonLabel, IonCardHeader, IonSpinner, IonCardSubtitle } from '@ionic/react';
import { User } from '../state/user/types';
import { Redirect } from 'react-router';
import { Form } from 'informed';

export default class RegisterPage extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            email: "",
            validEmail: false,
            password: "",
            validPassword: false,
            confirmPassword: "",
            validConfirmPassword: false,
            errorMessage: ""
        }
    }

    registerUser = () => {
        if(this.validateEmail() && this.validatePassword() && this.validateConfirmPassword()) {
            if(this.state.password !== this.state.confirmPassword) {
                this.setState({errorMessage: "Passwords don't match"})
                return
            }

            let user: User = {
                email: this.state.email,
                password: this.state.password
            }

            this.props.actions.createUser(user)
        }
    }

    onKeyPress = (e: any) => {
        if(e.which === 13) {
          this.registerUser();
        }
    }

    updateEmail = (e: CustomEvent) => {
        this.setState({email: e.detail.value})
    }

    validateEmail = () => {
        if(!this.state.email.includes('@')) {
            this.setState({
                errorMessage: "Email must atleast contain '@'",
                validEmail: false
            })
            return false
        }

        this.setState({
            errorMessage: "",
            validEmail: true
        })
        return true
    }

    updatePassword = (e: CustomEvent) => {
        this.setState({password: e.detail.value})
    }

    validatePassword = () => {
        if(this.state.password.length < 6) {
            this.setState({
                errorMessage: "Password must be atleast 6 characters long",
                validPassword: false
            })
            return false
        }

        this.setState({
            errorMessage: "",
            validPassword: true
        })
        return true
    }

    updateConfirmPassword = (e: CustomEvent) => {
        this.setState({confirmPassword: e.detail.value})
    }

    validateConfirmPassword = () => {
        if(this.state.confirmPassword.length < 6) {
            this.setState({
                errorMessage: "Confirm Password must be atleast 6 characters long",
                validConfirmPassword: false
            })
            return false
        }

        this.setState({
            errorMessage: "",
            validConfirmPassword: true
        })
        return true
    }

    render() {
        if(this.props.state.isAuthenticated) {
            return <Redirect to="/" />
        }
        else {
            return(
                <IonContent>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Register</IonCardTitle>
                            <IonCardSubtitle color="danger">{this.state.errorMessage}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <Form onSubmit={this.registerUser} onKeyPress={this.onKeyPress}>
                                <IonItem>
                                    <IonLabel position="floating">Email</IonLabel>
                                    <IonInput required={true} type={"email"} 
                                        inputMode={"email"} 
                                        onIonChange={this.updateEmail}
                                        onIonBlur={this.validateEmail}
                                        value={this.state.email}>
                                    </IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Password</IonLabel>
                                    <IonInput required={true} type={"password"} 
                                        inputMode={"password"} 
                                        onIonChange={this.updatePassword}
                                        onIonBlur={this.validatePassword}
                                        value={this.state.password}>
                                    </IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Confirm Password</IonLabel>
                                    <IonInput required={true} type={"password"} 
                                        inputMode={"password"} 
                                        onIonChange={this.updateConfirmPassword}
                                        onIonBlur={this.validateConfirmPassword}
                                        value={this.state.confirmPassword}>
                                    </IonInput>
                                </IonItem>
                                <IonButton expand="block" 
                                    type="submit"
                                    disabled={this.props.state.loggingIn ? true : false}>
                                    {this.props.state.loggingIn ? (
                                        <IonSpinner/>
                                    ) : ( 
                                        "Create Account" 
                                    )}
                                </IonButton>
                            </Form>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            )
        }
    }
}