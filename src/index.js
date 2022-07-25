//Para que incluya estilos globales
import './styles.css'
//Importamos todo
import { Todo,TodoList } from './classes'//va a buscar el index.js por defecto
import { crearTodoHtml } from './js/componentes';

//Hay que exportarlo para usarlo en components.js
export const todoList = new TodoList();

//setTimeout(() => {
//     localStorage.removeItem('mi-key')
// }, 4500);

//Para Pintar el html
//element es el primer argumento que devuelve el for each se puede cambiar por cualquier otro nombre en este caso usaremos todo

todoList.todos.forEach((todo) => {
    //console.log('Desde el for each', todo)
    crearTodoHtml(todo)
});


//Para probar que al recuperar los datos del local estorage se se convierten a instancias.
todoList.todos.forEach((e)=> {
    e.imprimirTarea();
})

//console.log('Cargar localstorage desde el index: ', todoList.todos)