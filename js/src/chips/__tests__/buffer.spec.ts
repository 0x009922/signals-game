import { Direction } from '@/core/heap';
import { useContextMock } from '@/core/__tests__/ctx-mock';
import { PortType, setupBufferChip } from '../buffer';

describe('buffer chip', () => {
    it('вход загорается при подаче сигнала', () => {
        const { ctx, received } = useContextMock();
        const { ports } = setupBufferChip(ctx);

        received.value = [{ dir: Direction.Up }];

        expect(ports[Direction.Down].active).toEqual(true);
    });

    it('установка типа порта работает', () => {
        const { ctx } = useContextMock();
        const { ports, setPortType } = setupBufferChip(ctx);

        setPortType(Direction.Down, PortType.Out);

        expect(ports[Direction.Down].type).toEqual(PortType.Out);
    });

    it('выход загорается при подаче на вход', () => {
        const { ctx, received } = useContextMock();
        const { ports, setPortType } = setupBufferChip(ctx);

        setPortType(Direction.Left, PortType.Out);
        received.value = [{ dir: Direction.Left }];

        expect(ports[Direction.Left].active).toEqual(true);
    });
});
