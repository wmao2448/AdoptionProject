import {Card, Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";

export default function BadgerBudSummary(props){
  
    return( 
    <div>
    <Card>
        <img className= "cat-pic"src= {"https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/" + props.imgIds[0]} alt={"A picture of " + props.name} />
        <h2>{props.name}</h2>

        <Card.Footer>
            <ButtonToolbar className="ml-3">
            <ButtonGroup className="me-1"> 
                <Button onClick={() =>props.unselect(props.id, props.name)}>Unselect</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="success"onClick={() => props.adopt(props.id, props.name)}>💕 Adopt</Button>
            </ButtonGroup>
            </ButtonToolbar>
        </Card.Footer>
    </Card>
    </div>
    )
}