import axios from './index';

//register

export const Registeruser = async(payload)=>{
    
try{
   
    const response = await axios.post("/users/register",payload);
    return response.data;

}
catch(error){
return error.message;
}

}

//login
export const Loginuser = async(payload)=>{

    try{
        const response = await axios.post("/users/login",payload);
        return response.data;
    
    }
    catch(error){
    return error.message;
    }
    
    }

    //get user protected
    export const GetCurrentuser = async()=>{
    
        try{
            const response = await axios.get("/users/get-current-user");
            
            return response.data;
        
        }
        catch(error){
        return error.message;
        }
        
        }

  // add task
  export const AddTaskuser = async(payload)=>{
    
    try{
       
        const response = await axios.post("/users/add-task",payload);
        return response.data;
    }
    catch(error){
    return error.message;
    }
    
    }   
    
    // get task
    export const GetAlltask = async()=>{
    
        try{
           
            const response = await axios.get("/users/get-all-tasks");
            return response.data;
        }
        catch(error){
        return error.message;
        }
        
        }  // edit a task
        export const updatetask = async(payload)=>{
            
            try{
               
                const response = await axios.post("/users/update-task",payload);
                return response.data;
            }
            catch(error){
            return error.message;
            }
            
            }
        
            // delete
        
            export const deletetask = async(payload)=>{
            
                try{
                   
                    const response = await axios.post("/users/delete-task",payload);
                    return response.data;
                }
                catch(error){
                return error.message;
                }
                
                }