import { Link, useParams } from 'react-router';
import { ArrowLeft, Calendar, Eye, LogIn, LayoutDashboard, User } from 'lucide-react';

interface PublicPostDetailProps {
    isAuthenticated: boolean;
    mockPosts: any[];
}

function PublicPostDetail({ isAuthenticated, mockPosts }: PublicPostDetailProps) {
    const { id } = useParams();
    const post = mockPosts.find(p => p.id === Number(id));

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">記事が見つかりません</h1>
                    <Link to="/" className="text-indigo-600 hover:text-indigo-700">
                        トップページに戻る
                    </Link>
                </div>
            </div>
        );
    }

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

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
                    記事一覧に戻る
                </Link>
                <article className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="h-64 bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        <div className="text-8xl font-bold text-indigo-200">{post.id}</div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
                            <div className="flex flex-wrap items-center gap-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    <span>{post.authorName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="w-5 h-5" />
                                    <span>{post.views} 回閲覧</span>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            {post.content.split('\n').map((paragraph: any, index: any) => (
                                paragraph.trim() ? (
                                    <p key={index} className="mb-6 text-gray-700 leading-relaxed text-lg">
                                        {paragraph}
                                    </p>
                                ) : (
                                    <div key={index} className="h-4" />
                                )
                            ))}
                        </div>
                    </div>
                </article>

                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        他の記事を読む
                    </Link>
                </div>
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

export default PublicPostDetail