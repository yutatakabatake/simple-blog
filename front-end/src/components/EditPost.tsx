import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, Save, Trash2, Eye, Lock } from 'lucide-react';
import type { User } from '../types/user';
import type { Post } from '../types/post';

interface EditPostProps {
    currentUser: User;
    mockPosts: Post[];
}

function EditPost({ currentUser, mockPosts }: EditPostProps) {
    const navigate = useNavigate();
    const { id } = useParams();
    const postData = mockPosts.find(p => p.id === Number(id));

    if (!postData) {
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

    const isAuthor = postData.authorId == currentUser.id;

    const [title, setTitle] = useState(postData.title);
    const [content, setContent] = useState(postData.content);
    const [published, setPublished] = useState(postData.published);

    const handleSave = () => {
        if (!isAuthor) {
            alert('この記事を編集する権限がありません');
            return;
        }
        alert('記事を更新しました');
        navigate('/dashboard');
    };

    const handleDelete = () => {
        if (!isAuthor) {
            alert('この記事を削除する権限がありません');
            return;
        }
        if (confirm('本当にこの記事を削除しますか？')) {
            alert('記事を削除しました');
            navigate('/dashboard');
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
                            この記事は {postData.authorName} さんの記事です。<br />
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
                                著者: {postData.authorName}
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