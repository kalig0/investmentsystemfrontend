import React from 'react'
import {Image, Nav, Navbar} from "react-bootstrap";
import logo from "./logo.svg"

export default class TopBar extends React.Component {
    render() {
        return (
            <Navbar bg="light" variant={"dark"} expand="lg">
                <Navbar.Brand>
                    <Image fluid src={logo} alt={"logo"} style={{width: '100px', height: '100px'}}
                           className={"mx-auto navbar-brand"}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/houses" style={{fontSize: "20px", color:"#222222", marginRight:"20px"}}>Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/" style={{fontSize: "20px", color:"#222222"}} >Log out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>)
    }
}