import {Row,Col} from "react-bootstrap";
import {useContext, useState} from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudBasketSummary from "../../BadgerBudBasketSummary";

export default function BadgerBudsBasket(props) {

    const buds = useContext(BadgerBudsDataContext);

    const [savedCatsIds, setSavedCatsIds] = useState(JSON.parse(sessionStorage.getItem("saved-cats-ids") || "[]"));
    const [adoptedCatsIds, setAdoptedCatsIds] = useState(JSON.parse(sessionStorage.getItem("adopted-cats-ids") || "[]"));
    const savedCats = buds.filter(b => savedCatsIds.includes(b.id)); //remove cats whose id is NOT in savedCatsIds

    //Runs whenever a cat is unselected
    function unselect(catId, catName){
        alert(catName + " has been removed from your basket!");
        const updatedSavedCats = savedCatsIds.filter(cat => cat != catId); //Filter out the cat that was unselected
        setSavedCatsIds(updatedSavedCats);
        sessionStorage.setItem("saved-cats-ids", JSON.stringify(updatedSavedCats));
    }

    //Runs whenever a cat is adopted
    function adopt(catId, catName){
        //Add to adoptedCatsIds
        alert(catName + " has been adopted!");
        const updatedAdoptedCats = [...adoptedCatsIds, catId]
        setAdoptedCatsIds(updatedAdoptedCats); //Update adoptedCatsIds
        sessionStorage.setItem("adopted-cats-ids", JSON.stringify(updatedAdoptedCats)); 

        //In addition, remove from savedCatsIds
        const updatedSavedCats = savedCatsIds.filter(cat => cat != catId);
        setSavedCatsIds(updatedSavedCats);
        sessionStorage.setItem("saved-cats-ids", JSON.stringify(updatedSavedCats));
    }
    

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        {savedCats.length === 0 ? <p>You have no buds in your basket!</p> : 
        <Row>
        {savedCats.map(bud => {
            return <Col key={bud.id} xs={12} sm={12} md ={6} lg={4} xl={3}>
                <BadgerBudBasketSummary{...bud} unselect={unselect} adopt={adopt}/> {/* {Pass in props for each cat, plus the unselect and adopt functions} */}
            </Col>
        })}
        </Row>   
    }
    </div>
}