const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'medcloud-challenge.cybiwg003awg.sa-east-1.rds.amazonaws.com',
    user: 'admin',
    port: "3306",
    password: 'Senha123',
    database: 'medcloud',
});

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = `INSERT INTO patient(fullname, gender, birth, email, address, avatar) VALUES ('${event.fullname}', '${event.gender}', '${event.birth}','${event.email}','${event.address}','${event.avatar}')`;
    try {
        con.query(sql, (err, res) => {
            if (err) {
                throw new Error(err);
            }
            event.id = res.insertId;
            callback(null, event);
        });
    } catch (e) {
        callback(500, e.errorMessage);
    }
};
