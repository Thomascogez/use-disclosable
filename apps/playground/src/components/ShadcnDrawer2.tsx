import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";

import { useDisclosable, type DisclosableInjectedProps } from "use-disclosable";
import { ShadcnDialog2 } from "./ShadcnDialog2";

type Props = {
    title: string;
    description: string;
} & DisclosableInjectedProps;

export const ShadcnDrawer2: React.FC<Props> = ({ title, description, closeDisclosable, isDisclosableOpen }: Props) => {
    const { open } = useDisclosable();
    return (
        <Drawer open={isDisclosableOpen} onOpenChange={(isOpen) => !isOpen && closeDisclosable({ destroyAfter: 500 })}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                    <Button variant="outline" onClick={() => open(ShadcnDialog2, { props: { title: "Shadcn Dialog", description: "This is a Shadcn dialog open with use-disclosable" } })}>
                        Open Shadcn Dialog
                    </Button>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}