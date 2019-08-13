import {CollectionViewer, DataSource} from '@angular/cdk/typings/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import {CoursesService} from './courses.service';
import {catchError} from 'rxjs/operators';

export class LessonsDatasource implements DataSource<Lesson> {
    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    constructor(private courseService: CoursesService) {

    }

    loadLessons(courseId: number, filter: string, sortDirection: string, pageIndex: number, pageSize: number) {
        this.courseService.findLessons(courseId, filter, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(err => of([]))
            )
            .subscribe(lessons => this.lessonsSubject.next(lessons));

    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
    }


}
