const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_cc');

const { STRING, INTEGER, UUID, UUIDV4 } = Sequelize.DataTypes;

const members = ['moe', 'lucy', 'larry', 'ethyl'];
const facilities = ['tennis', 'ping-pong', 'raquet-ball', 'bowling'];

async function syncAndSeed() {
    await conn.sync({force:true});
    await Promise.all(members.map(member => Member.create({name:member})));
    await Promise.all(facilities.map(facility => Facility.create({name:facility})));
}

const Member = conn.define('member', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

const Facility = conn.define('facility', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});


module.exports = {
    syncAndSeed,
    models: {
        Member,
        Facility
    }
}