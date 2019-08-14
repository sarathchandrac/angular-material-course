import {CollectionViewer, DataSource} from '@angular/cdk/typings/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Lesson} from '../model/lesson';
import {CoursesService} from './courses.service';
import {catchError, finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

export class LessonsDatasource implements DataSource<Lesson> {
    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
    private  loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private courseService: CoursesService) {

    }

    loadLessons(courseId: number, filter: string, sortDirection: string, pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);
        this.courseService.findLessons(courseId, filter, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(err => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(lessons => this.lessonsSubject.next(lessons));
    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }


}
