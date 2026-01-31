/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Camera, Cancel, Upload } from "@hugeicons/core-free-icons";

interface LogoUploadStepProps {
  logo: string | null;
  onChange: (logo: string | null) => void;
}

export default function VisualStep({ logo, onChange }: LogoUploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="max-w-xl mx-auto">
        {logo ? (
          <div className="relative">
            <div className="kubo-card p-6 flex items-center justify-center">
              <img
                src={logo}
                alt="Logo da empresa"
                className="max-h-48 max-w-full object-contain"
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 rounded-full shadow-lg"
              onClick={() => onChange(null)}
            >
              <HugeiconsIcon icon={Cancel} className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => inputRef.current?.click()}
            >
              <HugeiconsIcon icon={Camera} className="w-4 h-4 mr-2" />
              Trocar imagem
            </Button>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "kubo-card border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200",
              isDragging
                ? "border-primary bg-accent"
                : "border-border hover:border-primary/50 hover:bg-accent/50"
            )}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <HugeiconsIcon icon={Upload} className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">
                  Arraste sua logo aqui
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  ou clique para selecionar
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                PNG, JPG ou SVG (máx. 2MB)
              </p>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
