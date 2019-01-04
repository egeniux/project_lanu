import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export default class Home extends React.Component {
    onLogout() {

        Accounts.logout();
        
        history.replace('/signin');
    }

    render(){
        return(
            <div>
                <div><h3>LANUBE</h3></div>
                <button onClick={this.onLogout.bind(this)}>Logout</button>
            </div>
        );
    } 
}