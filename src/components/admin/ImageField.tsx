"use client";

import { createUploadUrl } from "@/actions/uploads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getContentImageUrl } from "@/utils/getImageFromExternal";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export type ImageFieldProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const ImageField = ({ id, value, onChange, placeholder = "/svg/icon.svg or https://..." }: ImageFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Use an image under 10 MB.");
      return;
    }

    setIsUploading(true);
    try {
      const result = await createUploadUrl(file.type);
      if (result.error || !result.uploadUrl || !result.publicUrl) {
        toast.error(result.error ?? "Upload failed. Please try again.");
        return;
      }
      const response = await fetch(result.uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!response.ok) throw new Error(`Upload failed with status ${response.status}`);
      onChange(result.publicUrl);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="relative size-9 shrink-0 overflow-hidden rounded-md border bg-muted">
        {!!value && /^(\/[^/\s]|https?:\/\/)\S*$/.test(value) && (
          <Image src={getContentImageUrl(value)} alt="" fill unoptimized className="object-contain" />
        )}
      </span>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Upload image"
        title="Upload image"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
      >
        {isUploading ? <Loader2 className="animate-spin" /> : <Upload />}
      </Button>
    </div>
  );
};

export default ImageField;
