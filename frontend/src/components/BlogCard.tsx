import { useNavigate } from 'react-router-dom';
import {UserIcon} from './UserIcon'
import { EditButton } from './EditButton';

interface BlogCardProps {
    id: string;
    title: string;
    content: string;
    authorName: string;
    publishedDate: string;
    canEdit: boolean
}

export const BlogCard = ({id, title, content, authorName, publishedDate, canEdit} : BlogCardProps)=>{
    const navigate = useNavigate();

    const gotoBlog = (id:string)=>{
        navigate('/blog/'+id);
    }

    return(<>
        <div className="flex flex-col w-2/3 p-6 border-b-2">
            <div className="flex flex-row space-x-1 items-center">
                <div><UserIcon firstName={authorName}/></div>
                <div>{authorName}</div>
                <div>·</div>
                <div className="text-grey">{publishedDate}</div>
            </div>
            <div className="text-2xl font-bold cursor-pointer my-2" onClick={()=>gotoBlog(id)}>
                {title}
            </div>
            <div className="line-clamp-2 cursor-pointer mt-2 mb-4" onClick={()=>gotoBlog(id)}>
                {content}
            </div>
            {
            canEdit?
            <EditButton id={id}/>
            :null
            }
            <div className=' h-4'></div>
        </div>
    </>)
}