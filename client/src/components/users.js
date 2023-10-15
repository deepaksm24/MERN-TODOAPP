import { axiosInstance } from ".";

//register

export const Registeruser = async(payload)=>{
    // console.log("hi",payload);
try{
   
    const response = await axiosInstance.post("/users/register",payload);
    return response.data;

}
catch(error){
return error.message;
}

}

//login
export const Loginuser = async(payload)=>{

    try{
        const response = await axiosInstance.post("/users/login",payload);
        return response.data;
    
    }
    catch(error){
    return error.message;
    }
    
    }

    //get user protected
    export const GetCurrentuser = async()=>{

        try{
            const response = await axiosInstance.get("/users/get-current-user");
            
            return response.data;
        
        }
        catch(error){
        return error.message;
        }
        
        }
        