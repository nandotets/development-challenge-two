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
    const sql = `UPDATE patient SET fullname='${event.patient.fullname}',gender='${event.patient.gender}',birth='${event.patient.birth}',email='${event.patient.email}',address='${event.patient.address}',avatar='${event.patient.avatar}' WHERE id=${event.patient.id}`;
    con.query(sql, (err, res) => {
        if (err) {
            callback(err, err);
            throw new Error(err);
        }
        con.query(`SELECT * FROM patient WHERE id=${event.patient.id}`, (err, res) => {
            if (err) {
                callback(err, err);
                throw new Error(err);
            }
            callback(null, res[0]);
        });
    });
};
