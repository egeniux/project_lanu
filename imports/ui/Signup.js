import React from 'react';
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
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
        let country = this.refs.usrcountry.value.trim();
        let firstname = this.refs.usrfname.value.trim();
        let lastname = this.refs.usrlname.value.trim();
        let city = this.refs.usrcity.value.trim();
        let phone = this.refs.usrtel.value.trim();
        let faddress = this.refs.usrfaddress.value.trim();
        let laddress = this.refs.usrladdress.value.trim();
        let company = this.refs.usrcompany.value.trim();
        let job = this.refs.usrjob.value.trim();
        let zipcode = this.refs.usrzipcode.value.trim();

        const profile = {
            FirstName: firstname, LastName: lastname, Country: country,
            City: city, WorkPhone: phone, FirstAddress: faddress, LastAddress: laddress,
            Company: company, Job: job, ZipCode: zipcode
        }

        Accounts.createUser({username: email, email, password, 
            profile: profile}, (err) => {
                if (err){
                    this.setState({err: err.reason});
                } else {
                    this.setState({err: ''});
                }
        });

        history.replace('/signin');
    }

    render() {
        return (
            <div>
                <h3> CREATE YOUR LANUBE ACCOUNT </h3>
                <h4>Already have an account?  <Link to="/">Sign in</Link> </h4>

                {this.state.error ? <p>{this.state.error}</p> : undefined}

                <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <div>
                            <div>
                                <label>Email Address</label>
                                <input name="email" ref="usremail" type="Email" required />
                            </div>
                            <div>
                                <label>Password</label>
                                <input name="password" ref="usrpwd" type="password" required />
                            </div>
                            <div>
                                <label>Retype Password</label>
                                <input name="confirmpassword" ref="usrrepwd" type="password" required />
                            </div>
                            <div>
                                <label>Country</label>
                                <input name="country" ref="usrcountry" type="text" />
                            </div>
                            <div>
                                <label>Name</label>
                                <input name="firstname" ref="usrfname" type="text" placeholder="First Name" />
                                <div> <input name="lastname" ref="usrlname" type="text" placeholder="Last Name" /> </div>
                            </div>
                            <div>
                                <label>Job Title</label>
                                <input name="jobtitle" ref="usrjob" type="text" />
                            </div>
                            <div>
                                <label>Work Phone</label>
                                <input name="workphone" ref="usrtel" type="tel" placeholder="e.g. +49.800.000.1010" />
                            </div>
                            <div>
                                <label>Company Name</label>
                                <input name="compname" ref="usrcompany" type="text" />
                            </div>
                            <div>
                                <label>Address</label>
                                <input name="firstaddres" ref="usrfaddress" type="text" />
                                <div> <input name="lastaddress" ref="usrladdress" type="text" /> </div>
                            </div>
                            <div>
                                <label>City</label>
                                <input name="cityname" ref="usrcity" type="text" />
                            </div>
                            <div>
                                <label>ZIP/Postal Code</label>
                                <input name="zipcode" ref="usrzipcode" type="text" />
                            </div>
                        </div>
                    </div>
                    <button> Create Account </button>
                </form>
            </div>
        )
    }
};

Signup.propTypes = {
    country: PropTypes.string.isRequired
}

Signup.defaultProps = {
    country: 'Germany'
}