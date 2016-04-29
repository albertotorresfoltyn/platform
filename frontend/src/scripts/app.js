import React               from "react";
import {connect}           from "react-redux";


const select = (state) => ({

});

/**
* Entry point for the whole App this includes secured and not secured content.
* Application gets composed by redux therefore we can access to all the redux
* sugar from here after.
*/
@connect(select)
export default class ApplicationContainer extends React.Component {
  _logOut(redirectTo = "/home") {
    const { dispatch, history } = this.props;
    /*dispatch(logout());
    history.pushState(null,redirectTo);*/
  }
  render () {
    console.log(this);
    return (
      <div>{React.cloneElement(this.props.children, {logOut: r => this._logOut(r)})}</div>
    );
  }
}
