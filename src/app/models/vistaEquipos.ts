
export class vistaEquipos {

    constructor(
      public  Cod_Equipo: number,
      public  Cod_Usuario: number,
      public Nombre_Usuario: string,
      public Nombre: string,
      public Foto: string,
      public Abreviacion: string,
      public Fecha: Date,
      public Estrella: number,
      public Dureza: string,
      public Posicion_Actual: number,
      public Puntaje_Actual: number,
      public Estado: boolean,
      public Descripcion_Estado: string,
      public Cod_Provincia: number,
      public Nombre_Provincia: string,
      public Cod_Canton: number,
      public Nombre_Canton: string,
      public Cod_Distrito: number,
      public Nombre_Distrito: string,
    ){}

}