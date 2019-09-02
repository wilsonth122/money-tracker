import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonLabel,
  IonItem,
  IonSelectOption,
  IonSelect,
  IonIcon
} from '@ionic/react';
import { getIconList, getIcon } from '../../utils/iconDictionary';

export default class AddForm extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            selectedIcon: this.props.icon
        }
    }

    updateIcon = (e: CustomEvent) => {
        this.setState({
            selectedIcon: e.detail.value
        });

        this.props.updateIcon(e);
    }

    renderOptions() {
        const options: any[] = [];
        let icons = getIconList();

        for(let i = 0; i < icons.length; i++) {
            options.push(<IonSelectOption key={i} value={icons[i]}>{icons[i]}</IonSelectOption>);
        }

        return options;
    }

    render() {
      return (
        <IonItem>
            <IonLabel position="floating">Icon</IonLabel>
            <IonIcon size="large" slot="start" icon={getIcon(this.state.selectedIcon)} />
            <IonSelect onIonChange={this.updateIcon} interface="popover" value={this.state.selectedIcon}>
                {this.renderOptions()}
            </IonSelect>
        </IonItem>
      )
    }
}