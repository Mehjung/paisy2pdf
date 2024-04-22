import { open } from "@tauri-apps/api/dialog";

export const useFolderSelection = () => {
  const selectFolderSafely = async () => {
    try {
      const path = await open({
        directory: true,
        multiple: false,
        title: "Speicherort auswählen",
      });
      return path;
    } catch (error) {
      console.error("Fehler beim Öffnen des Ordnerauswahl-Dialogs:", error);
      return null;
    }
  };
  return selectFolderSafely;
};

export const useFileSelection = () => {
  const selectFilesSafely = async () => {
    try {
      const files = await open({
        multiple: true,
        filters: [{ name: "Text Files", extensions: ["txt"] }],
        title: "PAISY 'txt' Dateien auswählen",
      });
      if (!files) {
        return null;
      }
      // Wenn 'files' ein String ist, bedeutet das, dass nur eine Datei ausgewählt wurde.
      // Wir konvertieren es in ein Array für Konsistenz.
      const fileList = Array.isArray(files) ? files : [files];
      return fileList;
    } catch (error) {
      console.error("Fehler beim Öffnen des Dateiauswahl-Dialogs:", error);
      return null;
    }
  };
  return selectFilesSafely;
};
