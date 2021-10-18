import React, { useCallback, useEffect, useState } from 'react';

const useShowModal = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const onOpeneModal = useCallback(() => {
        setIsModalVisible(true);
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