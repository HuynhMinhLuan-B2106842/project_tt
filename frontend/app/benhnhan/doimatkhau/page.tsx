'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Loader2 } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import Header from '@/app/components/Header';
import Footer from '@/app/footer';
import { useRouter } from 'next/navigation';

export default function DoiMatKhauPage() {
    const [matKhauCu, setMatKhauCu] = useState('');
    const [matKhauMoi, setMatKhauMoi] = useState('');
    const [matKhauMoiLapLai, setMatKhauMoiLapLai] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setIsSuccess(false);

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Bạn cần đăng nhập để đổi mật khẩu.');
            setIsLoading(false);
            return;
        }

        if (matKhauMoi !== matKhauMoiLapLai) {
            setMessage('Mật khẩu mới không khớp.');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:9000/api/taikhoan/doimatkhau', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    mat_khau_cu: matKhauCu,
                    mat_khau_moi: matKhauMoi,
                    mat_khau_moi_laplai: matKhauMoiLapLai,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.error || 'Đổi mật khẩu thất bại.');
            } else {
                setIsSuccess(true);
                setMessage('Đổi mật khẩu thành công!');
                setMatKhauCu('');
                setMatKhauMoi('');
                setMatKhauMoiLapLai('');
            }
        } catch (err) {
            setMessage('Lỗi kết nối đến máy chủ.');
        }

        setIsLoading(false);
    };

    const renderPasswordField = (
        id: string,
        label: string,
        value: string,
        setValue: (val: string) => void,
        visible: boolean,
        setVisible: (val: boolean) => void
    ) => (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <Input
                    id={id}
                    type={visible ? 'text' : 'password'}
                    placeholder={label}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={isLoading}
                    className="pl-10 pr-10"
                    required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                    onClick={() => setVisible(!visible)}
                    disabled={isLoading}
                >
                    {visible ? (
                        <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                        <Eye className="w-4 h-4 text-gray-500" />
                    )}
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <Header />
            <main className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                    Đổi mật khẩu
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {message && (
                        <div
                            className={`text-sm text-center px-4 py-2 rounded-md ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    {renderPasswordField('old-password', 'Mật khẩu cũ', matKhauCu, setMatKhauCu, showOld, setShowOld)}
                    {renderPasswordField('new-password', 'Mật khẩu mới', matKhauMoi, setMatKhauMoi, showNew, setShowNew)}
                    {renderPasswordField(
                        'confirm-password',
                        'Nhập lại mật khẩu mới',
                        matKhauMoiLapLai,
                        setMatKhauMoiLapLai,
                        showConfirm,
                        setShowConfirm
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang đổi mật khẩu...
                            </>
                        ) : (
                            'Đổi mật khẩu'
                        )}
                    </Button>
                </form>
            </main>
            <Footer />
        </>
    );
}
