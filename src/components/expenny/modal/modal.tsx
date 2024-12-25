import React, { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
	children: ReactNode;
	title: string;
	description?: string;
	isOpen: boolean;
	onClose: (open: boolean) => void;
}

function Modal({ children, title, description, isOpen, onClose }: ModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
}

export default Modal;
