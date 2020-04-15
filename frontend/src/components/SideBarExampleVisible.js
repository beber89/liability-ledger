import React from 'react'
import { Icon, Menu, Segment, Sidebar, Button, Modal, Header, Input } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import deployer from '../utils/deployer';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setKeys } from "../store/auth";




class SidebarExampleVisible extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  handleSubmit = (public_key, private_key) => {
    //TODO: Redux auth values for public_key and private_key
    public_key = public_key.slice(0,2) === "0x"? public_key.slice(2):public_key;
    private_key = private_key.slice(0,2) === "0x"? private_key.slice(2):private_key
    this.props.setKeys({publicKey: public_key, privateKey: private_key});
    this.setState({open:false});
  };
  render() {
    var public_key="";
    var private_key="";

    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          vertical
          visible
          width='thin'
        >
          <Menu.Item as={Link} to="/">
            <Icon name='key' onClick={() => this.setState({open: true})}/>
            Key
          </Menu.Item>
          <Menu.Item as={Link} to="/workers">
            <Icon name='users' />
            People
          </Menu.Item>
          <Menu.Item as={Link} to="/">
            <Icon name='camera' />
            Inventory
          </Menu.Item>
          <Menu.Item as={Link} to="/">
            <Icon name='file alternate' />
            Resources
          </Menu.Item>
          <Menu.Item  style={{"margin":"5em 0"}}  onClick={() => deployer(this.props.publicKey, this.props.privateKey)}>
            <Icon name='chevron circle right' />
            Deploy
          </Menu.Item>
        </Sidebar>
    
        <Sidebar.Pusher>
          <Segment basic style={{"padding":"2em 12em"}}>
            {this.props.children}
            <Modal open={this.state.open} closeIcon onClose={()=>this.setState({open:false})}>
              <Header icon='archive' content='Enter your wallet credentials' />
              <Modal.Content>
                <Segment.Group vertical="true">
                  <Segment>
                    <Input iconPosition='left' placeholder='Public Key' 
                    action onChange={(_, widget) => public_key = widget.value}>
                      <input/>
                      <Icon name="users"/>
                    </Input>
                  </Segment>
                  <Segment>
                    <Input iconPosition='left' placeholder='Private Key' 
                    action onChange={(_, widget) => private_key = widget.value}>
                      <input/>
                      <Icon name="key"/>
                    </Input>
                  </Segment>
                </Segment.Group>
              </Modal.Content>
              <Modal.Actions>
                <Button color='green' type='submit' onClick={()=>this.handleSubmit(public_key, private_key)}>
                    <Icon name="checkmark"/> submit
                </Button>
                <Button color='red' onClick={() => this.setState({open:false})}>
                  <Icon name='remove' /> cancel
                </Button>
              </Modal.Actions>
            </Modal>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    publicKey: state.auth.data.publicKey ,
    privateKey: state.auth.data.privateKey,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setKeys: ({publicKey, privateKey})=>dispatch(setKeys({publicKey, privateKey})),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SidebarExampleVisible)
);