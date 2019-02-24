import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            isOpenAlert: true
        };

        this.state = this.initialState;
        this.showHideAlert = this.showHideAlert.bind(this);
    }

    showHideAlert(e) {
        e.preventDefault();
        const isOpenAlert = this.state.isOpenAlert;
        this.setState({
            isOpenAlert: !isOpenAlert
        });
    }

    render() {
        const title = this.props.title;
        const description = this.props.description;
        const openModal = this.state.isOpenAlert ? 'popup popup--open' : 'popup';

        return (
            <div className={openModal}>
                <div className="popup__header">
                    <div title="Close" className="close layout--center" onClick={this.showHideAlert}>
                        X
                    </div>
                </div>
                <div className="popup__body layout--center">
                    <div className="popup__body-inner">

                        <div className="form">
                            <div className="form__title">
                                <span className="highlight">#</span>{title}
                            </div>
                            <div className="form__description">
                                {description}
                            </div>
                            <form name="alert">
                                <div className="alert">
                                    <input type="submit" value="OK" onClick={this.showHideAlert} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Alert;