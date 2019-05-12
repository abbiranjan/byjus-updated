import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getContacts, verifyCredential, resetPassword } from '../action/contactAction';
import Autocomplete from  'react-autocomplete';
import { getStocks, matchStocks } from '../json/data';
import '../App.css';
import ls from 'local-storage';
// import { Link } from 'react-router-dom

class Login extends Component {
  componentDidMount() {
    this.props.getContacts();
     let retrievedData = localStorage.getItem('list');
     console.log('retrievedData', retrievedData);
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    console.log(nextProps.isContactExist);
    console.log(this.props.isContactExist);
    if(nextProps.contacts === undefined || nextProps.contacts.length<=0) {
      console.log(nextProps);
      this.setState({
        isContactValid : false,
        showLoginInfo : true,
        showChangedPwdMsg: false,
        showDefaultUserAndPassword: false
      });
    }
      //this.setState((state) => ({searchPageEnable: searchPageEnable}));
      // if(this.state.resetPwdFlow) {
      //   this.props.history.push('/');
      // } else {
      //   this.props.history.push('/search');
      // }
    else {
      let change;
      for(let index in nextProps.isContactExist){
        if(nextProps.isContactExist[index] === this.props.isContactExist[index]){
          change = true;
        }else{
          change = false;
        }
      }
      if(change){
      this.setState({
        searchPageEnable: true,
        showUserField: false
      })
    }else{
      this.setState({
        searchPageEnable: false,
        showUserField: true
      })
    }
    }
  }
    constructor(props) {
        super(props);
        this.inputChecked = React.createRef();
        this.state = {
            userName: '',
            password: '',
            isContactValid: false,
            resetPassword:'',
            confirmPassword: '',
            showUserField: true,
            showLoginInfo: false,
            passwordMismatch: false,
            showSuccessMsg: true,
            showChangedPwdMsg: false,
            showDefaultUserAndPassword: true,
            resetPwdFlow: false,
            searchPageEnable: false,
            resetFieldEnable: false,
            selectedCmp: ls.get('list')||[],
            Chked: false
        };
    }
    onCheckedCmp = (value, index) => {
      const {selectedCmp} = this.state;
      let tempArr = [...selectedCmp];
      tempArr.push(value.key);
      this.setState({
        selectedCmp: tempArr
      });
      ls.set('list', selectedCmp);
    }
    onClearInput = (e) => {
      this.setState({
        userName: '',
        password: '',
        showSuccessMsg: false
      })
    }
    onChangeValue = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    goBack = (e) => {
      this.setState({
        showUserField: true,
        showDefaultUserAndPassword: true,
        showChangedPwdMsg: false,
        resetFieldEnable: false,
        isContactValid: true,
        passwordMismatch: false
      })
    }
    submitUserName = (e) => {
      e.preventDefault();
      const userCredential = {
        username: this.state.userName,
        password: this.state.password
      }
      this.props.verifyCredential(userCredential);
    }
    onResetPassword = (e) => {
      this.setState({
        showUserField: false,
        resetFieldEnable: true,
        resetPassword: '',
        confirmPassword: '',
        userName: '',
        password: '',
        showDefaultUserAndPassword: false
      })
    }
    onMismatchPassword = (e) => {
      if(this.state.resetPassword == this.state.confirmPassword) {
        this.setState({
          passwordMismatch: false
        })
      } else {
        this.setState({
          passwordMismatch: true
        })
      }
    }
    onSubmitResetPassword = (e) => {
      const newResettedPassword = {
        password: this.state.resetPassword
      }
      
      this.setState({
        showUserField: true,
        userName: '',
        password: '',
        showSuccessMsg: false,
        showChangedPwdMsg: true,
        showDefaultUserAndPassword: false,
        resetFieldEnable: false,
        searchPageEnable: false,
        resetPwdFlow: true
      })
      this.props.resetPassword(newResettedPassword);
     // this.props.history.push('/');
    }
    onLogout = (e) => {
      this.setState({
        searchPageEnable: false,
        showUserField: true,
        userName: '',
        password: ''
      })
    }
  render() {
    const {showUserField, userName, password, showLoginInfo, resetUserName, resetPassword, confirmPassword, passwordMismatch}  = this.state;
    
    return (
      <div>
        <div className="col-sm-12 col-md-12 col-lg-12 mt30">
          <div className="col-sm-4 col-md-4 col-lg-4"></div>
          {showUserField 
            &&
            <div className="col-sm-4 col-md-4 col-lg-4">
              {
                this.state.showDefaultUserAndPassword && 
                <div className="mb30 alert alert-warning">
                    <p>Default Username: <strong>alok</strong></p>
                    <p>Default Password: <strong>alok</strong></p>
                </div>
              }
              {
                (!this.state.isContactValid && showLoginInfo) && 
                <div className="mt20 mb30 errorMsg">
                    Username/Password is wrong
                </div>
              }
              {
                this.state.showChangedPwdMsg && 
                <div className="mt20 mb30 passwordChgMsg">
                    Password Changed. Please use new Password to login. Keep username as "alok"
                </div>
              }
              <label htmlFor="userName">UserName</label>
              <input className = "form-control" 
                   type="text" 
                   name="userName" 
                   id="userName"
                   autoComplete = "off"
                   value = {this.state.userName}
                   onChange={this.onChangeValue}
                   autoFocus="on"
                    />
            <label htmlFor="password" className="mt20">Password</label>
            <input className="form-control" 
                   type="password" 
                   name="password" 
                   id="password"
                   autoComplete="off"
                   value = {this.state.password}
                   onChange={this.onChangeValue}
                    />
            <button
                className="btn btn-primary mt30 text-center" 
                title="Submit"
                onClick = {this.submitUserName}
                disabled={!(userName && password)}>
                Submit
            </button>
            <button 
              className="btn btn-danger mt30 pull-right" 
              title="Clear"
              onClick = {this.onClearInput}>
              Clear
           </button>
            <button 
                className="btn btn-info pull-left mt30"
                onClick={this.onResetPassword}
                title="Reset Password"
                >
                Reset Password
           </button>
            </div>
           }
          {this.state.resetFieldEnable && 
            <div className="col-sm-4 col-md-4 col-lg-4">
            {passwordMismatch  && <p className="alert alert-danger">Password does not match.</p>}
            <button className="btn btn-warning pull-left mb40" 
                onClick={this.goBack}
                title="Go Back to Main Page"> 
                  Go Back 
                </button>
            <label htmlFor="resetPassword" className="mt20">New Password</label>
            <input className="form-control" 
                   type="password" 
                   name="resetPassword" 
                   id="resetPassword"
                   autoComplete="off"
                   value = {this.state.resetPassword}
                   onChange={this.onChangeValue}
                   onKeyUp ={this.onMismatchPassword}
                   autoFocus="on"
              />
            <label htmlFor="confirmPassword" className="mt20">Confirm Password</label>
            <input className="form-control" 
                   type="password" 
                   name="confirmPassword" 
                   id="confirmPassword"
                   autoComplete="off"
                   value = {this.state.confirmPassword}
                   onChange={this.onChangeValue}
                   onKeyUp ={this.onMismatchPassword}
              />
              <button 
                className="btn btn-info mt30"
                onClick={this.onSubmitResetPassword}
                title="Submit Reset Password"
                disabled={(!resetPassword || !confirmPassword || passwordMismatch)}>
                Submit Reset Password
              </button>
            </div>}
          <div className="col-sm-4 col-md-4 col-lg-4"></div>
          {this.state.searchPageEnable && 
            <div style = {{ marginTop: 40, marginLeft: 50 }}>
        <button  
            className="btn btn-primary pull-right mr40 mt20 clearfix" 
            title="Logout"
            onClick = {this.onLogout}>
            Logout
      </button>
        <div className="col-sm-3 col-md-3 col-lg-3"></div>
        <div className="mt20 mb30 successMsg clearfix col-sm-6 col-md-6 col-lg-6">
            Login Successful
        </div>
        <div className="pl40 selectedCompany clearfix col-md-6 col-lg-6 col-sm-6 col-sm-offset-3 col-md-offset-3 col-lg-offet-3">
            <p> You have Selected &nbsp;:{this.state.selectedCmp && this.state.selectedCmp.length} Company</p>
          { this.state.selectedCmp && this.state.selectedCmp.map((cmp, index)=>{
            return(
              <ul key = {index}>
                <li>{cmp}</li>
              </ul>
            )
          })}
        </div>
        <div className="col-sm-3 col-md-3 col-lg-3"></div>
        <div className="clearfix"></div>
        <div className="col-sm-3 col-md-3 col-lg-3"></div>
        <h1 className="alert alert-info col-sm-6 col-md-6 col-lg-6">Welcome Alok</h1>
        <div className="col-sm-3 col-md-3 col-lg-3"></div>
        <div className="clearfix"></div>
        <Autocomplete
          className="clearfix"  
          value={ this.state.value }
          inputProps={{ id: 'states-autocomplete' }}
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          items={ getStocks() }
          getItemValue={ item => item.name }
          shouldItemRender={ matchStocks }
          onChange={(event, value) => this.setState({ value }) }
          onSelect={ value => this.setState({ value }) }
          renderMenu={ children => (
            <div className = "menu pull-left show">
            
              {children.map((data, index)=>{
                return(
                  <div key={index}>
                    <input type="checkbox" id="cmp" value={data} id={index}
                    onChange={this.onCheckedCmp.bind(this, data, index)} /> 
                    <span> { data }</span>
                 </div> 
                )
                }
                )
              }
            </div>
          )}
          renderItem={ (item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={ item.abbr } >
              { item.name }
            </div>
          )}
        />
        <small className="text-muted"><i>Please search the Company name by putting initial letter of company name or tabbing into search box.</i></small>
       </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  contacts: state.contact.contacts,
  isContactExist: state.contact.uniqueContact
})
export default connect(mapStateToProps, {getContacts, verifyCredential, resetPassword})(Login);
