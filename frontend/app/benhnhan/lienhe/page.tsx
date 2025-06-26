"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/footer";
import { useState } from "react";

export default function LienHePage() {
  const [form, setForm] = useState({ hoTen: "", email: "", noiDung: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Cảm ơn bạn đã gửi liên hệ. Chúng tôi sẽ phản hồi sớm!");
    setForm({ hoTen: "", email: "", noiDung: "" });
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-10">
          Liên hệ với Phòng Khám
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Thông tin liên hệ */}
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Địa chỉ
              </h2>
              <p className="text-gray-700">
                11 Phan Đình Phùng, Tân An, Ninh Kiều, Cần Thơ
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Số điện thoại
              </h2>
              <p className="text-gray-700">028 1234 5678</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Email
              </h2>
              <p className="text-gray-700">lienhe@phongkhamabc.vn</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Giờ làm việc
              </h2>
              <p className="text-gray-700">Thứ 2 - Thứ 7: 7:00 - 17:00</p>
              <p className="text-gray-700">Chủ nhật: 8:00 - 12:00</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Bản đồ
              </h2>
              <iframe
                title="Bản đồ phòng khám"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15677.118987729943!2d105.77800350491872!3d10.034431996850522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a062a1859790c1%3A0xfc202c352c71386a!2zVmnDqm4gdGjDtG5nIENV4buTbiBUaMO0IChWTlBUIENhbiBUaG8p!5e0!3m2!1svi!2s!4v1719221800145!5m2!1svi!2s"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Form liên hệ */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              Gửi liên hệ
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ tên
                </label>
                <input
                  type="text"
                  required
                  value={form.hoTen}
                  onChange={(e) => setForm({ ...form, hoTen: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.noiDung}
                  onChange={(e) =>
                    setForm({ ...form, noiDung: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
              >
                Gửi liên hệ
              </button>
            </form>

            {message && (
              <p className="text-green-600 mt-4 text-sm">{message}</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
