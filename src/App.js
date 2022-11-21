import "./App.css";
import Header from "./components/Header";
import MultipleDnD from "./components/MultipleDnD";
import { useState } from "react";

function App() {
  const [deletedTickets, setDeletedTickets] = useState([]);
  const [searching, setSearching] = useState(false);
  const [myInputvalue, setmyInputvalue] = useState({
    inputText: "",
    inputName: "",
  });

  let users = [
    "Ankit Gupta",
    "Deepak Jadhav",
    "Harshal Sharma",
    "Virat Kohli",
    "Pankaj Kumar Sharma",
  ];

  const [ticket, setTicket] = useState({
    id: "",
    category: "",
    title: "",
    description: "",
    priority: "",
    assignedTo: "",
  });

  const myItems = [
    {
      id: 1,
      title: "First task",
      description: "This is Description of First Task",
      category: "ToDo",
      priority: "Low",
      assignedTo: "Ankit Gupta",
    },
    {
      id: 2,
      title: "Second task",
      description: "This is Description of Second Task",
      category: "ToDo",
      priority: "Medium",
      assignedTo: "Deepak Jadhav",
    },
    {
      id: 3,
      title: "Third task",
      description: "This is Description of Third Task",
      category: "ToDo",
      priority: "High",
      assignedTo: "Harshal Sharma",
    },
  ];

  const [mycolumn, setMyColumn] = useState({
    ToDo: {
      items: myItems,
    },
    InProgress: {
      items: [
        {
          id: 4,
          title: "Fourth task",
          description: "Need to Submit First",
          category: "InProgress",
          priority: "High",
          assignedTo: "Virat Kohli",
        },
        {
          id: 5,
          title: "Fifth task",
          description: "This is Description of Ticket",
          category: "InProgress",
          priority: "Medium",
          assignedTo: "Harshal Sharma",
        },
        {
          id: 6,
          title: "Third Sixth task",
          description: "This is Description of another.",
          category: "InProgress",
          priority: "Low",
          assignedTo: "Pankaj Kumar Sharma",
        },
      ],
    },
    InDev: {
      items: [
        {
          id: 7,
          title: "Third Seven task",
          description: "This is Description of My Ticket",
          category: "InDev",
          priority: "Medium",
          assignedTo: "Deepak Jadhav",
        },
      ],
    },
    Completed: {
      items: [
        {
          id: 8,
          title: "Title of Eight Ticket",
          description: "This is Demo One",
          category: "Completed",
          priority: "Low",
          assignedTo: "Pankaj Kumar Sharma",
        },
        {
          id: 9,
          title: "Third  Nine Ticket",
          description: "This is For Demo Details",
          category: "Completed",
          priority: "High",
          assignedTo: "Virat Kohli",
        },
      ],
    },
  });

  return (
    <>
      <div className="App">
        <Header
          ticket={ticket}
          setTicket={setTicket}
          mycolumn={mycolumn}
          setMyColumn={setMyColumn}
          users={users}
          deletedTickets={deletedTickets}
          setDeletedTickets={setDeletedTickets}
          searching={searching}
          setSearching={setSearching}
          myInputvalue={myInputvalue}
          setmyInputvalue={setmyInputvalue}
        />
        <MultipleDnD
          mycolumn={mycolumn}
          setMyColumn={setMyColumn}
          ticket={ticket}
          setTicket={setTicket}
          users={users}
          deletedTickets={deletedTickets}
          setDeletedTickets={setDeletedTickets}
          searching={searching}
          myInputvalue={myInputvalue}
        />
      </div>
    </>
  );
}

export default App;
