import {CollectionViewer, DataSource} from '@angular/cdk/typings/collections';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {CoursesService} from './courses.service';

export class LessonsDatasource implements DataSource<Lesson> {
    constructor(private courseService: CoursesService) {

    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[] > {
        return undefined;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }


}
