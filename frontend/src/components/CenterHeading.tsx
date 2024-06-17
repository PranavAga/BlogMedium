import { Link } from "react-router-dom"

type HeadingType = {
    title:string,
    sub:string|null
}

type SubHeadingType = {
    content:string,
    gotoLink:string,
    gotoContent:string,
}

export const CenterHeading = ({title,sub} : HeadingType) =>{

    return<>
    <div className="w-72">
        <div className="font-bold text-2xl text-center">
            {title}
        </div>
        {sub?
        <div className="text-gray-500 text-center">
            {sub}
        </div>
        :
        <div>
        </div>
        }
    </div>

    </>
}

export const CenterSubHeading = ({content,gotoLink,gotoContent} : SubHeadingType) =>{

    return <div className="">
        <div className="text-center">
            {content} <Link to={gotoLink} className="underline">
                {gotoContent}
            </Link>
        </div>
    </div>
}