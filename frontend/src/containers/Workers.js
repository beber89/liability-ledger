import React from "react";
import SidebarExampleVisible from '../components/SideBarExampleVisible';
import { Item, Label, Button, Icon } from 'semantic-ui-react'

const WorkerspageLayout = () => (
  <SidebarExampleVisible>
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
  </SidebarExampleVisible>
)

export default WorkerspageLayout
