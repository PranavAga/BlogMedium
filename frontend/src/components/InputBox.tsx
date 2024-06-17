type InputBoxType = {
    label:string,
    placeholder:string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    type:string|null
}

export const InputBox = ({label,placeholder,onChange,type} : InputBoxType) =>{

    return<div className="flex flex-col space-y-2">
        <label className="font-bold">{label}</label>
        <input placeholder={placeholder} onChange={onChange} type={type?type:'text'} className="outline outline-gray-100 outline-2 rounded-sm p-1"/>
    </div>
}