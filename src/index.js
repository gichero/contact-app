import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';

class MyContacts extends React.Component {
    constructor(){
        super();
        this.state = {
            contact:[]

        };
    }

    addName(event) {
         this.setState({
             name: event.target.value
        })
    }

    addPhone(event) {
         this.setState({
             phone: event.target.value
        })
    }

    addEmail(event) {
         this.setState({
             email: event.target.value
        })
    }

    addType(event) {
         this.setState({
             type: event.target.value
        })
    }

    submit(){
        let tempArr = this.state.contact;
        tempArr.push({name: this.state.name,
                    phone: this.state.phone,
                    email: this.state.email,
                    type: this.state.type})

        this.setState({
            contact: tempArr
        })
    }


    render() {


        return(
            <div className= "contacts">

                <label>Name </label><br/>
                <input type='text' value={this.state.name}
                onChange={event => this.addName(event)} /><br/>
                <label>Phone </label><br/>
                <input type='text' value={this.state.phone}
                onChange={event => this.addPhone(event)} /><br/>
                <label>Email </label><br/>
                <input type='text' value={this.state.email}
                onChange={event => this.addEmail(event)} /><br/>

                <label>Type </label><br/>

                <select className = 'type' value={this.state.type}
                onChange={event => this.addType(event)}>
                <option value='co-worker'>Co-worker</option>
                <option value='ceo'>CEO</option>
                <option value='wife'>Spouse</option>
                <option value='son'>Son</option>
                <option value='son'>Neighbour</option>
                <option value='son'>Friend</option>
                </select><br/>

                <button onClick={() => this.submit()}>Submit</button>

                <ul>
                {this.state.contact.map((item, index))}
                {this.state.contact.map((item)=> <li>{item.name}</li>)}
                {this.state.contact.map((item)=> <li>{item.phone}</li>)}
                {this.state.contact.map((item)=> <li>{item.email}</li>)}
                {this.state.contact.map((item)=> <li>{item.type}</li>)}
                </ul>

            </div>
        );
    }

}

ReactDOM.render(<MyContacts/>, document.getElementById('root'));
