import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Article } from '../org.zalak.marketplace';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ArticleService {

	
		private NAMESPACE: string = 'Article';
	



    constructor(private dataService: DataService<Article>) {
    };

    public getAll(): Observable<Article[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Article> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Article> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Article> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Article> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
