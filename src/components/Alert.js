import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const title = this.props.title;
        const description = this.props.description;

        return (
            <div className="popup popup--open">
                <div className="popup__header">
                    <div title="Close" className="close layout--center">
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
                                    <input type="submit" value="OK" />
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