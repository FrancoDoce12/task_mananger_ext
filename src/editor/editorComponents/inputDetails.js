import BaseInput from "./baseInput";

const InputDetail = (
    {
        labelText,
        inputType,
        inputNameId,
        handleUpdate,
        children,
        onUnset = () => { },
        unset = false,
        tag: Tag = "input",
        ...restProps
    }
) => {


    const saveButton = (
        <button
            className="save-input-button"
            key={`${inputNameId}-save`}
            onClick={handleUpdate}
            id={inputNameId}>
            Save
        </button>);


    return (
        <BaseInput
            labelText={labelText}
            inputType={inputType}
            inputNameId={inputNameId}
            tag={Tag}
            options={[saveButton]}
            unset={unset}
            onUnset={onUnset}
            {...restProps}
        >
            {children}
        </BaseInput>
    );
};

export default InputDetail;