import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Util from '../helpers/Util';
import AjaxHelper from '../helpers/Ajax';
import { URL_POST_POST_VOTE } from '../helpers/Constants';
import '../styles/rant.css';

class Rant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myVote: this.props.post.myVote
        };

        this.handleVote = this.handleVote.bind(this);
    }

    handleVote(e) {
        e.preventDefault();
        
        if (!Util.isLogged()) {
            this.props.handleLoginModal();
        } else {
            const voteType = (this.state.myVote !== 0) ? 'reset' : e.target.dataset.vote;
            const post = this.props.post;

            AjaxHelper.call({
                method: 'POST',
                url: URL_POST_POST_VOTE,
                param: {
                    postId: post.id,
                    direction: voteType
                }
            }).then(data => {
                if (data.ok) {
                    this.setState({
                        myVote: data.post.myVote
                    });
                    this.props.loadPosts();
                }
            }).catch(error => {
            }).then(() => {
                
            });
        }

    }

    render() {
        const post = this.props.post;
        const myUpvote = (post.myVote > 0) ? 'checked' : '';
        const myDownvote = (post.myVote < 0) ? 'checked' : '';
        
        return (
            <article className="post">
                <Link to={"/rant/" + post.id}>
                    <div className="post__inner">
                        <div className="score"> 
                            <div className={"score__up layout--center " + myUpvote} data-vote="up" onClick={this.handleVote}>++</div>
                            <div className="score__board layout--center">{post.votes}</div>
                            <div className={"score__down layout--center " + myDownvote} data-vote="down" onClick={this.handleVote}>--</div>
                            </div>
                        <div className="post__body">{post.content}</div>
                        </div>
                    <div className="post__footer">
                        <div className="post__time">{post.displayTime}</div>
                    <div className="post__comments">
                        <svg className="icon" viewBox="0 0 31 32">
                                <path d="M24.732 24.371v7.629l-7.267-7.267h-8.808c-4.781 
                                0-8.657-3.875-8.657-8.657v-7.42c0-4.781 3.876-8.657 
                                8.657-8.657h13.604c4.781 0 8.657 3.875 8.657 8.657v7.42c0 
                                3.922-2.61 7.23-6.186 8.294z"></path>
                            </svg>
                            {post.commentCount}
                        </div>
                    </div>
                </Link>
            </article>        
        );
    }
}

export default Rant;