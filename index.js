import path from "path";
import express from 'express';
import postgres from 'postgres'
import bodyParser from "body-parser";

const sql = postgres({
    user: 'postgres',
    host: 'localhost',
    database: 'dbMitra',
    password: 'postgres',
    port: '5432',
});

const port = 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.resolve('public')));
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/loginauthuser/*', async(req, res) => {
    var array = req.params[0].split("/")
    var username = array[0]
    var kataSandi = array[1]
    console.log(username)
    console.log(kataSandi)
    const data = await sql`SELECT "berperanSebagai"."idPeran", "Peran"."peran", "Pengguna"."username", "Pengguna"."idPengguna"
    FROM "Pengguna" INNER JOIN "berperanSebagai" ON "Pengguna"."idPengguna" = "berperanSebagai"."idPengguna" 
    INNER JOIN "Peran" ON "berperanSebagai"."idPeran" = "Peran"."idPeran" WHERE "Pengguna"."username"=${username} and "Pengguna"."kataSandi"=${kataSandi} and "Pengguna"."status" != 'nonaktif'`   
    res.send(data)   
})

app.get('/getProgram/*', async(req, res) =>  {
    const data = await sql`SELECT * FROM "NamaProgram" INNER JOIN "FormLaporan" ON "NamaProgram"."idProgram" = "FormLaporan"."idProgram"
    INNER JOIN "diaksesOleh" ON "FormLaporan"."idLaporan" = "diaksesOleh"."idLaporan" INNER JOIN "Peran" ON "diaksesOleh"."idPeran" = "Peran"."idPeran"
	INNER JOIN "berperanSebagai" ON "Peran"."idPeran" = "berperanSebagai"."idPeran" INNER JOIN "Pengguna" ON "berperanSebagai"."idPengguna" = "Pengguna"."idPengguna"
    WHERE "Pengguna"."idPengguna"=${req.params[0]}`
    res.send(data)

});

app.get('/getLaporan/*', async(req, res) =>  {
    const data = await sql`SELECT * FROM "FormLaporan" WHERE "idProgram"=${req.params[0]}`
    res.send(data)
});

app.get('/getProgramVisualisasi/*', async(req, res) =>  {
    const data = await sql`SELECT "NamaProgram"."idProgram","NamaProgram"."namaProgram" FROM "NamaProgram" INNER JOIN "Visualisasi" ON "NamaProgram"."idProgram" = "Visualisasi"."idProgram"
    INNER JOIN "dilihatOleh" ON "Visualisasi"."idVisualisasi" = "dilihatOleh"."idVisualisasi" INNER JOIN "Peran" ON "dilihatOleh"."idPeran" = "Peran"."idPeran"
	INNER JOIN "berperanSebagai" ON "Peran"."idPeran" = "berperanSebagai"."idPeran" INNER JOIN "Pengguna" ON "berperanSebagai"."idPengguna" = "Pengguna"."idPengguna"
    WHERE "Pengguna"."idPengguna"=${req.params[0]}
    ORDER BY "NamaProgram"."idProgram"`
    res.send(data)

});

app.get('/getVisual/*', async(req, res) =>  {
    const data = await sql`SELECT "linkVisualisasi" FROM "Visualisasi" WHERE "idProgram"=${req.params[0]}`
    res.send(data)
});

app.post('/ubahStatus', async(req, res) => {
    var status = '';
    if (req.body.status == 'aktif') {
        status = 'nonaktif';
    }
    if (req.body.status == 'nonaktif') {
        status = 'aktif';
    }
    const data = await sql`UPDATE "Pengguna" SET "status"=${status} WHERE "idPengguna"=${req.body.id}`
    res.send(data)  
})

app.get('/getPengguna', async(req, res) => {
    const data = await sql`SELECT DISTINCT ON ("Pengguna"."idPengguna") "Pengguna"."idPengguna", "Pengguna"."username","Pengguna"."nama","Pengguna"."status","Peran"."peran"
    FROM "Pengguna" INNER JOIN "berperanSebagai" ON "Pengguna"."idPengguna" = "berperanSebagai"."idPengguna" 
    INNER JOIN "Peran" ON "berperanSebagai"."idPeran" = "Peran"."idPeran"`
    res.send(data)  
})

app.get('/getPeran/*', async(req, res) => {
    const data = await sql`SELECT "Pengguna"."idPengguna", "Pengguna"."username","Pengguna"."nama","Pengguna"."status","Peran"."peran"
    FROM "Pengguna" INNER JOIN "berperanSebagai" ON "Pengguna"."idPengguna" = "berperanSebagai"."idPengguna" 
    INNER JOIN "Peran" ON "berperanSebagai"."idPeran" = "Peran"."idPeran"
    WHERE "Pengguna"."idPengguna" = ${req.params[0]}`
    res.send(data)  
})

app.get('/getData/*', async(req, res) =>  {
    const data = await sql`SELECT "dataProgram"  FROM "Data" WHERE "idLaporan"=${req.params[0]} ORDER BY "tanggal" DESC LIMIT 1`
    res.send(data)
});

app.get('/getForm/*', async(req, res) =>  {
    const data = await sql`SELECT * FROM "ElemenForm" WHERE "idLaporan"=${req.params[0]} ORDER BY "urutan"`
    res.send(data)
});

app.post('/insertData', async(req, res) => {
    console.log(req.body)
    const data = await sql`INSERT INTO "Data"("tanggal","dataProgram","idPengguna","idLaporan") VALUES(current_timestamp,${req.body.data},${req.body.idPengguna},${req.body.idLaporan})`
    res.send(data)  
});

app.post('/insertExcel', async(req, res) => {
    console.log(req.body)
    const data = await sql`INSERT INTO "Data"("tanggal","dataProgram","idPengguna","idLaporan") VALUES(current_timestamp,${req.body.data},${req.body.idPengguna},${req.body.idLaporan})`
    res.send(data)  
});

app.get('/loginPJ/*', async(req, res) =>  {
    const data = await sql`SELECT "berperanSebagai"."idPeran" 
    FROM "Pengguna" INNER JOIN "berperanSebagai" ON "Pengguna"."idPengguna" = "berperanSebagai"."idPengguna" 
    INNER JOIN "Peran" ON "berperanSebagai"."idPeran" = "Peran"."idPeran" WHERE "Pengguna"."idPengguna" = ${req.params[0]}`
    res.send(data)

});

app.post('/insertElemenForm', async(req, res) => {
    const data = await sql`INSERT INTO "ElemenForm"("tanggalUpdate","idLaporan","formHTML","urutan","tipeData") VALUES(current_timestamp,${req.body.idLaporan},${req.body.dataFormHTML},${req.body.urutan},${req.body.tipeData})`
    res.send(data)  
});

app.post('/labelUpdate', async(req, res) => {
    const data = await sql`UPDATE "ElemenForm" SET "tanggalUpdate"=current_timestamp, "formHTML" =${req.body.formHTML}, "tipeData"=${req.body.tipeData} WHERE "idLaporan" =${req.body.idLaporan} AND "urutan" =${req.body.urutan}`
    res.send(data)  
})

app.post('/labelDelete', async(req, res) => {
    const data = await sql`DELETE FROM "ElemenForm" where "idLaporan"=${req.body.idLaporan} AND "urutan"=${req.body.urutan}`
    res.send(data)  
})

app.post('/labelUpdateUrutan', async(req, res) => {
    const data = await sql`UPDATE "ElemenForm" SET "urutan"="urutan"-1 WHERE "idLaporan"=${req.body.idLaporan} AND "urutan">${req.body.urutan}`
    res.send(data)   
})


app.get('/masuk', (req, res) => {
    res.render('masuk');
});

app.get('/visualisasiData', (req, res) => {
    res.render('visualisasiData');
});


app.get('/masukanData', (req, res) => {
    res.render('masukanData');
});


app.get('/kelolaPengguna', (req, res) => {
    res.render('kelolaPengguna');
});

app.get('/editData', (req, res) => {
    res.render('editData');
});

app.listen(port, () => {
    console.log('listening on port ' + port);
});