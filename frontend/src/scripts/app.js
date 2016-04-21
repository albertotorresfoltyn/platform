import React, { Component, PropTypes } from 'react'
import { Form } from 'formsy-react'
import {RaisedButton} from 'material-ui'
import {FormsyText} from 'formsy-material-ui'
import classNames from 'styles.styl'
import classname              from 'classnames';

export default class ChatMessageForm extends Component {
  constructor (props) {
    super(props)
    this.state = {};
    this.submit = this.submit.bind(this)
    this.refMessageInput = c => this.messageInput = c
  }

  submit (model, resetForm) {
    this.props.submitMessage(model.message)
    resetForm()
    this.messageInput.focus()
  }


  _enableButton() {
    this.setState({
      canSubmit: true
    })
  }

  _disableButton() {
    this.setState({
      canSubmit: false
    })
  }

  _onFormChange(values, isChanged) {
    /*nothing for now*/
  }

  _handleSubmit (event) {
    this.props.onSubmit({email: this.state.email, password: this.state.password});
  }

  _handleEmailChange (event) {
    this.setState({email: event.target.value});
  }

  _handlePasswordChange (event) {
    this.setState({password: event.target.value});
  }

  _renderAuthenticationErrors () {
    if (this.props.authenticationError) {
      return <div>{this.props.authenticationError.errorMessage}</div>
    }
  }

  render () {
    const styles = {underlineStyle: {borderColor: '#9d2445', maxWidth: '250px'},
                 labelStyle:{color: '#9D2445'},
             textfield: {divStyle:{width: '70%', maxWidth: '250px', margin: '0 auto'},
                         inputStyle:{color: '#40545D', width: '100%'}
                        }};
    return (
      <Form onValidSubmit={this.submit}>
      <div className={classNames.connective}>OR</div>
                <div className={classNames.title}>Sign in using your email and password</div>
                <div className={classname(classNames.form_group,classNames.form_spaced)}>
                  <FormsyText hintText={this.state.email}
                              style={styles.textfield.divStyle}
                              inputStyle={styles.textfield.inputStyle}
                              underlineStyle={styles.underlineStyle}
                              underlineFocusStyle={styles.underlineStyle}
                              onChange={this._handleEmailChange.bind(this)}
                              type="email"
                              name="email"
                              validations="isEmail" validationError="This is not an email"
                              floatingLabelStyle={styles.labelStyle}
                              floatingLabelText="YOUR EMAIL" />
                </div>
                <div className={classname(classNames.form_group,classNames.form_spaced)}>
                  <FormsyText hintText={this.state.password}
                             style={styles.textfield.divStyle}
                             inputStyle={styles.textfield.inputStyle}
                             underlineStyle={styles.underlineStyle}
                             underlineFocusStyle={styles.underlineStyle}
                             onChange={this._handlePasswordChange.bind(this)}
                             type="password"
                             name="password"
                             required
                             floatingLabelStyle={styles.labelStyle}
                             floatingLabelText="PASSWORD"/>
                </div>
                {this._renderAuthenticationErrors()}
                <div className={classname(classNames.form_group,classNames.joinButton)}>
                  <input className={classNames.submitElement} type="submit" formNoValidate value="LOGIN" disabled={!this.state.canSubmit} />
                </div>
      </Form>
    )
  }
}

ChatMessageForm.propTypes = {
  submitMessage: PropTypes.func.isRequired
}
