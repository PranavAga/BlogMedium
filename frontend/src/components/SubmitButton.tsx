type SubmitContent = {
    title: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

export const SubmitBox = ({title, onClick} : SubmitContent) =>{

    return <div className="flex justify-center">
        <button onClick={onClick} className="bg-black text-white rounded-md h-10 w-full p-2">{title}</button>
    </div>
}