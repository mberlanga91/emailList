import React, { Component } from 'react';
import Checkbox from './Checkbox';
import './App.css';
import logo from './logo.svg';
import Request from 'superagent';

var items = [ ];
var i;
var users=[];
var fullnames = [ ];
var emails = [ ];
var cont = 0;

class App extends Component {

  constructor(props) {
        super(props);
        
        this.state = {items: [],fullnames:[],emails:[], isSelected:false,users:[]};
        
    }

  componentWillMount = () => {
    Request.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
      
        for (i=0;i<10;i++){
          this.setState({
          items:items.push(response.body[i].name),
          emails:emails.push(response.body[i].email),
          users:users.push(JSON.stringify(response.body[i]))
          })
        }
       
    })

    
    this.selectedCheckboxes = new Set();
     
    
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
      this.setState({isSelected:false})
      cont=cont-1;
      
    } else {
      this.selectedCheckboxes.add(label);
      this.setState({isSelected: true});
      cont=cont+1;
      
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      
      fullnames.push(checkbox)
      
    }
    this.setState({fullnames:fullnames})
    fullnames=[];
  }


  renderFullNames(){
    return this.state.fullnames.map((fullname)=>{
      return (<div key={fullname}>{fullname}</div>);
    })
  }

  renderSelected(){
    if(cont>0){
      return (<span>{cont} of 10 selected</span>);
    }
    else{
      return(<p><br/></p>)
    }
  }

  createCheckbox = (label,email) => (
    <Checkbox
            label={label}
            email={emails[email]}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )



  createCheckboxes = () => (
    items.map(this.createCheckbox)
  )

  propEmails = () =>(
    emails.map(this.createCheckbox)
  )

  render() {
    
    
     items.sort();

    return (
        <div className="App">
            <div className="AppHeader">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>KSquare Email List</h2>
            </div>

            <div className=" container">
              
              <div>
                {this.renderSelected()}
              </div>
                

              <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    
                        {this.createCheckboxes()}
                      
                    <button className="btn btn-primary margin" type="submit">Confirm</button>
                  </div>
                </div>
              </form>


              
                <div className="list-group">
                  <ul className="list-group">
                    <li className="list-group-item">{this.renderFullNames()}</li>
                  </ul>
                </div>

            </div>
                

        </div>
    );
  }
}

export default App;