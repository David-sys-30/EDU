'use strict'

class Curso{
	constructor(tipoCurso,idSubcategoria,nombreCurso,resumenCurso,descripcionCurso,dirigidoCurso,imagen,costo,status,urlpresentacion){
		this.idTipocurso_Curso = tipoCurso;
		this.idSubcategoria_Curso = idSubcategoria;
		this.nombreCurso = nombreCurso;
		this.resumenCurso = resumenCurso;
		this.descripcionCurso = descripcionCurso;
		this.dirigidoCurso = dirigidoCurso;
		this.imagenCurso = imagen;
		this.costoCurso = costo;
		this.statusCurso = status;
		this.urlpresentacionCurso = urlpresentacion
	}
}

module.exports = Curso;