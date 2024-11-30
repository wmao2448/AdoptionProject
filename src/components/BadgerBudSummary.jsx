import {Card, Button, ButtonGroup, ButtonToolbar, Carousel} from "react-bootstrap";
import {useState} from "react";

export default function BadgerBudSummary(props){
    
    const [showSummary, setShowSummary] = useState(false);

    function renderCarousel(){
        if (showSummary){
            return (
                <Carousel>
                    {props.imgIds.map((img, index) => <Carousel.Item key={index}>
                        <img className= "cat-pic"src= {"https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/" + img} alt={"A picture of " + props.name} />
                    </Carousel.Item>)}
                </Carousel>
            );
        } else {
            return <img className= "cat-pic"src= {"https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/" + props.imgIds[0]} alt={"A picture of " + props.name} />
        }
    }

    return( <Card className="m-4">

        {renderCarousel()}
        <h2>{props.name}</h2>

        {showSummary ? (
            <div className="description">
            <p>{props.gender}</p>
            <p>{props.breed}</p>
            <p>{props.age}</p>
            {props.description ? <p>{props.description}</p> : <></>} 
        </div>) : <></>}
        <Card.Footer>
            <ButtonToolbar className="ml-3">
            <ButtonGroup  className="me-1">
                <Button onClick={() => setShowSummary(!showSummary)}>{showSummary ? "Show Less" : "Show More"}</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="secondary" onClick={() => props.saveCat(props.id, props.name)}>❤️ Save</Button>
            </ButtonGroup>
            </ButtonToolbar>
        </Card.Footer>
    </Card>
    )
}