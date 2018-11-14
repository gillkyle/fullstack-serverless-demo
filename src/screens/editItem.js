import React, { Component } from "react";
import { Form, Modal, Button, Container, Icon } from "semantic-ui-react";
import Amplify, { API } from "aws-amplify";
import _ from "lodash";
const uuidv1 = require("uuid/v1");

class EditItemModal extends Component {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    console.log(this.props);
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
    const { loading } = this.props;
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
              <Form onSubmit={e => this.props.handleSubmit(e)}>
                <Form.Group unstackable widths={2}>
                  <Form.Input
                    name="asset_id"
                    label="Asset ID"
                    placeholder="Enter Asset ID..."
                    onChange={e =>
                      this.props.handleChange(
                        e,
                        "asset_id",
                        this.state.item.asset_id
                      )
                    }
                    value={this.state.item.asset_id}
                    defaultValue={this.props.item.asset_id}
                  />
                  <Form.Input
                    name="location"
                    label="Current Location"
                    placeholder="Enter Current Location..."
                    onChange={e =>
                      this.props.handleChange(
                        e,
                        "location",
                        this.state.item.location
                      )
                    }
                    value={this.state.item.location}
                    defaultValue={this.props.item.location}
                  />
                  <Form.Input
                    name="org_tag"
                    label="Organizational Tag"
                    placeholder="Enter Organizational Tag..."
                    onChange={e =>
                      this.props.handleChange(
                        e,
                        "org_tag",
                        this.state.item.org_tag
                      )
                    }
                    value={this.state.item.org_tag}
                    defaultValue={this.props.item.org_tag}
                  />
                </Form.Group>
                <Form.Group unstackable widths={2}>
                  <Form.Select
                    name="manufacturer"
                    label="Manufacturer"
                    placeholder="Enter Manufacturer..."
                    onChange={(e, { value }) =>
                      this.props.handleDropdownChange(e, "manufacturer", value)
                    }
                    options={options}
                    value={this.state.item.manufacturer}
                    defaultValue={this.props.item.manufacturer}
                  />
                  <Form.Input
                    name="part_num"
                    label="Manufacturer Part Number"
                    placeholder="Enter Manufacturer Part Number..."
                    onChange={e =>
                      this.props.handleChange(
                        e,
                        "part_num",
                        this.state.item.part_num
                      )
                    }
                    value={this.state.item.part_num}
                    defaultValue={this.props.item.part_num}
                  />
                  <Form.Input
                    name="date_implemented"
                    label="Date Implemented"
                    placeholder="Enter Date Implemented..."
                    onChange={e =>
                      this.props.handleChange(
                        e,
                        "date_implemented",
                        this.state.item.date_implemented
                      )
                    }
                    value={this.state.item.date_implemented}
                    defaultValue={this.props.item.date_implemented}
                  />
                </Form.Group>
                <Form.TextArea
                  name="description"
                  label="Description"
                  placeholder="Enter Description..."
                  onChange={e =>
                    this.props.handleChange(
                      e,
                      "description",
                      this.state.item.description
                    )
                  }
                  value={this.state.item.description}
                  defaultValue={this.props.item.description}
                />
                <Form.TextArea
                  name="maintenance_notes"
                  label="Maintenance Notes"
                  placeholder="Enter Maintenance Notes..."
                  onChange={e =>
                    this.props.handleChange(
                      e,
                      "maintenance_notes",
                      this.state.item.maintenance_notes
                    )
                  }
                  value={this.state.item.maintenance_notes}
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
