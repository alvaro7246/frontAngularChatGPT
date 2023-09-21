import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  data: any;
  respuesta: any;
  formDatosPublicacion = new FormGroup({
    tema: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    tono: new FormControl('', Validators.required),
    opcionHashtag: new FormControl('', Validators.required),
    hashtags: new FormControl('', Validators.required),
  });
  constructor(private appService: AppService) { }

  ngOnInit() {
  }
  
  formRecuperarDatos():any{
    const tema=this.formDatosPublicacion.get('tema').value;
    const tipo=this.formDatosPublicacion.get('tipo').value;
    const cantidad=this.formDatosPublicacion.get('cantidad').value;
    const tono=this.formDatosPublicacion.get('tono').value;
    const opcionHashtag=this.formDatosPublicacion.get('opcionHashtag').value;
    const hashtags=this.formDatosPublicacion.get('hashtags').value;
    let body1={
      tema,
      tipo,
      "cantidad":parseInt(cantidad),
      tono,
      opcionHashtag,
      hashtags
  }
    return(body1)
  }
  mostrarRespuesta(respuesta:any){
    this.respuesta=respuesta.choices[0].text;

  }
  GenerarPublicacion(){
    let body=this.formRecuperarDatos();
    this.appService.getChatGPT(body).subscribe(datos => {
      const respuesta = datos;
      this.mostrarRespuesta(respuesta);
    });
    this.guardar();
    this.limpiar();
  }
  guardar(){
    let body=this.formRecuperarDatos();
    this.appService.getIdPublicacion().subscribe(datos => {
      this.data = datos[0].id_publicacion;
      this.appService.guardarDatos(this.data,body).subscribe(
    );
    });

    
  this.limpiar();
  }
  limpiar(){
    this.formDatosPublicacion.get('tema').setValue('');
    this.formDatosPublicacion.get('tipo').setValue('');
    this.formDatosPublicacion.get('cantidad').setValue('');
    this.formDatosPublicacion.get('tono').setValue('');
    this.formDatosPublicacion.get('opcionHashtag').setValue('');
    this.formDatosPublicacion.get('hashtags').setValue('');
  }
}
