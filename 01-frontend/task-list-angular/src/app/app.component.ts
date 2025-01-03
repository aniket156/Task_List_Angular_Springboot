import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NewTaskComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskService],
})
export class AppComponent {
  title = 'task-list-angular';

  taskList: Task[] = [];
  filteredTaskList: Task[] = [];

  currentTask: Task = {} as Task;
  editingTask: Task | null = null;

  isNewTaskModalOpen = false;
  isAssigneeModalOpen = false;
  isNoteModalOpen = false;

  filterCriteria: { [key: string]: string } = {};

  constructor(private taskService: TaskService) {}

  task: Task = {
    entityName: '',
    date: '',
    time: '',
    taskType: 'Call',
    contactPerson: '',
    note: '',
    status: 'OPEN',
  };

  ngOnInit(): void {
    this.loadTasks();
  }

  // Load tasks from the backend
  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (tasks) => {
        this.taskList = tasks;
        this.filteredTaskList = tasks;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  addTask(task: Task): void {
    if (this.editingTask && this.editingTask.id) {
      // Update existing task
      this.taskService.updateTask(this.editingTask.id, task).subscribe(
        () => {
          this.loadTasks();
          this.closeNewTaskModal();
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      // Add new task
      this.taskService.addTask(task).subscribe(
        () => {
          this.loadTasks();
          this.closeNewTaskModal();
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
    }
  }

  deleteTask(task: Task): void {
    if (task.id) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  editTask(task: Task): void {
    this.editingTask = task;
    this.task = { ...task };
    this.openNewTaskModal();
  }

  duplicateTask(task: Task): void {
    const duplicatedTask: Task = {
      ...task,
      id: undefined,
      date: new Date().toISOString().split('T')[0],
    };
    this.taskService.addTask(duplicatedTask).subscribe((newTask) => {
      this.taskList.push(newTask);
    });
  }

  changeStatusToClosed(task: Task): void {
    const updatedTask = { ...task, status: 'CLOSED' };
    this.taskService.updateTask(updatedTask.id!, updatedTask).subscribe(
      (response) => {
        const taskIndex = this.taskList.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          this.taskList[taskIndex] = response;
        }
      },
      (error) => {
        console.error('Error changing task status to closed:', error);
      }
    );
  }

  onOptionSelect(event: any, task: Task, dropdown: HTMLSelectElement): void {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case 'edit':
        this.editTask(task);
        break;
      case 'duplicate':
        this.duplicateTask(task);
        break;
      case 'close':
        this.changeStatusToClosed(task);
        break;
      case 'delete':
        this.deleteTask(task);
        break;
      default:
        break;
    }
    dropdown.selectedIndex = 0;
  }

  applyFilters(): void {
    this.filteredTaskList = this.taskList.filter((task) => {
      return Object.keys(this.filterCriteria).every((column) => {
        const filterValue = this.filterCriteria[column]?.toLowerCase() || '';
        // Type assertion to ensure the column is a valid key of Task
        return task[column as keyof Task]
          ?.toString()
          .toLowerCase()
          .includes(filterValue);
      });
    });
  }

  openFilter(column: string): void {
    const filterValue = prompt(`Enter filter value for ${column}:`);
    if (filterValue !== null) {
      this.filterCriteria[column] = filterValue;
      this.applyFilters();
    }
  }

  resetFilters(): void {
    this.filterCriteria = {};
    this.filteredTaskList = this.taskList;
  }

  openAssigneeModal(task: Task): void {
    this.currentTask = { ...task };
    this.isAssigneeModalOpen = true;
  }

  saveAssignee(): void {
    if (this.currentTask && this.currentTask.id) {
      const taskIndex = this.taskList.findIndex(
        (t) => t.id === this.currentTask.id
      );
      if (taskIndex !== -1) {
        this.taskList[taskIndex].contactPerson = this.currentTask.contactPerson;
        this.taskService
          .updateTask(this.currentTask.id, this.currentTask)
          .subscribe(() => {
            this.closeAssigneeModal();
          });
      }
    }
  }

  closeAssigneeModal(): void {
    this.isAssigneeModalOpen = false;
    this.currentTask = {} as Task;
  }

  openNoteModal(task: Task): void {
    this.currentTask = { ...task };
    this.isNoteModalOpen = true;
  }

  saveNote(): void {
    if (this.currentTask && this.currentTask.id) {
      const taskIndex = this.taskList.findIndex(
        (t) => t.id === this.currentTask.id
      );
      if (taskIndex !== -1) {
        this.taskList[taskIndex].note = this.currentTask.note;
        this.taskService
          .updateTask(this.currentTask.id, this.currentTask)
          .subscribe(() => {
            this.closeNoteModal();
          });
      }
    }
  }

  closeNoteModal(): void {
    this.isNoteModalOpen = false;
    this.currentTask = {} as Task;
  }

  openNewTaskModal(): void {
    this.isNewTaskModalOpen = true;
  }

  closeNewTaskModal(): void {
    this.isNewTaskModalOpen = false;
    this.resetTaskForm();
  }

  resetTaskForm(): void {
    this.task = {
      entityName: '',
      date: '',
      time: '',
      taskType: '',
      contactPerson: '',
      note: '',
      status: 'OPEN',
    };
    this.editingTask = null;
  }
}

interface Task {
  id?: number;
  entityName: string;
  date: string;
  time: string;
  taskType: string;
  contactPerson: string;
  note: string;
  status: string;
}
