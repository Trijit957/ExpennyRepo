"use client";

import React, { DragEvent, useRef, useState } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
	onFileUpload: (file: File | null) => void;
}

function FileUpload({ onFileUpload }: FileUploadProps) {
	const { toast } = useToast();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isFileDragging, setIsFileDragging] = useState<boolean>(false);
	const { setNodeRef, isOver } = useDroppable({
		id: "file-dropzone",
	});

	const handleDragOver = (ev: DragEvent<HTMLDivElement>) => {
		ev.preventDefault();
		setIsFileDragging(true);
	};

	const handleDragLeave = () => {
		setIsFileDragging(false);
	};

	const handleDrop = (ev: DragEvent<HTMLDivElement>) => {
		ev.preventDefault();
		const uploadedFiles = ev.dataTransfer.files;
		handleFileSelect(uploadedFiles);
		setIsFileDragging(false);
	};

	const handleFileSelect = (files: FileList | null) => {
		if (files?.[0]) {
			const file = files[0];
			console.log("file", file);
			if (file.type !== "text/csv") {
				toast({
					title: "File upload error!",
					description: "Please select a csv file (with .csv extension)",
					variant: "destructive",
				});
				if (fileInputRef?.current) {
					fileInputRef.current.value = "";
				}
				onFileUpload(null);
				return;
			} else {
				onFileUpload(file);
			}
		}
	};

	const handleDownloadSampleCsvFile = () => {
		const csvContent = `name,amount,type,date,category,note\n`;
		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "expenny_transaction_details.csv";
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<DndContext>
			<div
				ref={setNodeRef}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				className={cn(
					"mt-5 flex w-full flex-col items-center gap-2 rounded border-2 border-dashed px-3 py-5",
					isOver || isFileDragging ? "border-primary bg-neutral-50" : "border-neutral-200"
				)}
			>
				<UploadIcon className="h-5 w-5" />
				<span className="text-neutral-400 text-[16px]">
					Drag and drop file in this area to upload!
				</span>
				<span className="text-neutral-400 text-[16px]">Max size: 500MB</span>
				<span className="text-neutral-400 text-[16px]">
					To download the format,{" "}
					<span
						className="font-bold underline hover:text-primary cursor-pointer"
						onClick={handleDownloadSampleCsvFile}
					>
						click here
					</span>
				</span>
				<div className="relative inline-block">
					<input
						ref={fileInputRef}
						type="file"
						id="file-upload"
						className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
						onChange={e => {
							handleFileSelect(e.target.files);
						}}
					/>
					<Button asChild>
						<label htmlFor="file-upload" className="cursor-pointer">
							Select files
						</label>
					</Button>
				</div>
			</div>
		</DndContext>
	);
}

export default FileUpload;
