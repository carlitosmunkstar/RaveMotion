const {Users, Tickets} = require('../db');


const getUserTick = async (imail) =>{
  /* eslint-disable-next-line*/
  const findUser = await Users.findOne({
    where: {mail: imail},
    includes: {
      model: Tickets,
    },
  });
};

module.exports = {
  getUserTick,
};
