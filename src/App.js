import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Preview from "./Components/Preview/Preview";
import Toolbar from "./Components/Toolbar/Toolbar";

function App() {
  const [editElement, setEditElement] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const editModeOn = (element) => {
    setEditElement(element);
    setEditMode(true);
  };
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div>
          <Preview parent={this} editModeOn={editModeOn} />
        </div>
        <div>
          <Toolbar />
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
