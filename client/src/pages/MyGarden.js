import React from "react";
import {Card, Icon} from 'semantic-ui-react';
import moneyTree from "./assets/moneytree.webp";


//possibly make every card dynamic
//also thinking about making mygarden a parent div so we can pass the cards through as components as well as the detailed view of each plant
export default function MyGarden() {
    return (
        <div
            className="cards"
            style={{display: { md: 'flex', justifyContent:"center"}}}
            >
        <Card className="ui centered card">
            <img src={moneyTree} alt={'money tree'}/>
            <Card.Content>
                <Card.Header>
                    {/*//hard coded for now*/}
                    {/*make this dynamic with whatever is chosen from the drop-down*/}
                    Money Tree
                </Card.Header>
                <Card.Meta>
            <span className='date'>
              Potted in Nov 2020
        </span>
                </Card.Meta>
                <Card.Description>
                    info about plant?
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <span>
                    <Icon name='user'/>
                    Last Watered:
                {/*    create dynamic time/calendar to track water is pass through jsx variable*/}
                </span>
                {/*<span className="right floated">*/}
                {/* random extra text*/}
                {/* </span>*/}
            </Card.Content>
        </Card>
        </div>
    );
}