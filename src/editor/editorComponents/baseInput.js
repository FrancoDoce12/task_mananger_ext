
const BaseInput = (
    { labelText, inputType, options, inputNameId, children, unset = false, onUnset = () => { }, tag: Tag = "input", ...restProps }) => {

    const UnsetButton = unset ?
        <button className="save-input-button" onClick={onUnset}>Unset</button> :
        <></>

    return (
        <div className="input-container">
            <label className="input-label" htmlFor={inputNameId}>{labelText}</label>
            <Tag className="text-input" {...restProps} id={inputNameId} name={inputNameId} type={inputType}></Tag>
            <div className="input-options-buttons">
                {options}
                {UnsetButton}
            </div>
            {children}
        </div>
    );
};


export default BaseInput;