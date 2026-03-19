import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TbCircleArrowLeftFilled } from 'react-icons/tb';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToastStore } from '../../app/store';
import MarketingNavbar from '../../components/layout/MarketingNavbar';
import { adminService } from '../../services/admin.service';
import './LoginPage.css';

type AuthView = 'login' | 'register' | 'forgot';

const loginSchema = z.object({
  email: z.string().email('Adresă de email invalidă'),
  password: z.string().min(6, 'Parola trebuie să aibă cel puțin 6 caractere'),
});

const registerSchema = z
  .object({
    email: z.string().email('Adresă de email invalidă'),
    password: z.string().min(6, 'Parola trebuie să aibă cel puțin 6 caractere'),
    confirmPassword: z.string(),
    name: z.string().min(1, 'Introdu numele'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Parolele nu coincid',
    path: ['confirmPassword'],
  });

const forgotSchema = z.object({
  email: z.string().email('Adresă de email invalidă'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type ForgotFormData = z.infer<typeof forgotSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const addToast = useToastStore((s) => s.addToast);
  const [view, setView] = useState<AuthView>('login');
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const forgotForm = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  useEffect(() => {
    if (user) navigate('/admin/dashboard');
  }, [user, navigate]);

  const onLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      addToast('Autentificare reușită', 'success');
      navigate('/admin/dashboard');
    } catch {
      addToast('Email sau parolă incorectă', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await adminService.register(data.email, data.password, data.name);
      addToast('Cont creat. Poți să te autentifici.', 'success');
      setView('login');
      registerForm.reset();
    } catch {
      addToast('Înregistrarea a eșuat. Încearcă din nou.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const onForgotSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    try {
      await adminService.forgotPassword(data.email);
      addToast('Dacă există un cont cu acest email, vei primi un link de resetare.', 'success');
      setView('login');
      forgotForm.reset();
    } catch {
      addToast('Trimiterea a eșuat. Încearcă din nou.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Autentificare - Business Platform</title>
        <link rel="stylesheet" href="/assets/js/uni-core/css/uni-core.min.css" />
        <link rel="stylesheet" href="/assets/css/fonts.css" />
        <link rel="stylesheet" href="/assets/css/unicons.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/theme-eleven.css" />
      </Helmet>

      <div className="login-page min-h-screen w-full max-w-none flex flex-col box-border">
        <div
          className="position-absolute top-0 start-0 end-0 h-screen dark:blend-soft-light"
          style={{ backgroundImage: 'url(/assets/images/hero-11-bg.jpg)', backgroundSize: 'cover' }}
        />
        <div className="position-absolute top-0 start-0 end-0 h-screen bg-indigo blend-soft-light d-none dark:d-block" />
        <div className="position-absolute top-0 start-0 end-0 h-screen bg-gradient-to-b from-white via-transparent to-white dark:from-gray-900 dark:to-gray-900" />

        <MarketingNavbar solidBackground />

        <div className="login-page__content flex-1 flex items-center justify-center px-4 w-full min-h-0 position-relative z-1">
          <div className="max-w-xl w-full flex flex-col items-center">
            <div className="login-page__card bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 mx-auto mt-4 sm:mt-6 xl:mt-8 box-border p-4 sm:p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <a href="/business" className="text-sm text-gray-400 hover:text-gray-700 inline-flex items-center gap-1">
                  <TbCircleArrowLeftFilled className="text-lg" />
                  Înapoi la pagina principală
                </a>
              </div>

              {view === 'login' && (
                <>
                  <div className="mb-5 sm:mb-6 text-left">
                    <h1 className="login-page__title font-bold tracking-tight text-gray-900 mb-1">
                      Autentificare Business Platform
                    </h1>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Intră în cont pentru a gestiona rezervările, serviciile și prezența ta online.
                    </p>
                  </div>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5 sm:space-y-6">
                    <div className="space-y-1.5">
                      <Input
                        type="email"
                        label="Email"
                        placeholder="exemplu@email.com"
                        error={loginForm.formState.errors.email?.message}
                        className="rounded-full px-4 py-3 border-gray-400 focus:border-gray-600"
                        {...loginForm.register('email')}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Input
                        type="password"
                        label="Parolă"
                        placeholder="••••••••"
                        error={loginForm.formState.errors.password?.message}
                        className="rounded-full px-4 py-3 border-gray-400 focus:border-gray-600"
                        {...loginForm.register('password')}
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="login-page__submit-btn w-full px-4 py-3 text-base font-medium rounded-full bg-gray-900 text-white hover:bg-gray-700 transition"
                      isLoading={isLoading}
                    >
                      Autentificare
                    </Button>
                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                      <button type="button" onClick={() => setView('register')} className="font-medium text-gray-900 hover:text-gray-700">
                        Nu ai cont? Înscrie-te
                      </button>
                      <button type="button" onClick={() => setView('forgot')} className="text-gray-500 hover:text-gray-800 underline underline-offset-4">
                        Ai uitat parola?
                      </button>
                    </div>
                  </form>
                </>
              )}

              {view === 'register' && (
                <>
                  <div className="mb-5 sm:mb-6 text-left">
                    <h1 className="login-page__title font-bold tracking-tight text-gray-900 mb-1">
                      Creează cont
                    </h1>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Înscrie-te pentru a gestiona business-ul tău și rezervările clienților.
                    </p>
                  </div>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-5 sm:space-y-6">
                    <div className="space-y-1.5">
                      <Input
                        type="text"
                        label="Nume"
                        placeholder="Numele tău"
                        error={registerForm.formState.errors.name?.message}
                        className="rounded-full px-4 py-3 border-gray-400 focus:border-gray-600"
                        {...registerForm.register('name')}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Input
                        type="email"
                        label="Email"
                        placeholder="exemplu@email.com"
                        error={registerForm.formState.errors.email?.message}
                        className="rounded-full px-4 py-3 border-gray-400 focus:border-gray-600"
                        {...registerForm.register('email')}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Input
                        type="password"
                        label="Parolă"
                        placeholder="••••••••"
                        error={registerForm.formState.errors.password?.message}
                        className="rounded-full px-4 py-3 border-gray-400 focus:border-gray-600"
                        {...registerForm.register('password')}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Input
                        type="password"
                        label="Confirmă parola"
                        placeholder="••••••••"
                        error={registerForm.formState.errors.confirmPassword?.message}
                        className="rounded-full px-4 py-3 border-gray-400 focus:border-gray-600"
                        {...registerForm.register('confirmPassword')}
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="login-page__submit-btn w-full px-4 py-3 text-base font-medium rounded-full bg-gray-900 text-white hover:bg-gray-700 transition"
                      isLoading={isLoading}
                    >
                      Înscrie-te
                    </Button>
                    <button type="button" onClick={() => setView('login')} className="mt-5 block w-full text-center text-sm font-medium text-gray-900 hover:text-gray-700">
                      Ai deja un cont? Autentifică-te
                    </button>
                  </form>
                </>
              )}

              {view === 'forgot' && (
                <>
                  <div className="mb-5 sm:mb-6 text-left">
                    <h1 className="login-page__title font-bold tracking-tight text-gray-900 mb-1">
                      Ai uitat parola?
                    </h1>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Introdu emailul contului tău și îți vom trimite un link pentru resetarea parolei.
                    </p>
                  </div>
                  <form onSubmit={forgotForm.handleSubmit(onForgotSubmit)} className="space-y-5 sm:space-y-6">
                    <div className="space-y-1.5">
                      <Input
                        type="email"
                        label="Email"
                        placeholder="exemplu@email.com"
                        error={forgotForm.formState.errors.email?.message}
                        className="rounded-full px-4 py-3 border-gray-400 focus:border-gray-600"
                        {...forgotForm.register('email')}
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="login-page__submit-btn w-full px-4 py-3 text-base font-medium rounded-full bg-gray-900 text-white hover:bg-gray-700 transition"
                      isLoading={isLoading}
                    >
                      Trimite link resetare
                    </Button>
                    <button type="button" onClick={() => setView('login')} className="mt-5 block w-full text-center text-sm font-medium text-gray-900 hover:text-gray-700">
                      Înapoi la autentificare
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
