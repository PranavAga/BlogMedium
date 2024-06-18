type IconProps={
    firstName: string;
    lastName?: string;
}

export const UserIcon =({firstName,lastName}: IconProps)=>{
    return <div className="bg-gray-100 flex items-center justify-center rounded-full w-8 h-8 uppercase">
        <span>{firstName?firstName[0]:''}{lastName?lastName[0]:''}</span>
    </div>
}