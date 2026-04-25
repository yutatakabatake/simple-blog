import { Link } from 'react-router';
import { Calendar, Eye, LogIn, LayoutDashboard, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Post } from '../types/post';
import axios from 'axios';
import dayjs from 'dayjs';

interface PublicBlogProps {
    isAuthenticated: boolean;
}

function PublicBlog({ isAuthenticated }: PublicBlogProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        let ignore = false;
        async function fetchPosts() {
            try {
                const response = await axios.get('http://localhost:3000/api/post/public');
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

        fetchPosts();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
            <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            マイブログ
                        </Link>
                        <div className="flex items-center gap-3">
                            {isAuthenticated ? (
                                <Link
                                    to="/dashboard"
                                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    ダッシュボード
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                                >
                                    <LogIn className="w-5 h-5" />
                                    ログイン
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        技術と日常について
                    </h1>
                    <p className="text-xl text-gray-600">
                        学びや経験を共有するブログ
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.filter(post => post.published)
                        .map((post) => (
                            <Link
                                key={post.id}
                                to={`/post/${post.id}`}
                                className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {post.updated_at.format('YYYY/MM/DD')}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {post.author_name}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {post.views}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">まだ投稿がありません</p>
                    </div>
                )}
            </div>

            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600">
                        <p>&copy; 2026 マイブログ. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default PublicBlog