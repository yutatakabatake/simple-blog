import { Link } from 'react-router';
import { PenSquare, Settings, LogOut, Calendar, Eye } from 'lucide-react';
import type { User } from '../types/user';
import type { Post } from '../types/post';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

interface DashboardProps {
    currentUser: User;
    onLogout: () => void;
}

function Dashboard({ currentUser, onLogout }: DashboardProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        let ignore = false;
        async function fetchTasks() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`http://localhost:3000/api/post/me/${currentUser.id}`);
                const resPosts: Post[] = response.data;
                const formattedPosts: Post[] = resPosts.map(post => ({
                    ...post,
                    updated_at: dayjs(post.updated_at),
                    published_at: dayjs(post.published_at)
                }));
                if (!ignore) {
                    setPosts(formattedPosts);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchTasks();

        return () => {
            ignore = true;
        };
    }, []);


    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-gray-900">マイブログ</h1>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                公開ページ
                            </Link>
                            <Link
                                to="/admin/new-post"
                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                <PenSquare className="w-5 h-5" />
                                新規投稿
                            </Link>
                            <Link
                                to="/settings"
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                <Settings className="w-5 h-5" />
                                設定
                            </Link>
                            <button
                                onClick={onLogout}
                                className="flex items-center gap-2 text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition"
                            >
                                <LogOut className="w-5 h-5" />
                                ログアウト
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold text-gray-900">ダッシュボード</h2>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                            {currentUser.name}
                        </span>
                    </div>
                    <p className="text-gray-600">あなたの投稿を管理しましょう</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">総投稿数</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {posts.filter(p => p.published).length}
                                </p>
                            </div>
                            <div className="bg-indigo-100 p-3 rounded-lg">
                                <PenSquare className="w-6 h-6 text-indigo-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">総閲覧数</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {posts.reduce((sum, post) => sum + post.views, 0)}
                                </p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <Eye className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">下書き</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {posts.filter(p => !p.published).length}
                                </p>
                            </div>
                            <div className="bg-amber-100 p-3 rounded-lg">
                                <Calendar className="w-6 h-6 text-amber-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900">あなたの投稿</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <Link
                                    key={post.id}
                                    to={`/admin/post/${post.id}/edit`}
                                    className="block p-6 hover:bg-gray-50 transition"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h4 className="text-lg font-semibold text-gray-900">{post.title}</h4>
                                                {!post.published && (
                                                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                                                        下書き
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 mb-3">{post.excerpt}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {post.updated_at.format('YYYY/MM/DD')}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Eye className="w-4 h-4" />
                                                    {post.views} 回閲覧
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="p-12 text-center text-gray-500">
                                まだ投稿がありません
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard