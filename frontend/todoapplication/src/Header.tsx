import { Link } from "react-router-dom";

export default function Header(){
    return(<>
        <header style={{marginTop:"0px", height:"50px",backgroundColor:"black", fontWeight:"bolder", fontSize:"large",padding:"5px"}}>
            <Link
                to="/" style={{textDecoration:"none" ,color:"white"}}>
            Todo Management System
            </Link>
        </header>
        </>
    )

}