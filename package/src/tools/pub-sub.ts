export type PubSubCallback<P> = (payload: P) => void;

export interface PubSub<K, P> {
    subscribe: (key: K, cb: PubSubCallback<P>) => () => void;
    dispatch: (key: K, payload: P) => void;
}

export function createPubSub<K, P>(): PubSub<K, P> {
    const map = new Map<K, Set<PubSubCallback<P>>>();

    function subscribe(key: K, cb: PubSubCallback<P>) {
        if (map.has(key)) {
            map.get(key)!.add(cb);
        } else {
            map.set(key, new Set([cb]));
        }

        return () => {
            map.get(key)!.delete(cb);
        };
    }

    function dispatch(key: K, payload: P) {
        const callbacks = map.get(key);
        if (callbacks) {
            callbacks.forEach((x) => x(payload));
        }
    }

    return {
        subscribe,
        dispatch,
    };
}
