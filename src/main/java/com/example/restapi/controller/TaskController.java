package com.example.restapi.controller;


import com.example.restapi.entity.Task;
import com.example.restapi.exception.NotFoundException;
import com.example.restapi.repo.TaskRepository;
import com.example.restapi.repo.UserRepository;
import jakarta.annotation.security.PermitAll;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("task")
@PermitAll
public class TaskController {
    @PersistenceUnit(name = "myPersistenceUnit")
    private EntityManagerFactory entityManagerFactory;

    @Autowired
    private  TaskRepository taskRepository;
    @Autowired

    public TaskController() {

    }

    public TaskController(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }
    @GetMapping
    public List<Task> list(){
        return taskRepository.findAll();
    }

    @GetMapping("{id}")
    public Task getOne(@PathVariable String id){
        return taskRepository.findById(Long.parseLong(id)).orElseThrow(NotFoundException::new);

    }


    @PostMapping
    public Task create(@RequestBody Task task){
        taskRepository.save(task);
        return task;
    }

    @PutMapping("{id}")
    public Task update(@PathVariable String id, @RequestBody Task task){
        Optional<Task> taskOptional = taskRepository.findById(Long.parseLong(id));
        if(taskOptional.isPresent()){
            Task existingTask = taskOptional.get();
            existingTask.setName(task.getName());
            existingTask.setComplete(task.isComplete());
            existingTask.setDescription(task.getDescription());
            taskRepository.save(existingTask);
            return existingTask;
        }
        else{
            throw new NotFoundException();
        }
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id){
        Task taskToDelete = taskRepository.findById(Long.parseLong(id)).orElseThrow(NotFoundException::new);
        taskRepository.delete(taskToDelete);
    }
}
