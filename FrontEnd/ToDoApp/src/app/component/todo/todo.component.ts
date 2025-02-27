// src/app/components/todo/todo.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: any[] = [];
  taskForm: FormGroup;
  editingTaskId: string | null = null;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      task: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(response => {
      if (response && response.data && Array.isArray(response.data.tasks)) {
        this.tasks = response.data.tasks;
      } else {
        console.error('Unexpected response format:', response);
        this.tasks = [];
      }
    }, error => {
      console.error('Error loading tasks:', error);
      this.tasks = [];
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.editingTaskId) {
        this.taskService.updateTask(this.editingTaskId, this.taskForm.value).subscribe(() => {
          this.loadTasks();
          this.resetForm();
        });
      } else {
        this.taskService.createTask(this.taskForm.value).subscribe(() => {
          this.loadTasks();
          this.resetForm();
        });
      }
    }
  }

  editTask(task: any) {
    this.editingTaskId = task._id;
    this.taskForm.patchValue(task);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  resetForm() {
    this.taskForm.reset();
    this.editingTaskId = null;
  }
}
