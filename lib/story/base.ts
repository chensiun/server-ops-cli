import { Observable } from "rxjs";

export interface BaseStory {
  execute(): Observable<any>;
}
