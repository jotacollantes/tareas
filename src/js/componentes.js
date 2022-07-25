import { Todo,TodoList } from '../classes'
import {todoList} from '../index'
// Referencias al HTML
const divTodoList=document.querySelector(".todo-list")
const txtInput=document.querySelector(".new-todo")
const btnBorrar=document.querySelector(".clear-completed")
const ulFiltros=document.querySelector(".filters")
const anchorFiltros=document.querySelectorAll(".filtro")


export const crearTodoHtml=(todo)=>{
    

const htmlTodo=`
<li class="${(todo.completado)? 'completed' : ''}" data-id="${todo.id}">
<div class="view">
    <input class="toggle" type="checkbox" ${(todo.completado)? 'checked' : ''}>
    <label>${todo.tarea}</label>
    <button class="destroy"></button>
</div>
<input class="edit" value="Create a TodoMVC template">
</li>`
// por las classes que tiene el elemento <li> este tiene que estar contenedor <div>
const div=document.createElement('div')
div.innerHTML=htmlTodo;

//añado el div dentro del contenedor div con la class todo-list para que mantengan los los list item pero solo el div.firstElementChild para que no se cree un div por cada listitem
divTodoList.append(div.firstElementChild)
//Si uso innerHtml sobreescribe list item
//divTodoList.innerHTML=htmlTodo;
return div.firstElementChild
}

//Eventos
txtInput.addEventListener('keyup',(event)=>{
    //console.log(event)
    if(event.keyCode===13 && txtInput.value.length>0)
    {
        const nuevoTodo = new Todo(txtInput.value)
        //todoList es una instancia de la clase TodoList que la puedo usar por referencia
        todoList.nuevoTodo(nuevoTodo)
        //console.log(todoList.todos)
        crearTodoHtml(nuevoTodo)
        txtInput.value='';
    }
   
})

divTodoList.addEventListener('click',(event)=>{
    
    //Para obtener el dato e identificar en que elemento se  hizo click
    //console.log('Click')
    //console.log(event.target.localName);
    const nombreElemento=event.target.localName // Se va a obtener los elementos: input,label o button.




{/* <li class="completed" data-id="1658610304640">
						<div class="view">
							<input class="toggle" type="checkbox" checked>
							<label>Probar JavaScript</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li> */}

    const todoElemento=event.target.parentElement.parentElement;// Para hacer referencia al <li> que tiene el ID de la tarea en data-id="abc". Es necesario subir un nivel mas
    //console.log(todoElemento)
    const todoId =todoElemento.getAttribute('data-id') // para obtner el id del atributo data-id del elemento <li>
    //console.log(todoId)
    
    if(nombreElemento.includes('input'))//si hizo clic en el check
    {
        todoList.marcarCompletado(todoId);
        //para hacer referencia a todas las clases se usa el classList.
        //Para añadir o quitar una clase se usa toggle
        todoElemento.classList.toggle('completed')
    }
    //console.log(todoList)

    if(nombreElemento.includes('button'))//si hizo clic en el boton
    {
        
        todoList.eliminarTodo(todoId);
        //console.log(todoElemento);
        divTodoList.removeChild(todoElemento)// va a remover el hijo dentro de la lista ordenada <ul>:
        // <li class="completed" data-id="1658610304640">
		// 				<div class="view">
		// 					<input class="toggle" type="checkbox" checked>
		// 					<label>Probar JavaScript</label>
		// 					<button class="destroy"></button>
		// 				</div>
		// 				<input class="edit" value="Create a TodoMVC template">
		// 			</li> 
        
    }

})
btnBorrar.addEventListener('click',()=> {
    todoList.eliminarCompletados();
    //hay que eliminar el html que muestra la tarea completada, hay que empezar de abajo hacia arriva.
    //los elemendos estan en divTodoList
    // empiezo de abajo hacia arriba, es un for inverso
    for(let i = divTodoList.children.length-1; i >=0 ; i--)
    {
        const elemento =divTodoList.children[i];
        console.log(elemento)
        //Pregunto si un elemento html contiene la class completed
        if(elemento.classList.contains('completed'))
        {
            //El elemento tiene este valor:
            // <li class="completed" data-id="1658708105392">
            // <div class="view">
            //     <input class="toggle" type="checkbox">
            //     <label>Aprender React</label>
            //     <button class="destroy"></button>
            // </div>
            // <input class="edit" value="Create a TodoMVC template">
            // </li>
            // y lo borra del divTofoList
            divTodoList.removeChild(elemento)
        }
    }
})

ulFiltros.addEventListener('click', (e)=> {

    //console.log(e.target.text)
    const filtro=e.target.text; //Va a devolver, Todos, Pendientes, Completados y undefined
    if(!filtro){return;}//SI es undefined no hace nada y se sale del event listener
    
    anchorFiltros.forEach(e => 
        {
            e.classList.remove('selected');
        }
    )

    //console.log(e.target); //Este event.target muestra los siguiente: <a class="filtro" href="#/active">Pendientes</a>

    
    e.target.classList.add('selected');//añado la clase selected a cada objeto anchor: <a class="filtro selected" href="#/active">Pendientes</a>

    for (const e of divTodoList.children){
        //console.log('elemeto del div:', e)
        //removemos la classe css hidden

        //Esta linea sera el comportamiento por defecto, o sea se va a remover la classe hidden y por ende siempre estara visible y en caso de que ni una tarea cumpla con las condiciones del switch, los elementos dentro de la lista permanecera visible
        e.classList.remove('hidden');
        const completado=e.classList.contains('completed')
        
        switch (filtro) {
            case 'Pendientes':
                //Ocultos los completados
                if(completado) {//devuelve true
                    e.classList.add('hidden');
                }
                break;
            case 'Completados':
                //Ocultos los completados
                if(!completado) {//devuelve false
                    e.classList.add('hidden');
                }
                break;
            default:
                break;
        }

    }

})