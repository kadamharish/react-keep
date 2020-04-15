import React from 'react';
import "./login.css";
import * as Constant from '../../constants';
import { withRouter, Link } from 'react-router-dom';
/**
 * Exporting login component.
 * It contains login process for user.
 */
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '', errors: '' };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem(Constant.USER_DETAILS));
        const userData = data ? data : [];
        this.setState({
            userData: userData
        })
    }

    /**
     * Handling input change events.
     * @param  {Object} event 
     */
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let errors = target.errors;
        this.setState({
            [name]: value,
            errors
        });
        let data = this.state.userData.filter(val => {
            return ((val.username === this.state.username) && (val.password === this.state.password))
        })
        if (data.length > 0) {
            errors = 'Invalid username or password.';
        }
    }

    /**
     * Form submit function with validation check.
     * @param  {Object} event 
     */
    formSubmit = (event) => {
        event.preventDefault();
        if (this.state.errors && this.state.errors.length > 0) {
            return;
        } else {
            sessionStorage.setItem(Constant.USER_DETAILS, JSON.stringify(this.state.userData[0]));
            this.props.history.push('/');
        }
    }


    render() {
        const { errors } = this.state;
        return (
            <section className="systemColor">
                <div className="container min-vh-100">
                    <div className="row min-vh-100 justify-content-center align-items-center">
                        <div className="col-10 col-md-7 col-lg-4">
                            <form onSubmit={this.formSubmit} className="justify-content-center">
                                <div className="text-center">
                                    <h3>Sign In</h3>
                                </div>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" value={this.state.username}
                                        onChange={this.handleInputChange} name="username" required placeholder="Enter email" />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={this.state.password}
                                        onChange={this.handleInputChange} name="password" required placeholder="Enter password" />
                                </div>
                                {errors &&
                                    <span className="error">{errors}</span>
                                }
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                <p className="forgot-password text-center">
                                    <Link className="nav-link" to="/signup">Signup?</Link >
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default withRouter(Login)