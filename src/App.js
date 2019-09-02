import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </IonPage>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;