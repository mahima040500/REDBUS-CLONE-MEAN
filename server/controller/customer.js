const Customer = require('../models/customer');
exports.addnewcustomer = async (req, res) => {
    try{
        const { name, email, googleId, profilepicture }= req.body;
        let existingcustomer = await Customer.findOne({email: email}).lean().exec();
        if(existingcustomer){
            res.send(existingcustomer)
        }else{
            const customer = new Customer({
                name, email, googleId, profilepicture
            });
            const newCustomer = await customer.save()
            res.status(201).json(newCustomer);
        }
    }catch(error){
        console.error('error adding customer', error);
        res.status(500).json({error: "internal serve error"})
    }
}