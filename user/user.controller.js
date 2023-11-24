 createUser=  async(req, res, next) => {
    try {
        const hashPassword = await authService.hashPassword(req.body.password);
        const createUser = await userModel.create({
            ...req.body,
            password: hashPassword,
        });

        res.json(createUser);
    } catch (e) {
        next(e);
    }
},

    getUserById=  async (req, res, next) => {
    try {
        const { userId } = req.params;
        const getUser = await userModel.findOne(
            { _id: userId },
            { $set: req.body }
        );
        res.json(getUser);
    } catch (e) {
        next(e);
    }
},
    updateUser= async (req, res, next) => {
     try {
         const {userId} = req.params;
         const updateUser = await userModel.updateOne(
             {_id: userId},
             {$set: req.body}
         );

         res.json(updateUser);
     } catch (e) {
         next(e);
     }
 }
 module.exports={
     createUser,
     getUserById,
     updateUser
 }