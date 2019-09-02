import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  IonFab,
  IonButton,
  IonLabel
} from '@ionic/react';

class BackButton extends Component<any, any> { 
  back = () => {
    this.props.history.push(this.props.backLink);
  }

  render() {
    return (
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonButton onClick={this.back}>
          <IonLabel>Back</IonLabel>
        </IonButton>
      </IonFab>
    )
  }
}

export default withRouter(BackButton);