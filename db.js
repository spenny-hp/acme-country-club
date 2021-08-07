const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_cc');

const { STRING, DATE, UUID, UUIDV4 } = Sequelize.DataTypes;

const members = ['moe', 'lucy', 'larry', 'ethyl'];
const facilities = ['tennis', 'ping-pong', 'raquet-ball', 'bowling'];

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
})

const Booking = conn.define('facility', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    startTime:{},
    endTime:{},
    bookedById:{},
    facilityId:{}
    }
})


async function syncAndSeed() {
    await conn.sync({force:true});
    const [moe, lucy, larry, ethyl] = await Promise.all(members.map(name => Member.create({name})));
    moe.sponsorId = lucy.id;
    ethyl.sponsorId = moe.id;
    larry.sponsorId = lucy.id;
    await Promise.all([moe.save(),ethyl.save(),larry.save()])
    await Promise.all(facilities.map(facility => Facility.create({name:facility})));
}

Member.hasMany(Member,{as: 'children', foreignKey: 'sponsorId'})

module.exports = {
    syncAndSeed,
    models: {
        Member,
        Facility
    }
}