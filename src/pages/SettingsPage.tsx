import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { IonContent, IonCard, IonCardContent, IonButton, IonSpinner, IonAlert, IonCardHeader, IonCardTitle } from '@ionic/react';
import BackButton from '../components/app/BackButton';

export default class SettingsPage extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            showWarning: false
        }
    }

    viewPrivacyPolicy = () => {
        this.props.history.push('/privacypolicy');
    }

    showWarning = () => {
        this.setState({
          showWarning: true
        });
    }

    hideWarning = () => {
        this.setState({
            showWarning: false
        });
    }

    render() {
        return(
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Settings</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonButton expand="block" style={{"margin-bottom": "20px"}}
                            onClick={this.props.actions.logoutUser}>
                            Logout
                        </IonButton>
                        <IonButton expand="block" color="danger" size="small"
                            onClick={this.showWarning}
                            disabled={this.props.state.deletingUser ? true : false}>
                            {this.props.state.deletingUser ? (
                                <IonSpinner/>
                            ) : ( 
                                "Delete Account" 
                            )}
                        </IonButton>
                        <IonButton expand="block" fill="clear" onClick={this.viewPrivacyPolicy}>
                                View Privacy Policy
                        </IonButton>

                        <IonAlert
                            isOpen={this.state.showWarning}
                            onDidDismiss={this.hideWarning}
                            header={'Delete Account'}
                            message={'Are you sure you want to delete your account?'}
                            buttons={[
                            {
                                text: 'No',
                                cssClass: 'secondary'
                            }, {
                                text: 'Yes',
                                handler: this.props.actions.deleteUser
                            }
                            ]}
                        >
                        </IonAlert>

                        <IonAlert
                            isOpen={this.props.state.deleteError}
                            onDidDismiss={() => {}}
                            header={'Unable to Delete Account'}
                            message={this.props.state.deleteMessage}
                            backdropDismiss={false}
                            buttons={[
                            {
                                text: 'Cancel',
                                cssClass: 'secondary'
                            }, {
                                text: 'Retry',
                                handler: this.props.actions.deleteUser
                            }
                            ]}
                        >
                        </IonAlert>
                    </IonCardContent>
                </IonCard>
                <BackButton backLink="/" />
            </IonContent>
        )
    }
}