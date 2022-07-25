import {Todo} from './todo.class'
export class TodoList {

    


    constructor()
    {
        //this.todos=[]; 
        
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){

        this.todos.push(todo);
        this.guardarLocalStorage()
    }

    eliminarTodo(id){
        //El filter creara un nuevo arreglo exluyendo el todo cuyo id coincidio con el id que se recibe como parametro.
        //  Inicializara el arreglo todos[] con el nuefo arreglo generado por el filter
        //console.log("tarea a eliminar ",id)
        //console.log(this.todos)
        this.todos=this.todos.filter((e)=>e.id != id)
        //console.log(this.todos)
        this.guardarLocalStorage()

    }

    marcarCompletado(id){
        //se hara una iteracion por cada tarea en el arreglo todos[]
        for(const todo of this.todos){
            //todo.id es de tipo numerico y id  es de tipo string por eso se usa ==
            if(todo.id==id)
            {
                console.log(todo.id,id)
                //EN caso de que seleccione y deseleccione el check de la tarea
                //siempre sera el valor contrario
                todo.completado=!todo.completado
                //Salgo del bucle
                this.guardarLocalStorage()
                break;
            }
        }

    }

    eliminarCompletados(){
        //No necesita argumento porqu ese barrera el arreglo todo y preguntar por completado=true;
        this.todos=this.todos.filter((e)=>e.completado == false)
        this.guardarLocalStorage()
    }

    guardarLocalStorage(){
        //En el local storage todo se graba como string por eso es que si se guarda un arreglo o un objeto, el valor de una clave en el localstora siempre sera: [object Object],[object Object]. Para solucionar eso se puede mandar un json como string
        //console.log(JSON.stringify(this.todos))
        localStorage.setItem('todo',JSON.stringify(this.todos))
    }


    cargarLocalStorage(){
        // grabo en el arreglo si existe en el local storage
        //Caso contrario inicializo el arrglo todos
        //Con parse convierto el string json a su objeto original
        this.todos=(localStorage.getItem('todo'))
                ? this.todos=JSON.parse(localStorage.getItem('todo'))
                : this.todos=[];
        //console.log('Cargar localstorage antes del MAP: ', this.todos)

        //map es un metodo de los arreglos que devuelve un arreglo mutado(modificado)
        //Hacemos referencia al metodo estatico Todo.fromJson
        //Ojo si se  usa {} al igual que en el metodo filter en el => del call back, hay que usar Return.
        this.todos=this.todos.map(e => {
            return Todo.fromJson(e)
        })

        //console.log('Cargar despues del map: ', this.todos)
    }



}