let express = require('express');
var async = require("async");
let router = express.Router();
let bootcamp = require('../mongo/bootcampSchema.js');
let students= require('../mongo/studentsSchema.js');
let teachers= require('../mongo/teacherSchema.js');
let users=require('../mongo/userSchema.js');
let mongoose = require('mongoose');
let session=require('express-sesssion');

let conn=mongoose.connection;



router.post('/insertBootcamp',(req,res,next)=>{
    let bootcampData={
        name:req.body.bootname,
        weeks:req.body.weeks,
      }
      let newBootcamp=new bootcamp(bootcampData)
      newBootcamp.save((err,bootcamp)=>{
        if(err){
          res.send({ code: 500, message: err.message })
        }
        res.send(bootcamp)
      }) 
})
router.get('/getBootcampData',(req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  bootcamp.find({},(err,bootdata)=>{
    students.find({},(err,studentdata)=>{
      teachers.find({},(err,teacherdata)=>{
        users.find({},(err,userdata)=>{
          let studentList=[]
          for(let i=0;i<studentdata.length;i++){
           let mail=""
           let username=""
            for(let j=0;j<userdata.length;j++){
              if(userdata[j]._id==studentdata[i].userID){
                mail=userdata[j].mail;
                username=userdata[j].username;
              }
            }
            let student={
              name: username,
              description:studentdata[i].Description,
              _id: studentdata[i]._id,
              data:{
                telefono: {label:"teléfono",content:studentdata[i].Phone,type:"shared"},
                email: {label:"email",content:mail,type:"shared"},
                domicilio: {label:"domicilio",content:studentdata[i].Adress,type:"shared"},
                codigopostal: {label:"código postal",content:studentdata[i].PostalCode,type:"shared"},
                dni: {label:"dni / pasaporte",content:studentdata[i].DNI,type:"shared"},
                fechaNacimiento: {label:"fecha de nacimiento",content:studentdata[i].Brithdate,type:"shared"},
                lugarNacimiento: {label:"lugar de nacimiento",content:studentdata[i].BornPlace,type:"shared"},
                sexo: {label:"sexo",content:studentdata[i].sex,type:"shared"},
                nacionalidad: {label:"nacionalidad",content:studentdata[i].Nationality,type:"shared"},
                estadoCivil: {label:"estado civil",content:studentdata[i].CivilStatus,type:"shared"},
                modalidadCurso: {label:"modalidad del curso",content:studentdata[i].CourseType,type:"shared"},
                estudios: {label:"estudios realizados",content:studentdata[i].Studies,type:"admisiones"},
                experienciaLaboral: {label:"experiencia laboral",content:studentdata[i].WorkExp,type:"admisiones"},
                referenciasCodenotch: {label:"referencias Codenotch",content:studentdata[i].Meetus,type:"admisiones"},
                interesCodenotch: {label:"interés por Codenotch",content:studentdata[i].InterestedOn,type:"admisiones"},
                objetivosProgramación: {label:"objetivos de aprender a programar",content:studentdata[i].MainObjectives,type:"admisiones"},
                hobbies: {label:"hobbies",content:studentdata[i].Hobbies,type:"admisiones"},
                temasInteres: {label:"temas de interés",content:studentdata[i].ThemesOfInterest,type:"admisiones"},
                empresas: {label:"empresas",content:studentdata[i].VisitedCompanies,type:"admisiones"},
                perfilCandidato: {label:"perfil de candidato",content:studentdata[i].jobProfile,type:"admisiones"},
                formaPago: {label:"forma de pago",content:studentdata[i].PayMethod,type:"contabilidad"},
                facturacionEmpresa: {label:"datos de facturación - empresa",content:studentdata[i].FactData.Name,type:"contabilidad"},
                facturacionCib: {label:"datos de facturación - cif",content:studentdata[i].FactData.CIF,type:"contabilidad"},
                facturacionDireccion: {label:"datos de facturación - dirección",content:studentdata[i].FactData.Adress,type:"contabilidad"},
                notasAdmisiones: {label:"nota de admisiones",content:studentdata[i].AdminNotes,type:"shared"}
              },
              photoPath: studentdata[i].Photo,
              links: [
                {
                    content: "Github",
                    url: studentdata[i].Github
                },
                {
                    content: "Linkedin",
                    url: studentdata[i].Linkedin
                },
                {
                    content: "Twitter",
                    url: studentdata[i].Twitter
                }
            ],
              weekComments:[
                {"weekName": "semana 1 - 02/09/2018 - 08/09/2018", comment:studentdata[i].Comment[0]},
                {"weekName": "semana 2 - 09/09/2018 - 16/09/2018", comment:studentdata[i].Comment[1]},
                {"weekName": "semana 3 - 17/09/2018 - 24/09/2018", comment:studentdata[i].Comment[2]},
                {"weekName": "semana 4 - 25/09/2018 - 01/10/2018", comment:studentdata[i].Comment[3]},
                {"weekName": "semana 5 - 02/10/2018 - 08/10/2018", comment:studentdata[i].Comment[4]},
                {"weekName": "semana 6 - 09/10/2018 - 16/10/2018", comment:studentdata[i].Comment[5]},
                {"weekName": "semana 7 - 17/10/2018 - 24/10/2018", comment:studentdata[i].Comment[6]}
            ]
            }
            studentList.push(student)
          }
          res.send({
            bootcamp:bootdata,
            studentList:studentList,
            teacherList:teacherdata
            })
        })
      })
    })
  })
})
module.exports = router;