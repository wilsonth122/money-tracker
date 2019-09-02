import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardSubtitle
} from '@ionic/react';
import ExpenseChart from '../../charts/ExpenseChart';
import { isPlatform } from '@ionic/core';

type Segment = 'Year' | 'Month' | 'Week';

export default class ExpensesSummary extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            isMobile: isPlatform(window, "mobile"),
            label: 'Month',
            expenses: this.props.state.monthsExpenses,
            totalSaved: this.props.state.monthsTotal,
            currentEntry: this.props.state.monthsExpenses[this.props.state.monthsExpenses.length -1] || {total: 0, date: ""}
        }
    }

    segmentChanged = (e: any) => {
        const newSegment: Segment = e.target.value;

        if(newSegment !== this.state.label) {
            if(newSegment === 'Year') {
                this.setState({
                    label: 'Year',
                    expenses: this.props.state.yearsExpenses,
                    totalSaved: this.props.state.yearsTotal,
                    currentEntry: this.props.state.yearsExpenses[this.props.state.yearsExpenses.length -1] || {total: 0, date: ""}
                })
            }
            else if(newSegment === 'Month') {
                this.setState({
                    label: 'Month',
                    expenses: this.props.state.monthsExpenses,
                    totalSaved: this.props.state.monthsTotal,
                    currentEntry: this.props.state.monthsExpenses[this.props.state.monthsExpenses.length -1] || {total: 0, date: ""}
                })
            }
            else if(newSegment === 'Week') {
                this.setState({
                    label: 'Week',
                    expenses: this.props.state.weeksExpenses,
                    totalSaved: this.props.state.weeksTotal,
                    currentEntry: this.props.state.weeksExpenses[this.props.state.weeksExpenses.length -1] || {total: 0, date: ""}
                })
            }
        }
    }

    chartClicked = (payload: Object) => {
        this.setState({
            currentEntry: payload
        })
    }

    componentDidUpdate(previousProps: any) {
		if(this.props.state.monthsExpenses !== previousProps.state.monthsExpenses) {
			this.setState({
                label: 'Month',
                expenses: this.props.state.monthsExpenses,
                totalSaved: this.props.state.monthsTotal,
                currentEntry: this.props.state.monthsExpenses[this.props.state.monthsExpenses.length -1] || {total: 0, date: ""}
            })
		}
    }
    
    renderSegment = () => {
        return (
            <IonSegment onIonChange={(e: any) => {this.segmentChanged(e)}} value={this.state.label}>
                <IonSegmentButton value="Week">
                    <IonLabel>Week</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Month">
                    <IonLabel>Month</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Year">
                    <IonLabel>Year</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        )
    }

    renderMobile = () => {
        return (
            <>
                <IonRow>
                    <IonCol>
                        {this.renderSegment()}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonRow>
                            <IonCardTitle>{this.state.currentEntry.total < 0 ? "-" : ""}{"£" + Math.abs(this.state.currentEntry.total).toFixed(2)}</IonCardTitle>
                        </IonRow>
                        <IonRow>
                            <IonCardSubtitle>{this.state.currentEntry.date}</IonCardSubtitle>
                        </IonRow>
                    </IonCol>
                    <IonCol>
                        <IonRow justify-content-end>
                            <IonCardTitle>{this.state.totalSaved < 0 ? "-" : ""}{"£" + Math.abs(this.state.totalSaved).toFixed(2)}</IonCardTitle>
                        </IonRow>
                        <IonRow justify-content-end>
                            <IonCardSubtitle>Total Saved</IonCardSubtitle>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </>
        )
    }

    renderDesktop = () => {
        return (
            <IonRow>
                <IonCol>
                    <IonRow>
                        <IonCardTitle>{this.state.currentEntry.total < 0 ? "-" : ""}{"£" + Math.abs(this.state.currentEntry.total).toFixed(2)}</IonCardTitle>
                    </IonRow>
                    <IonRow>
                        <IonCardSubtitle>{this.state.currentEntry.date}</IonCardSubtitle>
                    </IonRow>
                </IonCol>
                <IonCol>
                    {this.renderSegment()}
                </IonCol>
                <IonCol>
                    <IonRow justify-content-end>
                        <IonCardTitle>{this.state.totalSaved < 0 ? "-" : ""}{"£" + Math.abs(this.state.totalSaved).toFixed(2)}</IonCardTitle>
                    </IonRow>
                    <IonRow justify-content-end>
                        <IonCardSubtitle>Total Saved</IonCardSubtitle>
                    </IonRow>
                </IonCol>
            </IonRow>
        )
    }

    render() {
        return (
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Your {this.state.label} Summary</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                    <IonGrid id="expense-summary">
                        <IonRow>
                            <IonCol>
                                <ExpenseChart data={this.state.expenses} onClick={this.chartClicked}/>
                            </IonCol>
                        </IonRow>
                        {this.state.isMobile ? (
                            this.renderMobile()
                        ) : (
                            this.renderDesktop()
                        )}
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        )
    }
}