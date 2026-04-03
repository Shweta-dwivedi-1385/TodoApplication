package com.gl.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gl.todo.dto.TodoDto;
import com.gl.todo.service.TodoService;


@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
public class TodoController {
	
	@Autowired
	TodoService todoService;
	
	@PostMapping
	public ResponseEntity<TodoDto> createTodo(@RequestBody TodoDto todoDto){
		TodoDto savedTodo = todoService.createTodo(todoDto);
		
		return new ResponseEntity<>(savedTodo,HttpStatus.CREATED);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<TodoDto> getTodoById(@PathVariable("id") int todoId){
		TodoDto todo = todoService.getTodoById(todoId);
		
		return new ResponseEntity<>(todo,HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<List<TodoDto>> getAllTodo(){
		List<TodoDto> todo = todoService.getAllTodos();
		return new ResponseEntity<>(todo,HttpStatus.OK);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<TodoDto> updateTodo(@PathVariable("id")int todoId,@RequestBody TodoDto todoDto){
		TodoDto todo = todoService.updateTodo(todoId, todoDto);
		return new ResponseEntity<>(todo,HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteTodo(@PathVariable("id")int todoId){
		todoService.deleteTodo(todoId);
		return new ResponseEntity<String>("Todo Deleted successfully",HttpStatus.OK);
	}
	
	@PatchMapping("{id}/complete")
	public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") int todoId){
		TodoDto todo = todoService.completeTodo(todoId);
		return new ResponseEntity<>(todo,HttpStatus.OK);
	}
	
	@PatchMapping("{id}/in-complete")
	public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable("id") int todoId){
		TodoDto todo = todoService.incompleteTodo(todoId);
		return new ResponseEntity<>(todo,HttpStatus.OK);
	}	
}
