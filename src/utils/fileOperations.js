import { invoke } from "@tauri-apps/api/tauri";

export const handleFilesDropped = async (files, targetPath) => {
  const textFiles = files.filter((file) => file.type === "text/plain");
  if (textFiles.length > 0) {
    const textContent = await Promise.all(textFiles.map((file) => file.text()));
    await invoke("process_paisy2pdf", {
      files: textContent,
      path: targetPath,
      optionalPaths: textFiles.map((file) => file.name),
    });

    console.log("Save dropped files to", targetPath);
  }
};

export const handleFilesSelected = async (files, targetPath) => {
  const textFiles = files.filter((file) => file.endsWith(".txt"));
  if (textFiles.length > 0) {
    await invoke("process_paisy2pdf", {
      files: textFiles,
      path: targetPath,
      optionalPaths: textFiles,
    });
    console.log("Save selected files to", targetPath, textFiles);
  }
};
