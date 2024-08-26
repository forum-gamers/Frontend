"use client";

import {
  useCallback,
  useState,
  type ChangeEvent,
  type MouseEventHandler,
} from "react";
import RemoveSvg from "../svg/Remove";
import UploadLogo from "../svg/UploadLogo";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export type OnFileChangeHandler = (t: File[]) => void;

export interface FileFormProps {
  multiple?: boolean;
  className?: string;
  accept: string[];
  max?: number;
  placeHolder: string;
  name: string;
  required?: boolean;
  onFileChange: OnFileChangeHandler;
  id: string;
}

export default function FileForm({
  multiple = false,
  className = "",
  accept,
  max,
  placeHolder,
  name,
  required = false,
  id,
  onFileChange,
}: FileFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onchangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (multiple) {
        if (e.target.files)
          setSelectedFiles((prev) => [
            ...prev,
            ...Array.from(e.target.files as FileList),
          ]);

        onFileChange([
          ...selectedFiles,
          ...Array.from(e.target.files as FileList),
        ]);
      } else {
        if (e.target?.files?.length) {
          setSelectedFiles((prev) => [(e.target.files as FileList)[0]]);
          onFileChange([e.target.files[0]]);
        }
      }
    },
    [multiple, onFileChange, selectedFiles]
  );

  const removeHandler = useCallback(
    (name: string): MouseEventHandler =>
      (e) => {
        e.preventDefault();

        setSelectedFiles((prev) => prev.filter((el) => el.name !== name));
        onFileChange(selectedFiles.filter((el) => el.name !== name));
      },
    [onFileChange, selectedFiles]
  );

  return (
    <div className="flex flex-col space-y-2">
      <div
        className={`flex items-center justify-center ${
          !!className && className
        }`}
      >
        <Label className="cursor-pointer" htmlFor={id}>
          <UploadLogo />
        </Label>
        <Input
          id={id}
          type="file"
          max={max}
          className="hidden"
          accept={accept.join(",")}
          multiple={multiple}
          name={name}
          required={required}
          onChange={onchangeHandler}
          disabled={selectedFiles.length >= 4}
          placeholder={placeHolder}
          size={10 * 1024 * 1024}
        />
      </div>
      {!!selectedFiles.length && (
        <ul className="flex flex-row justify-start items-center overflow-x-scroll space-x-2 no-scrollbar w-80">
          {selectedFiles.map((file, index) => (
            <li
              className="text-xs text-slate-900 border shadow-md px-2 rounded-md flex items-center gap-1 hover:cursor-pointer hover:scale-110 transition-all duration-300"
              key={index + "-" + file.name}
            >
              <button
                className="cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={removeHandler(file.name)}
              >
                <RemoveSvg w="25px" h="25px" />
              </button>
              <span>
                {file.name.length > 10
                  ? file.name.substring(0, 10) + "..."
                  : file.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
