import React from "react";
import { withRouter, NavLink } from 'react-router-dom';
import * as Constant from "../../constants"

// Custom header component with navigation links

class CustomHeader extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
   * This function will remove data from session and redirect to login. 
   */
  logout() {
    sessionStorage.removeItem(Constant.USER_DETAILS);
    this.props.history.push('/login');
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <NavLink className="nav-link navbar-brand" to="/">Dashboard</NavLink >

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <NavLink className="nav-link" exact to="/">Home</NavLink >
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/archived">Archived</NavLink >
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/deleted">Deleted</NavLink >
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link" onClick={this.logout} style={{ cursor: 'pointer' }} >Logout</span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default withRouter(CustomHeader);
