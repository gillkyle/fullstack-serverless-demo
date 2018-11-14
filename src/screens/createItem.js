import React, { Component } from "react";
import { Form, Modal, Button, Container } from "semantic-ui-react";
import Amplify, { API } from "aws-amplify";
const uuidv1 = require("uuid/v1");
let apiName = "ServerlessReactExampleCRUD";
let path = "/ServerlessReactExample";

class CreateItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    console.log(this);
    let apiName = "ServerlessReactExampleCRUD";
    let path = "/ServerlessReactExample";
    let newItem = {
      body: {
        ID: uuidv1(),
        asset_id: this.state.asset_id,
        location: this.state.location,
        org_tag: this.state.org_tag,
        manufacturer: this.state.manufacturer,
        part_num: this.state.part_num,
        date_implemented: this.state.date_implemented,
        description: this.state.description,
        maintenance_notes: this.state.maintenance_notes
      }
    };
    API.post(apiName, path, newItem)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
    event.preventDefault();
    this.props.getItems();
    this.handleClose();
  }

  handleOpen = () =>
    this.setState({
      modalOpen: true
    });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const options = [
      { key: "Acer", text: "Acer", value: "Acer" },
      { key: "Apple", text: "Apple", value: "Apple" },
      { key: "Asus", text: "Asus", value: "Asus" },
      { key: "Cisco", text: "Cisco", value: "Cisco" },
      { key: "D-Link", text: "D-Link", value: "D-Link" },
      { key: "Dell", text: "Dell", value: "Dell" },
      { key: "HP", text: "HP", value: "HP" },
      { key: "Lenovo", text: "Lenovo", value: "Lenovo" },
      { key: "Toshiba", text: "Toshiba", value: "Toshiba" }
    ];
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>+ Add Item</Button>}
        closeIcon={true}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        style={{
          marginTop: 0
        }}
      >
        <Modal.Header>Add an Item</Modal.Header>
        <Modal.Content scrolling={true}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group unstackable widths={2}>
              <Form.Input
                name="asset_id"
                label="Asset ID"
                placeholder="Enter Asset ID..."
                onChange={this.handleChange}
                value={this.state.asset_id}
              />
              <Form.Input
                name="location"
                label="Current Location"
                placeholder="Enter Location..."
                onChange={this.handleChange}
                value={this.state.location}
              />
              <Form.Input
                name="org_tag"
                label="Organizational Tag"
                placeholder="Enter Org tag..."
                onChange={this.handleChange}
                value={this.state.org_tag}
              />
            </Form.Group>
            <Form.Group unstackable widths={2}>
              <Form.Select
                name="manufacturer"
                label="Manufacturer"
                placeholder="Enter manufacturer..."
                options={options}
                onChange={this.handleChange}
                value={this.state.manufacturer}
              />
              <Form.Input
                name="part_num"
                label="Manufacturer Part Number"
                placeholder="Enter manufacturer part number..."
                onChange={this.handleChange}
                value={this.state.part_num}
              />
              <Form.Input
                name="date_implemented"
                label="Date Implemented"
                placeholder="Enter implementation date..."
                onChange={this.handleChange}
                value={this.state.date_implemented}
              />
            </Form.Group>
            <Form.TextArea
              name="description"
              label="Description"
              placeholder="Enter description..."
              onChange={this.handleChange}
              value={this.state.description}
            />
            <Form.TextArea
              name="maintenance_notes"
              label="Maintenance Notes"
              placeholder="Enter maintenance notes..."
              onChange={this.handleChange}
              value={this.state.maintenance_notes}
            />

            <Form.Button type="submit">Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CreateItemModal;
