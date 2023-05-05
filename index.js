const server=require('./src/app.js');
const { sequelize }=require('./src/db.js');
const PORT = process.env.DB_PORT || 3001;

sequelize.sync({force:true}).then(()=>{
    server.listen(PORT,()=>{
        console.log(`Listen at ${PORT}`);
    })
})