import dayjs from "dayjs";

export type Post = {
    id: number,
    author_id: number,
    author_name: string,
    title: string,
    excerpt: string,
    content: string,
    views: number,
    published: boolean
    published_at: dayjs.Dayjs,
    updated_at: dayjs.Dayjs
}