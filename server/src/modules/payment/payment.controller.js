export const payment = async(req,res)=>{
    try {
        return res.status(200).json({message: 'Hello Payment!'})
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}