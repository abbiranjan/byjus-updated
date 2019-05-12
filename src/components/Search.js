import React, { Component } from 'react';
import Autocomplete from  'react-autocomplete';
import { getStocks, matchStocks } from '../json/data';
import '../App.css';
import {Link} from 'react-router-dom';

class App extends Component {
  state = { value: '' };
  onChecked = (id) => {
    alert("alok");
  }
  render() {
    
    return (
      <div style = {{ marginTop: 40, marginLeft: 50 }}>
      <Link to="/" 
            className="btn btn-primary pull-right mr40 mt20 clearfix" 
            title="Logout">
            Logout
    </Link>
        <div className="col-sm-3 col-md-3 col-lg-3"></div>
        <div className="mt20 mb30 successMsg clearfix col-sm-6 col-md-6 col-lg-6">
            Login Successful
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
            <div className = "menu">
              {children.map((index)=>{
                return(
                 <span><input type="checkbox" onChange={this.onChecked} /> { children }</span> 
                )
                }
                )
              }
              
            </div>
          )}
          renderItem={ (item, isHighlighted) => (
            // <input type="checkbox" />
            <div
            
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={ item.abbr } >
              { item.name }
            </div>
          )}
        />
        <small className="text-muted"><i>Please search the Company name</i></small>
      </div>
      );
    }
  }

export default App;