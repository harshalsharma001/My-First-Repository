import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { backgroundColor, shortName } from "./functions";
import { AiFillDelete } from "react-icons/ai";

// import uuid from "uuidv4";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;

  const { source, destination } = result;

  if (
    source.droppableId !== destination.droppableId &&
    source.droppableId !== "Completed"
  ) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    function updateCategory() {
      let updated = destItems.map((item) => {
        item.category = result.destination.droppableId;
        return item;
      });
      return updated;
    }

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: updateCategory(destItems),
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });

    source.droppableId === "Completed" &&
      alert("Ticket is completed, So Not Droppable...!");
  }
};

const convertPriority = (priority) => {
  if (priority === "Low") {
    return { percent: 20, variant: "alert" };
  } else if (priority === "Medium") {
    return { percent: 50, variant: "success" };
  } else if (priority === "High") {
    return { percent: 95, variant: "danger" };
  }
};

function MultpleDnD({
  mycolumn,
  setMyColumn,
  ticket,
  setTicket,
  users,
  deletedTickets,
  setDeletedTickets,
  searching,
  myInputvalue,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const saveUpdate = (e, editId) => {
    e.preventDefault();

    function AddItem(el) {
      const index = mycolumn[el.category].items.findIndex((val) => {
        return val.id === editId;
      });
      let clone = { ...mycolumn };
      if (el.category === ticket.category) {
        clone[el.category].items.splice(index, 1, ticket);
        return clone[el.category];
      } else {
        clone[el.category].items.splice(index, 1);
        clone[ticket.category].items.push(ticket);
        return clone[el.category];
      }
    }

    Object.entries(mycolumn).map((element) => {
      element[1].items.map((el) => {
        if (el.id === editId) {
          setMyColumn({
            ...mycolumn,
            [el.category]: AddItem(el),
          });
        }
      });
    });
    setShow(false);
  };

  const deleteHandle = (item, deleteId) => {
    const index = mycolumn[item.category].items.findIndex((val) => {
      return val.id === deleteId;
    });

    setDeletedTickets([...deletedTickets, item]);
    let clone = { ...mycolumn };
    clone[item.category].items.splice(index, 1);
  };

  const mychangeHandler = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleShow = (clickId) => {
    setShow(true);
    Object.entries(mycolumn).map((el) => {
      el[1].items.map((el) => {
        if (el.id === clickId) {
          setTicket({
            id: el.id,
            category: el.category,
            title: el.title,
            description: el.description,
            priority: el.priority,
            assignedTo: el.assignedTo,
          });
        }
      });
    });
  };

  const originalData = () => {
    return mycolumn;
  };

  const filteredData = () => {

    var values = [];
    let stringifyObject = JSON.stringify(mycolumn);
    let parsedObject = JSON.parse(stringifyObject);

    Object.entries(parsedObject).map((el) =>
      el[1].items.map((val) => values.push(val))
    );

    let filteredTickets = values.filter(
      (
        item //shows filtered tickets
      ) =>
        myInputvalue.inputText
          ? item.title.toLowerCase().includes(myInputvalue.inputText.toLowerCase()) || item.description.toLowerCase().includes(myInputvalue.inputText.toLowerCase())
          : item.assignedTo
            .toLowerCase()
            .includes(myInputvalue.inputName.toLowerCase())
    );

    let allKeys = Object.keys(mycolumn); //return only keys

    allKeys.map((mykey) => {
      parsedObject[mykey].items = filteredTickets.filter(
        (i) => i.category === mykey
      );
    });
    return parsedObject;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        padding: "12px",
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, mycolumn, setMyColumn)}
      >
        {Object.entries(searching ? filteredData() : originalData()).map(
          ([columnName, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnName}
              >
                <h4>{columnName}</h4>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnName} key={columnName}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "darkgrey"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 620,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={String(item.id)}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "150px",
                                        backgroundColor: snapshot.isDragging
                                          ? "lightgrey"
                                          : "white",
                                        color: "black",
                                        ...provided.draggableProps.style,
                                      }}
                                      onDoubleClick={() => handleShow(item.id)}
                                    >
                                      <Modal show={show} onHide={handleClose}>
                                        <Modal.Header>
                                          <Modal.Title>
                                            Update Ticket
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Form
                                          onSubmit={(e) =>
                                            saveUpdate(e, ticket.id)
                                          }
                                        >
                                          <Modal.Body>
                                            <Form.Group
                                              className="mb-3"
                                              controlId="exampleForm.ControlInput1"
                                            >
                                              <Form.Label>
                                                Select Category
                                              </Form.Label>
                                              <Form.Select
                                                onChange={(e) =>
                                                  mychangeHandler(e)
                                                }
                                                name="category"
                                                aria-label="Default select example"
                                                className="form-control"
                                                autoFocus
                                                required
                                                value={ticket.category}
                                              >
                                                <option value="">Select</option>
                                                <option value="ToDo">
                                                  To Do
                                                </option>
                                                <option value="InProgress">
                                                  In Progress
                                                </option>
                                                <option value="InDev">
                                                  In Dev
                                                </option>
                                                <option value="Completed">
                                                  Completed
                                                </option>
                                              </Form.Select>
                                            </Form.Group>

                                            <Form.Group
                                              className="mb-3"
                                              controlId="exampleForm.ControlInput1"
                                            >
                                              <Form.Label>
                                                Select Priority
                                              </Form.Label>
                                              <Form.Select
                                                onChange={(e) =>
                                                  mychangeHandler(e)
                                                }
                                                name="priority"
                                                aria-label="Default select example"
                                                className="form-control"
                                                value={ticket.priority}
                                                required
                                              >
                                                <option value="">Select</option>
                                                <option value="Low">Low</option>
                                                <option value="Medium">
                                                  Medium
                                                </option>
                                                <option value="High">
                                                  High
                                                </option>
                                              </Form.Select>
                                            </Form.Group>
                                            <Form.Group
                                              className="mb-3"
                                              controlId="exampleForm.ControlInput1"
                                            >
                                              <Form.Label>
                                                Assigned To
                                              </Form.Label>
                                              <Form.Select
                                                onChange={(e) =>
                                                  mychangeHandler(e)
                                                }
                                                name="assignedTo"
                                                aria-label="Default select example"
                                                className="form-control"
                                                value={ticket.assignedTo}
                                                required
                                              >
                                                <option
                                                  value={ticket.assignedTo}
                                                >
                                                  {ticket.assignedTo}
                                                </option>
                                                {users.map((val, ind) => {
                                                  if (
                                                    ticket.assignedTo !== val
                                                  ) {
                                                    return (
                                                      <React.Fragment key={ind}>
                                                        <option
                                                          key={ind}
                                                          value={val}
                                                        >
                                                          {val}
                                                        </option>
                                                      </React.Fragment>
                                                    );
                                                  }
                                                })}
                                              </Form.Select>
                                            </Form.Group>

                                            <Form.Group
                                              className="mb-3"
                                              controlId="exampleForm.ControlInput1"
                                            >
                                              <Form.Label>
                                                Ticket Name
                                              </Form.Label>
                                              <Form.Control
                                                type="text"
                                                placeholder="Enter Here"
                                                name="title"
                                                value={ticket.title}
                                                onChange={(e) =>
                                                  mychangeHandler(e)
                                                }
                                                required
                                              />
                                            </Form.Group>

                                            <Form.Group>
                                              <Form.Label>
                                                Ticket Description
                                              </Form.Label>
                                              <Form.Control
                                                type="text"
                                                placeholder="Enter Here"
                                                name="description"
                                                value={ticket.description}
                                                onChange={(e) =>
                                                  mychangeHandler(e)
                                                }
                                                required
                                              />
                                            </Form.Group>
                                          </Modal.Body>

                                          <Modal.Footer>
                                            <Button
                                              variant="danger"
                                              onClick={handleClose}
                                            >
                                              Close
                                            </Button>
                                            <Button
                                              variant="primary"
                                              type="submit"
                                            >
                                              Update
                                            </Button>
                                          </Modal.Footer>
                                        </Form>
                                      </Modal>

                                      <ProgressBar
                                        variant={
                                          convertPriority(item.priority)
                                            ?.variant
                                        }
                                        now={
                                          convertPriority(item?.priority)
                                            ?.percent
                                        }
                                        label={item?.priority}
                                      />
                                      <br />

                                      <h5>{item?.title?.substring(0, 20)}</h5>
                                      <p>
                                        {" "}
                                        {item?.description?.substring(0, 40)}
                                      </p>
                                      <h6> {item?.category}</h6>
                                      <h6>
                                        <span
                                          style={{
                                            borderRadius: "50%",
                                            backgroundColor: backgroundColor(
                                              item.assignedTo
                                            ),
                                            color: "white",
                                            padding: "6px",
                                          }}
                                          title={item?.assignedTo}
                                        >
                                          {shortName(item?.assignedTo)}{" "}
                                        </span>
                                        <span
                                          style={{ float: "right" }}
                                          title="Delete"
                                        >
                                          <AiFillDelete
                                            size={22}
                                            onClick={() =>
                                              deleteHandle(item, item?.id)
                                            }
                                          />
                                        </span>
                                      </h6>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          }
        )}
      </DragDropContext>
    </div>
  );
}

export default MultpleDnD;
