import React from "react";
import {CardDeck} from "react-bootstrap";
import {getAllHouses, getImage} from "../../utils/APIUtils";
import ItemCard from "./ItemCard";
import Background from "../../assets/background.jpg";
import CreateInvestmentContent from "../contents/CreateInvestmentContent";
import CreateButton from "../shared/CreateButton";

export default class InvestmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            investments: []
        }
    }

    componentDidMount() {
        getAllHouses()
            .then((result) => {
                console.log(result)
                let i = 0;
                let cards = result.map((item) =>
                    <ItemCard key={i++} id={item.id} title={item.nameToShow} name={item.name}
                                   description={item.description}
                                   image={getImage(item.fileNamePath)} buttonTextEdit={"View"}
                                   buttonTextDelete={"Delete"}/>
                );
                this.setState({investments: cards});
            });
    }

    render() {
        return (
            <div className={"background"} style={{backgroundImage: `url(${Background})`, height: '85vh'}}>
                <CreateButton name={"Add an Investment"} body={<CreateInvestmentContent/>}/>
                <CardDeck>
                    {this.state.investments}
                </CardDeck>
            </div>
        )
    }
}