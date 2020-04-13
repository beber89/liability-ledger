import React from "react";
import SidebarExampleVisible from '../components/SideBarExampleVisible';
import { Item, Label, Button, Icon, Input } from 'semantic-ui-react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addWorker, getWorkers } from "../store/workers";





class WorkerspageLayout extends React.Component {

  init = (address) => {
    // console.log(this.props.publicKey);
    
    // TODO: validate address is proper format
    // TODO: catch errors: 
    //// invalid address (arg="toWorker", coderType="address", value="0x0x3a71227d135eb0d94541ac546d249ec3c5efc152", version=4.0.46)
    // console.log(address);
    this.props.addWorker({
      publicKey: this.props.publicKey,
      privateKey: this.props.privateKey,
      workerId: "0x"+address,
    });
  }

  showWorkers = () => {
    console.log("contract is ")
    console.log(this.props.contract);
    this.props.getWorkers({
    publicKey: this.props.publicKey,
    privateKey: this.props.privateKey,
    contract: this.props.contract,
    contractAddress: this.props.contractAddress,
  });
};



  render() {
  var address = '';
  return (<SidebarExampleVisible>
    <Input iconPosition='left' placeholder='address' action onChange={(_, widget) => address = widget.value}>
      <input/>
      <Icon name="users"/>
      <Button type='submit' onClick={()=>this.init(address)}>
        <Icon name="plus"/>
      </Button>
      <Button  onClick={()=>this.showWorkers()}>
        <Icon name="users"/>
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
  </SidebarExampleVisible>);
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    loading: state.workers.loading ,
    error: state.workers.error,
    data: state.workers.data,
    publicKey: state.auth.data.publicKey,
    privateKey: state.auth.data.privateKey,
    contract: state.auth.data.contract,
    contractAddress: state.auth.data.contractAddress
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addWorker: ({publicKey, privateKey, workerId})=>dispatch(addWorker({publicKey, privateKey, workerId})),
    getWorkers: ({publicKey, privateKey, contract, contractAddress}) => dispatch(getWorkers({publicKey, privateKey, contract, contractAddress})),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkerspageLayout)
);