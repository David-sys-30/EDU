'use strict'

let Usuario = require('../models/usuario.model');
let usuarioPC = require('../models/usuario.persona.curso.model');
let UsuarioT = require('../models/usuarioCurso.model');
let cambioPass = require('../models/cambioPass.model')
const CONN = require('./connection.controller');
let jwt = require('../services/jwtUsuario');
let path = require('path');
var fs = require('fs');
var moment = require('moment');
var randomstring = require("randomstring");
let nodemailer = require('nodemailer');

// function loginUsuario(req,res){
// 	let correo = req.body.correoUsuario;
// 	let contrasena = req.body.contrasenaUsuario;
// 	let gethash = req.body.gethash;
// 	CONN('Usuario').where('correoUsuario',correo)
// 	.andWhere('contrasenaUsuario',contrasena)
// 	.select().then(usuario=>{
// 		if (!usuario) {
// 			res.status(500).send({resp:'Error',message:'Error en el servidor'})
// 		}else{
// 			if (usuario.length <= 0) {
// 				res.status(404).send({resp:'Error',message:'Error en el usuario o contraseña'})
// 			}else{
// 				if (usuario[0]['statusUsuario'] != 1) {
// 					res.status(404).send({resp:'Error',message:'Lo sentimos, este correo esta dado de baja'});
// 				}else{
// 					let idUsuario = usuario[0]['idUsuario'];
// 					if (gethash) {
// 						let token = jwt.createToken(usuario);
// 						res.status(200).send({
// 							token:token,
// 							resp:'Sesion iniciada',
// 							usuario:usuario
// 						});				
// 					}else{
// 						res.status(200).send({resp:'Sesion iniciada',usuario:usuario});
// 					}
// 				}				
// 			}
// 		}
// 	}).catch(error=>{
// 		res.status(500).send({resp:'error',error:`${error}`});
// 	})
// }

function getNotificaciones(req, res) {
    let idUsuario = req.params.idUsuario;
    CONN('notificacionusuario')
    .select('idNotifUsuario', 'msgNotifUsuario', 'fechaNotifUsuario', 'urlNotiUsuario')
    .orderBy('fechaNotifUsuario', 'desc')
    .where('idUsuario', idUsuario)
    .andWhere('statusNotiUsuario', 0)
    .then(respon => {
        CONN('notificacionusuario')
        .select('idNotifUsuario', 'msgNotifUsuario', 'fechaNotifUsuario', 'urlNotiUsuario')
        .orderBy('fechaNotifUsuario', 'desc')
        .where('idUsuario', idUsuario)
        .andWhere('statusNotiUsuario', 1)
        .then(respuesta => {
            res.status(200).send({resp: 'Consulta exitosa', NoVistos: respon, Vistos: respuesta });
        })
     }).catch(error => {
         res.status(404).send({ resp: 'Error', error: `${error}` });
     })
}

function verNotificaciones(req, res) {
    let idNotif = req.params.idNotifUsuario;
    CONN('notificacionusuario')
    .update('statusNotiUsuario', 1)
    .where('idNotifUsuario', idNotif)
    .then(response => {
        res.status(200).send({resp: 'Actualizado'});
    }).catch(error => {
        res.status(404).send({ resp: 'Error', error: `${error}` });
    })
}

function getUsuarioCorreo(req, res) {
    let correoUsuario = req.params.correoUsuario;
        CONN('usuario').where('correoUsuario', correoUsuario)
        .select().then(usuario => {
            if (!usuario) {
                res.status(500).send({ resp: 'Error', message: 'Error en el servidor' })
            } else {
                if (usuario.length <= 0) {
                    res.status(200).send({ resp: 'Error', message: 'Error en el usuario o contraseña' })
                } else {
                    if (usuario[0]['statusUsuario'] != 1) {
                        res.status(404).send({ resp: 'Error', message: 'Lo sentimos, este correo esta dado de baja' });
                    } else {
                        let idUsuario = usuario[0]['idUsuario'];
                        CONN('usuariopersonacurso')
                            .join('usuario', 'usuariopersonacurso.idUsuario_UsuarioPersonaCurso', '=', 'usuario.idUsuario')
                            .join('personaCurso', 'usuariopersonacurso.idPersonaCurso_UsuarioPersonCurso', "=", 'personaCurso.idPersonaCurso')
                            .join('curso', 'personaCurso.idCurso_PersonaCurso', '=', 'curso.idCurso')
                            .select('curso.idCurso')
                            .where('usuario.idUsuario', idUsuario).then(idCurso => {
                                    let token = jwt.createToken(usuario,idCurso);
                                    res.status(200).send({ resp: 'Sesion iniciada', usuario, idCurso,token: token});
                                

                            }).catch(error => {
                                res.status(404).send({ resp: 'Error', error: `${error}` });
                            })

                    }
                }
            }
        }).catch(error => {
            res.status(500).send({ resp: 'error', error: `${error}` });
        })
}

function loginUsuario(req, res) {
    let correo = req.body.correoUsuario;
    let contrasena = req.body.contrasenaUsuario;
    let gethash = req.body.gethash;
    CONN('usuario').where('correoUsuario', correo)
        .andWhere('contrasenaUsuario', contrasena)
        .select().then(usuario => {
            if (!usuario) {
                res.status(500).send({ resp: 'Error', message: 'Error en el servidor' })
            } else {
                if (usuario.length <= 0) {
                    res.status(404).send({ resp: 'Error', message: 'Error en el usuario o contraseña' })
                } else {
                    if (usuario[0]['statusUsuario'] != 1) {
                        res.status(404).send({ resp: 'Error', message: 'Lo sentimos, este correo esta dado de baja' });
                    } else {
                        let idUsuario = usuario[0]['idUsuario'];
                        CONN('usuariopersonacurso')
                            .join('usuario', 'usuariopersonacurso.idUsuario_UsuarioPersonaCurso', '=', 'usuario.idUsuario')
                            .join('personaCurso', 'usuariopersonacurso.idPersonaCurso_UsuarioPersonCurso', "=", 'personaCurso.idPersonaCurso')
                            .join('curso', 'personaCurso.idCurso_PersonaCurso', '=', 'curso.idCurso')
                            .select('curso.idCurso')
                            .where('usuario.idUsuario', idUsuario).then(idCurso => {
                                if (gethash) {
                                    let token = jwt.createToken(usuario,idCurso);
                                    res.status(200).send({
                                        token: token,
                                        resp: 'Sesion iniciada',
                                        usuario: usuario,
                                        curso:idCurso
                                    });
                                } else {
                                    res.status(200).send({ resp: 'Sesion iniciada', usuario: {usuario, idCurso} });
                                }

                            }).catch(error => {
                                res.status(404).send({ resp: 'Error', error: `${error}` });
                            })

                    }
                }
            }
        }).catch(error => {
            res.status(500).send({ resp: 'error', error: `${error}` });
        })
}

function registraUsuario(req, res) {
    let usuario = new Usuario(req.body.nombreUsuario,
        req.body.apellidopaternoUsuario,
        req.body.apellidomaternoUsuario,
        req.body.correoUsuario,
        req.body.contrasenaUsuario,
        req.body.imagenUsuario,
        1);
    CONN('usuario').select().where('correoUsuario', req.body.correoUsuario)
        .then(row => {
            if (row.length > 0) {
                res.status(200).send({ message: 'El correo que quieres registrar ya esta registrado, intenta con otro' })
            } else {
                CONN('usuario').insert(usuario).then(idUsuario => {
                    if (!idUsuario) {
                        res.status(500).send({ resp: 'Error', error: 'No se insertó el Usuario' });
                    } else {
                        res.status(200).send({
                            resp: 'Usuario registrado',
                            Usuario: idUsuario
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

function actualizaUsuario(req, res) {
    let idUsuario = req.params.idUsuario;
    let usuario = new Usuario(req.body.nombreUsuario,
        req.body.apellidopaternoUsuario,
        req.body.apellidomaternoUsuario,
        req.body.correoUsuario,
        req.body.contrasenaUsuario,
        req.body.imagenUsuario);
    CONN('usuario').where('idUsuario', idUsuario)
        .update(usuario).then(result => {
            if (!result) {
                res.status(500).send({ resp: 'Error', error: 'No se actualizo correctamente' })
            } else {
                // res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
                CONN('usuario').select().where('idUsuario', idUsuario).then(user => {
                    if (!user) {
                        res.status(500).send({ resp: 'Error', message: 'Hubo un error inesperado' })
                    } else {
                        res.status(200).send({ resp: 'Exito', usuario: user, message: 'Usuario actualizado correctamente' });
                    }
                }).catch(error => {
                    res.status(404).send({ resp: 'Error2', error: `${error}` });
                })
            }
        }).catch(error => {
            res.status(404).send({ resp: 'Error1', error: `${error}` });
            console.log(`${error}`);
        })
}

function getUsuario(req, res) {
    let idUsuario = req.params.idUsuario;
    CONN('usuario').select()
        .where('idUsuario', idUsuario)
        .then(usuario => {
            res.status(200).send({ resp: 'Exito', usuario: usuario })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error1', error: `${error}` });
            console.log(`${error}`);
        })
}

function getAllUsers(req,res){
    CONN('usuario').select().then(usuarios=>{
        res.status(200).send({usuarios:usuarios})
    })
}

function getUsuarioCorreo(req, res) {
    let correoUsuario = req.params.correoUsuario;
    CONN('usuario').select()
        .where('correoUsuario', correoUsuario)
        .then(usuario => {
            res.status(200).send({ resp: 'Exito', usuario: usuario })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error1', error: `${error}` });
            console.log(`${error}`);
        })
}

function subeImagenUsuario(req, res) {
    let idUsuario = req.params.idUsuario;
    let foto = req.file;
    CONN('usuario').where('idUsuario', idUsuario).update('imagenUsuario', req.file.filename)
        .then(result => {
            if (!result) {
                res.status(500).send({ resp: 'Error', message: 'No se actualizo la foto' })
            } else {
                CONN('usuario').select('imagenUsuario').where('idUsuario', idUsuario)
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



var getImageFileUsuario = (req, res) => {
    var imagenFile = req.params.imagenUsuario;
    var path_file = `./imgs/Usuarios/${imagenFile}`;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la Imagen' });
        }
    });
}

function goku(req, res) {
    let idUsuario = req.params.idUsuario;
    CONN('usuariopersonacurso')
        .join('usuario', 'usuariopersonacurso.idUsuario_UsuarioPersonaCurso', '=', 'usuario.idUsuario')
        .join('personacurso', 'usuariopersonacurso.idPersonaCurso_UsuarioPersonCurso', "=", 'personacurso.idPersonaCurso')
        .join('curso', 'personacurso.idCurso_PersonaCurso', '=', 'curso.idCurso')
        .select('usuariopersonacurso.idUsuarioPersonaCurso')
        .where('usuario.idUsuario', idUsuario).then(laquequieras => {
            res.send({ laquequieras })
        }).catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}



function adquirirCursos(req, res) {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let yyyy2 = date.getFullYear() + 1;
    let stat = 1;
    let cursos = new usuarioPC(
        req.body.idUsuario_UsuarioPersonaCurso,
        req.body.idPersonaCurso_UsuarioPersonCurso,
        yyyy + "/" + mm + "/" + dd,
        yyyy2 + "/" + mm + "/" + dd,
        stat);
    CONN('usuariopersonacurso').insert(cursos).then(idUsuarioPersonaCurso => {
        if (!idUsuarioPersonaCurso) {
            res.status(500).send({ resp: 'Error', error: 'No se agregaron los cursos' });
        } else {
            res.status(200).send({
                resp: 'Cursos agregados',
                Cursos: idUsuarioPersonaCurso
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

function vistoTema(req, res) {
    let idUsuario = req.params.idUsuario;
    let idTema = req.params.idTema;
    let numModulo = req.params.numeroModulo;
    CONN('usuariotema').select().where('usuario_idUsuario', idUsuario).andWhere('tema_idTema', idTema)
        .then(row => {
            if (row.length > 0) {
                CONN('usuariotema').where('usuario_idUsuario', idUsuario).andWhere('tema_idTema', idTema)
                .update('statusVisto', 1).then(result => {
                    if (!result) {
                            res.status(500).send({ resp: 'Error', error: 'No se actualizo correctamente' })
                    } else {
                        res.status(200).send({ resp: 'Exito', message: 'Tabla actualizado correctamente'});
                    }
                }).catch(error => {
                    res.status(404).send({ resp: 'Error1', error: `${error}` });
                    console.log(`${error}`);
                })
            } else {
                CONN('usuariotema').insert([{usuario_idUsuario: idUsuario, tema_idTema: idTema, numeroModulo: numModulo, statusVisto: 1}])
                    .then(resultado => {
                        if (!resultado) {
                            res.status(500).send({ resp: 'Error', error: 'No se inserto correctamente' })
                        } else {
                            res.status(200).send({ resp: 'Exito', message: 'Registro insertado correctamente'});
                        }
                    }).catch(error => {
                        res.status(404).send({ resp: 'Error', error: `${error}` });
                        console.log(`${error}`);
                    })
            }
        })
}

function getVistos(req, res) {
    let idUsuario = req.params.idUsuario;
    CONN('usuariotema').select('tema_idTema as idTema', 'numeroModulo').where('usuario_idUsuario', idUsuario).andWhere('statusVisto', 1)
        .then(vistos => {
            res.status(200).send({tema:vistos})
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error1', error: `${error}` });
            console.log(`${error}`);
        })
}

function buscarUsuario(req, res) {
    let idReg = req.params.idReg;
    CONN('usuariopersonacurso').select('idUsuario_UsuarioPersonaCurso as idUsuario').where('idUsuarioPersonaCurso', idReg)
        .then(vistos => {
            res.status(200).send({ resp: 'Exito', Usuario: vistos })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error1', error: `${error}` });
            console.log(`${error}`);
        })
}

function correoRecuperarContrasena(req,res){
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
            let cambio = new cambioPass(req.params.idUsuario, fecha_exp, codconf,1,1);
            CONN('cambiopass').insert(cambio).then(response=>{
                res.status(200).send({resp:'Verifica tu correo para cambiar tu contraseña'})
            })


        }
    })
}

function expirarLink(req,res){
    CONN('cambiopass').update('statusLink','0').where('codCambioPass',req.params.codConf).then(response=>{
        res.status(200).send({idCambiopass:response})
    })
}

function cambiarContraseña(req,res){
                    CONN('usuario').select().where('idUsuario', req.params.idUsuario)
                    .then(row => {
                        if (row.length <= 0) {
                            res.status(200).send({ message: 'El correo no está registrado' })
                        } else {
                            CONN('usuario').update('contrasenaUsuario', req.params.contrasenaUsuario).where('idUsuario', req.params.idUsuario).then(idUsuario => {
                                if (!idUsuario) {
                                    res.status(500).send({ resp: 'Error', error: 'No se actualizó la contraseña' });
                                } else {
                                    res.status(200).send({
                                        resp: 'Contraseña actualizada',
                                        Usuario: idUsuario
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

function getUserCod(req,res){
    CONN('cambiopass').select().where('codCambioPass',req.params.codPass).then(response=>{
        res.status(200).send({dataUs:response})
    })
}

module.exports = {
    registraUsuario,
    loginUsuario,
    actualizaUsuario,
    subeImagenUsuario,
    getImageFileUsuario,
    getUsuario,
    adquirirCursos,
    goku,
    vistoTema,
    getVistos,
    buscarUsuario,
    getUsuarioCorreo,
    getNotificaciones,
    verNotificaciones,
    correoRecuperarContrasena,
    cambiarContraseña,
    getUserCod,
    getUsuarioCorreo,
    expirarLink,
    getAllUsers
}