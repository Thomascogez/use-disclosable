import { memo } from "react";

import type { CloseDisclosableOptions, DisclosableStore } from "./types";
import { omit } from "./utils";

export const disclosableStore: DisclosableStore = {
    subscribers: new Set(),
    disclosables: {},
    disclosablesIndex: 0,
    getDisclosables: () => disclosableStore.disclosables,
    openDisclosable: (component, options) => {
        const disclosableIdentifier = options?.identifier ?? component.name;

        if (!options?.replace && disclosableIdentifier in disclosableStore.disclosables) {
            return Promise.resolve(undefined)
        }

        disclosableStore.disclosablesIndex = disclosableStore.disclosablesIndex + 1;

        const openPromise = Promise.withResolvers<string | undefined>()


        disclosableStore.disclosables = {
            ...disclosableStore.disclosables,
            [disclosableIdentifier]: {
                component: memo(component),
                "~openPromiseResolver": openPromise,
                props: {
                    disclosableIndex: disclosableStore.disclosablesIndex,
                    isDisclosableOpen: true,
                    closeDisclosable: (options?: CloseDisclosableOptions) => {
                        disclosableStore.closeDisclosable(disclosableIdentifier, options);
                        openPromise.resolve(options?.closeReason)
                    },
                    ...options?.props,
                }
            }
        }

        disclosableStore.notifySubscribers();

        return openPromise.promise;
    },
    closeDisclosable: (component, options) => {
        const disclosableIdentifier = typeof component === "string" ? component : component.name;
        if (disclosableIdentifier in disclosableStore.disclosables) {

            const openPromiseResolver = disclosableStore.disclosables[disclosableIdentifier]["~openPromiseResolver"];

            disclosableStore.disclosables = {
                ...disclosableStore.disclosables,
                [disclosableIdentifier]: {
                    ...disclosableStore.disclosables[disclosableIdentifier],
                    props: {
                        ...disclosableStore.disclosables[disclosableIdentifier].props,
                        isDisclosableOpen: false,
                    }
                }
            }
            disclosableStore.notifySubscribers();

            setTimeout(() => {
                disclosableStore.disclosables = omit(disclosableStore.disclosables, [disclosableIdentifier]);
                disclosableStore.notifySubscribers();
                openPromiseResolver.resolve(options?.closeReason);
            }, options?.destroyAfter ?? 0);
        }
    },
    closeAllDisclosables: (options) => {
        const openPromiseResolvers = Object.values(disclosableStore.disclosables)
            .filter(disclosable => disclosable.props.isDisclosableOpen)
            .map(disclosable => disclosable["~openPromiseResolver"]);

            
        disclosableStore.disclosables = Object.fromEntries(
            Object.entries(disclosableStore.disclosables)
                .map(([identifier, disclosable]) => [identifier, {
                    ...disclosable,
                    props: {
                        ...disclosable.props,
                        isDisclosableOpen: false,
                    }
                }])
        )

        disclosableStore.notifySubscribers();

        setTimeout(() => {
            disclosableStore.disclosablesIndex = 0;
            disclosableStore.disclosables = {};
            disclosableStore.notifySubscribers();

            openPromiseResolvers.forEach(openPromiseResolver => openPromiseResolver.resolve(options?.closeReason));
        }, options?.destroyAfter ?? 0);
    },
    setDisclosableProps: (component, props) => {
        const disclosableIdentifier = typeof component === "string" ? component : component.name;

        if (disclosableIdentifier in disclosableStore.disclosables) {
            disclosableStore.disclosables = {
                ...disclosableStore.disclosables,
                [disclosableIdentifier]: {
                    ...disclosableStore.disclosables[disclosableIdentifier],
                    props: {
                        ...disclosableStore.disclosables[disclosableIdentifier].props,
                        ...props,
                    }
                }
            }
            disclosableStore.notifySubscribers();
        }
    },
    subscribe: (subscriber: () => void) => {
        disclosableStore.subscribers.add(subscriber);
        return () => disclosableStore.subscribers.delete(subscriber);
    },
    notifySubscribers: () => {
        disclosableStore.subscribers.forEach(subscriber => subscriber());
    },

};