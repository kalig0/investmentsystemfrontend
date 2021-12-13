import React, {Component} from 'react';
import {
    downloadDocument,
    getTodosHouse,
    sendUpdatedTodos,
    uploadFileToServer,
    removeTodoFromHouse,
    extractCSVToTodos
} from "../../utils/APIUtils";
import {MDBInput} from "mdbreact";
import Background from "../../assets/background.jpg";
import Button from "react-bootstrap/Button";
import {Container, ListGroup} from "react-bootstrap";
import CreateTodoContent from "../contents/CreateTodoContent";
import CreateButton from "../shared/CreateButton";

export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};

        this.splittedUrl=window.location.href.split('/');
        this.houseId = this.splittedUrl[this.splittedUrl.length-2];
        this.categoryId = this.splittedUrl[this.splittedUrl.length-4];

        this.sendJsonTodos = this.sendJsonTodos.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleDownloadFile = this.handleDownloadFile.bind(this);
        this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    }

    componentDidMount() {
        getTodosHouse(this.houseId, this.categoryId)
            .then((result) => {
                var listTodos = result.map((item) => {
                    console.log(item)
                    return {
                        id: item.id,
                        description: item.todo.description,
                        completed: item.completed,
                        documentName: item.document.name
                    };
                });
                this.setState({todos: listTodos});
            });
    }

    onToggle(index) {
        let newItems = this.state.todos.slice();
        newItems[index].completed = !newItems[index].completed
        this.setState({
            todos: newItems
        })
    }

    sendJsonTodos() {
        sendUpdatedTodos(this.state.todos, this.houseId, this.categoryId)
            .then((response) => {
                alert("The investment is saved.");
                window.location.reload();
            });
    }


    handleUploadFile(id, event) {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('name', 'my_file');

        console.log(id)
        uploadFileToServer(id, data)
            .then((response) => {
                alert("The file is added.");
                window.location.reload();
            }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log("Upload error. HTTP error/status code=", error.response.status);
            } else {
                console.log("Upload error. HTTP error/status code=", error.message);
            }
        });
    };


    handleDownloadFile(id, filename) {
        if(this.state.todos[id-1].documentName!==""){
            downloadDocument(id)
                .then((response) => {
                    if (response.ok) {
                        response.blob()
                            .then((blob) => {
                                let url = window.URL.createObjectURL(blob);
                                let a = document.createElement('a');
                                a.href = url;
                                a.download = filename;
                                a.click();
                            });
                    } else {
                        alert("Failed to download the file.");
                    }
                })
        }
    }

    handleRemoveTodo(id) {
        removeTodoFromHouse(id)
            .then((response) => {
                if (response.status===403) {
                    alert("You have the authority to delete.");
                } else {
                   alert("The task is deleted.")
                }
                window.location.reload();
            }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log("Upload error. HTTP error/status code=", error.response.status);
            } else {
                console.log("Upload error. HTTP error/status code=", error.message);
            }
        });
    };

    handleUploadCSVTodos(event) {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('name', 'my_file');

        extractCSVToTodos(this.houseId, this.categoryId, data)
            .then((response) => {
                if(response.status===403){
                    alert("You don't have the authority to add.");
                } else{
                    alert("The activities are added.");
                }
                window.location.reload();
            }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log("Upload error. HTTP error/status code=", error.response.status);
            } else {
                console.log("Upload error. HTTP error/status code=", error.message);
            }
        });
    }

    render() {
        return (
            <div className={"backgroundTODO"} style={{
                backgroundImage: `url(${Background})`, backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundSize: 'cover'
            }}>
                <Container className={"shadow-box-example z-depth-5"} style={{marginTop: '30px', height: '90vh'}}>
                    <CreateButton name={"Add-an-activity"} body={<CreateTodoContent/>}/>
                    {/*TODO: Connect the inscription with the button*/}
                    <h4 style={{color:'Ivory'}}>Import activities from a CVS file.</h4>
                    <input style={{marginTop: '15px', width: '250px'}} type="file" className="form-control"
                           name="file" onChange={(e) => this.handleUploadCSVTodos(e)}/>

                    <ListGroup style={{width: "30rem", position: 'relative', left: '31%', paddingTop: '50px'}}>
                        {this.state.todos.map((item, i) =>
                            <ListGroup.Item key={i} style={{padding: '20px'}}>
                                <div>
                                    <h4 style={{'display': 'inline'}}>{item.description}</h4>
                                    <MDBInput type="checkbox" onChange={this.onToggle.bind(this, i)}
                                              style={{display: 'inline', bottom: '0px', right: '-180px'}}
                                              checked={item.completed}/>
                                </div>

                                <button
                                    onClick={this.handleDownloadFile.bind(this, i + 1, this.state.todos[i].documentName)}>
                                    <i className="fas fa-file-download"/>{' ' + item.documentName}</button>

                                <input style={{marginTop: '15px', width: '250px'}} type="file"
                                       className="form-control"
                                       name="file" onChange={(e) => this.handleUploadFile(item.id, e)}/>

                                <button onClick={() => {
                                    if (window.confirm('Please confirm to delete?')) this.handleRemoveTodo(this.state.todos[i].id)
                                }}><i
                                    className="fa fa-trash"/></button>

                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    <br/>
                    <Button variant={"elegant"} style={{position: 'relative', left: '47%'}}
                            onClick={this.sendJsonTodos}>Send</Button>
                </Container>
            </div>
        )
    }
}
