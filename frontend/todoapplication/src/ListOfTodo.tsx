import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { completeTodo, deleteTodo, getAllTodos, incompleteTodo } from "./services/TodoService";

type Todo = {
    id : number;
    title : string;
    description : string;
    completed : boolean
}

const ListOfTodo = () => {
    let [todos,setTodos] = useState<Todo[]>([]);

    let navigator = useHistory();

    useEffect(()=>getAllTodo(),[])

    function getAllTodo(){
        getAllTodos().then((response)=>{
            console.log(response.data)
            setTodos(response.data)
        })
        .catch((error)=>console.log(error))
    }

    function editTodo(id:number){
       navigator.push(`update-todo/${id}`)
    }

    function completeTodoById(id:number){
        console.log(id)
        completeTodo(Number(id)).then((response)=>{
            console.log(response.data)
            getAllTodo();
        }).catch((error)=>{
            console.log(error)
        })
    }

    function incompleteTodoById(id:number){
        incompleteTodo(Number(id)).then((response)=>{
            console.log(response.data)
            getAllTodo();
        }).catch((error)=>{
            console.log(error)
        })
    }
  function deleteTodoById(id: number){
        deleteTodo(Number(id)).then((response)=>{
          console.log(response)
          getAllTodo();
        }).catch((error)=> console.log(error))
  }

    return(<>
        
        <Container style={{ marginTop: "20px" }}>
        <h3 style={{ textAlign: "center" }}>List of Todos</h3>
        <Link
          to="/add-todo"
          className="square border border-dark btn btn-primary"
        >
          Add Todo
        </Link>
        <br />
        <br />
        <Table bordered hover style={{border:"1px solid black"}}>
          <thead>
            <tr>
              <th>Todo Id</th>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed?"Yes":"No"}</td>
                <td>
                  <button
                    className="square border border-dark btn btn-info"
                    onClick={()=>editTodo(todo.id)}>
                    Update
                  </button>
                  &nbsp; &nbsp;
                  <button
                    className="square border border-dark btn btn-danger"
                    onClick={()=>deleteTodoById(todo.id)}>
                    Delete
                  </button>
                  &nbsp; &nbsp;
                  <button
                    className="square border border-dark btn btn-success"
                    onClick={()=>completeTodoById(todo.id)}>
                    Completed
                  </button>
                  &nbsp; &nbsp;
                  <button
                    className="square border border-dark btn btn-info"
                    onClick={()=>incompleteTodoById(todo.id)}>
                    In Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>)
}

export default ListOfTodo;