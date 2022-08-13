import React from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'


async function postData(url = '', data = {}) {
    axios.post(url, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

class CreateDetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', car: '', price: ''};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCarChange = this.handleCarChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleNameChange(event) { this.setState({name: event.target.value}); }
    handleCarChange(event) { this.setState({car: event.target.value}); }
    handlePriceChange(event) { this.setState({price: event.target.value}); }

    validate() {

    }

    handleSubmit(event) {        
        alert('Created detail: ' + this.state.name);
        event.preventDefault();
      
        postData("/add_detail", { name: this.state.name, car: this.state.car, price: this.state.price });
    }
  
    render() {
      return (
        <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={this.handleNameChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Car</Form.Label>
                <Form.Control type="text" placeholder="Enter Car" value={this.state.car} onChange={this.handleCarChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="Enter Price" value={this.state.price} onChange={this.handlePriceChange} />
            </Form.Group>
        </div>
      );
    }
  }




// function CreateDetailForm(props) {
//     this.model = {name: '', car: ''};
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);

  
//     function handleNameChange(event) { this.setState({name: event.target.value}); }
//     function handleCarChange(event) { this.setState({car: event.target.value}); }
//     function handleSubmit(event) {
//       alert('Отправленное имя: ' + this.state.value);
//       event.preventDefault();
//     }
  
//     return (
//         <form onSubmit={this.handleSubmit}>
//             <label>Name:
//                 <input type="text" value={this.state.name} onChange={this.handleNameChange} />
//             </label>
//             <label>Car:
//                 <input type="text" value={this.state.car} onChange={this.handleCarChange} />
//             </label>
//             <input type="submit" value="Create" />
//         </form>
//     );
// }


// // function CreateDetail(props) {
// //     let content = 
// //         <div>
// //             List is empty.
// //         </div>
// //     if (props.users) {
// //         content = props.users.map((user) =>
// //             <div key={user.id}>
// //                 <h3>{user.name}</h3>
// //                 <p>{user.age}</p>
// //             </div>
// //         );
// //     }
// //     return (
// //         <form>
// //             {content}
// //         </form>
// //     );
// // }

export default CreateDetailForm;