import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  @Input() task: any = {};
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() saveTask = new EventEmitter<any>();

  closeModal() {
    this.close.emit();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form is valid. Saving task:', this.task);
      this.saveTask.emit(this.task);
    } else {
      console.log('Form is invalid. Cannot save task.');
    }
  }
}
