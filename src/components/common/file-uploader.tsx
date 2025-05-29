"use client"

import type React from "react";
import { Upload, File, CheckCircle, AlertCircle, X, Download, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUploadFile } from "@/hooks/common/useUploadFile";

interface FileUploaderProps {
  onUpload: (file: File) => void;
  onError: (error: Error) => void;
  fileName?: string;
  onDelete?: () => void;
  disabled?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, onError, onDelete, fileName, disabled }) => {
  const {
    nombreArchivo,
    completado,
    dragActive,
    progress,
    fileSize,
    inputRef,
    isUploading,
    error,
    handleFileChange,
    handleDrag,
    handleDrop,
    handleReset,
    downloadFile,
  } = useUploadFile(fileName);

  const handleEdit = () => {
    const input = inputRef.current;
    if (!input) return;

    const originalHandler = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        handleFileChange({ target: e.target } as React.ChangeEvent<HTMLInputElement>, onUpload, onError);
      }
    };

    input.onchange = async (e: Event) => {
      await handleReset(onDelete);
      originalHandler(e);
    };

    input.click();
  };

  return (
    <div className="w-full max-w-md">
      <div
        className={cn(
          "relative flex flex-wrap flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed transition-all duration-200 sm:flex-row sm:items-center",
          dragActive ? "border-primary bg-primary/5" : "border-gray-300 bg-gray-50/50",
          isUploading && "bg-gray-50/80",
          completado && "bg-green-50/50 border-green-300",
          error && "bg-red-50/50 border-red-300",
          "hover:bg-gray-50/80"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={(e) => handleDrop(e, onUpload, onError)}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={(e) => handleFileChange(e, onUpload, onError)}
          disabled={isUploading}
          data-testid="file-input"
          className="hidden"
        />

        {!nombreArchivo && !isUploading && (
          <>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-1">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-base font-medium text-gray-800">Subir archivo</h3>
            <p className="text-xs text-gray-500 text-center">
              Arrastra y suelta tu archivo aquí o{" "}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-primary font-medium hover:underline ml-1"
              >
                selecciona un archivo
              </button>
            </p>
          </>
        )}

        {nombreArchivo && (
          <div className="w-full">
            <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <File className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{nombreArchivo}</p>
                <p className="text-xs text-gray-500">{fileSize}</p>
              </div>

              <div className="flex items-center gap-1">
                {completado && (
                  <button
                    onClick={downloadFile}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-primary"
                    title="Descargar archivo"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                )}
                {!isUploading && !disabled && (
                  <button
                    onClick={handleEdit}
                    className={cn(
                      "p-1.5 rounded-full hover:bg-gray-100",
                      completado ? "text-sky-500" : "text-red-500"
                    )}
                    title="Modificar archivo"
                  >
                    {completado ? <Upload className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </button>
                )}
                {completado && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 ml-1" />}
                {error && <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />}
              </div>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="w-full mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Subiendo...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {nombreArchivo && !isUploading && completado && !disabled && (
          <p className="text-green-600 text-sm font-medium mt-2 flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" />
            Archivo subido correctamente
          </p>
        )}

        {error && (
          <p className="text-red-600 text-sm font-medium mt-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            Error al subir el archivo
          </p>
        )}
      </div>
    </div>
  );
};
