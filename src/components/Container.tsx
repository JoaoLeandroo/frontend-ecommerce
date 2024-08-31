import { ReactNode } from "react";

const Container = ({children}: {children: ReactNode}) => {
    return ( 
        <div className="max-w-[1920px] mx-4 md:mx-10 lg:mx-20">
            {children}
        </div>
     );
}
 
export default Container;