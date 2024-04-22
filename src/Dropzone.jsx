import React, { useReducer } from "react";
import { DbCard } from "@db-ui/react-elements-enterprise";
import { useFileSelection } from "./hooks/useSelection";

const dropzoneReducer = (state, action) => {
  switch (action.type) {
    case "SET_DROP_DEPTH":
      const newDropDepth = state.dropDepth + (action.increase ? 1 : -1);
      return {
        ...state,
        dropDepth: newDropDepth,
        inDropZone: newDropDepth > 0,
      };
    default:
      return state;
  }
};

// Component to handle file drag and drop logic
const Dropzone = ({ onFilesDropped, onFilesSelected, ...props }) => {
  const [state, dispatch] = useReducer(dropzoneReducer, {
    dropDepth: 0,
    inDropZone: false,
  });

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", increase: true });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", increase: false });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];

    dispatch({ type: "SET_DROP_DEPTH", increase: false }); // Wichtig: Setzen Sie den Zustand zurück
    if (files.length > 0) {
      onFilesDropped(files);
    }
  };

  const selectFiles = useFileSelection();

  const handleFilesSelected = async () => {
    const files = await selectFiles();
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <DbCard
      illustration="pdf"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleFilesSelected}
      variant="title"
      className={`${
        state.inDropZone
          ? "border-8 border-orange-500 rounded-lg transition duration-300 ease-in-out scale-110 "
          : ""
      } transition duration-300 ease-in-out hover:scale-110 drag  `}
      {...props}
    >
      <div>
        <h2>Dropzone</h2>
        Text Datei/-en hier platzieren
        <br />
        oder hier klicken.
      </div>
    </DbCard>
  );
};

export default Dropzone;
