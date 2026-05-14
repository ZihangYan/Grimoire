import { Dexie, type Table } from 'dexie';

export interface MageInfo {
    id?: number,
    mageName: string,
    pfp: string | File,
}

export interface Bookshelf {
    id?: number;
    mageId: number;     
    name: string;     
    description ?: string;  
    coverTheme: string; 
    createdAt: number;
}

export interface Book {
    id?: number;
    bookshelfId: number; 
    mageId: number;      
    title: string;    
    summary ?: string;
    content: string;     
    updatedAt: number; 
}

export class MyDatabase extends Dexie {
    mageInfo!: Table<MageInfo, number>
    bookshelves!: Table<Bookshelf, number>;
    books!: Table<Book, number>;

    constructor() {
        super('MagicLibrary')
        this.version(1).stores({
            mageInfo: '++id, mageName',
            bookshelves: '++id, mageId',
            books: '++id, bookshelfId, mageId, updatedAt'
        })
    }
}



export const db = new MyDatabase()
