import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, User, Mail, Save } from 'lucide-react';
import type { User as UserType } from '../types/user';
import axios from 'axios';

interface SettingsProps {
    currentUser: UserType;
    handleEditUser: (user: UserType) => void;
}

function Settings({ currentUser, handleEditUser }: SettingsProps) {
    const navigate = useNavigate();
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);

    async function handleSave() {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.put(`http://localhost:3000/api/user/edit/${currentUser.id}`,
                {
                    name,
                    email
                }
            );
            const editedUser: UserType = response.data;
            handleEditUser(editedUser);
            alert('設定を保存しました');
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
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
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">設定</h1>
                    <p className="text-gray-600">アカウントとブログの設定を管理</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <User className="w-6 h-6 text-indigo-600" />
                            <h2 className="text-xl font-semibold text-gray-900">プロフィール情報</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    名前
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    メールアドレス
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
                        >
                            <Save className="w-5 h-5" />
                            変更を保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings