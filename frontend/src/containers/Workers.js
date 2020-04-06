import React from "react";
import SidebarExampleVisible from '../components/SideBarExampleVisible';
import { Item, Label, Button, Icon, Input } from 'semantic-ui-react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addWorker } from "../store/workers";


const init = (props, address) => {
  const accounts = ["5a0b622d28688f8c3d42952ed3e17d50f5b536a6", 
  "3a71227d135eb0d94541ac546d249ec3c5efc152",
  "961b6e6d0d8ab8da3dc34f6b4c15865372d0c17f"];
  
  // TODO: validate address is proper format
  // TODO: catch errors: 
  //// invalid address (arg="toWorker", coderType="address", value="0x0x3a71227d135eb0d94541ac546d249ec3c5efc152", version=4.0.46)
  props.addWorker("0x"+address);
};

const WorkerspageLayout = (props) => {
  var address = '';
  return (<SidebarExampleVisible>
    <Input iconPosition='left' placeholder='address' action onChange={(_, widget) => address = widget.value}>
      <input/>
      <Icon name="users"/>
      <Button type='submit' onClick={()=>init(props, address)}>
        <Icon name="plus"/>
      </Button>
    </Input>
  <Item.Group divided>
    <Item>
      <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Ali Fahmy</Item.Header>
        <Item.Meta>
          <span className='cinema'>Tech</span>
        </Item.Meta>
        <Item.Description>Description</Item.Description>
        <Item.Extra>
          <Label>eth adress</Label>
          <Label icon='globe' content='Additional Languages' />
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>My Neighbor Totoro</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC Cinema</span>
        </Item.Meta>
        <Item.Description>Description</Item.Description>
        <Item.Extra>
          <Button primary floated='right'>
            Buy tickets
            <Icon name='right chevron' />
          </Button>
          <Label>Limited</Label>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Watchmen</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC</span>
        </Item.Meta>
        <Item.Description>Description</Item.Description>
        <Item.Extra>
          <Button primary floated='right'>
            Buy tickets
            <Icon name='right chevron' />
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
  </SidebarExampleVisible>)
};

const mapStateToProps = state => {
  return {
    loading: state.workers.loading ,
    error: state.workers.error,
    data: state.workers.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addWorker: (publicId)=>dispatch(addWorker(publicId)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkerspageLayout)
);