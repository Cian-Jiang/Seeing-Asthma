import mysql from 'mysql';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

export default async function handler(req, res) {
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        connection.query('SELECT * FROM Hospitalisation', (error, results) => {
            connection.release();  // Release the connection back to the pool

            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.status(200).json(results);
        });
    });
}
