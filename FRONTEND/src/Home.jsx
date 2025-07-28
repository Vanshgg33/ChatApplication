import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:8081/auth/validate",
            {
                method:"POST",
                credentials:"include",
            }
        )
        .then((res) =>
  {
        if(res.ok){
            navigate("/chathome");
        }
        else{
            navigate("/login");
        }
    }
    )
    .catch((err)=>
    {
        console.error("Error during authentication validation:", err);
        navigate("/login");
    }
    );
    }, [navigate]);
     return <div>Validating, please wait...</div>;
}
export default Home;
