// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rust_paisy2pdf::process;
use serde::Serialize;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[derive(Debug, Serialize)]
struct MyError {
    message: String,
}

impl From<std::io::Error> for MyError {
    fn from(error: std::io::Error) -> Self {
        Self {
            message: error.to_string(),
        }
    }
}

#[tauri::command]
fn process_paisy2pdf(
    files: Vec<String>,
    path: String,
    optional_paths: Vec<String>,
) -> Result<(), MyError> {
    let files_slice: Vec<&str> = files.iter().map(|s| s.as_str()).collect();
    let files_slice: &[&str] = &files_slice[..];
    let optionals_slice: Vec<&str> = optional_paths.iter().map(|s| s.as_str()).collect();
    let optionals_slice: &[&str] = &optionals_slice[..];

    process::process(files_slice, path.as_str(), optionals_slice).map_err(MyError::from)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![process_paisy2pdf])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
