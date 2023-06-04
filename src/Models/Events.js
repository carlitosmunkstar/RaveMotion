const { DataTypes } = require("sequelize");
const cloudinary = require("cloudinary").v2;
const moment = require("moment");
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});

module.exports = (sequelize) => {
    sequelize.define("Event", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50],
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            validate: {
                futureDate(value) {
                    const currentDate = moment().format("YYYY-MM-DD");
                    if (
                        !moment(value, "YYYY-MM-DD").isAfter(
                            currentDate,
                            "YYYY-MM-DD"
                        )
                    ) {
                        throw new Error("La fecha debe ser futura");
                    }
                },
            },
        },
        hour: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20],
            },
        },
        producer: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20],
            },
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        current: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            validate: {
                checkCurrent() {
                    const currentDate = moment().format("YYYY-MM-DD");
                    const eventDate = moment(this.date).format("YYYY-MM-DD");
                    if (moment(eventDate).isBefore(currentDate, "YYYY-MM-DD")) {
                        this.current = false;
                    }
                },
            },
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        critics: {
            type: DataTypes.INTEGER,
        },
        averageRating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
    });
};
