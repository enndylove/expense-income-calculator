import type React from "react"

import { useState, useRef } from "react"
import { Camera, Receipt, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { api } from "@/shared/api"

interface ReceiptData {
  transactionType: "cost" | "profit"
  productType: string
  amount: number
  note: string
}

export function ReceiptScanner({ onReceiptProcessed }: { onReceiptProcessed: (data: ReceiptData) => void }) {
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
    } catch (err) {
      // toast({
      //   title: "Camera Error",
      //   description: "Could not access camera. Please check permissions.",
      //   variant: "destructive",
      // })
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
      setImage(canvas.toDataURL("image/jpeg"))
      stopCamera()
    }
  }

  const resetImage = () => {
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }


  const processReceipt = async () => {
    if (!image) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", dataURItoBlob(image), "receipt.jpg");

      const response = await api.post("transactions/process-receipt", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!response.data) {
        throw new Error("Failed to process receipt");
      }

      const data = response.data;

      if (data.success && data.transaction) {
        onReceiptProcessed({
          transactionType: data.transaction.transactionType,
          productType: data.transaction.productType,
          amount: Number.parseFloat(data.transaction.amount),
          note: data.transaction.note,
        });
      } else {
        throw new Error("Invalid response format");
      }

      resetImage();
    } catch (error) {
      console.error("Processing Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <Card className="p-4">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="upload">Upload Receipt</TabsTrigger>
          <TabsTrigger value="camera" onClick={startCamera}>
            Take Photo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="flex flex-col items-center">
          <div
            className="border-2 border-dashed rounded-lg p-8 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              Click to upload or drag and drop
              <br />
              JPG, PNG or PDF (max. 10MB)
            </p>
          </div>
        </TabsContent>

        <TabsContent value="camera" className="flex flex-col items-center">
          {!image && (
            <div className="relative w-full aspect-[3/4] bg-black rounded-lg overflow-hidden">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2" onClick={capturePhoto}>
                <Camera className="mr-2 h-4 w-4" />
                Capture
              </Button>
            </div>
          )}
        </TabsContent>

        {image && (
          <div className="mt-4 relative">
            <img
              src={image || "/placeholder.svg"}
              alt="Receipt"
              className="w-full max-h-[400px] object-contain rounded-lg border"
            />
            <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={resetImage}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {image && (
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={resetImage}>
              Cancel
            </Button>
            <Button onClick={processReceipt} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Process Receipt"}
              <Receipt className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </Tabs>
    </Card>
  )
}

