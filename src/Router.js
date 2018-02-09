import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Splash from './components/Splash';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import Main from './components/Main';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene
                    key="splash"
                    component={Splash}
                    initial
                />
                <Scene key="auth">
                    <Scene hideNavBar
                        key="login"
                        component={Login}
                    />
                    <Scene 
                        title="Cadastro"
                        key="createUser"
                        component={CreateUser}
                    />
                </Scene>
                <Scene key="dashboard">
                    <Scene 
                       renderLeftButton={null}
                        title="Menu"
                        key="main"
                        component={Main}
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
