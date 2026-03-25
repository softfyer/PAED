'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a brief delay for "authentication"
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('paed_auth', 'true');
        router.push('/');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-emerald-600 text-white p-3 rounded-2xl mb-6 shadow-lg shadow-emerald-200">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-stone-900 mb-3">PAED</h1>
          <p className="text-stone-500 font-medium">Plataforma de Apoio à Educação Diversificada</p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-100 p-8 shadow-xl shadow-stone-200/50">
          <h2 className="text-xl font-bold text-stone-800 mb-6 text-center">Acesse sua conta</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 ml-1">E-mail Institucional</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 w-5 h-5" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="professor@escola.edu.br"
                  className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 w-5 h-5" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm px-1">
              <label className="flex items-center gap-2 text-stone-500 cursor-pointer">
                <input type="checkbox" className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500" />
                Lembrar de mim
              </label>
              <a href="#" className="text-emerald-600 font-semibold hover:underline">Esqueceu a senha?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar no Sistema
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-stone-50 text-center">
            <p className="text-stone-400 text-sm">
              Não tem acesso? <a href="#" className="text-emerald-600 font-bold hover:underline">Solicite à sua instituição</a>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-stone-400 text-xs">
          © 2024 PAED - Tecnologia para uma Educação sem Barreiras
        </p>
      </motion.div>
    </div>
  );
}
