import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { TaskItem } from '../../models/task-item.model';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  tasks: TaskItem[] = [];
  columns = [
    { id: 'todo', title: 'To Do', color: '#ef4444' },
    { id: 'inprogress', title: 'In Progress', color: '#f59e0b' },
    { id: 'done', title: 'Done', color: '#10b981' }
  ];
  draggedTask: TaskItem | null = null;
  showAddForm = false;
  newTaskTitle = '';
  newTaskDescription = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: TaskItem[]) => this.tasks = tasks,
      error: (error: any) => console.error('Error loading tasks', error)
    });
  }

  getTasksByStatus(status: string): TaskItem[] {
    return this.tasks.filter(task => task.status === status);
  }

  onDragStart(task: TaskItem): void {
    this.draggedTask = task;
  }

  onDrop(status: string): void {
    if (this.draggedTask && this.draggedTask.status !== status) {
      this.taskService.updateTaskStatus(this.draggedTask.id!, status).subscribe({
        next: (updatedTask: TaskItem) => {
          const index = this.tasks.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          this.draggedTask = null;
        },
        error: (error: any) => {
          console.error('Error updating task status', error);
          this.draggedTask = null;
        }
      });
    }
    this.draggedTask = null;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== id);
        },
        error: (error: any) => console.error('Error deleting task', error)
      });
    }
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    const newTask: TaskItem = {
      id: 0,
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      status: 'todo',
      createdAt: new Date().toISOString()
    };

    this.taskService.createTask(newTask).subscribe({
      next: (task: TaskItem) => {
        this.tasks.push(task);
        this.showAddForm = false;
        this.newTaskTitle = '';
        this.newTaskDescription = '';
      },
      error: (error: any) => console.error('Error creating task', error)
    });
  }

  cancelAdd(): void {
    this.showAddForm = false;
    this.newTaskTitle = '';
    this.newTaskDescription = '';
  }
}