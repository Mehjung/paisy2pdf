import {
  DbNotifications,
  DbNotification,
  DbIcon,
} from "@db-ui/react-elements-enterprise";
import { documentDir } from "@tauri-apps/api/path";
import { useFolderSelection } from "./hooks/useSelection";
import { useState, useEffect } from "react";

const FileSelector = ({ savePath, setSavePath }) => {
  const [show, setShow] = useState(false);
  const selectFolderSafely = useFolderSelection();

  useEffect(() => {
    const init = async () => {
      const dirPath = await documentDir();
      setSavePath(dirPath);
    };
    init();
  }, []);

  const handleSelectFolder = async () => {
    const selectedPath = await selectFolderSafely();
    if (selectedPath) {
      setSavePath(selectedPath);
    }
  };
  return (
    <div
      className="ml-2 hover:drop-shadow-xl"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <DbNotifications variant="hovering">
        <DbNotification type="informative" onClick={handleSelectFolder}>
          <div className="flex flex-row items-center">
            <DbIcon
              slot="prenotification"
              icon="receive-item"
              variant="20-outline"
            />
            <p>{show && `Ablageort: ${savePath}`}</p>
          </div>
        </DbNotification>
      </DbNotifications>
    </div>
  );
};

export default FileSelector;
