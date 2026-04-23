import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import Settings from './components/Settings';
import PublicBlog from './components/PublicBlog';
import PublicPostDetail from './components/PublicPostDetail';
import './App.css'
import type { Post } from './types/post';
import dayjs from 'dayjs';

interface User {
  id: number;
  name: string;
  email: string;
}

const mockUsers = [
  { id: 1, name: '田中太郎', email: 'tanaka@example.com', password: 'password123' },
  { id: 2, name: 'John Macathey', email: 'john@example.com', password: 'password123' }
];

const mockPosts: Post[] = [
  {
    id: 1,
    authorId: 1,
    authorName: '田中太郎',
    title: 'はじめてのブログ投稿',
    excerpt: 'これは私の最初のブログ投稿です。とても楽しみにしています！',
    content: 'これは私の最初のブログ投稿です。ブログを始めることにとても興奮しています！\n\nこのブログでは、日々の学びや経験、考えたことなどを共有していきたいと思います。技術的な話題から、日常の出来事まで、幅広く書いていく予定です。\n\nみなさんと一緒に成長していけたら嬉しいです。よろしくお願いします！',
    date: dayjs('2026-04-20'),
    views: 128,
    published: true
  },
  {
    id: 2,
    authorId: 1,
    authorName: '田中太郎',
    title: 'Reactを学んでみた',
    excerpt: 'Reactの基礎について学んだことをまとめました。コンポーネント指向はとても便利です。',
    content: 'Reactの基礎について学んだことをまとめました。\n\nReactはコンポーネント指向のライブラリで、UIを再利用可能な部品として構築できます。これにより、大規模なアプリケーションでも保守性が高いコードを書くことができます。\n\nまた、仮想DOMという仕組みにより、高速なレンダリングが実現されています。\n\nこれからもっと深く学んでいきたいと思います！',
    date: dayjs('2026-04-18'),
    views: 245,
    published: true
  },
  {
    id: 3,
    authorId: 1,
    authorName: '田中太郎',
    title: 'TypeScriptのメリット',
    excerpt: 'TypeScriptを使うことで、より安全なコードを書くことができます。',
    content: 'TypeScriptを使うことで、より安全なコードを書くことができます。\n\n型システムのおかげで、開発時に多くのバグを未然に防ぐことができます。また、IDEのサポートも充実しており、自動補完が非常に便利です。\n\n大規模なプロジェクトでは特に威力を発揮します。',
    date: dayjs('2026-04-15'),
    views: 189,
    published: true
  },
  {
    id: 4,
    authorId: 2,
    authorName: 'John Macarthey',
    title: 'Schemeを学んでみた',
    excerpt: 'Schemeの基礎について学んだことをまとめました。',
    content: 'Schemeの基礎について学んだことをまとめました。\n\nSchemeは言語仕様が小さく、構文がシンプルなことが特徴です。シンブルながら表現力が高く、十分なプログラミングができます。\n\nこれからもっと深く学んでいきたいと思います！',
    date: dayjs('2026-04-20'),
    views: 242,
    published: true
  },
  {
    id: 5,
    authorId: 1,
    authorName: '田中太郎',
    title: '下書き：次の記事のアイデア',
    excerpt: 'まだ公開していない下書きの記事です。',
    content: 'まだ公開していない下書きの記事です。',
    date: dayjs('2026-04-21'),
    views: 0,
    published: false
  }
];

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PublicBlog isAuthenticated={!!currentUser}
            mockPosts={mockPosts} />}
        />
        <Route
          path="/post/:id"
          element={<PublicPostDetail isAuthenticated={!!currentUser}
            mockPosts={mockPosts} />}
        />
        <Route
          path="/login"
          element={
            currentUser ?
              <Navigate to="/dashboard" /> :
              <Login onLogin={handleLogin}
                mockUsers={mockUsers} />
          }
        />
        <Route
          path="/register"
          element={
            currentUser ?
              <Navigate to="/dashboard" /> :
              <Register onRegister={handleLogin} />
          }
        />
        <Route
          path="/dashboard"
          element={
            currentUser ?
              <Dashboard currentUser={currentUser} onLogout={handleLogout}
                mockPosts={mockPosts} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/new-post"
          element={
            currentUser ?
              <NewPost currentUser={currentUser} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/post/:id/edit"
          element={
            currentUser ?
              <EditPost currentUser={currentUser}
                mockPosts={mockPosts} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/settings"
          element={
            currentUser ?
              <Settings currentUser={currentUser} /> :
              <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App