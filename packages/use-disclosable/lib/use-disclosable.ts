import { useSyncExternalStore } from "react";

import { disclosableStore } from "./disclosable-store";
export const useDisclosable = () => {
    const disclosables = useSyncExternalStore(disclosableStore.subscribe, disclosableStore.getDisclosables);

    return {
        disclosables,
        open: disclosableStore.openDisclosable,
        close: disclosableStore.closeDisclosable,
        closeAll: disclosableStore.closeAllDisclosables,
        setProps: disclosableStore.setDisclosableProps,
    }
}