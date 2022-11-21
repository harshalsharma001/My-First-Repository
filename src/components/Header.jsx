import React from "react";
import "./Header.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { backgroundColor, shortName } from "./functions";
import { MdAutoDelete } from "react-icons/md";

export default function Header({
  ticket,
  setTicket,
  mycolumn,
  setMyColumn,
  users,
  deletedTickets,
  setDeletedTickets,
  searching,
  setSearching,
  myInputvalue,
  setmyInputvalue
}) {
  const [show, setShow] = useState(false);
  const [isRestore, setIsRestore] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value, id: new Date().getTime() });
  };

  const save = (e) => {
    e.preventDefault();
    let Clone = { ...mycolumn };
    let a = Clone[ticket.category];
    a.items.push(ticket);
    setMyColumn(Clone);
    setShow(false);
    setTicket({
      id: "",
      category: "",
      title: "",
      description: "",
      priority: "",
      assignedTo: ""
    })
  };

  const filterByName = (value) => {
    setmyInputvalue({ inputText: "", inputName: value })
    if (searching && myInputvalue.inputName == value) {
      setSearching(false)
    } else {
      setSearching(true)
    }
  };

  const handelRestore = (ele, ind, type) => {
    let clone = { ...mycolumn }
    if (type === "single") {
      clone[ele.category].items.push(ele);
      setMyColumn(clone)
      let cloneDeleted = [...deletedTickets]
      cloneDeleted.splice(ind, 1)
      setDeletedTickets(cloneDeleted)
    }
    else {
      deletedTickets.map((ele) => {
        clone[ele.category].items.push(ele);
      });
      setMyColumn(clone)
      setDeletedTickets([])
      setIsRestore(false)
    }
  }

  const inputSearchTickets = (e) => {
    const { value: myValue } = e.target;
    setmyInputvalue({ ...myInputvalue, inputText: myValue })
    if (myValue === "") {
      setSearching(false);
    } else {
      setSearching(true);
    }
  };

  return (
    <>
      <div className="main-div">
        <div className="myheader">
          <div className="title">Drag & Drop</div>
          <div className="headitems">
            <div style={{ margin: "11px", cursor: "pointer" }}>
              <MdAutoDelete
                size={30}
                onClick={() => setIsRestore(true)}
                title="Restore Tickets"
              />

              <Modal show={isRestore}>
                <Modal.Header>
                  <Modal.Title>{deletedTickets.length == 0 ? "No More Tickets To Restored..!" : "Restore Tickets..."}</Modal.Title>
                </Modal.Header>

                {deletedTickets.map((el, ind) => {
                  return <div key={ind} ><Modal.Header>
                    <Modal.Title>{el.title}</Modal.Title>{el.assignedTo}

                  </Modal.Header>
                    <Modal.Body>{el.description}<span>
                      <Button variant="success" size='sm' style={{ float: "right" }} onClick={() => handelRestore(el, ind, "single")}>
                        Restore
                      </Button></span></Modal.Body>
                  </div>
                })}
                <Modal.Footer>
                  <Button variant="danger" onClick={() => setIsRestore(false)}>
                    Close
                  </Button>
                  {!deletedTickets.length == 0 ? <Button variant="primary" onClick={() => handelRestore()}>
                    Restore All
                  </Button> : ""}
                </Modal.Footer>
              </Modal>
            </div>
            <div style={{ margin: "10px" }}>
              <input
                type="search"
                value={myInputvalue.inputText}
                placeholder="Search Tickets Here"
                onChange={(e) => inputSearchTickets(e)}
              />
            </div>
            <div style={{ display: "flex", margin: "10px" }}>
              {users.map((val, ind) => (
                <div
                  key={ind}
                  className="usernames"
                  style={{
                    flexDirection: "row",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                >
                  <span
                    style={{
                      borderRadius: "50%",
                      backgroundColor: backgroundColor(val),
                      color: "white",
                      padding: "6px",
                      cursor: "pointer",
                    }}
                    title={val}
                    onClick={() => filterByName(val)}
                  >
                    {shortName(val)}
                  </span>

                </div>
              ))}
            </div>

            <div style={{ margin: "5px" }}>
              <Button onClick={handleShow} variant="success">
                Create Ticket
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title>Create Ticket</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => save(e)}>
                  <Modal.Body>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Select Category</Form.Label>
                      <Form.Select
                        onChange={(e) => changeHandler(e)}
                        name="category"
                        aria-label="Default select example"
                        className="form-control"
                        autoFocus
                        required
                      >
                        <option value="">Select</option>
                        <option value="ToDo">To Do</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Select Priority</Form.Label>
                      <Form.Select
                        onChange={(e) => changeHandler(e)}
                        name="priority"
                        aria-label="Default select example"
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Assigned To</Form.Label>
                      <Form.Select
                        onChange={(e) => changeHandler(e)}
                        name="assignedTo"
                        aria-label="Default select example"
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        {users.map((val, index) => {
                          return (
                            <option key={index} value={val}>
                              {val}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Ticket Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Here"
                        name="title"
                        value={ticket.title}
                        onChange={(e) => changeHandler(e)}
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Ticket Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Here"
                        name="description"
                        value={ticket.description}
                        onChange={(e) => changeHandler(e)}
                        required
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Save
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
