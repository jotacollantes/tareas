export class Todo {

    
    //Hacemos este metodo estatico porque el local storage no almacena instancia de objetos sino objetos literales y los metodos de las clases se pierden, con este metodo estatico podemos exportar la clase con todas sus propiedades y recuperar sus metodos
    static fromJson({id,tarea,completado,creado})
    {
        //console.log('Desde la clase Todo', id,tarea,completado,creado)    
        //Creo una nueva clase de Todo que ahora si podra exportar sus metodos
        const tempTodo=new Todo(tarea);
        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;
        //console.log('Retorno tempTodo',tempTodo)
        
        return tempTodo
    }

    constructor(tarea){
        this.tarea=tarea;
        this.id = new Date().getTime()// Milisegundos 3476236487263846
        this.completado=false;
        this.creado= new Date();
    }

    imprimirTarea(){
        console.log(`Desde el metodo de impresion de clase Todo: ${this.tarea} - ${this.id}`)
    }

}