'use strict'
var ChatModel = require('../models/chat.model');
const CONN = require('./connection.controller');
var moment = require('moment');
var ChatUsers = require('../models/mensajesUsuario.model');


function insertMensajeUsuario(req, res) {
    var params = req.body;
    if (!params.mensaje) return res.status(200).send({ message: 'envia un mensaje' });

    
    var message = new ChatModel();
    message.mensaje = params.mensaje;
    message.time = moment().format("YYYY-MM-DD HH:mm");
    message.emisor = params.emisor;
    message.receptor = params.receptor;
    message.id_curso = params.id_curso;
    var notFecha = moment().format("YYYY-MM-DD");


    CONN('conversacion').select()
        .where("idPersona", message.receptor)
        .andWhere("idUsuario", message.emisor)
        .andWhere("idCurso", message.id_curso)
        .then(
            result => {

                if (result.length == 0) {

                    CONN('conversacion').insert({
                        idPersona: message.receptor,
                        idUsuario: message.emisor,
                        idCurso: message.id_curso
                    }).then(conver => {

                        CONN('mensajes').insert({
                            mensaje: message.mensaje,
                            time: message.time,
                            emisor: message.emisor,
                            receptor: message.receptor,
                            id_curso: message.id_curso,
                            visto: 0,
                            idConversacion: conver,
                            rolMensaje: "alumno"
                        }).then(resultado => {
                            CONN('notificacionpersona').insert({
                                msgNotifPersona: "Nuevo Mensaje",
                                fechaNotifPersona: notFecha,
                                idPersona: message.receptor,
                                urlNotiPersona: "/chatinstructor/" + message.receptor + "/" + message.emisor + "/" + message.id_curso,
                                statusNotiPersona: 0
                            }).then(notificacion => {

                                res.status(200).send({ message: "mensaje insertado" })
                            })


                        }).catch(error => {
                            res.status(500).send({ resp: 'Error', error: `${error}` });
                        }).catch(error => {
                            res.status(500).send({ resp: 'Error', error: `${error}` });
                        })
                    }).catch(error => {
                        res.status(500).send({ resp: 'Error', error: `${error}` });
                    })
                } else {

                    CONN('mensajes').insert({
                        mensaje: message.mensaje,
                        time: message.time,
                        emisor: message.emisor,
                        receptor: message.receptor,
                        id_curso: message.id_curso,
                        visto: 0,
                        idConversacion: result[0].idConversacion,
                        rolMensaje: "alumno"
                    }).then(resultado => {
                        CONN('notificacionpersona').insert({
                            msgNotifPersona: "Nuevo Mensaje",
                            fechaNotifPersona: notFecha,
                            idPersona: message.receptor,
                            urlNotiPersona: "/chatinstructor/" + message.receptor + "/" + message.emisor + "/" + message.id_curso,
                            statusNotiPersona: 0
                        }).then(notificacion => {

                            res.status(200).send({ message: "mensaje insertado" })
                        }).catch(error => {
                            res.status(500).send({ resp: 'Error', error: `${error}` });
                        })
                    }).catch(error => {
                        res.status(500).send({ resp: 'Error', error: `${error}` });
                    })
                }
            }).catch(error => {
            res.status(500).send({ resp: 'Error', error: `${error}` });
        })

}

function getConversacionUsuario(req, res) {
    var idCurso = req.params.idCurso
    var idUsuario = req.params.idUsuario
    var idPersona = req.params.idPersona

    CONN('conversacion').select()
        .where("idPersona", idPersona)
        .andWhere("idUsuario", idUsuario)
        .andWhere("idCurso", idCurso)
        .then(result => {
            if (result) {
                CONN('mensajes').select()
                    .where("idConversacion", result[0].idConversacion)
                    .then(mensajes => {
                        res.status(200).send({ Mensajes: mensajes })

                    }).catch(error => {
                        res.status(500).send({ resp: "error", error: `${error}` })
                    })
            } else {
                res.status(404).send({ message: "no hay mensajes" })
            }

        }).catch(error => {
            res.status(404).send({ message: "no hay conversacion" });
        })

}

function insertMensajePersona(req, res) {
    var mensaje= req.body;
    var iduser = req.params.iduser;
   console.log(iduser)
    //if (!params.mensaje) return res.status(200).send({ message: 'envia un mensaje' });


    var message = new ChatModel();
    message.mensaje = mensaje.mensaje;
    message.time = moment().format("YYYY-MM-DD HH:mm");
    message.emisor = mensaje.emisor;
    message.receptor = mensaje.receptor;
    message.id_curso = mensaje.id_curso;
    var notFecha = moment().format("YYYY-MM-DD");

    CONN('conversacion').select()
        .where("idPersona", message.receptor)
        .andWhere("idUsuario", message.emisor)
        .andWhere("idCurso", message.id_curso)
        .then(
            result => {

                if (result.length == 0) {

                    CONN('conversacion').insert({
                        idPersona: message.receptor,
                        idUsuario: message.emisor,
                        idCurso: message.id_curso
                    }).then(conver => {

                        CONN('mensajes').insert({
                            mensaje: message.mensaje,
                            time: message.time,
                            emisor: message.emisor,
                            receptor: message.receptor,
                            id_curso: message.id_curso,
                            visto: 0,
                            idConversacion: conver,
                            rolMensaje: "instructor"
                        }).then(resultado => {
                            CONN('notificacionusuario').insert({
                                msgNotifUsuario: "Nuevo Mensaje",
                                fechaNotifUsuario: notFecha,
                                idUsuario: message.receptor,
                                urlNotiUsuario: "/chatinstructor/" + message.receptor + "/" + message.emisor + "/" + message.id_curso,
                                statusNotiUsuario: 0
                            }).then(msg =>{
                                res.status(200).send({ message: "mensaje insertado" })

                            }).catch(error => {
                            res.status(500).send({ resp: 'Error', error: `${error}` });
                        })
                        }).catch(error => {
                            res.status(500).send({ resp: 'Error', error: `${error}` });
                        })
                    }).catch(error => {
                        res.status(500).send({ resp: 'Error', error: `${error}` });
                    })
                } else {

                    CONN('mensajes').insert({
                        mensaje: message.mensaje,
                        time: message.time,
                        emisor: message.emisor,
                        receptor: message.receptor,
                        id_curso: message.id_curso,
                        visto: 0,
                        idConversacion: result[0].idConversacion,
                        rolMensaje: "instructor"
                    }).then(resultado => {
                        CONN('notificacionusuario').insert({
                                msgNotifUsuario: "Nuevo Mensaje",
                                fechaNotifUsuario: notFecha,
                                idUsuario: message.receptor,
                                urlNotiUsuario: "/curso-alumno/" + iduser + "/" + message.id_curso + "/" + message.id_curso,
                                statusNotiUsuario: 0
                            }).then(msg2 =>{

                        res.status(200).send({ message: "mensaje insertado" })
                            }).catch(error => {
                        res.status(500).send({ resp: 'Error', error: `${error}` });
                    })

                    }).catch(error => {
                        res.status(500).send({ resp: 'Error', error: `${error}` });
                    })
                }
            }).catch(error => {
            res.status(500).send({ resp: 'Error', error: `${error}` });
        })


}

function getidUsuarioPersona(req, res) {
    var idCurso = req.params.idCurso
    var idUsuario = req.params.idUsuario
    var idPersona = req.params.idPersona

    CONN('personacurso').select().where('idPersona_PersonaCurso', idPersona)
        .andWhere('idCurso_PersonaCurso', idCurso).then(result => {
            CONN('usuariopersonacurso').where('idUsuario_UsuarioPersonaCurso', idUsuario)
                .andWhere('idPersonaCurso_UsuarioPersonCurso', result[0].idPersonaCurso)
                .then(id => {
                    res.status(200).send({ id })
                }).catch(error => {
                    res.status(500).send({ resp: 'Error', error: `${error}` });
                })
        }).catch(error => {
            res.status(500).send({ resp: 'Error', error: `${error}` });
        })
}

function insertMensajeUsuarioToUsuario(req, res) {
    var params = req.body;
    
    if (!params.mensaje) return res.status(200).send({ message: 'envia un mensaje' });

    
    var message = new ChatUsers();
    message.mensaje = params.mensaje;
    message.time = moment().format("YYYY-MM-DD HH:mm");
    message.idemisor = params.emisor;
    message.idreceptor = params.receptor;
    message.idcurso = params.id_curso;
    var notFecha = moment().format("YYYY-MM-DD");


    CONN('converusuario').select()
        .where({idUsuarioR: message.idreceptor,
                idUsuarioE: message.idemisor,
                idCurso: message.idcurso
        }).orWhere({
                idUsuarioR: message.idemisor,
                idUsuarioE: message.idreceptor,
                idCurso: message.idcurso

        }).then(
            result => {

                if (result.length == 0) {

                    CONN('converusuario').insert({
                        idUsuarioR: message.idreceptor,
                        idUsuarioE: message.idemisor,
                        idCurso: message.idcurso
                    }).then(conver => {

                        CONN('mensajesusuarios').insert({
                            mensaje: message.mensaje,
                            time: message.time,
                            idemisor: message.idemisor,
                            idreceptor: message.idreceptor,
                            idcurso: message.idcurso,
                            visto: 0,
                            idConversacion: conver,
                            
                        }).then(resultado => {
                            CONN('notificacionusuario').insert({
                                msgNotifUsuario: "Nuevo Mensaje",
                                fechaNotifUsuario: notFecha,
                                idUsuario: message.idreceptor,
                                urlNotiUsuario: "/chatusers/" + message.idreceptor ,
                                statusNotiUsuario: 0
                            }).then(notificacion => {

                                res.status(200).send({ message: "mensaje insertado" })
                            })


                        }).catch(error => {
                            res.status(500).send({ resp: 'Error', error: `${error}` });
                        }).catch(error => {
                            res.status(500).send({ resp: 'Error', error: `${error}` });
                        })
                    }).catch(error => {
                        res.status(500).send({ resp: 'Error', error: `${error}` });
                    })
                } else {

                    CONN('mensajesusuarios').insert({
                        mensaje: message.mensaje,
                        time: message.time,
                        idemisor: message.idemisor,
                        idreceptor: message.idreceptor,
                        idcurso: message.idcurso,
                        visto: 0,
                        idConversacion: result[0].idConverUser,
                        
                    }).then(resultado => {
                        CONN('notificacionusuario').insert({
                            msgNotifUsuario: "Nuevo Mensaje",
                            fechaNotifUsuario: notFecha,
                            idUsuario: message.idreceptor,
                            urlNotiUsuario: "/chatusers/" + message.idreceptor ,
                            statusNotiUsuario: 0
                        }).then(notificacion => {

                            res.status(200).send({ message: "mensaje insertado" })
                        }).catch(error => {
                            res.status(500).send({ resp: 'Error', error: `${error}` });
                        })
                    }).catch(error => {
                        res.status(500).send({ resp: 'Error', error: `${error}` });
                    })
                }
            }).catch(error => {
            res.status(500).send({ resp: 'Error', error: `${error}` });
        })

}
function getConversacionUsuariotoUsuario(req, res) {
    var idCurso = req.params.idCurso
    var idEmisor = req.params.idEmisor
    var idReceptor = req.params.idReceptor

    CONN('converusuario').select()
        .where({idUsuarioR: idEmisor,
                idUsuarioE: idReceptor,
                idCurso: idCurso
        }).orWhere({
                idUsuarioR: idReceptor,
                idUsuarioE: idEmisor,
                idCurso: idCurso

        })
        .then(result => {
            if (result) {
                CONN('mensajesusuarios').select()
                    .where("idConversacion", result[0].idConverUser)
                    .then(mensajes => {
                        res.status(200).send({ Mensajes: mensajes })

                    }).catch(error => {
                        res.status(500).send({ resp: "error", error: `${error}` })
                    })
            } else {
                res.status(404).send({ message: "no hay mensajes" })
            }

        }).catch(error => {
            res.status(404).send({ message: "no hay conversacion" });
        })

}



module.exports = {
    insertMensajeUsuario,
    getConversacionUsuario,
    insertMensajePersona,
    getidUsuarioPersona,
    insertMensajeUsuarioToUsuario,
    getConversacionUsuariotoUsuario
}