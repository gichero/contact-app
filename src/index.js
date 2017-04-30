import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phone: '',
      email: '',
      type: '',
      contactArray: []
    };
  }
  componentDidMount() {
    $.get('http://localhost:5000/api/contacts')
      .then(contacts => {
        this.setState({
          contactArray: contacts
        });
      });
  }
  changeState(stateName, event) {
    let textInput = event.target;
    this.setState({
      [stateName]: textInput.value
    });
  }
  submitForm(event) {
    event.preventDefault();
    let contact = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      type: this.state.type
    };
    $.ajax({
      method: 'POST',
      url: 'http://localhost:5000/api/contacts',
      data: JSON.stringify(contact),
      contentType: 'application/json'
    })
    .then(contact => {
      this.state.contactArray.push(contact);
      this.setState({
        contactArray: this.state.contactArray,
        name: '',
        phone: '',
        email: '',
        type: ''
      });
    })
    .catch(() => {
      alert('Oops!');
    });
  }
  deleteContact(id) {
    $.ajax({
      method: 'DELETE',
      url: `http://localhost:5000/api/contact/${id}`
    })
    .then(() => {
      let newArray = this.state.contactArray
        .filter(function(contact) {
          return contact.id !== id;
        });
      // Fancy syntax
      // let newArray = this.state.contactArray.filter(
      //   contact => contact.id !== id
      // )
      this.setState({
        contactArray: newArray
      });
    })
    .catch(() => {
      alert('Oops!');
    });

  }
  render() {
    return (
      <div className="contact-list">
        <form onSubmit={event => this.submitForm(event)}>
          <h3>Add Contact</h3>
          <TextInput
            label="Name" value={this.state.name}
            onChange={event =>
              this.changeState('name', event)}/>
          <TextInput
            label="Phone" value={this.state.phone}
            onChange={event =>
              this.changeState('phone', event)}/>
          <TextInput
            label="Email" value={this.state.email}
            onChange={event =>
              this.changeState('email', event)}/>
          <SelectInput
            label="Type" value={this.state.type}
            onChange={event =>
              this.changeState('type', event)}>
            <option value="">Select one</option>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
            <option value="coworker">Coworker</option>
          </SelectInput>

          <button className="btn btn-primary">Add</button>
        </form>
        <h3>Contact List</h3>
        <ul>
          {
            this.state.contactArray.map((contact, idx) =>
              <li key={idx}>
                <h4>{contact.name} - ({contact.type})</h4>
                {contact.phone}, {contact.email}
                <button onClick={() => this.deleteContact(contact.id)}>Delete</button>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

class TextInput extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input className="form-control" type="text"
          value={this.props.value}
          onChange={this.props.onChange}/>
      </div>
    );
  }
}

class SelectInput extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <select className="form-control"
          value={this.props.value}
          onChange={this.props.onChange}>
          {this.props.children}
        </select>
      </div>
    );
  }
}

ReactDOM.render(
  <ContactList/>,
  document.getElementById('root')
);
