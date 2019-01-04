import React from 'react';
import Link from 'react-router-dom/Link';
import { Meteor } from 'meteor/meteor';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
      
    }


    onSubmit(e) {
        e.preventDefault();

        // this.setState({
        //     error: "Something went wrong!"
        // });
        let email = this.refs.usremail.value.trim();
        let password = this.refs.usrpwd.value.trim();

      Meteor.loginWithPassword({email}, password, (err) => {
        console.log('Login callback', err);

      });

        
        history.replace('/');

    }

    render() {
        return (
            <div>
                <h3> SIGN IN </h3>

                {this.state.error ? <p>{this.state.error}</p> : undefined}

                <form onSubmit={this.onSubmit.bind(this)}>
                    <div> 
                      <div>
                          <label>Email Address</label>
                          <input name="email" ref="usremail" type="Email" required />
                      </div>
                      <div>
                          <label>Password</label>
                          <input name="password" ref="usrpwd" type="password" required />
                      </div>
                    </div>
                    <button> Sign in </button>
                    <div><h5>Don't have an account?  <Link to="/signup">Sign Up</Link> </h5> </div>
                </form>
            </div>
        )
    }
};

