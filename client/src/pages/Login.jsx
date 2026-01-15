import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import AnimatedContent from '../components/AnimatedContent';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(username, password);
            if (success) {
                navigate('/admin');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9EE] flex items-center justify-center px-4 py-12">
            <AnimatedContent
                distance={80}
                direction="vertical"
                reverse={false}
                duration={0.5}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={0.95}
                threshold={0}
                className="w-full max-w-md"
            >
                <Card className="border-border shadow-xl">
                    <CardContent className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-[#393F36] mb-1">
                                Pickle Guide Cebu
                            </h1>
                            <p className="text-foreground/60">Admin Login</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md text-center">
                                    {error}
                                </div>
                            )}
                            
                            <div>
                                <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        required
                                        autoComplete="username"
                                        className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#5C6657] mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="current-password"
                                        className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input-background text-[#5C6657] focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full mt-6"
                                variant="pickleballgreen"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-center">
                            <Link 
                                to="/" 
                                className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </AnimatedContent>
        </div>
    );
};

export default Login;
