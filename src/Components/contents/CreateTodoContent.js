import React from "react";
import {sendSpecificInvestmentTodo} from "../../utils/APIUtils";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Alert, ButtonToolbar} from "react-bootstrap";

export default class CreateTodoContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            isSuccessfullySaved: false,
            showButton:false,
        };

        this.splittedUrl=window.location.href.split('/');
        this.houseId = this.splittedUrl[this.splittedUrl.length-2];
        this.categoryId = this.splittedUrl[this.splittedUrl.length-4];

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        sendSpecificInvestmentTodo(this.state, this.houseId, this.categoryId)
            .then(response => {
                if (response.status!==403) {
                    this.setState({isSuccessfullySaved: true});
                }
                this.setState({showButton:true});
            }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    }


    render() {
        return (
            <Form style={FormStyle}>
                <Form.Group controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name={'description'} placeholder="Enter description"
                                  onChange={this.handleChange}/>
                </Form.Group>
                <ButtonToolbar className="justify-content-between">
                    <ButtonGroup style={ButtonGroupStyle}>
                        <Button style={ButtonStyle} variant={"elegant"} onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </ButtonGroup>
                    {(this.state.isSuccessfullySaved && this.state.showButton) && <ButtonGroup style={ButtonGroupStyle}>
                        <Alert variant={"success"}>
                           Dodano!
                        </Alert>
                    </ButtonGroup>}
                    {(!this.state.isSuccessfullySaved && this.state.showButton) && <ButtonGroup style={ButtonGroupStyle}>
                        <Alert variant={"danger"}>
                           Nie masz uprawnień!
                        </Alert>
                    </ButtonGroup>}
                </ButtonToolbar>
            </Form>
        );
    }
}

const FormStyle = {
    margin: "10px"
};

const ButtonGroupStyle = {
    margin: "0"
};

const ButtonStyle = {
    marginLeft:"0"
};