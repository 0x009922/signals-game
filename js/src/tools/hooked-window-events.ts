import { onBeforeUnmount } from 'vue';

type origin = Window['addEventListener'];

export const hookedWindowAddEventListener: origin = (...args: Parameters<origin>) => {
    window.addEventListener(...args);
    onBeforeUnmount(() =>
        window.removeEventListener(...(args.slice(0, 2) as Parameters<Window['removeEventListener']>)),
    );
};
