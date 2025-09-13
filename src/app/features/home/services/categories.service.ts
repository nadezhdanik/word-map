import { Injectable, inject, Signal } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { Category } from '../interfaces/categories.interface';
import { Word } from '../interfaces/word.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private firestore: Firestore = inject(Firestore);

    getCategories(level: string): Signal<Category[]> {
        const words = collection(this.firestore, 'words');
        const queryByLevel = query(words, where('level', '==', level));
        const categories$ = collectionData(queryByLevel, { idField: 'id' }).pipe(
          map((docs: unknown[] = []): Category[] => {
            const words = docs as Word[];
            const counts: Record<string, number> = {};
    
            for (const word of words) {
              const cat = word.category as string;
              counts[cat] = (counts[cat] || 0) + 1;
            }
    
            return Object.keys(counts).map(name => ({ 
                name, count: counts[name] 
            }));
          })
        );
    
        return toSignal(categories$, { initialValue: [] as Category[] }) as Signal<Category[]>;
    }
}