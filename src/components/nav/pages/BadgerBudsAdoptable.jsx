import {useContext, useState} from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudSummary from "../../BadgerBudSummary";
import {Row,Col} from "react-bootstrap";


export default function BadgerBudsAdoptable(props) {
    const buds = useContext(BadgerBudsDataContext);

    const [savedCatsIds, setSavedCatsIds] = useState(JSON.parse(sessionStorage.getItem("saved-cats-ids") || "[]"));
    const [adoptedCatsIds, setAdoptedCatsIds] = useState(JSON.parse(sessionStorage.getItem("adopted-cats-ids") || "[]"));
    const unsavedCats = buds.filter(b => !savedCatsIds.includes(b.id) && !adoptedCatsIds.includes(b.id)); //removes any cats whose id has been added to savedCatsIds or adoptedCatsIds
    
    //Runs when use clicks "Save"
    function saveCat(catId, catName){
        alert(catName + " has been added to your basket!");

        const updatedSavedCats = [...savedCatsIds, catId]
        setSavedCatsIds(updatedSavedCats); //Update savedCatsIds
        sessionStorage.setItem("saved-cats-ids", JSON.stringify(updatedSavedCats)); //Save to session storage
    }
    
    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        {unsavedCats.length === 0 ? <p>No buds are available for adoption!</p> :
        <Row>
        {unsavedCats.map(bud => {
            return <Col key={bud.id} xs={12} sm={12} md ={6} lg={4} xl={3}>
                <BadgerBudSummary{...bud} saveCat={saveCat}/> {/* {Pass in props for each cat, plus the saveCat function} */}
            </Col>
        })}
        </Row>
        }
    </div>
}