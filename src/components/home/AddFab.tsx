import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';
import { add } from 'ionicons/icons';

class AppFab extends Component<any, any> {
  render() {
    return (
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={this.props.onClick} disabled={this.props.appLoading}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    )
  }
}

export default withRouter(AppFab);