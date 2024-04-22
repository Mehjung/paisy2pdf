import "@db-ui/core/dist/css/enterprise/db-ui-core.vars.css";
import React, { useState } from "react";
import {
  DbBrand,
  DbHeader,
  DbPage,
  DbFooter,
  DbProgress,
} from "@db-ui/react-elements-enterprise";
import logo from "/images/db_logo.svg";
import Dropzone from "./Dropzone";
import FileSelector from "./FileSelector";
import {
  handleFilesDropped,
  handleFilesSelected,
} from "./utils/fileOperations";
import LoadingIndicator from "./LoadingIndicator";
import ErrorModal from "./Error";

// Main App component
export default function App() {
  const [savePath, setSavePath] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCloseError = () => {
    setError(null);
  };

  const handleFile = async (files) => {
    setLoading(true);
    try {
      await handleFilesSelected(files, savePath);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const handleDrop = async (files) => {
    setLoading(true);
    try {
      await handleFilesDropped(files, savePath);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <DbPage className="h-full">
        <DbHeader slot="header">
          <DbBrand src={logo}>PAISY text data to pdf converter</DbBrand>
          <DbProgress className="ml-2 mt-1" indeterminate="true"></DbProgress>
        </DbHeader>

        <div className="grid grid-rows-1 grid-flow-col gap-4">
          {!isLoading ? (
            <>
              <div className="flex justify-center row-start-2">
                <Dropzone
                  onFilesDropped={handleDrop}
                  onFilesSelected={handleFile}
                />
              </div>
              <ErrorModal error={error} onClose={handleCloseError} />
              <div className="ml-2 flex justify-left row-start-3 ">
                <FileSelector savePath={savePath} setSavePath={setSavePath} />
              </div>
            </>
          ) : (
            <LoadingIndicator className="mt-8 flex justify-center row-start-1" />
          )}
        </div>
        <DbFooter slot="footer">Erstellt von Jan Ehrmantraut</DbFooter>
      </DbPage>
    </div>
  );
}
