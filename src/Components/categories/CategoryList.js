import React, {Component} from 'react';
import {getAllCategories} from "../../utils/APIUtils";
import Background from "../../assets/background.jpg";
import {Container, ListGroup} from "react-bootstrap";
import Button from "@material-ui/core/Button";

export default class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {categories: []};
        this.houseId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        this.redirect=this.redirect.bind(this);
    }

    componentDidMount() {
        getAllCategories()
            .then(response => {
                let categories = response.map((item) =>
                    item = {...item}
                )
                this.setState({categories: categories});
            })
    }

    redirect(categoryId){
       console.log(categoryId);
       console.log(this.houseId);
       let url= '/category/'+categoryId+"/house/"+this.houseId+"/todos";
       window.location.href=url;
    }

    render() {
        return (

            <div className={"backgroundTODO"} style={{
                backgroundImage: `url(${Background})`, backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundSize: 'cover'
            }}>
                <Container className={"shadow-box-example z-depth-5"} style={{marginTop: '30px', height: '90vh'}}>
                    {  console.log(this.state.categories)}
                    <ListGroup style={{width: "30rem", position: 'relative', left: '31%', paddingTop: '50px'}}>
                        {this.state.categories.map((item, i) =>
                            <ListGroup.Item key={i} style={{padding: '20px'}}>
                                <div>
                                    <h4 style={{'display': 'inline'}}>{item.name}</h4>
                                    <Button className={"button-card"} onClick={this.redirect.bind(this, this.state.categories[i].id)}><p>&rarr;</p></Button>
                                </div>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Container>
            </div>
        )
    }
}
