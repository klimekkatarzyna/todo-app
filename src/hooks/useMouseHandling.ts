import { useCallback, useState } from 'react';

const useMouseHandling = () => {
    const [itemVisible, setItemVisible] = useState(false);

    const onMouseEnter = useCallback(() => {
        setItemVisible(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setItemVisible(false);
    }, []);

    return {
        itemVisible,
        onMouseEnter,
        onMouseLeave
    }
};

export default useMouseHandling;