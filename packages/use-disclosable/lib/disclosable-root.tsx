"use client";

import { useDisclosable } from "./use-disclosable";

export const DisclosableRoot: React.FC<unknown> = () => {
    const { disclosables } = useDisclosable();

    return (
        <>
            {Object.entries(disclosables).map(([identifier, disclosable]) => {
                const { component: Disclosable, props } = disclosable;
                return <Disclosable key={identifier} {...props} />;
            })}
        </>
    );
};
