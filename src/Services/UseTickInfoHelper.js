const { Users, Tickets } = require("../db");


const getUserTick = async (imail) =>{
    const findUser = await Users.findOne({
        where: {mail: imail},
        includes: {
            model: Tickets,
        }
    })
} 

module.exports = {
    getUserTick
}