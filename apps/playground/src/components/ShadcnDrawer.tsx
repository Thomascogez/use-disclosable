import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";

import type { DisclosableInjectedProps } from "use-disclosable";

type Props = {
    title: string;
    description: string;
} & DisclosableInjectedProps;

export const ShadcnDrawer: React.FC<Props> = ({ title, description, closeDisclosable, isDisclosableOpen }: Props) => {
    return (
        <Drawer setBackgroundColorOnScale open={isDisclosableOpen} onOpenChange={(isOpen) => !isOpen && closeDisclosable({ destroyAfter: 500 })}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
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