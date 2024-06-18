import { useNavigate } from 'react-router-dom';
import {UserIcon} from './UserIcon'

interface BlogCardProps {
    id: string;
    title: string;
    content: string;
    authorName: string;
    publishedDate: string;
}

export const BlogCard = ({id, title, content, authorName, publishedDate} : BlogCardProps)=>{
    const navigate = useNavigate();

    const gotoBlog = (id:string)=>{
        navigate('/blog/'+id);
    }

    return(<>
        <div className="flex flex-col space-y-2 w-2/3 p-6 border-b-2">
            <div className="flex flex-row space-x-1 items-center">
                <div><UserIcon firstName={authorName}/></div>
                <div>{authorName}</div>
                <div>·</div>
                <div className="text-grey">{publishedDate}</div>
            </div>
            <div className="text-2xl font-bold cursor-pointer" onClick={()=>gotoBlog(id)}>
                {title}
            </div>
            <div className="line-clamp-2 cursor-pointer" onClick={()=>gotoBlog(id)}>
                {content}
            </div>
            <div className='h-8'></div>
        </div>
    </>)
}