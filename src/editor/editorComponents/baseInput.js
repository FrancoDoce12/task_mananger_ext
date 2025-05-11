
const BaseInput = (
    { labelText, inputType, options, inputNameId, children, unset = false, onUnset = () => { }, tag: Tag = "input", value, ...restProps }) => {

    const UnsetButton = unset ?
        <button className="save-input-button" key={`${inputNameId}-unset`} onClick={onUnset}>Unset</button> :
        <></>

        // if it's null, make it an empty string
        if (value === null) {value = ""};

    return (
        <div className="input-container">
            <label className="input-label" htmlFor={inputNameId}>{labelText}</label>
            <Tag className="text-input" {...restProps} value={value} id={inputNameId} name={inputNameId} type={inputType}></Tag>
            <div className="input-options-buttons">
                {options}
                {UnsetButton}
            </div>
            {children}
        </div>
    );
};


export default BaseInput;