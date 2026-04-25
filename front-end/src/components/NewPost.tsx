import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';
import type { User } from '../types/user';
import axios from 'axios';

interface NewPostProps {
    currentUser: User;
}

function NewPost({ currentUser }: NewPostProps) {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [excerpt, setExcerpt] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [published, setPublished] = useState<boolean>(false);

    async function handleSave() {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.post('http://localhost:3000/api/post/new', {
            author_id: currentUser.id,
            title,
            excerpt,
            content,
            published
        });
        alert(`「${title}」を保存しました（著者: ${currentUser.name}）`);
        navigate('/dashboard');
    };

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

                    <div className='mb-6'>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                            抜粋
                        </label>
                        <textarea
                            id="excerpt"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                            rows={2}
                            placeholder="ここに記事の簡単な紹介を書きましょう..."
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

export default NewPost