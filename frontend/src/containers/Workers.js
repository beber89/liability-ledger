import React from "react";
import SidebarExampleVisible from '../components/SideBarExampleVisible';
import { Item, Label, Button, Icon, Input } from 'semantic-ui-react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addWorker, getWorkers } from "../store/workers";





class WorkerspageLayout extends React.Component {

  init = (address) => {
    
    // TODO: validate address is proper format
    // TODO: catch errors: 
    this.props.addWorker({
      wallet: this.props.wallet,
      workerId: address.slice(0,2) === "0x"? address:"0x"+address,
    });
  }

  showWorkers = () => {
    this.props.getWorkers({
      wallet: this.props.wallet
  });
};



  render() {
  var address = '';
  console.log(this.props.data);
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
    {
      this.props.data.map((value, index) => 
        (
          <Item>
          <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
    
          <Item.Content>
            <Item.Header as='a'>Ali Fahmy</Item.Header>
            <Item.Meta>
              <span className='cinema'>{value.role}</span>
            </Item.Meta>
            <Item.Description>Description</Item.Description>
            <Item.Extra>
              <Label icon='globe'>{value.address}</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
        )
      )
    }
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
    wallet: state.auth.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addWorker: ({wallet, workerId})=>dispatch(addWorker({wallet, workerId})),
    getWorkers: ({wallet}) => dispatch(getWorkers({wallet})),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkerspageLayout)
);