'use strict'

let Persona = require('../models/persona.model');
const CONN = require('./connection.controller');
let jwt = require('../services/jwtPersona');
let path = require('path');
var fs = require('fs');
let contrasena = "";

function getNotificacionesPersona(req, res) {
    let idPersona = req.params.idPersona;
    CONN('notificacionpersona')
    .select('idNotifPersona', 'msgNotifPersona', 'fechaNotifPersona', 'urlNotiPersona')
    .orderBy('fechaNotifPersona', 'desc')
    .where('idPersona', idPersona)
    .andWhere('statusNotiPersona', 0)
    .then(respon => {
        CONN('notificacionpersona')
        .select('idNotifPersona', 'msgNotifPersona', 'fechaNotifPersona', 'urlNotiPersona')
        .orderBy('fechaNotifPersona', 'desc')
        .where('idPersona', idPersona)
        .andWhere('statusNotiPersona', 1)
        .then(respuesta => {
            res.status(200).send({resp: 'Consulta exitosa', NoVistos: respon, Vistos: respuesta });
        })
     }).catch(error => {
         res.status(404).send({ resp: 'Error', error: `${error}` });
     })
}

function verNotificacionesPersona(req, res) {
    let idNotif = req.params.idNotifPersona;
    CONN('notificacionpersona')
    .update('statusNotiPersona', 1)
    .where('idNotifPersona', idNotif)
    .then(response => {
        res.status(200).send({resp: 'Actualizado'});
    }).catch(error => {
        res.status(404).send({ resp: 'Error', error: `${error}` });
    })
}

function loginPersona(req, res) {
    let correo = req.body.correoPersona;
    let contrasena = req.body.contrasenaPersona;
    let gethash = req.body.gethash;
    CONN('persona').where('correoPersona', correo)
        .andWhere('contrasenaPersona', contrasena)
        .select().then(usuario => {
            console.log(usuario)
            if (!usuario) {
                res.status(500).send({ resp: 'Error', message: 'Error en el servidor este si' })
            } else {
                if (usuario.length <= 0) {
                    res.status(404).send({ resp: 'Error', message: 'Error en el usuario o contraseña' })
                } else {
                    if (usuario[0]['statusPersona'] != 1) {
                        res.status(404).send({ resp: 'Error', message: 'Lo sentimos, este correo esta dado de baja' });
                    } else {
                        let idPersona = usuario[0].idPersona;

                        // .then(idCurso => {
                        if (gethash) {
                            let token = jwt.createToken(usuario);
                            getPersonaperfiles2(res, idPersona, token);
                        } else {
                             res.status(200).send({ resp: 'Sesion iniciada', usuario: {idAdministrador:usuario[0].idPersona,
                                 nombreAdministrador:usuario[0].nombrePersona,
                                 apellidopaternoAdministrador:usuario[0].apellidopaternoPersona,
                                 apellidomaternoAdministrador:usuario[0].apellidomaternoPersona,
                                 correoAdministrador:usuario[0].correoPersona,
                                 contrasenaAdministrador:usuario[0].contrasenaPersona,
                                 telefonoAdministrador:usuario[0].telefonoPersona,
                                 imagenAdministrador:usuario[0].imagenPersona

                             } });
                        }

                    }
                }
            }
        }).catch(error => {
            res.status(500).send({ resp: 'error', error: `${error}` });
        })
}





function registraPersona(req, res) {
    generarPassword(8);
    let persona = new Persona(req.body.persona.nombrePersona,
        req.body.persona.apellidopaternoPersona,
        req.body.persona.apellidomaternoPersona,
        req.body.persona.correoPersona,
        req.body.persona.descripcionPersona,
        'default.png',
        1,
        req.body.persona.telefonoPersona,
        contrasena);
    CONN('persona').insert(persona)
        .then(row => {
            let idPersona = row[0];
            CONN('catalogoespecialidadpersona')
                .insert({
                    idPersona_CatalogoespecialidadPersona: idPersona,
                    idCatalogoespecialidad_CatalogoespecialidadPersona: req.body.especialidad.idCatalogoespecialidad_CatalogoespecialidadPersona
                })
                .then(result => {
                    res.status(200).send({ resp: 'Exito', message: 'Persona Registrada correctamente' })
                })
                .catch(error => {
                    res.status(500).send({
                        resp: 'error',
                        error: `${error}`
                    });
                });
        })
        .catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });

}

function actualizarPersona2(req, res) {
    let idPersona = req.params.idPersona;
    let persona = new Persona(
        req.body.nombrePersona,
        req.body.apellidopaternoPersona,
        req.body.apellidomaternoPersona,
        req.body.correoPersona,
        req.body.descripcionPersona,
        req.body.imagenPersona,
        1,
        req.body.telefonoPersona,
        req.body.contrasenaPersona
    );
    CONN('persona').where('idPersona', idPersona).update(persona).then(result => {
                    res.status(200).send({ resp: 'Exito', message: 'Se actualizó correctamente la persona' })
                })
        .catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

function actualizarPersona(req, res) {
    let idPersona = req.params.idPersona;
    let persona = new Persona(
        req.body.persona.nombrePersona,
        req.body.persona.apellidopaternoPersona,
        req.body.persona.apellidomaternoPersona,
        req.body.persona.correoPersona,
        req.body.persona.descripcionPersona,
        req.body.persona.imagenPersona,
        req.body.persona.statusPersona,
        req.body.persona.telefonoPersona,
        req.body.persona.contrasenaPersona
    );
    CONN('persona').where('idPersona', idPersona).update(persona).then(result => {
            CONN('catalogoespecialidadpersona').where('idPersona_CatalogoespecialidadPersona', idPersona)
                .update({ idCatalogoespecialidad_CatalogoespecialidadPersona: req.body.especialidad.idCatalogoespecialidad_CatalogoespecialidadPersona })
                .then(result2 => {
                    res.status(200).send({ resp: 'Exito', message: 'Se actualizó correctamente la persona' })
                })
                .catch(error => {
                    res.status(500).send({
                        resp: 'error',
                        error: `${error}`
                    });
                });
        })
        .catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

function getPersonas(req, res) {
    CONN('persona').select()
        .then(personas => {
            res.status(200).send({ resp: 'Exito', personas: personas })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        });
}

function getPersona(req, res) {
    let idPersona = req.params.idPersona;
    CONN('catalogoespecialidadPersona')
        .join('persona', 'catalogoespecialidadPersona.idPersona_CatalogoespecialidadPersona', '=', 'persona.idPersona')
        .where('persona.idPersona', idPersona)
        .select()
        .then(persona => {
            res.status(200).send({ resp: 'Exito', persona: persona })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        });
}


function subeImagenPersona(req, res) {
    let idPersona = req.params.idPersona;
    let imagenPersona = req.file;
    CONN('persona').where('idPersona', idPersona).update('imagenPersona', req.file.filename)
        .then(result => {
            if (!result) {
                res.status(500).send({ resp: 'Error', message: 'No se actualizo la foto' })
            } else {
                CONN('persona').select('imagenPersona').where('idPersona', idPersona)
                    .then(image => {
                        if (!image) {
                            res.status(500).send({ resp: 'Error', message: 'error al devolver foto' })
                        } else {
                            res.status(200).send({ image: image[0] });
                        }
                    }).catch(error => {
                        res.status(404).send({ resp: 'Error', error: `${error}` });
                    })
            }
        }).catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}


let getImageFilePersona = (req, res) => {
    let imagenFile = req.params.imagenPersona;
    let path_file = `./imgs/Persona/${imagenFile}`;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la Imagen' });
        }
    });
}

function generarPassword(longitud) {
    let long = parseInt(longitud);
    let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
    contrasena = "";
    for (let i = 0; i < long; i++) contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
}


// function asignarPerfil(req, res) {
//     let idPersona = req.body.idPersona;
//     let idCurso = req.body.idCurso;
//     let perfil = req.body.perfil;
//     let idPerfil = [];
//     let idPersonaPerfil = [];
//     let contador = 0;
//     let contador2 = 0;
//     perfil.forEach(function(element, index, array) {
//         idPerfil.push({
//             idPersona_PersonaPerfil: idPersona,
//             idPerfil_PersonaPerfil: element.idPerfil
//         })
//         contador++;
//         if (contador === array.length) {
//             CONN('PersonaPerfil').insert(idPerfil)
//                 .then(response => {
//                  // console.log(response);
//                     CONN('PersonaCurso').insert({
//                             idPersona_PersonaCurso: idPersona,
//                             idCurso_PersonaCurso: idCurso
//                         })
//                         .then(idPersonaCurso => {
//                             let idPersonaCurso2 = idPersonaCurso[0];
//                             CONN('PersonaPerfil')
//                                 .select()
//                                 .where('idPersona_PersonaPerfil', idPersona)
//                                 .then(allPerfiles => {
//                                     allPerfiles.forEach(function(element, index, array) {
//                                         idPersonaPerfil.push({
//                                             idPersonaCurso_PersonaCursoPerfil: idPersonaCurso2,
//                                             idPersonaPerfil_PersonaCursoPerfil: element.idPersonaPerfil
//                                         })
//                                         contador2++;
//                                         if (contador2 === array.length) {
//                                             CONN('PersonaCursoPerfil').insert(idPersonaPerfil)
//                                                 .then(finish => {
//                                                     res.status(200).send({ resp: 'Exito', message: 'Perfil Asignado Correctamente' })
//                                                 })
//                                                 .catch(error => {
//                                                     res.status(404).send({ resp: 'Error', error: `${error}` });
//                                                 })
//                                         }
//                                     })
//                                 })
//                                 .catch(error => {
//                                     res.status(404).send({ resp: 'Error', error: `${error}` });
//                                 })
//                         })
//                         .catch(error => {
//                             res.status(404).send({ resp: 'Error', error: `${error}` });
//                         })
//                 })
//                 .catch(error => {
//                     res.status(404).send({ resp: 'Error', error: `${error}` });
//                 })
//         }
//     })

// }


function asignarPerfil(req, res) {
    let idPersona = req.body.idPersona;
    let idCurso = req.body.idCurso;
    let perfil = req.body.perfil;
    let idPerfil = [];
    let idPersonaPerfil = [];
    let contador = 0;
    let contador2 = 0;
    CONN('PersonaCurso').insert({
                            idPersona_PersonaCurso: idPersona,
                            idCurso_PersonaCurso: idCurso
                        })
                        .then(idPersonaCurso => {
                        res.status(200).send({ resp: 'Exito', message: 'Persona Asignada Correctamente' })
                                        })
                                        .catch(error => {
                                            res.status(404).send({ resp: 'Error', error: `${error}` });
                                        })
    // perfil.forEach(function(element, index, array) {
    //     CONN('PersonaPerfil').insert({
    //             idPersona_PersonaPerfil: idPersona,
    //             idPerfil_PersonaPerfil: element.idPerfil
    //         })
    //         .then(response => {
    //             let id = response[0];
    //             idPerfil.push(id)
    //             contador++;
    //             if (contador === array.length) {

    //                 CONN('PersonaCurso').insert({
    //                         idPersona_PersonaCurso: idPersona,
    //                         idCurso_PersonaCurso: idCurso
    //                     })
    //                     .then(idPersonaCurso => {
    //                         let idPersonaCurso2 = idPersonaCurso[0];
    //                         idPerfil.forEach(function(element, index, array) {
    //                             idPersonaPerfil.push({
    //                                 idPersonaCurso_PersonaCursoPerfil: idPersonaCurso2,
    //                                 idPersonaPerfil_PersonaCursoPerfil: element
    //                             })
    //                             contador2++;
    //                             if (contador2 === array.length) {
    //                                 CONN('PersonaCursoPerfil').insert(idPersonaPerfil)
    //                                     .then(finish => {
    //                                         res.status(200).send({ resp: 'Exito', message: 'Perfil Asignado Correctamente' })
    //                                     })
    //                                     .catch(error => {
    //                                         res.status(404).send({ resp: 'Error', error: `${error}` });
    //                                     })
    //                             }
    //                         })
    //                     })
    //                     .catch(error => {
    //                         res.status(404).send({ resp: 'Error', error: `${error}` });
    //                     })
    //             }
    //         })
    //         .catch(error => {
    //             res.status(404).send({ resp: 'Error', error: `${error}` });
    //         })
    // })
}


// function actualizarPerfil(req,res){
//  let idPersona = req.body.idPersona;
//  let idCurso = req.body.idCurso;
//  let perfil = req.body.perfil;
//  let idPerfil = [];
//  let idPersonaPerfil = [];
//  let contador = 0;
//  let contador2 = 0;
//  perfil.forEach(function(element, index, array){
//      idPerfil.push({
//          idPersona_PersonaPerfil:idPersona,
//          idPerfil_PersonaPerfil:element.idPerfil         
//      })
//      contador ++;
//      if (contador === array.length) {

//          CONN('PersonaPerfil').where('idPersona_PersonaPerfil',idPersona).insert(idPerfil)
//          .then(response=>{
//              CONN('PersonaCurso').where('idPersona_PersonaCurso',idPersona).update({
//                  idPersona_PersonaCurso:idPersona,
//                  idCurso_PersonaCurso:idCurso
//              })
//              .then(idPersonaCurso=>{
//                  console.log(idPersonaCurso)
//                  let idPersonaCurso2 = idPersonaCurso;

//                  CONN('PersonaPerfil')
//                  .select()
//                  .where('idPersona_PersonaPerfil', idPersona)
//                  .then(allPerfiles=>{
//                      console.log(allPerfiles);
//                      allPerfiles.forEach(function(element, index, array){
//                          idPersonaPerfil.push({
//                              idPersonaCurso_PersonaCursoPerfil:idPersonaCurso2,
//                              idPersonaPerfil_PersonaCursoPerfil:element.idPersonaPerfil  
//                          })
//                          contador2 ++;
//                          if (contador2 === array.length) {
//                              CONN('PersonaCursoPerfil').where('idPersonaPerfil_PersonaCursoPerfil',idPersona).insert(idPersonaPerfil)
//                              .then(finish=>{
//                                  res.status(200).send({resp:'Exito', message:'Perfil Actualizado Correctamente'})
//                              })
//                              .catch(error=>{
//                                  res.status(404).send({resp:'Error',error:`${error}`});
//                              })
//                          }
//                      })
//                  })
//                  .catch(error=>{
//                      res.status(404).send({resp:'Error',error:`${error}`});
//                  })
//              })
//              .catch(error=>{
//                  res.status(404).send({resp:'Error',error:`${error}`});
//              })
//          })
//          .catch(error=>{
//              res.status(404).send({resp:'Error',error:`${error}`});
//          })
//      }
//  })  

// }

function actualizarCurso(req, res) {
    let idPersona = req.body.idPersona;
    let idCurso = req.body.idCurso;
    let idPerCur = req.body.idPersonaCurso;
    let nidCurso = req.body.nidCurso;
    CONN('PersonaCurso').where('idPersona_PersonaCurso', idPersona)
        .andWhere('idPersonaCurso', idPerCur)
        .update({
            idCurso_PersonaCurso: nidCurso
        })
        .then(resp => {
            res.status(200).send({ resp: 'Exito', message: 'Perfil Actualizado Correctamente' })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })

}

function actualizarPerfiles(req, res) {
    let idPersona = req.body.idPersona;
    let perfil = req.body.perfil;
    let idPerCur = req.body.idPersonaCurso;
    perfil.forEach(function(element, index, array) {
        CONN('PersonaPerfil')
            .select()
            .where('idPerfil_PersonaPerfil', element.idPerfil)
            .then(response => {
                if (response.length > 0) {} else {
                    CONN('PersonaPerfil').insert({
                            idPersona_PersonaPerfil: idPersona,
                            idPerfil_PersonaPerfil: element.idPerfil
                        }).then(idPersonaPerfil => {
                            CONN('PersonaCursoPerfil').insert({
                                    idPersonaCurso_PersonaCursoPerfil: idPerCur,
                                    idPersonaPerfil_PersonaCursoPerfil: idPersonaPerfil
                                }).then(finish => {
                                    res.status(200).send({ resp: 'Exito', message: 'Perfil Actualizado Correctamente' })
                                })
                                .catch(error => {
                                    res.status(404).send({ resp: 'Error', error: `${error}` });
                                })

                        })
                        .catch(error => {
                            res.status(404).send({ resp: 'Error', error: `${error}` });
                        })
                }
            })

    })
}

function eliminarPerfil(req, res) {
    let idPersonaPerfil = req.params.idPersonaPerfil;
    let idPerfil_PersonaPerfil = req.params.idPerfil_PersonaPerfil;
    CONN('PersonaPerfil').where('idPersonaPerfil', idPersonaPerfil).andWhere('idPerfil_PersonaPerfil', idPerfil_PersonaPerfil)
        .del().then(response => {
            res.status(200).send({ resp: 'Exito', message: 'Perfil Eliminado Correctamente' })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}

// function actualizarPerfil(req, res) {
//     let idPersona = req.body.idPersona;
//     let idCurso = req.body.idCurso;
//     let perfil = req.body.perfil;

//     let idPerCur = req.body.idPersonaCurso;
//     // let idPerCurPer = req.body.idPersonaCursoPerfil;
//     // let idPerf = req.body.idPersonaPerfil;

//     let idPerfil = [];
//     let idPersonaPerfil = [];
//     let idPerCur2;
//     let contador = 0;
//     let contador2 = 0;
//     perfil.forEach(function(element, index, array) {
//         CONN('PersonaPerfil')
//             .select()
//             .where('idPerfil_PersonaPerfil', element.idPerfil)
//             .then(response => {
//                 if (response.length > 0) {
//                     // CONN('PersonaCurso').select().where('idPersona_PersonaCurso', idPersona)
//                     // .then(resp => {
//                     CONN('PersonaCurso').where('idPersona_PersonaCurso', idPersona)
//                         .andWhere('idPersonaCurso', idPerCur)
//                         .update({
//                             idCurso_PersonaCurso: idCurso
//                         })
//                         .then(resp => {
//                             res.status(200).send({ resp: 'Exito', message: 'Perfil Actualizado Correctamente' })
//                         })
//                         .catch(error => {
//                             res.status(404).send({ resp: 'Error', error: `${error}` });
//                         })

//                         // })
//                         .catch(error => {
//                             res.status(404).send({ resp: 'Error', error: `${error}` });
//                         })

//                 } else {
//                     CONN('PersonaPerfil').insert({
//                             idPersona_PersonaPerfil: idPersona,
//                             idPerfil_PersonaPerfil: element.idPerfil
//                         }).then(idPersonaPerfil => {
//                             CONN('PersonaCursoPerfil').insert({
//                                     idPersonaCurso_PersonaCursoPerfil: idPerCur,
//                                     idPersonaPerfil_PersonaCursoPerfil: idPersonaPerfil
//                                 }).then(finish => {
//                                     res.status(200).send({ resp: 'Exito', message: 'Perfil Actualizado Correctamente' })
//                                 })
//                                 .catch(error => {
//                                     res.status(404).send({ resp: 'Error', error: `${error}` });
//                                 })

//                         })
//                         .catch(error => {
//                             res.status(404).send({ resp: 'Error', error: `${error}` });
//                         })
//                 }
//             })
//     })
// }


function getPersonasperfiles(req, res) {
    CONN('PersonaPerfil')
        .join('Persona', 'PersonaPerfil.idPersona_PersonaPerfil', '=', 'Persona.idPersona')
        .select('*')
        .groupBy('Persona.idPersona')
        .then(personas => {
            res.status(200).send({ resp: 'Exito', personas: personas })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}

function getPersonaperfiles(req, res) {
    let idPersona = req.params.idPersona;
    CONN('Persona')
        .select()
        .where('idPersona', idPersona)
        .then(persona => {
            CONN('PersonaCurso')
                .join('Persona', 'PersonaCurso.idPersona_PersonaCurso', '=', 'Persona.idPersona')
                .join('Curso', 'PersonaCurso.idCurso_PersonaCurso', '=', 'Curso.idCurso')
                .where('Persona.idPersona', idPersona)
                .select('Curso.nombreCurso', 'Curso.idCurso')
                .then(cursosPersona => {
                    res.send({ persona: persona, cursosPersona: cursosPersona })
                })
                .catch(error => {
                    res.status(404).send({ resp: 'Error', error: `${error}` });
                })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}

function getPersonaperfiles2(res, idPersona, token) {
    let permisos = []
    let contador = 0;
    CONN('PersonaCursoPerfil')
        .join('PersonaCurso', 'PersonaCursoPerfil.idPersonaCurso_PersonaCursoPerfil', '=', 'PersonaCurso.idPersonaCurso')
        .join('Persona', 'PersonaCurso.idPersona_PersonaCurso', '=', 'Persona.idPersona')
        .join('Curso', 'PersonaCurso.idCurso_PersonaCurso', '=', 'Curso.idCurso')
        .where('PersonaCurso.idPersona_PersonaCurso', idPersona)
        .then(persona => {
            CONN('PersonaCursoPerfil')
                .join('PersonaCurso', 'PersonaCursoPerfil.idPersonaCurso_PersonaCursoPerfil', '=', 'PersonaCurso.idPersonaCurso')
                .join('Persona', 'PersonaCurso.idPersona_PersonaCurso', '=', 'Persona.idPersona')
                .join('Curso', 'PersonaCurso.idCurso_PersonaCurso', '=', 'Curso.idCurso')
                .join('PersonaPerfil', 'PersonaCursoPerfil.idPersonaPerfil_PersonaCursoPerfil', '=', 'PersonaPerfil.idPersonaPerfil')
                .join('Perfil', 'PersonaPerfil.idPerfil_PersonaPerfil', '=', 'Perfil.idPerfil')
                .where('Persona.idPersona', idPersona)
                .select('Persona.idPersona', 'Persona.nombrePersona', 'Persona.apellidopaternoPersona', 'Persona.apellidomaternoPersona', 'Persona.correoPersona', 'Persona.imagenPersona', 'Persona.contrasenaPersona', 'Curso.nombreCurso', 'Curso.idCurso', 'Perfil.idPerfil','Persona.telefonoPersona')
                .then(cursosPersona => {
                    cursosPersona.forEach(function(element, index, array) {
                        CONN('RolPerfil')
                            .join('Perfil', 'RolPerfil.idPerfil_RolPerfil', '=', 'Perfil.idPerfil')
                            .join('Rol', 'RolPerfil.idRol_RolPerfil', '=', 'Rol.idRol')
                            .where('Perfil.idPerfil', element.idPerfil)
                            .select('Rol.nombreRol')
                            .then(permiso => {
                                permisos.push({ permiso });
                                contador++;
                                if (contador === array.length) {
                                    // console.log(permisos)
                                    console.log(cursosPersona[0])
                                    res.send({ token, personaCurso: 
                                        {idAdministrador:cursosPersona[0].idPersona,
                                 nombreAdministrador:cursosPersona[0].nombrePersona,
                                 apellidopaternoAdministrador:cursosPersona[0].apellidopaternoPersona,
                                 apellidomaternoAdministrador:cursosPersona[0].apellidomaternoPersona,
                                 correoAdministrador:cursosPersona[0].correoPersona,
                                 contrasenaAdministrador:cursosPersona[0].contrasenaPersona,
                                 telefonoAdministrador:cursosPersona[0].telefonoPersona,
                                 imagenAdministrador:cursosPersona[0].imagenPersona

                             } , permisos })
                                }
                            })
                            .catch(error => {
                                res.status(404).send({ resp: 'Error', error: `${error}` });
                            })
                    })
                    //     return res.status(200).send({ token:token, cursosPersona: cursosPersona  })
                })
                .catch(error => {
                    res.status(404).send({ resp: 'Error', error: `${error}` });
                })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}

function getAlumnosCurso(req,res){
    let idPersona = req.params.idPersona;
      let alumnosxCurso = [];
    let contador = 0;
    CONN('Persona')
        .select()
        .where('idPersona', idPersona)
        .then(persona => {
            CONN('PersonaCurso')
                .join('Persona', 'PersonaCurso.idPersona_PersonaCurso', '=', 'Persona.idPersona')
                .join('Curso', 'PersonaCurso.idCurso_PersonaCurso', '=', 'Curso.idCurso')
                .where('Persona.idPersona', idPersona)
                .select('PersonaCurso.idPersonaCurso', 'Curso.nombreCurso', 'Curso.idCurso', 'Curso.nombreCurso', 'Curso.resumenCurso', 'Curso.descripcionCurso', 'Curso.imagenCurso', 'Curso.costoCurso')
                .then(cursosPersona => {
                    cursosPersona.forEach(function(element, index, array) {
                        CONN('UsuarioPersonaCurso')
                            .join('PersonaCurso', element.idPersonaCurso, '=', 'PersonaCurso.idPersonaCurso')
                            .where('PersonaCurso.idPersona_PersonaCurso', idPersona)
                            .select().count('idUsuarioPersonaCurso as alumnos')
                            .then(alumnosTotales => {
                                CONN('UsuarioPersonaCurso')
                                .join('Usuario', 'UsuarioPersonaCurso.idUsuario_UsuarioPersonaCurso', '=', 'Usuario.idUsuario')
                                    .where('idPersonaCurso_UsuarioPersonCurso', element.idPersonaCurso)
                                    .select('Usuario.idUsuario','Usuario.nombreUsuario','Usuario.apellidopaternoUsuario','Usuario.apellidomaternoUsuario', 'Usuario.imagenUsuario', 'Usuario.correoUsuario', 'avanceUsuarioPersonaCurso')
                                    .then(alumnos => {
                                        alumnosxCurso.push({ curso: element.idCurso, alumnos: alumnos })
                                        contador++
                                        if (contador === array.length) {
                                            // console.log(permisos)
                                            res.send({ cursosPersona: cursosPersona,alumnosxCurso })
                                        }

                                    })
                                // res.send({ persona: persona, cursosPersona: cursosPersona, alumnosTotales: alumnosTotales })
                            })

                    })
                    // res.send({ persona: persona, cursosPersona: cursosPersona })
                })
                .catch(error => {
                    res.status(404).send({ resp: 'Error', error: `${error}` });
                })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}
function getAlumnosCursoMensajes(req,res){
    let idPersona = req.params.idPersona;
    let idCurso = req.params.idCurso;
      let alumnosxCurso = [];
    let contador = 0;
    CONN('personacurso').select().where('idPersona_PersonaCurso', idPersona)
    .andWhere('idCurso_PersonaCurso', idCurso).then(persona=>{
        CONN('usuariopersonacurso').select()
        .where('idPersonaCurso_UsuarioPersonCurso',persona[0].idPersonaCurso)
        .then(resultado=>{
            resultado.forEach(function(element,index,array){
                CONN('Usuario')
                .where('idUsuario', element.idUsuario_UsuarioPersonaCurso)
                .select('Usuario.idUsuario','Usuario.nombreUsuario','Usuario.apellidopaternoUsuario','Usuario.apellidomaternoUsuario', 'Usuario.imagenUsuario')
                .then(alumnos => {
                    alumnosxCurso.push({ alumno:alumnos})
                                        contador++
                                        if (contador === array.length) {
                                            // console.log(permisos)
                                            res.send({ alumnos: alumnosxCurso })
                                        }

                                    })
            })
        }).catch(error => {
                    res.status(404).send({ resp: 'Error', error: `${error}` });
                })
    }).catch(error => {
                    res.status(404).send({ resp: 'Error', error: `${error}` });
                })
        
   
}

function getPersonaperfil(req, res) {
    let idPersona = req.params.idPersona;
    let idCurso = req.params.idCurso;
    let permisos = []
    let contador = 0;
    CONN('PersonaCursoPerfil')
        .join('PersonaCurso', 'PersonaCursoPerfil.idPersonaCurso_PersonaCursoPerfil', '=', 'PersonaCurso.idPersonaCurso')
        .join('Persona', 'PersonaCurso.idPersona_PersonaCurso', '=', 'Persona.idPersona')
        .join('Curso', 'PersonaCurso.idCurso_PersonaCurso', '=', 'Curso.idCurso')
        .join('PersonaPerfil', 'PersonaCursoPerfil.idPersonaPerfil_PersonaCursoPerfil', '=', 'PersonaPerfil.idPersonaPerfil')
        .join('Perfil', 'PersonaPerfil.idPerfil_PersonaPerfil', '=', 'Perfil.idPerfil')
        .where('Persona.idPersona', idPersona)
        .andWhere('PersonaCurso.idCurso_PersonaCurso', idCurso)
        .select('*')
        .then(result => {
            result.forEach(function(element, index, array) {
                CONN('RolPerfil')
                    .join('Perfil', 'RolPerfil.idPerfil_RolPerfil', '=', 'Perfil.idPerfil')
                    .join('Rol', 'RolPerfil.idRol_RolPerfil', '=', 'Rol.idRol')
                    .where('Perfil.idPerfil', element.idPerfil)
                    .select('Rol.nombreRol')
                    .then(permiso => {
                        permisos.push({ permisos: permiso });
                        contador++;
                        if (contador === array.length) {
                            // console.log(permisos)
                            res.send({ personaCurso: result, permisos: permisos })
                        }
                    })
                    .catch(error => {
                        res.status(404).send({ resp: 'Error', error: `${error}` });
                    })
            })

        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}


function getPersonaCurso(req, res) {
    let idPersona = req.params.idPersona;
    CONN('catalogoespecialidadpersona')
    .join('Persona', 'catalogoespecialidadpersona.idPersona_CatalogoespecialidadPersona', '=', 'Persona.idPersona')
    .join('catalogoespecialidad', 'catalogoespecialidadpersona.idCatalogoespecialidad_CatalogoespecialidadPersona', '=', 'catalogoespecialidad.idCatalogoespecialidad')
    .join('PersonaCurso', 'catalogoespecialidadpersona.idPersona_CatalogoespecialidadPersona', '=', 'PersonaCurso.idPersona_PersonaCurso')
    .join('usuariopersonacurso', 'PersonaCurso.idPersonaCurso', '=', 'usuariopersonacurso.idPersonaCurso_UsuarioPersonCurso')
    .distinct('PersonaCurso.idCurso_PersonaCurso')
        .select('Persona.*', 'catalogoespecialidad.descripcionCatalogoespecialidad', 'PersonaCurso.idCurso_PersonaCurso as NumCursos')
        // .count('PersonaCurso.idCurso_PersonaCurso as NumCursos')
        .count("usuariopersonacurso.idUsuario_UsuarioPersonaCurso as NumAlumnos")
        .where('catalogoespecialidadpersona.idPersona_CatalogoespecialidadPersona', idPersona)
        .then(persona => {
            CONN('PersonaCurso')
                .join('Curso', 'PersonaCurso.idCurso_PersonaCurso', '=', 'Curso.idCurso')
                .join('usuariopersonacurso', 'PersonaCurso.idPersonaCurso', '=', 'usuariopersonacurso.idPersonaCurso_UsuarioPersonCurso')
                // .distinct('usuariopersonacurso.idUsuario_UsuarioPersonaCurso as NumAlumnos')
                .select("Curso.*")
                .count("usuariopersonacurso.idUsuario_UsuarioPersonaCurso as AlumnosCurso")
                .where('PersonaCurso.idPersona_PersonaCurso', idPersona)
                .groupBy('Curso.idCurso')
                .then(cursosPersona => {
                    res.send({ persona: persona, cursosPersona: cursosPersona });
                })
                .catch(error => {
                    res.status(404).send({ resp: 'Error', error: `${error}` });
                })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}

function getPersonaPermisos(req, res) {
    let idPersona = req.params.idPersona;
    let permisos = [];
    let last;
    CONN('PersonaPerfil')
        .join('RolPerfil', 'PersonaPerfil.idPerfil_PersonaPerfil', '=', 'RolPerfil.idPerfil_RolPerfil')
        .join('Rol', 'RolPerfil.idRol_RolPerfil', '=', 'Rol.idRol')
        .where('PersonaPerfil.idPersona_PersonaPerfil', idPersona)
        .andWhere('status_RolPerfil', 1)
        .select('idRol_RolPerfil', 'nombreRol')
        .orderBy('idRol_RolPerfil')
        .then(result => {
            result.forEach(function(element,index,array) {
                    if (index==0) {
                        permisos.push({permiso: element})
                        last = element;
                    }
                    else{
                        if (element.idRol_RolPerfil != last.idRol_RolPerfil) {
                            permisos.push({permiso: element});
                            last = element;
                        }
                    }
            })
            res.status(200).send({ resp: 'Exito', permisos: permisos })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}

function getUsuarioPersonaCurso(req,res){
    let idPersona = req.params.idPersona;
    let idCurso = req.params.idCurso;
    let idUsuario = req.params.idUsuario;
    CONN('personacurso').select().where('idPersona_PersonaCurso',idPersona).andWhere('idCurso_PersonaCurso',idCurso)
    .then(response=>{
        CONN('usuariopersonacurso').select().where('idPersonaCurso_UsuarioPersonCurso',response[0].idPersonaCurso).andWhere('idUsuario_UsuarioPersonaCurso',idUsuario)
        .then(response2=>{
            res.status(200).send({idUsuarioPersonaCurso:response2[0].idUsuarioPersonaCurso })
        }).catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
    })
}

function darBajaPersona(req, res){
    let idPersona = req.params.idPersona;    
    CONN('persona')
        .update('statusPersona', 0)
        .where('idPersona', idPersona)
        .then(result => {
            res.status(200).send({ resp: 'Exito', persona: "Persona dada de baja" })
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

function darAltaPersona(req, res){
    let idPersona = req.params.idPersona;    
    CONN('persona')
        .update('statusPersona', 1)
        .where('idPersona', idPersona)
        .then(result => {
            res.status(200).send({ resp: 'Exito', persona: "Persona dada de alta" })
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

function correoRecuperarContrasenaPersona(req,res){
    var codconf = randomstring.generate({
        length: 24,
        charset: 'alphabetic'
    });
    // Definimos el transporter
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ermedpei2109@gmail.com',
            pass: 'hidankakashi21'
        }
    })
    // Definimos el email
    let mailOptions = {
        from: '"EDU" <dare@gmail.com>',
        to: req.params.correoUsuario,
        subject: 'Recuperación Contraseña EDU',
        // cc: 'gerardozamudio45@hotmail.com',
        text: 'Hola, para cambiar tu contraseña por favor da click en el siguiente link <br> http://localhost:4200/cambiar-pass/' + codconf
    }

       transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            res.status(500).send({
                resp: 'No se envío',
                message: error
            });
        } else {            
            let fecha_exp = moment().add(1,'days').format("YYYY-MM-DD HH:mm");
            let cambio = new cambioPass(req.params.idUsuario, fecha_exp, codconf,1,2);
            CONN('cambiopass').insert(cambio).then(response=>{
                res.status(200).send({resp:'Verifica tu correo para cambiar tu contraseña'})
            })


        }
    })
}

function expirarLinkPersona(req,res){
    CONN('cambiopass').update('statusLink','0').where('codCambioPass',req.params.codConf).then(response=>{
        res.status(200).send({idCambiopass:response})
    })
}

function cambiarContraseñaPersona(req,res){
                    CONN('persona').select().where('idPersona', req.params.idPersona)
                    .then(row => {
                        if (row.length <= 0) {
                            res.status(200).send({ message: 'El correo no está registrado' })
                        } else {
                            CONN('persona').update('contrasenaPersona', req.params.contrasenaPersona).where('idPersona', req.params.idPersona).then(idPersona => {
                                if (!idPersona) {
                                    res.status(500).send({ resp: 'Error', error: 'No se actualizó la contraseña' });
                                } else {
                                    res.status(200).send({
                                        resp: 'Contraseña actualizada',
                                        Persona: idPersona
                                        // file:req.file
                                    });
                                }
                            }).catch(error => {
                                res.status(500).send({
                                    resp: 'error',
                                    error: `${error}`
                                });
                            });
                        }

                    })
}

function getUserCodPersona(req,res){
    CONN('cambiopass').select().where('codCambioPass',req.params.codPass).then(response=>{
        res.status(200).send({dataUs:response})
    })
}

function getPersonaCorreo(req, res) {
    let correoPersona = req.params.correoPersona;
    CONN('persona').select()
        .where('correoPersona', correoPersona)
        .then(persona => {
            res.status(200).send({ resp: 'Exito', persona: persona })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error1', error: `${error}` });
            console.log(`${error}`);
        })
}

function getPerfilPersona(req,res){
    let idPersona = req.params.idPersona;
    CONN('personaperfil').select().where('idPersona_PersonaPerfil',idPersona).andWhere('idPerfil_PersonaPerfil',2)
    .then(response=>{
        res.status(200).send({ resp: 'Exito', personaperfil: response })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error1', error: `${error}` });
            console.log(`${error}`);
        })
}

function eliminarPersonaCurso(req,res){
    let idPersona = req.params.idPersona;
    let contador = 0;
    CONN('personacurso').select().where('idPersona_PersonaCurso',idPersona).then(response=>{
        response.forEach(function(element, index, array){
            CONN('personacurso').del().where('idPersonaCurso',element.idPersonaCurso).then(response2=>{

            })
            contador++;
            if (contador === array.length){
                res.status(200).send({resp:'Se ha eliminado al instructor de los cursos'})
            }
        })
    })
}

module.exports = {
    registraPersona,
    actualizarPersona,
    subeImagenPersona,
    getImageFilePersona,
    getPersonas,
    getPersona,
    asignarPerfil,
    getPersonasperfiles,
    getPersonaperfiles,
    getPersonaperfil,
    getPersonaCurso,
    actualizarCurso,
    actualizarPerfiles,
    eliminarPerfil,
    loginPersona,
    getAlumnosCurso,
    actualizarPersona2,
    getNotificacionesPersona,
    verNotificacionesPersona,
    getAlumnosCursoMensajes,
    getPersonaPermisos,
    getUsuarioPersonaCurso,
    darAltaPersona,
    darBajaPersona,
    correoRecuperarContrasenaPersona,
    cambiarContraseñaPersona,
    getUserCodPersona,
    expirarLinkPersona,
    getPersonaCorreo,
    getPerfilPersona,
    eliminarPersonaCurso
}