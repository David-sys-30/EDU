import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import {BannerService} from '../../services/banner.service';
import {BannerModel} from '../../models/banner.model'
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface registraBan{
	idBanner:string
}

@Component({
  selector: 'app-carga-banners',
  templateUrl: './carga-banners.component.html',
  styleUrls: ['./carga-banners.component.css'],
  providers: [BannerService]
})
export class CargaBannersComponent implements OnInit {
	public banners;
	public url:string;
	public filesToUpload: Array<File>;
  constructor(private _bannerService:BannerService,
  	public dialog: MatDialog) {
  this.url = GLOBAL.url;
   }

  ngOnInit() {

  	this.obtenerBanners();
  }

  public activaBanner(idBanner){
  	this._bannerService.activaBanner(idBanner).subscribe(response=>{
  		this.obtenerBanners();
  	})
  }

  public desactivaBanner(idBanner){
  	this._bannerService.desactivaBanner(idBanner).subscribe(response=>{
  		this.obtenerBanners();
  	})
  }

  public obtenerBanners(){
  	this._bannerService.obtenerBanners().subscribe(response=>{
  		this.banners = response.banners;
  	})
  }


  openDialog(idBanner):void{
		let dialogRef = this.dialog.open(RegistraBanner,{
			width:'400px',
			data:{
				idBanner:idBanner
			}
		});

		dialogRef.afterClosed().subscribe(result=>{
			this.ngOnInit();
		})
	}

}

@Component({
	selector: 'app-registraBanners',
	templateUrl: './regBanner.component.html',
	styleUrls: ['./carga-banners.component.css'],
	providers: [BannerService]
})
export class RegistraBanner {

	public banner:BannerModel;
	public url:string;
	public filesToUpload: Array<File>;
	public banners;
	constructor(
		private _bannerService:BannerService,
		public dialogRef:MatDialogRef<RegistraBanner>,
		@Inject(MAT_DIALOG_DATA) public data: registraBan

		){
		this.url = GLOBAL.url;
		this.banner = new BannerModel('','','');
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
		function archivo(evt) {
	      var files = evt.target.files; // FileList object
	        //Obtenemos la imagen del campo "file". 
	        for (var i = 0, f; f = files[i]; i++) {         
	           //Solo admitimos imágenes.
	           if (!f.type.match('image.*')) {
	           	continue;
	           }
	           var reader = new FileReader();	           
	           reader.onload = (function(theFile) {
	           	return function(e) {
	               // Creamos la imagen.
	               document.getElementById("list").style.visibility = "visible";
	               document.getElementById("list").innerHTML = ['<img style="width: 50%" class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
	           };
	       })(f);
	       reader.readAsDataURL(f);
	   }
	}
	document.getElementById('files').addEventListener('change', archivo, false);
}

	agregarBanner(idBanner){
		this._bannerService.register(this.banner).subscribe(response=>{
			this.makeFileRquest(this.url+'subeImagenBanner/'+response.idBanner,
							[], this.filesToUpload).then(
							(result:any)=>{
								
							}
							).catch(error=>{
							})
			this.obtenerBanners();
			this.onNoClick();
			console.log(response);
		})
	}

	public obtenerBanners(){
  	this._bannerService.obtenerBanners().subscribe(response=>{
  		this.banners = response.banners;
  	})
  }

		fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	makeFileRquest(url:string,params:Array<string>, files:Array<File>){
		
		return new Promise(function(resolve,reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();
			for (var i = 0; i < files.length; i++) {
				formData.append('image',files[i],files[i].name)
			}
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.response));	
					}else{
						reject(xhr.response);
					}
				}
			}
			xhr.open('POST',url,true);
			xhr.send(formData);
		})
	}

}
