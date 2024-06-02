const IncomeSchema = require("../models/incomeModel");

exports.addIncome=async(req,res) =>{
    const {title,amount,category,description,date}=req.body;

    const income=IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try{
        //validations
        if(!title || !amount || !category || !date){
            return res.status(400).json({message:'ALL FIELDS ARE REQUIRED'})
        }
        if(amount<=0){
            return res.status(400).json({message:"Amount must be positive"})
        }
        await income.save()
        res.status(200).json({message:"Income added successfully"})
    }
    catch(e){
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
}


exports.getIncomes=async(req,res)=>{
    try{
        const incomes=await IncomeSchema.find().sort({createdAt:-1})
        res.status(200).json(incomes)
    }
    catch(e){
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.deleteIncomes=async(req,res)=>{
        const {id}=req.params;
        IncomeSchema.findByIdAndDelete(id).then((income)=>{
            res.status(200).json({message:"Income deleted"})
        }).catch((error)=>{
            console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
        })
}