import React from 'react'
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import {Link} from 'react-router-dom';





const SidebarExampleVisible = (props) => (
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
        <Icon name='home' />
        Home
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
      <Menu.Item  style={{"margin":"5em 0"}} >
        <Icon name='plus' />
        Add
      </Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic style={{"padding":"2em 12em"}}>
        {props.children}
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)

export default SidebarExampleVisible;