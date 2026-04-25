import dayjs from "dayjs";

export type Post = {
    id: number,
    authorId: number,
    title: string,
    excerpt: string,
    content: string,
    views: number,
    published: boolean
    published_at: dayjs.Dayjs,
    updated_at: dayjs.Dayjs,
    created_at: dayjs.Dayjs
}