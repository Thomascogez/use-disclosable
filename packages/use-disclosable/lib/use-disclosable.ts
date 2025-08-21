import { useSyncExternalStore } from "react";

import { disclosableStore } from "./disclosable-store";
import type { DisclosableStore } from "./types";

// This allow to make next.js build work
const stubServerSnapshotResult = {};
const getStubServerSnapshot = (): DisclosableStore["disclosables"] => stubServerSnapshotResult;

export const useDisclosable = () => {
    const disclosables = useSyncExternalStore(disclosableStore.subscribe, disclosableStore.getDisclosables, getStubServerSnapshot);

    return {
        disclosables,
        open: disclosableStore.openDisclosable,
        close: disclosableStore.closeDisclosable,
        closeAll: disclosableStore.closeAllDisclosables,
        setProps: disclosableStore.setDisclosableProps,
    }
}