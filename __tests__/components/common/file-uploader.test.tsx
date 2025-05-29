import { render, screen, fireEvent } from "@testing-library/react"
import { FileUploader } from "@/components/common/file-uploader"
import { useUploadFile } from "@/hooks/common/useUploadFile"

jest.mock("@/hooks/common/useUploadFile")

describe("FileUploader", () => {
  const mockUploadFile = {
    nombreArchivo: null,
    completado: false,
    dragActive: false,
    progress: 0,
    fileSize: "",
    inputRef: { current: null },
    isUploading: false,
    error: false,
    handleFileChange: jest.fn(),
    handleDrag: jest.fn(),
    handleDrop: jest.fn(),
    handleReset: jest.fn(),
    downloadFile: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useUploadFile as jest.Mock).mockReturnValue({ ...mockUploadFile })
  })

  it("renderiza correctamente sin archivo", () => {
    render(<FileUploader onUpload={jest.fn()} onError={jest.fn()} />)

    expect(screen.getByText("Subir archivo")).toBeInTheDocument()
    expect(screen.getByText(/Arrastra y suelta tu archivo aquí/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /selecciona un archivo/i })).toBeInTheDocument()
  })

  it("ejecuta handleFileChange cuando se selecciona un archivo", () => {
    const handleUpload = jest.fn()
    const handleError = jest.fn()
    const handleFileChange = jest.fn()
  
    const file = new File(["test content"], "archivo.pdf", { type: "application/pdf" })
  
    const mockInputRef = { current: null }
  
    ;(useUploadFile as jest.Mock).mockReturnValue({
      ...mockUploadFile,
      inputRef: mockInputRef,
      handleFileChange,
    })
  
    render(<FileUploader onUpload={handleUpload} onError={handleError} />)
  
    const fileInput = screen.getByTestId("file-input")
  
    fireEvent.change(fileInput, { target: { files: [file] } })
  
    expect(handleFileChange).toHaveBeenCalled()
    expect(handleFileChange).toHaveBeenCalledWith(expect.any(Object), handleUpload, handleError)
  })
  

  it("muestra detalles del archivo cuando ya se cargó", () => {
    ;(useUploadFile as jest.Mock).mockReturnValue({
      ...mockUploadFile,
      nombreArchivo: "archivo.pdf",
      fileSize: "15 KB",
      completado: true,
    })

    render(<FileUploader onUpload={jest.fn()} onError={jest.fn()} />)

    expect(screen.getByText("archivo.pdf")).toBeInTheDocument()
    expect(screen.getByText("15 KB")).toBeInTheDocument()
    expect(screen.getByText("Archivo subido correctamente")).toBeInTheDocument()
  })

  it("muestra mensaje de error si existe un error", () => {
    ;(useUploadFile as jest.Mock).mockReturnValue({
      ...mockUploadFile,
      nombreArchivo: "archivo.pdf",
      fileSize: "15 KB",
      completado: false,
      error: true,
    })

    render(<FileUploader onUpload={jest.fn()} onError={jest.fn()} />)

    expect(screen.getByText("Error al subir el archivo")).toBeInTheDocument()
  })
})
