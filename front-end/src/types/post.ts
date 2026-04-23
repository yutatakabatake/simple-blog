import dayjs from "dayjs";

export type Post = {
    id: number,
    authorId: number,
    authorName: string,
    title: string,
    excerpt: string,
    content: string,
    date: dayjs.Dayjs,
    views: number,
    published: boolean
}