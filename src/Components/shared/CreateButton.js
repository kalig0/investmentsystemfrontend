import React from "react";
import {Container, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {LG, LIGHT} from "../../utils/Const";

export default class CreateButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            name: "",
            body: null
        };
        this.setIsModal = this.setIsModal.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
    }

    componentDidMount() {
        this.setState({
            name: this.props.name,
            body: this.props.body
        })
    }

    setIsModal = (value) => {
        this.setState({
            isModal: value
        })
    };

    onHideModal = () => {
        this.setIsModal(false);
        window.location.reload()
    };

    render() {
        return (
            <Container>
                <Button variant={LIGHT} onClick={this.setIsModal}>
                    {this.state.name}
                </Button>

                <Modal show={this.state.isModal} onHide={this.onHideModal}
                       size={LG}
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.body}
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}