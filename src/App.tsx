import { useState } from "react";

import Chars from "./characters.json";
import { DragDropContext , Droppable , Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [characters, updateCharacters] = useState(Chars);

  function handleOnDragEnd(result : any) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Adventure Time Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name, image}, index) => {
                  return (
                    <Draggable key={id} draggableId={id.toString()} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={image} alt={`${name} Thumb`} />
                          </div>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <p>
        By <a href="https://github.com/amadich>"> Mohamed Jeridi </a>
      </p>
    </div>
  );
}

export default App;