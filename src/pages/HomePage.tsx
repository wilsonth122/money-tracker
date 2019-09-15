import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { IonContent, IonAlert } from '@ionic/react';
import ExpenseList from '../components/home/ExpenseList';
import AddFab from '../components/home/AddFab';
import { Expense } from '../state/expenses/types';
import ExpensesSummary from '../components/home/ExpensesSummary';

export default class HomePage extends Component<any, any> {
    add = () => {
        this.props.history.push('/add');
    }

    view = (expense: Expense) => {
        this.props.history.push({
            pathname: '/add',
            state: {
                expense: expense
            }
        });
    }

    componentWillMount() {
        this.props.actions.loadExpenses();
    }

    componentWillUnmount() {
		this.props.actions.stopStreamingExpenses();
	}

    render() {
        return (
            <IonContent>
                { this.props.state.expenses.length > 0 &&
                    <ExpensesSummary state={this.props.state} actions={this.props.actions} />
                }

                <ExpenseList 
                    expenses={this.props.state.expenses}
                    viewExpense={this.view} 
                    appLoading={this.props.state.loadingExpenses}
                    streamingFailed={this.props.state.streamingFailed}
                    loadingStream={this.props.state.loadingStream}
                    streamingReconnect={this.props.actions.streamExpenses}
                />
                    
                <AddFab icon="add" onClick={this.add} appLoading={this.props.state.loadingExpenses} />

                <IonAlert
                    isOpen={this.props.state.loadFailed}
                    onDidDismiss={() => {}}
                    header={'Failed to load expenses'}
                    message={'Please check your internet connection.'}
                    backdropDismiss={false}
                    buttons={[
                    {
                        text: 'Retry',
                        handler: this.props.actions.loadExpenses
                    }
                    ]}
                />
            </IonContent>
        )
    }
}