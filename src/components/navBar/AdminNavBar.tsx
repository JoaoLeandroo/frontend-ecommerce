"use client"
import { useContext } from "react";
import { AuthContext } from '@/contexts/auth';

const AdminNavBar = () => {
    const { adminBtn } = useContext(AuthContext)
    return ( 
        <div>
            {adminBtn ? "ADM" : "NORMAL USER"}
        </div>
     );
}
 
export default AdminNavBar;