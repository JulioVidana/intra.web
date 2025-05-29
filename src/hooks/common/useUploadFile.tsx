import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services/api/API";

export function useUploadFile(fileName?: string) {
  const [nombreArchivo, setNombreArchivo] = useState<string | null>(fileName || null);
  const [fileSize, setFileSize] = useState<string>("");
  const [completado, setCompletado] = useState(!!fileName);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadMutation = useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const chunkSize = 1024 * 1024; 
      const totalChunks = Math.ceil(file.size / chunkSize);

      for (let chunk = 0; chunk < totalChunks; chunk++) {
        const start = chunk * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const blob = file.slice(start, end);

        const formData = new FormData();
        formData.append("name", file.name);
        formData.append("chunk", chunk.toString());
        formData.append("chunks", totalChunks.toString());
        formData.append("file", blob);

        const response = await API.file.postUploadFile(formData);
        setProgress(Math.round(((chunk + 1) / totalChunks) * 100));
        if (chunk === totalChunks - 1) return response;
      }

      return "Subida incompleta";
    },
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUpload: (file: File) => void,
    onError: (error: Error) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file, onUpload, onError);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    onUpload: (file: File) => void,
    onError: (error: Error) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0], onUpload, onError);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const processFile = async (
    file: File,
    onUpload: (file: File) => void,
    onError: (error: Error) => void
  ) => {
    try {
      setUploadedFile(file);
      setFileSize(formatFileSize(file.size));
      const url = await uploadMutation.mutateAsync(file);
      setNombreArchivo(url || file.name);
      setCompletado(true);
      onUpload(file);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Error desconocido");
      onError(error);
    }
  };

  const handleReset = async (onDelete?: () => void) => {
    if (nombreArchivo) {
      try {
        await API.file.deleteFile(nombreArchivo);
      } catch (error) {
        console.error("Error al eliminar el archivo", error);
      }
      setNombreArchivo(null);
      setFileSize("");
      setCompletado(false);
      setUploadedFile(null);
      if (inputRef.current) inputRef.current.value = "";
      onDelete?.();
    }
  };

  const downloadFile = async () => {
    if (!nombreArchivo) return;
    try {
      const res = await API.file.downloadFile(nombreArchivo);
      window.open(res.blockBlob.uri + res.sharedPolicy, "_blank");
    } catch (error) {
      console.error("Error al descargar el archivo", error);
    }
  };

  return {
    nombreArchivo,
    completado,
    dragActive,
    progress,
    fileSize,
    inputRef,
    isUploading: uploadMutation.isPending,
    error: uploadMutation.error,
    handleFileChange,
    handleDrag,
    handleDrop,
    handleReset,
    downloadFile,
  };
}
