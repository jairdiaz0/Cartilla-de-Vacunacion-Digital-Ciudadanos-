export class AlertClass {
  private status:any;
  private custom:any;
  /**
   * Permite construir el objeto de status estandarizado.
   */
  constructor() {
    this.status = {
      default: {
        title: '',
        class: [''],
      },
      serverError: {
        title: 'No Hay Comunicación Con El Servidor',
        class: ['alert', 'alert-warning'],
      },
      serverWait: {
        title: 'Esperando Respuesta Del Servidor',
        class: ['alert', 'alert-secondary'],
      },
      success: {
        title: '',
        class: ['alert', 'alert-success'],
      },
      failure: {
        title: '',
        class: ['alert', 'alert-danger'],
      },
      flagShow: false,
    };
  }

  /**
   *  Permite obtener el objeto de status estandarizado para el alert.
   * @returns objeto de status.
   */
  getStatus(){
    return this.status;
  }

  getObjectToCustom(titleO:string, classO: Array<string>){
    return {
      "title": titleO,
      "class": classO
    }
  }
}
