import { useDisclosable, type DisclosableInjectedProps } from "use-disclosable";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ShadcnDrawer2 } from "./ShadcnDrawer2";


type Props = {
    title: string;
    description: string;
} & DisclosableInjectedProps;

export const ShadcnDialog2: React.FC<Props> = ({ title, description, isDisclosableOpen, closeDisclosable }) => {
    const { setProps } = useDisclosable();

    return (
        <Dialog open={isDisclosableOpen} onOpenChange={(isOpen) => !isOpen && closeDisclosable()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                    <Button onClick={() => { setProps(ShadcnDrawer2, { description: "This description as been updated 👋" }) }}>Update drawer props</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}