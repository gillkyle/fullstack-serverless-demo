import React, { Component } from "react";
import { Form, Modal, Button, Container, Icon } from "semantic-ui-react";
import Amplify, { API } from "aws-amplify";
import _ from "lodash";
const uuidv1 = require("uuid/v1");

class EditItemModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      item: props.item,
      ID: this.props.item.ID,
      asset_id: props.item.asset_id,
      location: props.item.location,
      org_tag: props.item.org_tag,
      manufacturer: props.item.manufacturer,
      part_num: props.item.part_num,
      date_implemented: props.item.date_implemented,
      description: props.item.description,
      maintenance_notes: props.item.maintenance_notes
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const newState = { ...nextProps };
  //   return newState;
  // }

  componentDidMount() {
    console.log(this.props);
  }

  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    let apiName = "ServerlessReactExampleCRUD";
    let path = "/ServerlessReactExample";
    let editItem = {
      body: {
        ID: this.props.item.ID,
        asset_id: this.state.asset_id || this.props.asset_id,
        location: this.state.location || this.props.location,
        org_tag: this.state.org_tag || this.props.org_tag,
        manufacturer: this.state.manufacturer || this.props.manufacturer,
        part_num: this.state.part_num || this.props.part_num,
        date_implemented:
          this.state.date_implemented || this.props.date_implemented,
        description: this.state.description || this.props.description,
        maintenance_notes:
          this.state.maintenance_notes || this.props.maintenance_notes
      }
    };
    API.put(apiName, path, editItem)
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

  deleteItem() {
    let apiName = "ServerlessReactExampleCRUD";
    let path = "/ServerlessReactExample/object/" + this.props.item.ID;
    API.del(apiName, path)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
    this.props.getItems();
    this.handleClose();
  }

  handleOpen = () =>
    console.log(this.props) ||
    this.setState({
      modalOpen: true,
      itemName: "",
      itemPrice: "",
      item_description: ""
    });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    // console.log(this.state);
    const {
      item: { asset_id }
    } = this.state;
    const { loading } = this.props;
    // const { item } = this.props;
    // console.log(item.asset_id);
    const defaultnum = 1;
    return (
      <Container style={{ padding: 10 }}>
        <Modal
          trigger={
            <Button icon onClick={this.handleOpen}>
              <Icon name="edit" />
            </Button>
          }
          open={this.state.modalOpen}
          closeIcon
          onClose={this.handleClose}
          style={{
            marginTop: 0
          }}
        >
          <Modal.Header>Edit</Modal.Header>
          {loading ? (
            <div style={{ padding: 30 }}>Loading...</div>
          ) : (
            <Modal.Content scrolling={true}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group unstackable widths={2}>
                  <Form.Input
                    name="asset_id"
                    label="Asset ID"
                    placeholder="Enter Asset ID..."
                    onChange={this.handleChange}
                    value={this.state.asset_id}
                    defaultValue={this.props.item.asset_id}
                  />
                  <Form.Input
                    name="location"
                    label="Current Location"
                    placeholder="Enter Current Location..."
                    onChange={this.handleChange}
                    value={this.state.location}
                    defaultValue={this.props.item.location}
                  />
                  <Form.Input
                    name="org_tag"
                    label="Organizational Tag"
                    placeholder="Enter Organizational Tag..."
                    onChange={this.handleChange}
                    value={this.state.org_tag}
                    defaultValue={this.props.item.org_tag}
                  />
                </Form.Group>
                <Form.Group unstackable widths={2}>
                  <Form.Input
                    name="manufacturer"
                    label="Manufacturer"
                    placeholder="Enter Manufacturer..."
                    onChange={this.handleChange}
                    value={this.state.manufacturer}
                    defaultValue={this.props.item.manufacturer}
                  />
                  <Form.Input
                    name="part_num"
                    label="Manufacturer Part Number"
                    placeholder="Enter Manufacturer Part Number..."
                    onChange={this.handleChange}
                    value={this.state.part_num}
                    defaultValue={this.props.item.part_num}
                  />
                  <Form.Input
                    name="date_implemented"
                    label="Date Implemented"
                    placeholder="Enter Date Implemented..."
                    onChange={this.handleChange}
                    value={this.state.date_implemented}
                    defaultValue={this.props.item.date_implemented}
                  />
                </Form.Group>
                <Form.TextArea
                  name="description"
                  label="Description"
                  placeholder="Enter Description..."
                  onChange={this.handleChange}
                  value={this.state.description}
                  defaultValue={this.props.item.description}
                />
                <Form.TextArea
                  name="maintenance_notes"
                  label="Maintenance Notes"
                  placeholder="Enter Maintenance Notes..."
                  onChange={this.handleChange}
                  value={this.state.maintenance_notes}
                  defaultValue={this.props.item.maintenance_notes}
                />
                <Form.Button type="submit">Submit</Form.Button>
              </Form>
            </Modal.Content>
          )}
          <Modal.Actions>
            <Button icon labelPosition="left" onClick={this.deleteItem}>
              <Icon name="delete" />
              Delete Item
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

export default EditItemModal;
