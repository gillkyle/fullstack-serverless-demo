import React, { Component } from "react";
import { Container, Card, Menu, Table } from "semantic-ui-react";
import Amplify, { API } from "aws-amplify";
import _ from "lodash";
import EditItemModal from "./editItem.js";
import CreateItemModal from "./createItem";

let apiName = "ServerlessReactExampleCRUD";
let path = "/ServerlessReactExample";

class ItemDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { itemData: {}, item: {}, editedItem: {}, modalOpen: false };
    this.getItems = this.getItems.bind(this);
  }

  getItems() {
    API.get(apiName, path).then(response => {
      // console.log(response);
      this.setState({
        itemData: response.data
      });
    });
  }

  handleChange = (event, name, value) => {
    console.log("handle change");
    console.log(name);
    console.log(event.target);
    console.log(event.target.selected);
    console.log(event.target.value);
    this.setState({
      editedItem: { ...this.state.editedItem, [name]: event.target.value }
    });
  };

  handleDropdownChange = (event, propertyName, value) => {
    console.log(value);
    this.setState({
      editedItem: { ...this.state.editedItem, [propertyName]: value }
    });
  };

  handleSubmit = event => {
    console.log("handle submit");
    let apiName = "ServerlessReactExampleCRUD";
    let path = "/ServerlessReactExample";
    console.log(this.state);
    console.log({
      ...this.state.editedItem
    });

    let editItem = {
      body: {
        ...this.state.editedItem
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
    this.getItems();
    alert("Item saved!");
  };

  async getItem(id) {
    let single_path = "/ServerlessReactExample/" + id;
    // console.log(single_path);
    this.setState({ loading: true });
    await API.get(apiName, single_path)
      .then(response => {
        console.log(response);
        this.setState({
          item: response[0],
          editedItem: response[0],
          loading: false
        });
        return response[0];
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getItems();
  }

  render() {
    const itemData = this.state.itemData;
    return (
      <div>
        <CreateItemModal getItems={this.getItems} />

        <Container style={{ padding: 10 }}>
          <Table basic="very" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Asset ID</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Organization Tag</Table.HeaderCell>
                <Table.HeaderCell>Manufacturer</Table.HeaderCell>
                <Table.HeaderCell>Part Number</Table.HeaderCell>
                <Table.HeaderCell>Date Implemented</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {_.map(
                itemData,
                ({
                  ID,
                  asset_id,
                  description,
                  location,
                  org_tag,
                  manufacturer,
                  part_num,
                  date_implemented
                }) => (
                  <Table.Row onClick={() => this.getItem(ID)}>
                    <Table.Cell>{asset_id}</Table.Cell>
                    <Table.Cell>{description}</Table.Cell>
                    <Table.Cell>{location}</Table.Cell>
                    <Table.Cell>{org_tag}</Table.Cell>
                    <Table.Cell>{manufacturer}</Table.Cell>
                    <Table.Cell>{part_num}</Table.Cell>
                    <Table.Cell>{date_implemented}</Table.Cell>
                    <Table.Cell>
                      <EditItemModal
                        loading={this.state.loading}
                        item={this.state.item}
                        getItems={this.getItems}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleDropdownChange={this.handleDropdownChange}
                      />
                    </Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>
            {/* {_.map(itemData, ({ ID, asset_id, description, manufacturer }) => (
              <Card onClick={() => this.getItem(ID)}>
                <Card.Content>
                  <Card.Header selectable>{asset_id}</Card.Header>
                  <Card.Meta>{manufacturer}</Card.Meta>
                  <Card.Description>{description}</Card.Description>
                </Card.Content>
                <EditItemModal
                  loading={this.state.loading}
                  item={this.state.item}
                  getItems={this.getItems}
                />
              </Card>
            ))} */}
          </Table>
        </Container>
      </div>
    );
  }
}

export default ItemDashboard;
