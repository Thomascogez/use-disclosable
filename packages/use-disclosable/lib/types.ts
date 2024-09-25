import type { ComponentProps } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyReactComponent = React.FC<any>;

type IsEmptyObject<Obj> =
    [keyof Obj] extends [never] ? true : false

export type Disclosable<T extends AnyReactComponent> = {
    component: T;
    props: ComponentProps<T> & DisclosableInjectedProps;
};

export type OpenDisclosableOptions<T extends AnyReactComponent, P = Omit<ComponentProps<T>, keyof DisclosableInjectedProps>> = (
    IsEmptyObject<P> extends true ? { props?: P } : { props: P }
) & { identifier?: string; dismountOnClose?: boolean, replace?: boolean };

export type CloseDisclosableOptions = {
    destroyAfter?: number;
}

export type DisclosableStore = {
    subscribers: Set<() => void>;
    disclosables: Record<string, Disclosable<AnyReactComponent>>;
    disclosablesIndex: number;
    getDisclosables: () => DisclosableStore["disclosables"];
    openDisclosable: <T extends AnyReactComponent>(component: T, options?: OpenDisclosableOptions<T>) => void;
    closeDisclosable: <T extends AnyReactComponent>(component: T | string, options?: CloseDisclosableOptions) => void;
    closeAllDisclosables: (options?: CloseDisclosableOptions) => void;
    subscribe: (callback: () => void) => () => void;
    notifySubscribers: () => void;
    setDisclosableProps: <T extends AnyReactComponent>(component: T | string, props: Partial<ComponentProps<T>>) => void;
}

export type DisclosableInjectedProps = {
    disclosableIndex: number;
    isDisclosableOpen: boolean;
    closeDisclosable: (options?: CloseDisclosableOptions) => void;
}



