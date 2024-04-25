// import React from 'react';
// import Form from 'react-bootstrap/Form';

// class BrandLineItem extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = { enable: props.item.enable }
//         this.inputHandler = this.inputHandler.bind(this)
//     }

//     inputHandler(e) {
//         e.preventDefault();
//         var newVal = !this.state.enable
//         this.setState({ enable: newVal })

//         this.props.onSelect({ id: this.props.item.id, value: newVal });
//     }


//     render() {
//         return (<tr>
//             <td>{this.props.item.id}</td>
//             <td>{this.props.item.title}</td>
//             <td>
//                 <Form>
//                     <Form.Check
//                         type="switch"
//                         id={this.props.item.id_switch}
//                         onInput={this.inputHandler}
//                         value={this.state.enable}
//                         checked={this.state.enable}
//                     />
//                 </Form>
//             </td>
//         </tr>)
//     }
// }
// export default BrandLineItem

