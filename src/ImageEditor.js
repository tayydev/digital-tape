import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { saveAs } from 'file-saver';

const myImage = '/resources/MOCK_rock_wall.jpg';

function ImageEditor() {
  const [objects, setObjects] = useState([
    { id: 1, x: 0, y: 0 },
    { id: 2, x: 0, y: 0 },
    // add objects here
  ]);

  const handleStop = (id, e, data) => {
    setObjects(objects.map(object =>
      object.id === id ? { ...object, x: data.x, y: data.y } : object
    ));
  };

  const saveObjects = () => {
    const blob = new Blob([JSON.stringify(objects)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "objects.json");
  };

  return (
    <div>
      <img src={myImage} alt="A Rock Climbing Wall" style={{ position: 'relative' }} />
      {objects.map(object => (
        <Draggable
          key={object.id}
          defaultPosition={{ x: object.x, y: object.y }}
          onStop={(e, data) => handleStop(object.id, e, data)}
        >
          <div style={{ position: 'absolute' }}>Object {object.id}</div>
        </Draggable>
      ))}
      <button onClick={saveObjects}>Save Objects</button>
    </div>
  );
}

export default ImageEditor;