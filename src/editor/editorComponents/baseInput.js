
const BaseInput = ({
    labelText,
    inputType,
    options,
    inputNameId,
    children,
    unset = false,
    onUnset = () => { },
    tag: Tag = "input",
    value,
    ...restProps }) => {

    const UnsetButton = unset ?
        <button 
        className="save-input-button" 
        type="button" 
        key={`${inputNameId}-unset`} 
        onClick={onUnset}>Unset</button> 
        :
        <></>

    // if it's null, make it an empty string
    if (value === null) { value = "" };

    // default input container class
    let inputContainerClass = "input-container-column";
    let inputTagClass = "text-input";
    let labelClass = "input-label";

    if (inputType == "checkbox" || inputType == "radio") {
        inputContainerClass = "input-container-row";
        inputTagClass = "checkBox-input";
        labelClass = "input-check-label";
    };

    return (
        <div className={`base-input-container ${inputContainerClass}`}>
            <label className={labelClass} htmlFor={inputNameId}>{labelText}</label>
            <Tag className={inputTagClass} {...restProps} value={value} id={inputNameId} name={inputNameId} type={inputType}></Tag>
            <div className="input-options-buttons">
                {options}
                {UnsetButton}
            </div>
            {children}
        </div>
    );
};


export default BaseInput;