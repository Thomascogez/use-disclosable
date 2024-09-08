"use client";

import { useDisclosable } from "./use-disclosable";

export const DisclosableRoot: React.FC<unknown> = () => {
    const { disclosables } = useDisclosable();

    return (
        <div className="disclosable-root">
            {Object.entries(disclosables).map(([identifier, disclosable]) => {
                const { component: Disclosable, props } = disclosable;
                return <Disclosable key={identifier} {...props} />;
            })}
        </div>
    );
};
