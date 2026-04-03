package com.gl.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gl.todo.dto.TodoDto;

public interface TodoService {
	
   	TodoDto createTodo(TodoDto todoDto);

	TodoDto getTodoById(int id);

	List<TodoDto> getAllTodos();

	TodoDto updateTodo(int id,TodoDto todoDTo);
	void deleteTodo(int id);
	TodoDto completeTodo(int id);
	TodoDto incompleteTodo(int id);
}
