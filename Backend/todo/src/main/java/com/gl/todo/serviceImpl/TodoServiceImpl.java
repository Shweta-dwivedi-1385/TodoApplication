package com.gl.todo.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gl.todo.dto.TodoDto;
import com.gl.todo.entity.Todo;
import com.gl.todo.exception.ResourceNotFoundException;
import com.gl.todo.mapper.TodoMapper;
import com.gl.todo.repository.TodoRepository;
import com.gl.todo.service.TodoService;

@Service
public class TodoServiceImpl implements TodoService {

	@Autowired
	TodoRepository todoRepository;

	@Override
	public TodoDto createTodo(TodoDto todoDto) {
		Todo todo = TodoMapper.mapToTodo(todoDto);
		Todo savedTodo = todoRepository.save(todo);
		return TodoMapper.mapToTodoDto(savedTodo);
	}

	@Override
	public TodoDto getTodoById(int id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo with id " + id + " not found."));
		return TodoMapper.mapToTodoDto(todo);
	}

	@Override
	public List<TodoDto> getAllTodos() {
		List<Todo> todos = todoRepository.findAll();
		return todos.stream().map((todo) -> TodoMapper.mapToTodoDto(todo)).collect(Collectors.toList());
	}

	@Override
	public TodoDto updateTodo(int id, TodoDto todoDto) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo with id " + id + " not found."));
		todo.setTitle(todoDto.getTitle());
		todo.setDescription(todoDto.getDescription());
		todo.setCompleted(todoDto.isCompleted());
		Todo savedTodo = todoRepository.save(todo);
		return TodoMapper.mapToTodoDto(savedTodo);
	}

	@Override
	public void deleteTodo(int id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Todo with id "+id+" not found."));
		
		todoRepository.delete(todo);

	}

	@Override
	public TodoDto completeTodo(int id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Todo with id "+id+" not found."));
		todo.setCompleted(true);
		Todo savedTodo = todoRepository.save(todo);
		return TodoMapper.mapToTodoDto(savedTodo);
	}

	@Override
	public TodoDto incompleteTodo(int id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Todo with id "+id+" not found."));
		todo.setCompleted(false);
		Todo savedTodo = todoRepository.save(todo);
		return TodoMapper.mapToTodoDto(savedTodo);
	}

}
