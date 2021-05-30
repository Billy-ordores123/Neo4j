var express = require('express');
var router = express.Router();
//conexion NEO4J
const neo4j = require('neo4j-driver');
var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j','123456'));
var session = driver.session();

router.post('/api/login' ,(req, res)=>{//este devuelve las peticiones
    const correo = req.body.correo;    
    const contraseña =req.body.contraseña;
    console.log("correo es:",correo)
    session
    .run(`MATCH (a {correo:'${correo}', contraseña:'${contraseña}'}) RETURN a.nombre, a.correo, a.admin`)
    .then(results => results.records.map((record) => {
        console.log(record)
        if(record){
            res.send(record);
        }else{
            res.send("NO");
        }
        
     }))
    .catch(function(err){
        console.log(err);
    })
   
})
router.post('/api/listDoctor',(req, res)=>{//este devuelve las peticiones
    
    session
    .run(`MATCH (a: medico) RETURN a`)
    .then(results => res.send(results.records))
    .catch(function(err){
        console.log(err);
    })
   
})
router.post('/api/listPatients',(req, res)=>{//este devuelve las peticiones
    
    session
    .run(`MATCH (a:enfermo) RETURN a`)
    .then(results => res.send(results.records))
    .catch(function(err){
        console.log(err);
    })
   
})
router.post('/api/asignar',(req, res)=>{//este devuelve las peticiones
    const emailDoctor= req.body.list;
    const emailPaciente= req.body.listP;
    console.log(emailDoctor);
    console.log(emailPaciente);
    session
    .run(`MATCH(u:medico) WHERE u.correo='${emailDoctor}'
    MATCH(n:enfermo) WHERE n.correo ='${emailPaciente}'
    CREATE (u)-[:ATIENDE]->(n)
    CREATE (n)-[:esATENDIDO]->(u)`)
    .then(res.send("OK"))
    .catch(function(err){
        console.log(err);
    })
   
})
router.delete('/api/deleteDoctor',(req, res)=>{
    const correo= req.query.correo;    
    console.log(correo)    
    session
    .run(`MATCH (n:medico {correo:'${correo}'}) DELETE n`)
    .then(result=>result)
    .catch(function(err){
        console.log(err);
    })
   
})
router.delete('/api/deletePatient',(req, res)=>{
    const correo= req.query.correo;    
    console.log(correo)    
    session
    .run(`MATCH (n:enfermo {correo:'${correo}'}) DELETE n`)
    .then(result=>result)
    .catch(function(err){
        console.log(err);
    })
   
})
router.post('/api/deletePaciente',(req, res)=>{
    const correoPaciente= req.body.correoPaciente;
    const correoMedico= req.body.correoMedico;   
    console.log(correoMedico.replace(/"/g, ""))
    console.log(correoPaciente)

    session
    .run(`MATCH (n:medico {correo:'${correoMedico.replace(/"/g, "")}'})-[r:ATIENDE]->(p:enfermo{correo:'${correoPaciente}'}) 
    MATCH (y:enfermo{correo:'${correoPaciente}'})-[j:esATENDIDO]->(z:medico{correo:'${correoMedico.replace(/"/g, "")}'}) 
    DELETE r, j`)
    .then(result=>result)
    .catch(function(err){
        console.log(err);
    })
   
})

router.post("/api/createDoctor", (req, res)=>{//crea los resultados no tiene porq devolver nada
    var nombre= req.body.nombre;
    var apellido=req.body.apellido;
    var especialidad=req.body.especialidad;
    var telefono=req.body.telefono;
    var correo =req.body.correo;
    var contraseña=req.body.contraseña;
    var admin=req.body.admin;
    
    if(nombre || contraseña){
        session
        .run(`CREATE (a:medico{nombre:'${nombre}', apellido:'${apellido}', especialidad:'${especialidad}', telefono:'${telefono}', admin:'${admin}', correo:'${correo}', contraseña:'${contraseña}'})`)
        .then(function(result){
            res.send("Create Correct")
        })
        .catch(function(err){
            console.log(err);
        })   
     
    }else{
        res.send("Datos no correctos")
    }

})
router.post("/api/createPatient", (req, res)=>{//crea los resultados no tiene porq devolver nada
    var nombre= req.body.nombre;
    var apellido=req.body.apellido;
    var enfermedad=req.body.enfermedad;
    var telefono=req.body.telefono;
    var correo =req.body.correo;    
    var sintomas=req.body.sintomas;
    
    if(nombre || contraseña){
        session
        .run(`CREATE (a:enfermo{nombre:'${nombre}', apellido:'${apellido}', enfermedad:'${enfermedad}', sintomas:'${sintomas}', telefono:'${telefono}', correo:'${correo}'})`)
        .then(function(result){
            res.send("Create Correct")
        })
        .catch(function(err){
            console.log(err);
        })   
     
    }else{
        res.send("Datos no correctos")
    }

})
router.post("/api/getDoctor", (req, res)=>{
    const correo=req.body.correo;
    session
    .run(`MATCH (a {correo:'${correo.replace(/"/g, "")}'}) RETURN a.nombre, a.apellido, a.telefono, a.correo, a.contraseña`)
    .then(results => {
        res.send(results);
    })
    .catch(function(err){
        console.log(err);
    })
})
router.post("/api/getPacientes", (req, res)=>{
    const correo=req.body.correo;
    console.log(correo.replace(/"/g, ""))
    session
    .run(`MATCH (a {correo:'${correo.replace(/"/g, "")}'})-[:ATIENDE]->(pa) RETURN pa.nombre, pa.apellido, pa.enfermedad, pa.sintomas, pa.correo`)
    .then(results => {
        console.log(results);
        res.send(results);
    })
    .catch(function(err){
        console.log(err);
    })
})
router.post("/api/setPaciente", (req, res)=>{
    const nombre= req.body.nombre;
    const apellido= req.body.apellido;
    const sintomas= req.body.sintomas;
    const enfermedad= req.body.enfermedad;
    const correo= req.body.correo;
       
    session
    .run(`MATCH (a {correo:'${correo}'}) SET a.nombre='${nombre}', a.apellido='${apellido}', a.sintomas='${sintomas}', a.enfermedad='${enfermedad}'`)
    .then(res.send("OK"))
    .catch(function(err){
        console.log(err);
    })
})
router.post("/api/setDoctor", (req, res)=>{
    const nombre= req.body.nombre;
    const apellido= req.body.apellido;
    const contraseña= req.body.contraseña;
    const telefono= req.body.telefono;
    const correo= req.body.correo;
       
    session
    .run(`MATCH (a {correo:'${correo}'}) SET a.nombre='${nombre}', a.apellido='${apellido}', a.telefono='${telefono}', a.contraseña='${contraseña}'`)
    .then(res.send("OK"))
    .catch(function(err){
        console.log(err);
    })
})
router.post("/api/subirJSON", (req, res)=>{       
    session
    .run(`CALL apoc.load.json("file:/text.json")
    YIELD value
    MERGE (c:hospital{nombre:value.hospital.nombre, correo:value.hospital.correo, direccion:value.hospital.direccion, telefono:value.hospital.telefono})
    WITH c, value
    UNWIND value.medico AS medico
    MERGE (a:medico{nombre:medico.nombre, apellido:medico.apellido, especialidad:medico.especialidad, correo:medico.correo, telefono:medico.telefono, admin:medico.admin, contraseña:medico.contraseña})
    MERGE (a)-[:PERTENECE]->(c)
    WITH a, value
    UNWIND value.enfermo AS enfermo
    MERGE (b:enfermo{nombre:enfermo.nombre, apellido:enfermo.apellido,sintomas:enfermo.sintomas, enfermedad:enfermo.enfermedad, telefono:enfermo.telefono, correo:enfermo.correo })
    MERGE (a)-[:ATIENDE]->(b)
    MERGE (b)-[:esATENDIDO]->(a)`)
    .then(res.send("OK"))
    .catch(function(err){
        console.log(err);
    })
})
router.post("/api/borrarData", (req, res)=>{       
    session
    .run(`MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r`)
    .then(res.send("OK"))
    .catch(function(err){
        console.log(err);
    })
})
module.exports = router;
