import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  IonFab,
  IonButton,
  IonIcon,
  IonAlert
} from '@ionic/react';
import { save, trash } from 'ionicons/icons';

class ActionBar extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showWarning: false
    }
  }
  
  save = () => {
    this.props.save();
  }

  delete = () => {
    this.props.delete();
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
    return (
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonButton color="primary" onClick={this.save}>
          <IonIcon slot="start" icon={save} />
          Save
        </IonButton>
        {this.props.delete &&
          <span>
            <IonButton color="danger" onClick={this.showWarning}>
              <IonIcon icon={trash} />
            </IonButton>

            <IonAlert
                isOpen={this.state.showWarning}
                onDidDismiss={this.hideWarning}
                header={'Delete Expense'}
                message={'Are you sure you want to delete this expense?'}
                buttons={[
                  {
                    text: 'No',
                    cssClass: 'secondary'
                  }, {
                    text: 'Yes',
                    handler: this.delete
                  }
                ]}
            >
            </IonAlert>
          </span>
        }
      </IonFab>
    )
  }
}

export default withRouter(ActionBar);