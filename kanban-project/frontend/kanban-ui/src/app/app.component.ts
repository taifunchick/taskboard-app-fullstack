import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KanbanBoardComponent],
  template: '<app-kanban-board></app-kanban-board>',
  styles: []
})
export class AppComponent {
  title = 'kanban-ui';
}