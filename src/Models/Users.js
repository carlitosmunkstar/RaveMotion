const { DataTypes }=require('sequelize');
const moment = require('moment');

module.exports=(sequelize)=>{
    sequelize.define(
        'Users',
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
            },
            firstName:{
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName:{
                type: DataTypes.STRING,
                allowNull: false
            },
            mail:{
                type: DataTypes.STRING,
                allowNull: false,
                unique:true,
                validate:{isEmail: true}
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    validations(value) {
                        if (value.length < 8) {
                            throw new Error('La contraseña debe tener al menos 8 caracteres');
                        }
                        if (!/\d/.test(value)) {
                            throw new Error('La contraseña debe contener al menos un número');
                        }
                        if (/[^a-zA-Z0-9]/.test(value)) {
                            throw new Error('La contraseña no puede contener caracteres especiales');
                        }
                    }
                }
            },
            documentType:{
                type: DataTypes.STRING,
                allowNull: false
            },
            document:{
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },
            birthDay:{
                type: DataTypes.DATE,
                allowNull: false,
                validate:{
                    //* value tiene que tener el siguiente formato: isOver18('2000-08-05')
                    //* es un string 'YYYY-MM-DD'
                    isOver18(value){
                        const age=moment().diff(moment(value), 'years');
                        if (age<18){
                          throw new Error('Debes tener al menos 18 años para registrarte');
                        }
                    }
                }
            },
            cellPhone:{
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },
            userType:{
                type: DataTypes.ENUM('user','productor','rrpp','admin'),
                allowNull: false,
                defaultValue: 'user'
            }
        },
        {timestamps:false}
    )
}