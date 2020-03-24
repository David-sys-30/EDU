import { Component, OnInit } from '@angular/core';

export class MensajeUsersModel {

  constructor(
    
    public mensaje:string,
    public time:string,
    public emisor:string,
    public receptor:string,
    public id_curso:string,
    public visto:string,
    public idConversacion:string,
   
    ) { }

}