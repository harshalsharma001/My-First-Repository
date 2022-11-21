import React, { useState } from "react";
import "./singleDnD.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function SingleDnD() {
  const [data, setData] = useState([
    "task-1",
    "task-2",
    "task-3",
    "task-4",
    "task-5",
  ]);

  const handelOnDragEnd = (res) => {
    if (!res.destination) return;

    const updated = [...data];
    // or
    // const updated = Array.from(data)   ----- //shalow copied
    const [reOrdered] = updated.splice(res.source.index, 1);
    updated.splice(res.destination.index, 0, reOrdered);
    setData(updated);
  };
  return (
    <>
      <div className="main-drag-div">
        <DragDropContext onDragEnd={handelOnDragEnd}>
          <Droppable droppableId="11">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="lists-div"
              >
                <div>My Tasks...</div>
                {data.map((el, ind) => {
                  return (
                    <>
                      <Draggable
                        key={ind}
                        draggableId={String(ind)}
                        index={ind}
                      >
                        {(provided) => (
                          <>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="list-div"
                            >
                              {el}
                            </div>
                          </>
                        )}
                      </Draggable>
                    </>
                  );
                })}{" "}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
