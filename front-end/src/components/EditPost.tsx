import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, Save, Trash2, Eye, Lock } from 'lucide-react';
import type { User } from '../types/user';
import type { Post } from '../types/post';
import axios from 'axios';
import dayjs from 'dayjs';

interface EditPostProps {
    currentUser: User;
    myPosts: Post[];
    setMyPosts: (posts: Post[]) => void;
}

function EditPost({ currentUser, myPosts, setMyPosts }: EditPostProps) {
    const navigate = useNavigate();
    const { id } = useParams();
    const post = myPosts.find(p => p.id == Number(id));

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">記事が見つかりません</h1>
                    <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-700">
                        ダッシュボードに戻る
                    </Link>
                </div>
            </div>
        );
    }

    const isAuthor = post.author_id == currentUser.id;

    const [title, setTitle] = useState(post.title);
    const [excerpt, setExcerpt] = useState(post.excerpt);
    const [content, setContent] = useState(post.content);
    const [published, setPublished] = useState(post.published);

    async function handleSave() {
        if (!isAuthor) {
            alert('この記事を編集する権限がありません');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.put(`http://localhost:3000/api/post/edit/${id}`,
                {
                    author_id: currentUser.id,
                    title,
                    excerpt,
                    content,
                    published
                });
            const resPost: Post = response.data;
            const formattedPost: Post = {
                ...resPost,
                updated_at: dayjs(resPost.updated_at),
                published_at: dayjs(resPost.published_at)
            };
            const newPosts: Post[] = myPosts.map(post => post.id == formattedPost.id ? formattedPost : post);
            setMyPosts(newPosts);
            alert('記事を更新しました');
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to update the article', error);
        }
    };

    async function handleDelete() {
        if (!isAuthor) {
            alert('この記事を削除する権限がありません');
            return;
        }
        if (confirm('本当にこの記事を削除しますか？')) {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                await axios.delete(`http://localhost:3000/api/post/delete/${id}`,
                    { data: { author_id: currentUser.id } }
                );
                const newPosts = myPosts.filter(post => post.id != Number(id));
                setMyPosts(newPosts);
                alert('記事を削除しました');
                navigate('/dashboard');
            } catch (error) {
                console.error('Failed to delete the article', error);
            }
        }
    };

    const handlePreview = () => {
        if (published) {
            window.open(`/post/${id}`, '_blank');
        } else {
            alert('公開中の記事のみプレビューできます');
        }
    };

    if (!isAuthor) {
        return (
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                ダッシュボードに戻る
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">編集権限がありません</h1>
                        <p className="text-gray-600 mb-6">
                            この記事は {post.author_name} さんの記事です。<br />
                            自分の記事のみ編集できます。
                        </p>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                        >
                            ダッシュボードに戻る
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            ダッシュボードに戻る
                        </Link>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">
                                著者: {post.author_name}
                            </span>
                            <button
                                onClick={handlePreview}
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                <Eye className="w-5 h-5" />
                                プレビュー
                            </button>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={published}
                                    onChange={(e) => setPublished(e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-700">公開する</span>
                            </label>
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition"
                            >
                                <Trash2 className="w-5 h-5" />
                                削除
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                <Save className="w-5 h-5" />
                                保存
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            タイトル
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-2xl font-semibold"
                            placeholder="記事のタイトルを入力..."
                        />
                    </div>

                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                            本文
                        </label>
                        <textarea
                            id="excerpt"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                            rows={2}
                            placeholder="ここに記事の本文を書きましょう..."
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            本文
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                            rows={20}
                            placeholder="ここに記事の本文を書きましょう..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPost