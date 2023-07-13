import { WindowScroller, WindowScrollerChildProps, AutoSizer } from 'react-virtualized';

export type ScrollChildProps = Omit<WindowScrollerChildProps, 'onChildScroll' | 'registerChild'> & {
    onScroll: WindowScrollerChildProps['onChildScroll'],
    autoHeight: boolean
}

type ScrollerProps = {
    children: (params: ScrollChildProps) => JSX.Element
}

export function Scroller({ children }: ScrollerProps) {
    return (
        <WindowScroller>
            {({ height, scrollTop, scrollLeft, isScrolling, onChildScroll }) => (
                // TODO: Раньше был div для registerChild. Без него сейчас выпадает ошибка
                // <div
                //     ref={registerChild as any}
                //     style={{ flexFlow: 'column ' }}
                // >
                <AutoSizer disableHeight>
                    {({ width }) => {
                        return width > 0
                            ? children({
                                width,
                                height,
                                scrollTop,
                                isScrolling,
                                onScroll: onChildScroll,
                                scrollLeft,
                                autoHeight: true
                            })
                            : <div style={{ width: '100%' }} />;
                    }}
                </AutoSizer>
                // </div>
            )}
        </WindowScroller>
    );
}