import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonApp,
  IonPage
} from '@ionic/react';

import { PrivateRoute } from './components/app/PrivateRoute';

import AppHeader from './components/app/AppHeader';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import './App.css';
import SettingsPage from './pages/SettingsPage';

export default class App extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = props.states();
  }

  componentWillMount() {
    this.props.states.map((state: any) => {
      return this.setState(state)
    });
  }

  render() {
    return (
      <Router>
          <IonApp>
            <IonPage id="page">
              <AppHeader title="Money Tracker" isAuthenticated={this.state.isAuthenticated} actions={this.props.actions} />

              <Switch>
                <Route
                  path="/login"
                  render={(routeProps) => (
                    <LoginPage {...routeProps} state={this.state} actions={this.props.actions} />
                  )}
                />
                <Route
                  path="/register"
                  render={(routeProps) => (
                    <RegisterPage {...routeProps} state={this.state} actions={this.props.actions} />
                  )}
                />
                <PrivateRoute
                  path="/settings"
                  component={SettingsPage}
                  isAuthenticated={this.state.isAuthenticated}
                  state={this.state} 
                  actions={this.props.actions}
                />
                <PrivateRoute
                  component={HomePage}
                  isAuthenticated={this.state.isAuthenticated}
                  state={this.state} 
                  actions={this.props.actions}
                />
              </Switch>
            </IonPage>
          </IonApp>
      </Router>
    );
  }
}