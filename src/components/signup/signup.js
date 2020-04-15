import React from 'react'
import * as Constant from '../../constants'
import './signup.css';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = { name: '', username: '', password: '', errors: '' };
    }
    componentDidMount() {
        const data = JSON.parse(localStorage.getItem(Constant.USER_DETAILS));
        const userData = data ? data : [];
        this.setState({
            userData: userData
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.verifyUsername();
        let errors = this.state.errors;
        this.setState({
            errors,
            [name]: value,

        });
    }
    formSubmit = (event) => {
        event.preventDefault();
        if (!validateForm(this.state.errors)) {
            return;
        }
        const data = Object.assign({}, this.state);
        delete data['userData'];
        delete data['errors'];
        this.state.userData.push(data);
        localStorage.setItem(Constant.USER_DETAILS, JSON.stringify(this.state.userData));
        toast.success("User successfully created.");
        this.props.history.push('/login');
    }

    verifyUsername() {
        let data = this.state.userData.filter(value => {
            return (value.username === this.state.username)
        })
        if (data.length > 0) {
            this.setState({
                errors: 'Username already exist..!!'
            });
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
                                    <h3>Sign Up</h3>
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={this.state.name}
                                        onChange={this.handleInputChange} name="name" required placeholder="Enter full name" />
                                </div>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" value={this.state.username}
                                        onChange={this.handleInputChange} name="username" required placeholder="Enter email" />
                                    {errors &&
                                        <span className="error">{errors}</span>
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={this.state.password}
                                        onChange={this.handleInputChange} name="password" required placeholder="Enter password" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                <p className="forgot-password text-center">
                                    {/* <a href="/login">login?</a> */}
                                    <Link className="nav-link" to="/login">login?</Link >

                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

const validateForm = (errors) => {
    let valid = true;
    if (errors.length > 0) {
        valid = false;
    }
    return valid;
}
export default withRouter(Signup);