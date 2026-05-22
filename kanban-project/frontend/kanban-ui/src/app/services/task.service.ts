import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface TaskItem {
  id?: number;
  title: string;
  description?: string;
  status: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  createTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task).pipe(catchError(this.handleError));
  }

  updateTaskStatus(id: number, status: string): Observable<TaskItem> {
    const body = { status: status };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    console.log(`Updating task ${id} to ${status}`, body);
    
    return this.http.patch<TaskItem>(`${this.apiUrl}/${id}/status`, JSON.stringify(body), { headers })
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
