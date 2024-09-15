import mysql from 'mysql';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
});

export default async function handler(req, res) {
    const { age, sex } = req.query;

    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const query = `SELECT * FROM Hospitalisation WHERE age_group = ? AND sex IN (?)`;
        connection.query(query, [age, sex], (error, results) => {
            connection.release();

            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.status(200).json(results);
        });
    });
}
