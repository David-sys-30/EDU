'use strict'

const CONN = require('./connection.controller');
let CursoModel = require('../models/curso.model');
let CalifCursoModel = require('../models/calfCurso.model');
let RequisitoCursoModel = require('../models/requisitoCurso.model');
let tareasUsuariosModel = require('../models/tareasUsuarios-eval.model');
let CategoriaaprendizajeModel = require('../models/categoriaaprendizajeCurso.model');
let path = require('path');
let fs = require('fs');

function registraCurso(req, res) {
    let requisito = [];
    let aprendizaje = [];
    let curso = req.body.curso;
    let requisitos = req.body.requisitos;
    let aprendizajes = req.body.aprendizaje;
    CONN('curso').insert(curso).then(
            idCurso => {
                requisitos.forEach(function(element1) {
                    requisito.push({
                        idCurso_RequisitoCurso: idCurso[0],
                        descripcionRequisitoCurso: element1.descripcionRequisitoCurso
                    })
                });
                aprendizajes.forEach(function(element2) {
                    aprendizaje.push({
                        idCurso_CategoriaaprendizajeCurso: idCurso[0],
                        descripcionCategoriaaprendizajeCurso: element2.descripcionCategoriaaprendizajeCurso
                    })
                });
                CONN('requisitoCurso').insert(requisito).then(
                        CONN('categoriaaprendizajeCurso').insert(aprendizaje).then(
                            CONN('curso').select().where('idCurso', idCurso).then(
                                curso => {
                                    res.status(200).send({
                                        resp: 'Exito',
                                        message: 'El Curso se inserto con exito',
                                        curso: curso
                                    });
                                }
                            )
                            .catch(error => {
                                res.status(500).send({
                                    resp: 'error',
                                    error: `${error}`
                                });
                            })
                        )
                        .catch(error => {
                            res.status(500).send({
                                resp: 'error',
                                error: `${error}`
                            });
                        })
                    )
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

function editarCurso(req, res) {
    let requisito = [];
    let aprendizaje = [];
    let curso = req.body.curso;
    let requisitos = req.body.requisitos;
    let aprendizajes = req.body.aprendizaje;
    CONN('curso').where('idCurso', curso.idCurso).update(curso).then(
            idCurso => {
                if (requisitos.length > 0) {
                    requisitos.forEach(function(element1) {
                        requisito.push({
                            idCurso_RequisitoCurso: curso.idCurso,
                            descripcionRequisitoCurso: element1.descripcionRequisitoCurso
                        })
                    });
                    CONN('requisitoCurso').insert(requisito).then()
                        .catch(error => {
                            res.status(500).send({
                                resp: 'error',
                                error: `${error}`
                            });
                        });
                }
                if (aprendizajes.length > 0) {
                    aprendizajes.forEach(function(element2) {
                        aprendizaje.push({
                            idCurso_CategoriaaprendizajeCurso: curso.idCurso,
                            descripcionCategoriaaprendizajeCurso: element2.descripcionCategoriaaprendizajeCurso
                        })
                    });
                    CONN('categoriaaprendizajeCurso').insert(aprendizaje).then()
                        .catch(error => {
                            res.status(500).send({
                                resp: 'error',
                                error: `${error}`
                            });
                        })
                }

                res.status(200).send({ resp: 'Exito', message: 'Curso Actualizado Correctamente' });
            })
        .catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });

}

function obtenerCursos(req, res) {
    CONN('curso')
        .join('subcategoriacurso', 'curso.idSubcategoriacurso_Curso', '=', 'subcategoriacurso.idSubcategoriacurso')
        .join('categoriacurso', 'subcategoriacurso.idCategoriacurso_Subcategoriacurso', '=', 'categoriacurso.idCategoriacurso')
        .select('*')
        .orderBy('curso.idCurso', 'desc')
        .then(result => {
            res.status(200).send({ resp: 'Exito', curso: result })
            console.log(result)
        })
        .catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

function getCursosSIns(req,res){
    let idPersonaCurso = [];
    let contador = 0;
    CONN('personacurso').select().then(response2=>{
        //     response2.forEach(function(element, index, array) {
        //     idPersonaCurso.push(element.idCurso_PersonaCurso)
        //         contador++;
        //         if (contador === array.length) {
                    res.status(200).send({personacurso: response2})
        //         }
        // })
          
        
    })
}


function obtenerAvanceCurso(req, res) {
    let idCurso = req.params.idCurso;
    let idUsuario = req.params.idUsuario;
    CONN('tema')
        .join('modulo', 'tema.idModulo_Tema', '=', 'modulo.idModulo')
        .count('idTema as Totales')
        .where('idCurso_Modulo', idCurso)
        .then(result => {
            if (!result) {
                res.status(200).send({ resp: 'Exito', message: 'No hay Temas en ese curso' })
            } else {
                CONN('usuariotema')
                    .join('tema', 'usuariotema.tema_idTema', '=', 'tema.idTema')
                    .join('modulo', 'tema.idModulo_Tema', '=', 'modulo.idModulo')
                    .count('idTema as Vistos')
                    .where('usuariotema.statusVisto', 1)
                    .andWhere('modulo.idCurso_Modulo', idCurso)
                    .andWhere('usuariotema.usuario_idUsuario', idUsuario)
                    .then(result2 => {
                        res.status(200).send({ Totales: result, Vistos: result2 })
                    }).catch(error => {
                        res.status(500).send({
                            resp: 'error',
                            error: `${error}`
                        });
                    });
            }
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

function actualizarAvanceCurso(req, res) {
    let idUsuarioPersonaCurso = req.params.idUsuarioPersonaCurso;
    let avance = req.params.avanceUsuarioPersonaCurso;
    CONN('usuariopersonacurso')
        .update('avanceUsuarioPersonaCurso', avance)
        .where('idUsuarioPersonaCurso', idUsuarioPersonaCurso)
        .then(result => {
            res.status(200).send({ resp: 'Exito', curso: "Avance actualizado" })
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

function obtenerCursosPersona(req, res) {
    CONN('curso')
        .join('subcategoriacurso', 'curso.idSubcategoriacurso_Curso', '=', 'subcategoriacurso.idSubcategoriacurso')
        .join('categoriacurso', 'subcategoriacurso.idCategoriacurso_Subcategoriacurso', '=', 'categoriacurso.idCategoriacurso')
        .join('personacurso', 'personacurso.idCurso_PersonaCurso', '=', 'curso.idCurso')
        .select('*')
        .groupBy('curso.idCurso')
        .then(result => {
            if (!result) {
                res.status(200).send({ resp: 'Exito', message: 'No hay Cursos registrados aún' })
            } else {
                res.status(200).send({ resp: 'Exito', curso: result })
            }
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}
function obtenerCursosIndex(req, res) {
    CONN('curso')
        .join('subcategoriacurso', 'curso.idSubcategoriacurso_Curso', '=', 'subcategoriacurso.idSubcategoriacurso')
        .join('categoriacurso', 'subcategoriacurso.idCategoriacurso_Subcategoriacurso', '=', 'categoriacurso.idCategoriacurso')
        .join('personacurso', 'personacurso.idCurso_PersonaCurso', '=', 'curso.idCurso')
        .select('*').where('curso.statusCurso',1)
        .groupBy('curso.idCurso')
        .then(result => {
            if (!result) {
                res.status(200).send({ resp: 'Exito', message: 'No hay Cursos registrados aún' })
            } else {
                res.status(200).send({ resp: 'Exito', curso: result })
            }
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

function obtenerCurso2(req, res) {
    let idCurso = req.params.idCurso;
    let idUsuario = req.params.idUsuario;
    CONN('curso')
        .select()
        .where('idCurso', idCurso)
        .then(curso => {
            CONN('subcategoriacurso')
                .select()
                .where('idSubcategoriacurso', curso[0]['idCurso'])
                .then(subCategoria => {
                    CONN('categoriacurso')
                        .select()
                        .where('idCategoriacurso', subCategoria[0]['idSubcategoriacurso'])
                        .then(categoria => {
                            CONN('requisitoCurso')
                                .select()
                                .where('idCurso_RequisitoCurso', curso[0]['idCurso'])
                                .then(requisitos => {
                                    CONN('categoriaaprendizajeCurso')
                                        .select()
                                        .where('idCurso_CategoriaaprendizajeCurso', curso[0]['idCurso'])
                                        .then(aprendizajes => {
                                            res.status(200).send({
                                                                curso: curso,
                                                                subCategoria: subCategoria,
                                                                categoria: categoria,
                                                                requisitos: requisitos,
                                                                aprendizajes: aprendizajes
                                                            })
                                        })
                                }).catch(error => {
                                    res.status(500).send({
                                        resp: 'error',
                                        error: `${error}`
                                    });
                                });
                        }).catch(error => {
                            res.status(500).send({
                                resp: 'error',
                                error: `${error}`
                            });
                        });
                }).catch(error => {
                    res.status(500).send({
                        resp: 'error',
                        error: `${error}`
                    });
                });
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

function obtenerCurso(req, res) {
    let idCurso = req.params.idCurso;
    let idUsuario = req.params.idUsuario;
    CONN('curso')
        .select()
        .where('idCurso', idCurso)
        .then(curso => {
            CONN('subcategoriacurso')
                .select()
                .where('idSubcategoriacurso', curso[0]['idCurso'])
                .then(subCategoria => {
                    CONN('categoriacurso')
                        .select()
                        .where('idCategoriacurso', subCategoria[0]['idSubcategoriacurso'])
                        .then(categoria => {
                            CONN('requisitoCurso')
                                .select()
                                .where('idCurso_RequisitoCurso', curso[0]['idCurso'])
                                .then(requisitos => {
                                    CONN('categoriaaprendizajeCurso')
                                        .select()
                                        .where('idCurso_CategoriaaprendizajeCurso', curso[0]['idCurso'])
                                        .then(aprendizajes => {
                                            CONN('personaCurso')
                                                .select()
                                                .where('idCurso_PersonaCurso', curso[0]['idCurso'])
                                                .then(personaCurso => {
                                                    CONN('usuarioPersonaCurso')
                                                        .select()
                                                        .where('idPersonaCurso_UsuarioPersonCurso', personaCurso[0]['idPersonaCurso'])
                                                        .andWhere('idUsuario_UsuarioPersonaCurso', idUsuario)
                                                        .then(usuarioPersonaCurso => {
                                                            res.status(200).send({
                                                                curso: curso,
                                                                subCategoria: subCategoria,
                                                                categoria: categoria,
                                                                requisitos: requisitos,
                                                                aprendizajes: aprendizajes,
                                                                personaCurso: personaCurso,
                                                                usuarioPersonaCurso: usuarioPersonaCurso
                                                            })
                                                        })
                                                })
                                        })
                                }).catch(error => {
                                    res.status(500).send({
                                        resp: 'error',
                                        error: `${error}`
                                    });
                                });
                        }).catch(error => {
                            res.status(500).send({
                                resp: 'error',
                                error: `${error}`
                            });
                        });
                }).catch(error => {
                    res.status(500).send({
                        resp: 'error',
                        error: `${error}`
                    });
                });
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
}

function eliminaRequisito(req, res) {
    let idRequisito = req.params.idRequisito;
    CONN('requisitoCurso').where('idRequisitoCurso', idRequisito)
        .del().then(result => {
            res.status(200).send({ resp: 'Exito', message: 'Exito al eliminar el requisito' })
        }).catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}

function eliminaAprendizaje(req, res) {
    let idAprendizaje = req.params.idAprendizaje;
    CONN('categoriaaprendizajeCurso').where('idCategoriaaprendizajeCurso', idAprendizaje)
        .del().then(result => {
            res.status(200).send({ resp: 'Exito', message: 'Exito al eliminar el aprendizaje' })
        }).catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}

function subeImagen(req, res) {
    let idCurso = req.params.idCurso;
    let foto = req.file;
    CONN('curso').where('idCurso', idCurso).update('imagenCurso', req.file.filename)
        .then(result => {
            if (!result) {
                res.status(500).send({ resp: 'Error', message: 'No se actualizo la foto' })
            } else {
                CONN('curso').select('imagenCurso').where('idCurso', idCurso)
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

var getImageFile = (req, res) => {
    var imagenFile = req.params.imagenCurso;
    var path_file = `./imgs/Curso/${imagenFile}`;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la Imagen' });
        }
    });
}


function subeDocTarea(req, res) {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let idUsuarioPersonaCurso_Materialevalusuario = req.params.idUsuarioPersonaCurso_Materialevalusuario;
    let idEvaluacioncontenido_Materialevalusuario = req.params.idEvaluacioncontenido_Materialevalusuario;
    let doc = req.file;
    let docTarea = new tareasUsuariosModel(
        idEvaluacioncontenido_Materialevalusuario, /*Cambiar por id que no sé cual es :v */
        idUsuarioPersonaCurso_Materialevalusuario, 
        5, 
        idUsuarioPersonaCurso_Materialevalusuario+'-'+req.file.originalname, 
        '-', 
        yyyy + "/" + mm + "/" + dd, 
        1,  /*Entregado*/ 
        1);

    CONN('materialevalusuario').insert(docTarea).then(result => {
            if (!result) {
                res.status(500).send({ resp: 'Error', message: 'No se envío tu tarea' })
            } else {
                CONN('materialevalusuario').select('nombreMaterialevalusuario').where('idUsuarioPersonaCurso_Materialevalusuario', idUsuarioPersonaCurso_Materialevalusuario)
                    .then(docu => {
                        if (!docu) {
                            res.status(500).send({ resp: 'Error', message: 'error al devolver documento' })
                        } else {
                            res.status(200).send({ docu: docu });
                        }
                    }).catch(error => {
                        res.status(404).send({ resp: 'Error', error: `${error}` });
                    })
            }
        }).catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}



/*========================================
=            Alumno consultas            =
========================================*/

function vistaCurso(req, res) {
    let idCurso = req.params.idCurso;
    let contador = 0;
    let contenido = [];
    let examenes = [];
    CONN('curso').select()
        .where('idCurso', idCurso)
        .then(curso => {
            CONN('categoriaaprendizajecurso')
                .select()
                .where('idCurso_CategoriaaprendizajeCurso', curso[0]['idCurso'])
                .then(aprendizajes => {
                    CONN('requisitoCurso').select()
                        .where('idCurso_RequisitoCurso', curso[0]['idCurso'])
                        .then(requisitos => {
                            CONN('modulo').select()
                                .where('idCurso_Modulo', idCurso)
                                .orderBy('numeroModulo')
                                .then(modulos => {
                                    modulos.forEach(function(element, index, array) {
                                        CONN('examen').select()
                                            .where('idModulo_Examen', element.idModulo)
                                            .then(examen => {
                                                examenes.push({
                                                    examen:examen
                                                })
                                                CONN('tema').select()
                                                    .where('idModulo_Tema', element.idModulo)
                                                    .then(temas => {
                                                        contenido.push({
                                                            modulo: {
                                                                idModulo: element.idModulo,
                                                                nombreModulo: element.nombreModulo,
                                                                numeroModulo: element.numeroModulo,
                                                                idCurso_Modulo: element.idCurso_Modulo,
                                                                statusModulo: element.statusModulo,
                                                                duracionModulo: element.duracionModulo,
                                                                temas: temas
                                                            }
                                                        })
                                                        contador++;
                                                        if (contador === array.length) {
                                                            res.status(200).send({
                                                                curso: curso,
                                                                aprendizajes: aprendizajes,
                                                                requisitos: requisitos,
                                                                contenido: contenido,
                                                                examen: examenes
                                                            })
                                                        }
                                                    })

                                            })



                                    })
                                })
                                .catch(error => {
                                    res.status(404).send({ resp: 'Error', error: `${error}` });
                                })
                        })
                        .catch(error => {
                            res.status(404).send({ resp: 'Error', error: `${error}` });
                        })
                })
                .catch(error => {
                    res.status(404).send({ resp: 'Error', error: `${error}` });
                })
        })
        .catch(error => {
            res.status(404).send({ resp: 'Error', error: `${error}` });
        })
}


/*=====  End of Alumno consultas  ======*/


/*=====  Test Calificaciones  ======*/
    function obteneridMod(req,res){
        let idModulo = req.params.idModulo;
        // let idTema = req.params.idTema;
        CONN('evaluacionModulo')
        .where('idModulo_Evaluacionmodulo', idModulo)
        .select('idEvaluacionmodulo')
        .then(idEvalMod=>{
                       res.status(200).send({ resp: 'Exito', idEvalMod })
        })
        .catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
    }

        function obteneridCalifModulo(req,res){
        let idEvaluacionmodulo = req.params.idEvaluacionmodulo;
        // let idTema = req.params.idTema;
        CONN('califModulo')
        .where('idEvaluacionModulo_CalifModulo', idEvaluacionmodulo)
        .select()
        .then(califModulo=>{
                       res.status(200).send({ resp: 'Exito', califModulo })
        })
        .catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
    }

    function obteneridTema(req,res){
        let idTema = req.params.idTema;
        // let idTema = req.params.idTema;
        CONN('evaluacionTema')
        .where('idTema_Evaluaciontema', idTema)
        .select('idEvaluaciontema')
        .then(idEvalTema=>{
                       res.status(200).send({ resp: 'Exito', idEvalTema })
        })
        .catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
    }

    function obteneridCalifTema(req,res){
        let idEvaluaciontema = req.params.idEvaluaciontema;
        // let idTema = req.params.idTema;
        CONN('califTema')
        .where('idEvaluacionTema_CalifTema', idEvaluaciontema)
        .select()
        .then(califTema=>{
                       res.status(200).send({ resp: 'Exito', califTema })
        })
        .catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
    }

    function registrarCalif(req,res){
        let idUsuarioPersonaCurso = req.params.idUsuarioPersonaCurso;
        let CalifCurso = new CalifCursoModel(idUsuarioPersonaCurso,req.body.califCur);
        CONN('califcurso').where('idUsuarioPersonaCurso_CalifCurso', idUsuarioPersonaCurso)
        .select().then(response=>{
            if(response.length == 0){
                CONN('califcurso').insert(CalifCurso).then(response1=>{
                    if(!response1){
                       res.status(500).send({resp:'Error', error: 'No se registró la calificación'});
                    }
                    else{
                        res.status(200).send({
                        resp:'Calificación registrado',
                        idCalifCurso:response1
                    })
                    }
                }).catch(error =>{
                res.status(500).send({resp:'error',
                    error: `${error}`});
            });
            }
            else{
                CONN('califcurso').where('idUsuarioPersonaCurso_CalifCurso',idUsuarioPersonaCurso).update('califCurso',req.body.califCur).then(response2=>{
                    if(!response2){
                       res.status(500).send({resp:'Error', error: 'No se actualizó la calificación'});
                    }
                    else{
                        res.status(200).send({
                        resp:'Calificación actualizada',
                        idCalifCurso:response2
                    })
                    }
                }).catch(error =>{
                res.status(500).send({resp:'error',
                    error: `${error}`});
            });
            }
        })
    }

    function getCalifCurso(req,res){
        let idUsuarioPersonaCurso = req.params.idUsuarioPersonaCurso;
        CONN('califcurso').where('idUsuarioPersonaCurso_CalifCurso', idUsuarioPersonaCurso)
        .select().then(response=>{
            if(!response){
                res.status(500).send({resp:'Error', error: 'No se encontró calificación'});
            }
            else{
                   res.status(200).send({
                        CalifCurso:response
                    })
                    }
        })
    }

    

/*=====  End Test Calificaciones  ======*/


    function activarCurso(req,res){
        let idCurso = req.params.idCurso;
    
    CONN('curso')
        .update('statusCurso', 1)
        .where('idCurso', idCurso)
        .then(result => {
            res.status(200).send({ resp: 'Exito', curso: "Curso Activado" })
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
    }

    function desactivarCurso(req,res){
        let idCurso = req.params.idCurso;
    
    CONN('curso')
        .update('statusCurso', 0)
        .where('idCurso', idCurso)
        .then(result => {
            res.status(200).send({ resp: 'Exito', curso: "Curso Desactivado" })
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
    }

    function obtenerevalMod(req,res){
        let idCurso = req.params.idCurso;
        CONN('modulo').select('evaluacionEvaluacionmodulo', 'numeroModulo')
        .join('evaluacionmodulo', 'modulo.idModulo', '=', 'evaluacionmodulo.idModulo_Evaluacionmodulo')
        .where('idCurso_Modulo', idCurso)
        .orderBy('numeroModulo')
        .then(result => {
            res.status(200).send({ resp: 'Exito', modulos: result})
        }).catch(error => {
            res.status(500).send({
                resp: 'error',
                error: `${error}`
            });
        });
    }

module.exports = {
    registraCurso,
    obtenerCursos,
    obtenerCurso,
    subeImagen,
    getImageFile,
    editarCurso,
    eliminaRequisito,
    eliminaAprendizaje,
    vistaCurso,
    obtenerCursosPersona,
    obtenerCurso2,
    subeDocTarea,
    obteneridMod,
    obteneridTema,
    obteneridCalifTema,
    obteneridCalifModulo,
    obtenerAvanceCurso,
    actualizarAvanceCurso,
    registrarCalif,
    getCalifCurso,
    activarCurso,
    desactivarCurso,
    obtenerCursosIndex,
    obtenerevalMod,
    getCursosSIns
}