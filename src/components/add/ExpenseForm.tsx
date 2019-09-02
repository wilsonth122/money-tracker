import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonInput,
  IonLabel,
  IonItem,
  IonCard,
  IonCardContent,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonCardHeader,
  IonCardTitle
} from '@ionic/react';
import IconPicker from './IconPicker';
import { Form } from 'informed';

export default class ExpenseForm extends Component<any, any> {
    slideRef: React.RefObject<any>;

    constructor(props: any) {
      super(props);

      this.slideRef = React.createRef();
    }

    updateTitle = (e: CustomEvent) => {
      this.props.expense.title = e.detail.value;
    }

    updateIsSaving = (e: CustomEvent) => {
      this.props.expense.isSaving = e.detail.value;
    }

    updateIcon = (e: CustomEvent) => {
      this.props.expense.icon = e.detail.value;
    }

    updatePrice = (e: CustomEvent) => {
      this.props.expense.price = parseFloat(e.detail.value);
    }

    updateDate = (e: CustomEvent) => {
      const date = new Date(e.detail.value);
      this.props.expense.date = date.toLocaleDateString("en-GB", {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
    }

    segmentChanged = (e: any) => {
      this.slideRef.current.slideTo(e.target.value);
    }

    render() {
      return (
        <IonCard>
            <IonCardHeader>
              <IonCardTitle>Add an Expense or Saving</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <Form>
                <IonItem>
                  <IonLabel position="floating">Title</IonLabel>
                  <IonInput required={true} onIonChange={this.updateTitle} value={this.props.expense.title}></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Amount</IonLabel>
                  <IonInput type="number" inputMode="numeric" required={true} onIonChange={this.updatePrice} value={Math.abs(this.props.expense.price).toFixed(2)}></IonInput>
                </IonItem>
                <IonItem>
                <IonLabel position="floating">Type</IonLabel>
                    <IonSelect onIonChange={this.updateIsSaving} interface="popover" value={this.props.expense.isSaving}>
                      <IonSelectOption key={0} value={false}>Expense</IonSelectOption>
                      <IonSelectOption key={1} value={true}>Saving</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IconPicker icon={this.props.expense.icon} updateIcon={this.updateIcon}/>
                <IonItem>
                  <IonLabel position="floating">Date</IonLabel>
                  <IonDatetime displayFormat="DD MMM YYYY" onIonChange={this.updateDate} value={new Date(this.props.expense.date).toISOString()}></IonDatetime>
                </IonItem>
              </Form>
            </IonCardContent>
          </IonCard>
      )
    }
}