import React, { FC } from "react";

interface IInput {
    placeholder?: string;
}

export const Input: FC<IInput> = ({placeholder = ''}) => {
    return (
        <div>
            <label>{placeholder}</label>
            <input />
        </div>
    )
}