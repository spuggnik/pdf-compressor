'use client'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { CloudLightningIcon, LockIcon, FileIcon} from "lucide-react"
import { useTranslations } from "next-intl";



export default function CompressorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [compressedFileSize, setCompressedFileSize] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [reduction, setReduction] = useState<number | null>(null)
  const [fileSize, setFileSize] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const t = useTranslations();

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
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-10 bg-gradient-to-b from-white to-gray-400 px-4 py-12 mx-auto">
        <h1 className="text-5xl font-bold text-center">{t("heading")}</h1>
        <p className="text-gray-600 text-center max-w-xl text-xl mb-6">
          {t("subtitle")}
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-1xl px-6 py-3 hover:scale-105 mb-6 cursor-pointer" size="lg" >{t("upload")}</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">{t("DialogTitle")}</DialogTitle>
              <DialogDescription>
                <input type="file" accept=".pdf" className="mt-4 text-center font-semibold hidden" onChange={handleFileChange} ref={fileInputRef}/>

                <Button className="text-center font-semibold mt-4 cursor-pointer" onClick={handleButtonClick}>
                  {t("DialogButton1")}
                </Button>
                <br />
                <br />
                {file && (
                  <span className="text-sm text-gray-800 font-semibold">
                    {t("PDFFile")}<span className="font-medium">{file.name}</span>
                  </span>
                )}
                
                
              <br />
                <Button
                  className="p-4 mt-4 mb-4 text-center font-semibold cursor-pointer"
                  onClick={handleUpload}
                  disabled={!file || isLoading}>
                    {isLoading ? t("DialogButton3") : t("DialogButton2")}
                  </Button>
                  <br />
                  
                    {typeof window !== "undefined" && fileSize !== null && (
                    <span className="text-sm text-gray-500">{t("DialogDescription1")}{(fileSize / 1024).toFixed(2)} KB</span>
                  )}
                  
                  <br />
                  {typeof window !== "undefined" && compressedFileSize !== null && (
                    <span className="text-sm text-gray-500">{t("DialogDescription2")}{(compressedFileSize / 1024).toFixed(2)} KB</span>
                  )}
                  <br />
                  {reduction !== null && (
                    <span className="text-sm text-emerald-600 font-bold"> {t("DialogDescription3")} {reduction.toFixed(1)} {t("DialogDescription4")}</span>
                  )}
               
              </DialogDescription>
            </DialogHeader>
            
             

          </DialogContent>
        </Dialog>
    <div>
      <CloudLightningIcon className="mx-auto mb-1 h-6 w-6 text-emerald-600" />
      <p className="text-base font-medium text-gray-700">{t("icon1")}</p>
    </div>
    <div>
      <LockIcon className="mx-auto mb-1 h-6 w-6 text-emerald-600" />
      <p className="text-base font-medium text-gray-700">{t("icon2")}</p>
    </div>
    <div>
      <FileIcon className="mx-auto mb-1 h-6 w-6 text-emerald-600" />
      <p className="text-base font-medium text-gray-700">{t("icon3")}</p>
    </div>
      </main>
  );
}
