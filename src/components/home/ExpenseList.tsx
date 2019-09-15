import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonLabel,
  IonList,
  IonItem,
  IonIcon,
  IonNote,
  IonListHeader,
  IonSpinner,
  IonButton
} from '@ionic/react';
import { Expense } from '../../state/expenses/types';
import { getIcon } from '../../utils/iconDictionary';

export default class ExpensesList extends Component<any, any> {
    headerFn = (record: any, recordIndex: number, records: any) => {
      if (recordIndex % 2 === 0) {
        return 'Header ' + recordIndex;
      }
      
      return null;
    }

    renderItem = (item: Expense, index: number) => {
      return (
        <IonItem style={{cursor: "pointer"}} key={index} onClick={() => {this.props.viewExpense(item)}}>
          <IonIcon slot="start" icon={getIcon(item.icon)} />
          <IonLabel>{item.title}</IonLabel>
          <IonNote slot="end">{!item.isSaving ? "-" : ""}{"£" + item.price.toFixed(2)}</IonNote>
        </IonItem>
      )
    }

    renderHeader = (item: any, index: number) => {
      return (
        <IonListHeader key={index + "header"}>
          <IonLabel>{item.date}</IonLabel>
        </IonListHeader>
      )
    }

    renderRows(items: Expense[]) {
      const rows: any[] = [];
      let lastDate: string = "";

      for(let i = 0; i < items.length; i++) {
        if(items[i].date !== lastDate) {
          lastDate = items[i].date;
          rows.push(this.renderHeader(items[i], i));
        }

        rows.push(this.renderItem(items[i], i));
      }

      return rows;
    }

    render() {
      if(this.props.expenses.length > 0) {
        return (
          <IonList>
            { (this.props.streamingFailed || this.props.loadingStream) &&
              <IonButton 
                fill="clear"
                expand="block"
                size="small"
                color="danger"
                style={{margin: "0 12px"}}
                onClick={this.props.streamingReconnect}
              >
                  {this.props.loadingStream ? (
                    <IonSpinner color="danger"/>
                  ) : (
                    "Auto update has stopped, click to retry"
                  )}
              </IonButton>
            }
            {this.renderRows(this.props.expenses)}
          </IonList>
        )
      }
      else {
        if(this.props.appLoading) {
          return (
            <IonItem>
                <IonLabel color="medium" style={{"text-align": "center"}}><IonSpinner/></IonLabel>
            </IonItem>
          )
        }
        else {
          return (
            <IonItem>
              <IonLabel color="medium" style={{"text-align": "center"}}>You don't have any expenses to view</IonLabel>
            </IonItem>
          )
        }
      }
    }
}
