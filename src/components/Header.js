import React, {Component} from 'react';
import HeaderProfile from '../components/HeaderProfile';
import '../styles/header.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLoginModal = this.handleLoginModal.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLoginModal() {
        this.props.handleLoginModal();
    }

    handleLogout() {
        this.props.handleLogout();
    }

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        const username = this.props.username;
        let actionButton;

        if (isLoggedIn) {
            actionButton = <span onClick={this.handleLogout}>Sign Out</span>;
        } else {
            actionButton = <span onClick={this.handleLoginModal}>Join</span>;
        }

        return (
            <section className="header layout--center">
                <div className="header__content layout--wrapped">
                    <div className="brand">
                        <a href="/"><div className="brand__name"><span>#</span>DEVRANT</div></a>
                    </div>

                    {isLoggedIn ? <HeaderProfile username={username} /> : ''}

                    <div className="join">
                        {actionButton}
                    </div>
                </div>
            </section>
        );
    }
}

export default Header;