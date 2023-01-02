import User from "../model/userSchema.js"

export const show=async (req,res,next)=>{
    try {
        const user=await User.find();
        let myBranchMap= new Map()
        user.forEach(obj=>{
            if(myBranchMap.has(obj.branch)){
                myBranchMap.set(obj.branch,myBranchMap.get(obj.branch)+1)
            }
            else{
                myBranchMap.set(obj.branch,1)
            }
        })
        let arr=[]
        for (const value of myBranchMap.values()) {
            arr.push(value)
          }
        return res.json({user,arr});
    } catch (error) {
        
    }
}

export const add=async (req,res,next)=>{
    try {
        await User.create(req.body.newData)
        return res.json({mess:'data inserted'})
    } catch (error) {
        console.log(error);
    }
}

export const remove=async (req,res,next)=>{
    try {
        await User.deleteOne({roll:req.params.roll})
        res.json({mess:"Record Deleted..."})
    } catch (error) {
        console.log(error);
    }
}

export const filByBranch=async(req,res,next)=>{
    try {
        const branch=req.params.branch;
        if(branch === 'all'){
            const data = await User.find()
            return res.json(data)
        }
        else{
            const data = await User.find({branch:req.params.branch})
            return res.json(data); 
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateShow = async (req,res,next)=>{
      try {
        const data =await User.findOne({_id:req.params.id})
         return res.json(data)
    } catch (error) {
        console.log(error);
      }
}

export const update= async (req,res,next)=>{
    try {
        await User.create(req.body.updatedData)
        return res.json({mess:"Record Updated Successfully..."})
    } catch (error) {
        
    }
}