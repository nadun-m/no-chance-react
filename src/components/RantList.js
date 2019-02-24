import React, { Component } from 'react';
import Rant from './Rant';
import Loader from './Loader';
import AjaxHelper from '../helpers/Ajax';
import { URL_GET_POST_LIST } from '../helpers/Constants';
import '../styles/rantlist.css';

class RantList extends Component {
    constructor(prop) {
        super(prop);

        this.initState = {
            isLoading: true,
            posts: []
        };

        this.state = this.initState;

        this.handleLoginModal = this.handleLoginModal.bind(this);
        this.loadPosts = this.loadPosts.bind(this);
    }

    loadPosts() {
        this.setState({
            isLoading: true
        });
        document.getElementById('postList').style.display = 'none';
        AjaxHelper.call({
            method: 'GET',
            url: URL_GET_POST_LIST,
            param: ''
        }).then(data => {
            if (data.ok) {
                this.setState({
                    posts: data.posts
                });
            }
        }).catch(error => {
        }).then(() => {
            this.setState({
                isLoading: false
            });
            document.getElementById('postList').style.display = 'block';
        });
    }

    componentDidMount() {
        this.loadPosts();
    }

    handleLoginModal() {
        this.props.handleLoginModal();
    }

    render() {
        const isLoading = this.state.isLoading;

        return(
            <div>
                <div className="post-list" id="postList">

                    {this.state.posts.map((post, key) => <Rant loadPosts={this.loadPosts} handleLoginModal={this.handleLoginModal} post={post} key={key} />)}

                    <div className="rant__add" title="Add Rant">+</div>

                </div>
                <Loader isLoading={isLoading} />
            </div>
        );
    }
}

export default RantList;