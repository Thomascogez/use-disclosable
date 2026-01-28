import { type DisclosableInjectedProps } from "use-disclosable";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";


type Props = {
    title: string;
    description: string;
} & DisclosableInjectedProps;

export const ShadcnAlertDialog: React.FC<Props> = ({ title, description, isDisclosableOpen, closeDisclosable }) => {
    return (
        <Dialog open={isDisclosableOpen}>
            <DialogContent showCloseButton={false} onEscapeKeyDown={(e) =>e.preventDefault()} onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => closeDisclosable({closeReason: "canceled",destroyAfter: 500})}>Cancel</Button>
                    <Button onClick={() => closeDisclosable({closeReason: "accepted",destroyAfter: 500})}>Ok</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}