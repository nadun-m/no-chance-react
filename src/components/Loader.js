import React, {Component} from 'react';
import '../styles/loader.css';

class Loader extends Component {
    render() {
        let isLoading = this.props.isLoading;

        if (isLoading) {
            return (
                <div className="loader" >
                    <div className="spinner"></div>
                </div >
            );
        } else {
            return ('');
        }
    }
}

export default Loader;
