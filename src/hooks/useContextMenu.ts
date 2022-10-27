import { useCallback, useEffect, useState } from "react";

const useContextMenu = () => {
    const [x, setX] = useState<String>('0');
    const [y, setY] = useState<String>('0');
    const [showContextMenu, setShowContextMenu] = useState<Boolean>(false);
    const width: number = window.screen.width - 220;
    const height: number = window.screen.height - 260;

    const clickHandler = () => setShowContextMenu(false);

    const contextMenuHandler = useCallback((event: MouseEvent) => {
        event.preventDefault();
        setY(`${event.pageY + 200 > height ? `${event.pageY - 260}px`: `${event.pageY}px`}`);
        setX(`${event.pageX + 200 > width ? `${event.pageX - 220}px`: `${event.pageX}px`}`);
        setShowContextMenu(true);
    }, [width, height]);

    useEffect(() => {
        //mount
        document.addEventListener('click', clickHandler);
        document.addEventListener('contextmenu', contextMenuHandler);
        //unmount
        return () => {
            document.removeEventListener('click', clickHandler);
            document.removeEventListener('contextmenu', contextMenuHandler);
        }
    }, [contextMenuHandler]);

    return { x, y, showContextMenu };
}

export default useContextMenu;