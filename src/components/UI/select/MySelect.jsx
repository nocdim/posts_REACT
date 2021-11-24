import React from "react";

const MySelect = ({options, defaultvalue, value, onChange}) => {
    return (
         <select value={value} onChange={(event) => onChange(event.target.value) }> {/*Передаем значение, которое выбрал пользователь*/}
            <option disabled value="">{defaultvalue}</option>
            {options.map((option) =>
                <option key={option.value} value={option.value}>{option.name}</option>
                
            )}
        </select>
    )
}

export default MySelect