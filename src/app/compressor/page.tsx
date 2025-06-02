'use client'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { CloudLightningIcon, LockIcon, FileIcon} from "lucide-react"



export default function CompressorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [compressedFileSize, setCompressedFileSize] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [reduction, setReduction] = useState<number | null>(null)
  const [fileSize, setFileSize] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file)

    const res = await fetch("/api/compress", {
      method: "POST",
      body: formData,
    })
    setIsLoading(false)
    const compressedSize = res.headers.get("X-Compressed-Size")
    setCompressedFileSize(Number(compressedSize))
    if (fileSize && compressedSize) {
      const reductionPercent = 100 - (Number(compressedSize) / fileSize) * 100
      setReduction(reductionPercent)
    }
    
const blob = await res.blob()
const url = URL.createObjectURL(blob)


const contentDisposition = res.headers.get("Content-Disposition");
let filename = "compressed.pdf";
if (contentDisposition) {
  const match = contentDisposition.match(/filename="(.+)"/);
  if (match) filename = match [1];
}


const a = document.createElement("a");
a.href = url;
a.download = filename;
document.body.appendChild(a);
a.click();
a.remove();
setTimeout(() => URL.revokeObjectURL(url), 1000);
 

  }


const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selected = e.target.files?.[0]
  if (selected) {
    setFile(selected)
    setFileSize(selected.size)
  }
}

  return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-10 bg-gradient-to-b from-white to-gray-400 min-h-screen px-4 py-12 mx-auto">
        <h1 className="text-5xl font-bold text-center">PDF-Kompressor</h1>
        <p className="text-gray-600 text-center max-w-xl text-xl mb-6">
          Komprimiere deine PDF-Dateien blitzschnell & kostenlos.
          Keine Registrierung, keine Wartezeit.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-1xl px-6 py-3 hover:scale-105 mb-6 cursor-pointer" size="lg" >PDF hochladen</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">PDF hochladen</DialogTitle>
              <DialogDescription>
                <input type="file" accept=".pdf" className="mt-4 text-center font-semibold hidden" onChange={handleFileChange} ref={fileInputRef}/>

                <Button className="text-center font-semibold mt-4 cursor-pointer" onClick={handleButtonClick}>
                  Datei auswählen
                </Button>
                <br />
                <br />
                {file && (
                  <span className="text-sm text-gray-800 font-semibold">
                    Ausgewählte Datei: <span className="font-medium">{file.name}</span>
                  </span>
                )}
                
                
              <br />
                <Button
                  className="p-4 mt-4 mb-4 text-center font-semibold cursor-pointer"
                  onClick={handleUpload}
                  disabled={!file || isLoading}>
                    {isLoading ? "Wird komprimiert..." : "Jetzt komprimieren"}
                  </Button>
                  <br />
                  
                    {typeof window !== "undefined" && fileSize !== null && (
                    <span className="text-sm text-gray-500">Ursprüngliche Größe: {(fileSize / 1024).toFixed(2)} KB</span>
                  )}
                  
                  <br />
                  {typeof window !== "undefined" && compressedFileSize !== null && (
                    <span className="text-sm text-gray-500">Komprimierte Größe: {(compressedFileSize / 1024).toFixed(2)} KB</span>
                  )}
                  <br />
                  {reduction !== null && (
                    <span className="text-sm font-medium text-emerald-600"> Datei um {reduction.toFixed(1)} % verkleinert!</span>
                  )}

                  
                  
               
              </DialogDescription>
            </DialogHeader>
            
             

          </DialogContent>
        </Dialog>
    <div>
      <CloudLightningIcon className="mx-auto mb-1 h-6 w-6 text-emerald-600" />
      <p className="text-base font-medium text-gray-700">Schnell & einfach</p>
    </div>
    <div>
      <LockIcon className="mx-auto mb-1 h-6 w-6 text-emerald-600" />
      <p className="text-base font-medium text-gray-700">Lokal & sicher</p>
    </div>
    <div>
      <FileIcon className="mx-auto mb-1 h-6 w-6 text-emerald-600" />
      <p className="text-base font-medium text-gray-700">Keine Qualitätsverluste</p>
    </div>
      </main>
  );
}
