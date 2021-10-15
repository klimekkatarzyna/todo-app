import { useCallback, useState } from 'react';

const useFocusingHandling = () => {
    const [isFocused, setFocused] = useState<boolean>(false);

    const onFocus = useCallback(() => {
        setFocused(true);
    }, []);

    const onBlur = useCallback(() => {
        setFocused(false);
    }, []);

    return {
        isFocused,
        onFocus,
        onBlur
    }
};

export default useFocusingHandling;