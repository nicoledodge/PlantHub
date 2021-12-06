import React, { useEffect, useState } from "react";
// import {Card, Icon} from 'semantic-ui-react';
import { Progress, Button, Checkbox, Icon, Table } from 'semantic-ui-react'
import moneyTree from "./assets/moneytree.webp";
import {useQuery} from '@apollo/client';
import {QUERY_USER} from '../utils/queries';
// import Auth from '../utils/auth'


//possibly make every card dynamic
//also thinking about making mygarden a parent div so we can pass the cards through as components as well as the detailed view of each plant
export default  function MyGarden () {

    const {loading, data } = useQuery(QUERY_USER)

    const plantData = data?.user.myPlants || [];
    
    //console.log(loading? "loading" : plantData)

    const [percent, setPercent] = useState(0)

    
    useEffect(() => {
        if (data) {
            console.log(data)
            //console.log(plantData)
            //console.log(parseInt(plantData[0].waterNeeded))
            document.plant = data
            let newPercent= plantData.map((plant,i) => {          
                let x = plant.waterAdded;
                let y = plant.waterNeeded;
                return x/y*100;
               }
    
                )
            //     console.log(newPercent)
                setPercent(newPercent)
    
        }
    })

    return (
        <div
            className="cards"
            style={{display: { md: 'flex', justifyContent:"center"}}}
            > 
            <div>
  
        

<Table compact celled definition>
<Table.Header>
  <Table.Row>
    <Table.HeaderCell />
    <Table.HeaderCell>Plant Name</Table.HeaderCell>
    <Table.HeaderCell>Water Status</Table.HeaderCell>
    <Table.HeaderCell>Add Water</Table.HeaderCell>
    <Table.HeaderCell>Add Water</Table.HeaderCell>
  </Table.Row>
</Table.Header>

<Table.Body>
    {plantData.map((plant,i) => (
  <Table.Row>
    <Table.Cell collapsing>
      <Checkbox slider />
    </Table.Cell>
    <Table.Cell>{plant.name}</Table.Cell>
    <Table.Cell>  
        {/* <Progress percent={percent[i]} active>
         Water This Week
         </Progress> */}
  </Table.Cell>
    <Table.Cell>{plant.waterNeeded} </Table.Cell>
    <Table.Cell>{plant.waterAdded}</Table.Cell>
  </Table.Row>

))}
</Table.Body>

<Table.Footer fullWidth>
  <Table.Row>
    <Table.HeaderCell />
    <Table.HeaderCell colSpan='4'>
      <Button
        floated='right'
        icon
        labelPosition='left'
        primary
        size='small'
      >
        <Icon name='user' /> Add User
      </Button>
      <Button size='small'>Approve</Button>
      <Button disabled size='small'>
        Approve All
      </Button>
    </Table.HeaderCell>
  </Table.Row>
</Table.Footer>
</Table>
        </div>
        </div>
    );
}