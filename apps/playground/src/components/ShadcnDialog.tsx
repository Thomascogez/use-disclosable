import type { DisclosableInjectedProps } from "use-disclosable";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";


type Props = {
    title: string;
    description: string;
} & DisclosableInjectedProps;

export const ShadcnDialog: React.FC<Props> = ({ title, description, isDisclosableOpen, closeDisclosable }) => {
    return (
        <Dialog open={isDisclosableOpen} onOpenChange={(isOpen) => !isOpen && closeDisclosable()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}