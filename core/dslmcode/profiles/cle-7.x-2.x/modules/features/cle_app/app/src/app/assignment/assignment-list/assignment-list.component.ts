import { Component, OnInit, ElementRef } from '@angular/core';
import { AssignmentService } from '../../assignment.service';
import { Assignment } from '../../assignment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
declare const $:JQueryStatic;

@Component({
  selector: 'cle-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css'],
  providers: [AssignmentService]
})
export class AssignmentListComponent implements OnInit {
  assignments: Assignment[];

  constructor(
    private assignmentService: AssignmentService,
    private router: Router,
    private el: ElementRef
  ) { }

ngOnInit() {
  this.assignmentService.getAssignments()
    .map(data => data.data)
    .subscribe(data => {
      this.assignments = data;
      // sort the array by date
      this.sortAssignmentsByDate('desc');
      
      console.log(this.assignments);
    });
}

viewAssignment(assignmentId) {
  this.router.navigate(['/assignments/' + assignmentId]);
}

createAssignment() {
  this.router.navigate(['/assignments/new']);
}

sortAssignmentsByDate(direction:string = 'asc') {
  this.assignments.sort((a:Assignment,b:Assignment) => {
      let aDate;
      let bDate;

      if (!a.startDate) {
        aDate = a.endDate;
      }
      if (!b.startDate) {
        bDate = b.endDate;
      }

      aDate = Date.parse(a.startDate);
      bDate = Date.parse(b.startDate);

      if (direction === 'desc') {
        if (aDate < bDate) {
          return -1;
        }
        else if (aDate > bDate) {
          return 1;
        }
        else {
          return 0;
        }
      }
      else {
        if (aDate < bDate) {
          return -1;
        }
        else if (aDate > bDate) {
          return 1;
        }
        else {
          return 0;
        }
      }
    }); 
  }
}