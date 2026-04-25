import { useState } from 'react';
import { Link } from 'react-router';
import { Mail, Lock } from 'lucide-react';
import type { User } from '../types/user';
import axios from 'axios';

interface LoginProps {
    onLogin: (user: User) => void;
}

function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        const loginData = { email: email, password: password };
        try {
            const response = await axios.post(`http://localhost:3000/api/user/login`, loginData);
            onLogin(response.data);
        } catch (error) {
            console.error(error);
            alert('メールアドレスまたはパスワードが正しくありません');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">ブログへようこそ</h1>
                    <p className="text-gray-600">アカウントにログイン</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                                placeholder="example@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            パスワード
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                        ログイン
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        アカウントをお持ちでないですか？{' '}
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
                            新規登録
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login