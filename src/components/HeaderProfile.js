import React, { Component } from 'react';

class HeaderProfile extends Component {
    render() {
        const username = this.props.username;
        return (
            <div className="profile layout--center">
                <div className="profile__picture">
                    <svg height="36" width="36">
                        <circle cx="18" cy="18" r="18" fill="#5c5f6f"></circle>
                    </svg>
                </div>
                <div className="profile__name">{username}</div>
            </div>
        );
    }
}

export default HeaderProfile;