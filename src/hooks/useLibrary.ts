import { ref, watch, onUnmounted, type Ref } from 'vue'
import { liveQuery, type Subscription } from 'dexie'
import { db, type Bookshelf, type Book } from '@/db'

export function useBookShelves(mageId: Ref<number | undefined>) {
    const bookshelves = ref<Bookshelf[]>([])
    let subscription: Subscription | null = null

    watch(mageId, (newId) => {
        if (subscription) {
            subscription.unsubscribe()
        }
        if (!newId) {
            return
        }
        const observable = liveQuery(() => 
            db.bookshelves.where('mageId').equals(newId).toArray()
        )
        
        subscription = observable.subscribe({
            next: (data) => { bookshelves.value = data },
            error: (err) => { console.error('Failed to fetch bookshelves', err) }  
        })
        
    }, { immediate: true })

    onUnmounted(() => {
        if (subscription) {
            subscription.unsubscribe()
        }
    })

    const addBookshelf = async (name: string, coverTheme: string = 'default') => {
        if (!mageId.value) {
            return
        }
        await db.bookshelves.add({
            mageId: mageId.value,
            name,
            coverTheme,
            createdAt: Date.now()
        })
    }

    return {
        bookshelves,
        addBookshelf
    }
}

export function useBooks(bookshelfId: Ref<number | undefined>) {
    const books = ref<Book[]>([])
    let subscription: Subscription | null = null

    watch(bookshelfId, (newId) => {
        if (subscription) {
            subscription.unsubscribe()
        }
        if (!newId) {
            return
        }
        const observable = liveQuery(() => 
            db.books.where('bookshelfId').equals(newId).reverse().sortBy('updatedAt')
        )
        
        subscription = observable.subscribe({
            next: (data) => { books.value = data },
            error: (err) => { console.error('Failed to fetch books:', err) }
        })
        
    }, { immediate: true })

    onUnmounted(() => {
        if (subscription) subscription.unsubscribe()
    })

    const addBook = async (mageId: number, title: string) => {
        if (!bookshelfId.value) {
            return
        }
        await db.books.add({
            bookshelfId: bookshelfId.value,
            mageId: mageId,
            title,
            content: '', 
            updatedAt: Date.now()
        })
    }

    return {
        books,
        addBook
    }
}