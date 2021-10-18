import React, { useCallback, useEffect, useState } from 'react';

const useShowModal = (selectedMenuItemType?: boolean) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsModalVisible(true);
        console.log('elo!', isModalVisible);
    }, [selectedMenuItemType]);

    const onOpeneModal = useCallback(() => {
        setIsModalVisible(true);
        console.log('elo!', isModalVisible);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsModalVisible(false);
    }, []);

    return {
        isModalVisible,
        onOpeneModal,
        onCloseModal
    }
};

export default useShowModal;