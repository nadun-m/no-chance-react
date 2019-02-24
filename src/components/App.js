import React, { Component } from 'react';
import Header from './Header'; 
import Loader from './Loader'; 
import RantList from './RantList';
import RantDetails from './RantDetails';
import Login from './Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Util from '../helpers/Util';
import AjaxHelper from '../helpers/Ajax';
import { URL_POST_USER_DEACTIVATE } from '../helpers/Constants';
import _ from 'lodash';
import '../styles/app.css';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
            isOpen: false,
            login: {
                isLoggedIn: !_.isEmpty(Util.getLocals('token')),
                username: localStorage.getItem('username'),
                token: localStorage.getItem('token')
            }
        };

        this.handleLoginModal = this.handleLoginModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        AjaxHelper.call({
            method: 'POST',
            url: URL_POST_USER_DEACTIVATE,
            param: {}
        }).then(data => {
            if (data.ok) {
                this.setState({
                    login: {
                        isLoggedIn: false,
                        username: '',
                        token: ''
                    }
                });

                Util.removeLocals(['token', 'username']);
            }
        });
    }

    handleLogin(username, token) {
        this.setState({
            isOpen: false,
            login: {
                isLoggedIn: true,
                username: username,
                token: token
            }
        });
    
        Util.setLocals({
            token: this.state.login.token,
            username: this.state.login.username
        });

        document.getElementById('loginModal').classList.toggle('popup--open');
    }

    handleLoginModal() {
        let isOpen = this.state.isOpen;
        this.setState({
            isOpen: !isOpen
        });

        document.getElementById('loginModal').classList.toggle('popup--open');

        if (!isOpen) {
            document.getElementById('usernameInput').focus();
        }
    }

    render() {
        const isLoading = this.state.isLoading;

        return (
            <Router>
                <div className="App">
                    <div className="page">

                        <Header isLoggedIn={this.state.login.isLoggedIn} 
                                username={this.state.login.username} 
                                handleLoginModal={this.handleLoginModal}
                                handleLogout={this.handleLogout} />

                        <section className="main layout--center">
                            <div className="main__content layout--wrapped">
                                <Loader isLoading={isLoading} />
                                <Route path="/" exact render={(props) => <RantList {...props} handleLoginModal={this.handleLoginModal} />} />
                                <Route path="/rant/:id" component={RantDetails} />
                                <Login handleLogin={this.handleLogin} handleLoginModal={this.handleLoginModal} />
                            </div>
                        </section>

                    </div>
                </div>
            </Router>
        );
    }
}

export default App;