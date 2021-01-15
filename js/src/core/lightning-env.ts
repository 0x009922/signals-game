import { Environment } from './heap';

export function useLightningEnvironment(): Environment {
    return {
        dispatch: (cb) => cb(),
    };
}
