type QuoteType = {
    content: string,
    author: string,
    designation: string
}

export const Quote =({content, author, designation}:QuoteType)=>{

    return <div>
        <div className="font-bold text-xl">
            {content}
        </div>
        <div className="font-bold">
            {author}
        </div>
        <div className="text-grey">
            {designation}
        </div>
    </div>
}