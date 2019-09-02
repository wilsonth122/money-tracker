import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/react';
import { withRouter } from 'react-router';
import { settings } from 'ionicons/icons';

class AppHeader extends Component<any, any> {
    home = () => {
        this.props.history.push('/');
    }

    settings = () => {
        this.props.history.push('/settings');
    }

    render() {
      return (
        <IonHeader>
            <IonToolbar color="primary">
                <IonTitle onClick={this.home} style={{cursor: "pointer"}}>
                    {this.props.title}
                </IonTitle>

                {this.props.isAuthenticated && (
                    <IonButtons slot="end">
                        <IonButton onClick={this.settings}>
                            <IonIcon icon={settings} />
                        </IonButton>
                    </IonButtons>
                )}
            </IonToolbar>
        </IonHeader>
      )
    }
}

export default withRouter(AppHeader);