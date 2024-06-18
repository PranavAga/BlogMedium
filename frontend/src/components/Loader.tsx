import { Discuss } from "react-loader-spinner"
import { Appbar } from "./AppBar"


export const Loader = () =>{
    
    return(
        <>
            <Appbar/>
            <div className="flex h-screen items-center justify-center ">
                <Discuss
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="discuss-loading"
                    wrapperStyle={{}}
                    wrapperClass="discuss-wrapper"
                    colors={["#000000","#000000"]}
                />
            </div>
        </>
    )
}