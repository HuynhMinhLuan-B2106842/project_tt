// import { NextResponse } from "next/server";
// import { connectToDatabase } from "../../lib/mongodb";

// export async function POST(request: Request) {
//   try {
//     const { message } = await request.json();

//     if (!message) {
//       return NextResponse.json(
//         { error: "Message is required" },
//         { status: 400 }
//       );
//     }

//     // Simple keyword-based response system
//     const responses: Record<string, string> = {
//       "xin chào": "Xin chào! Tôi có thể giúp gì cho bạn?",
//       chào: "Xin chào! Tôi có thể giúp gì cho bạn?",
//       hello: "Xin chào! Tôi có thể giúp gì cho bạn?",
//       hi: "Xin chào! Tôi có thể giúp gì cho bạn?",
//       "đặt lịch":
//         "Để đặt lịch khám, bạn có thể nhấn vào nút 'Đặt lịch khám' trên trang chủ hoặc gọi số 0123 456 789. Bạn cần cung cấp thông tin: Họ tên, số điện thoại, lý do khám và thời gian mong muốn.",
//       "lịch khám":
//         "Để đặt lịch khám, bạn có thể nhấn vào nút 'Đặt lịch khám' trên trang chủ hoặc gọi số 0123 456 789.",
//       "giờ làm việc":
//         "Phòng khám làm việc từ 7:30 - 17:30 các ngày từ thứ 2 đến thứ 6, và 7:30 - 12:00 vào thứ 7. Chủ nhật nghỉ.",
//       "thời gian":
//         "Phòng khám làm việc từ 7:30 - 17:30 các ngày từ thứ 2 đến thứ 6, và 7:30 - 12:00 vào thứ 7. Chủ nhật nghỉ.",
//       "chi phí":
//         "Chi phí khám bệnh phụ thuộc vào loại dịch vụ bạn sử dụng. Khám tổng quát: 200.000đ, Khám chuyên khoa: 300.000đ, Xét nghiệm cơ bản: 150.000đ. Bạn có thể xem bảng giá chi tiết tại mục 'Dịch vụ' trên trang web.",
//       giá: "Chi phí khám bệnh phụ thuộc vào loại dịch vụ bạn sử dụng. Khám tổng quát: 200.000đ, Khám chuyên khoa: 300.000đ, Xét nghiệm cơ bản: 150.000đ.",
//       "bác sĩ":
//         "Phòng khám có đội ngũ bác sĩ chuyên nghiệp với nhiều năm kinh nghiệm trong các lĩnh vực: Nội khoa, Ngoại khoa, Sản phụ khoa, Nhi khoa, Da liễu. Bạn có thể xem thông tin chi tiết về các bác sĩ tại mục 'Đội ngũ bác sĩ'.",
//       "địa chỉ":
//         "Phòng khám tọa lạc tại 123 Đường Khám Bệnh, Quận Y Tế, TP. Hồ Chí Minh. Điện thoại: 0123 456 789.",
//       "liên hệ":
//         "Bạn có thể liên hệ với chúng tôi qua: Điện thoại: 0123 456 789, Email: info@phongkhamdakhoa.vn, Địa chỉ: 123 Đường Khám Bệnh, Quận Y Tế.",
//       "dịch vụ":
//         "Phòng khám cung cấp các dịch vụ: Khám tổng quát, Khám chuyên khoa, Xét nghiệm, Chẩn đoán hình ảnh, Tiêm chủng, Tư vấn dinh dưỡng.",
//       "xét nghiệm":
//         "Phòng khám có đầy đủ các loại xét nghiệm: Xét nghiệm máu, nước tiểu, phân, X-quang, siêu âm, điện tim. Kết quả xét nghiệm thường có trong 30 phút đến 2 giờ.",
//       "cảm ơn": "Cảm ơn bạn đã quan tâm đến phòng khám! Chúc bạn sức khỏe tốt!",
//       "tạm biệt":
//         "Tạm biệt! Hẹn gặp lại bạn tại phòng khám. Chúc bạn một ngày tốt lành!",
//       covid:
//         "Phòng khám có đầy đủ các biện pháp phòng chống COVID-19. Vui lòng đeo khẩu trang và rửa tay sát khuẩn khi đến khám.",
//       vaccine:
//         "Phòng khám có dịch vụ tiêm chủng đầy đủ các loại vaccine cho trẻ em và người lớn. Vui lòng liên hệ để đặt lịch tiêm.",
//       "bảo hiểm":
//         "Phòng khám chấp nhận thẻ BHYT và các loại bảo hiểm y tế khác. Vui lòng mang theo thẻ khi đến khám.",
//       "khẩn cấp":
//         "Trong trường hợp khẩn cấp, vui lòng gọi 115 hoặc đến phòng cấp cứu gần nhất. Phòng khám chúng tôi không có dịch vụ cấp cứu 24/7.",
//       "tái khám":
//         "Lịch tái khám sẽ được bác sĩ hẹn tùy theo tình trạng bệnh. Bạn có thể đặt lịch tái khám qua website hoặc gọi điện thoại.",
//     };

//     let response =
//       "Xin lỗi, tôi không hiểu câu hỏi của bạn. Bạn có thể hỏi về: đặt lịch khám, giờ làm việc, chi phí, thông tin bác sĩ, dịch vụ, địa chỉ liên hệ, vaccine, bảo hiểm y tế.";

//     // Simple keyword matching
//     const messageLower = message.toLowerCase();
//     for (const [keyword, resp] of Object.entries(responses)) {
//       if (messageLower.includes(keyword)) {
//         response = resp;
//         break;
//       }
//     }

//     // Log the conversation to database (works with both real MongoDB and mock)
//     try {
//       const { db } = await connectToDatabase();
//       await db.collection("chat_logs").insertOne({
//         userMessage: message,
//         botResponse: response,
//         timestamp: new Date(),
//         sessionId: request.headers.get("x-session-id") || "anonymous",
//         userAgent: request.headers.get("user-agent") || "unknown",
//       });
//     } catch (dbError) {
//       console.error("Failed to log conversation to database:", dbError);
//       // Continue with the response even if logging fails
//     }

//     return NextResponse.json({
//       response,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     console.error("Chat API error:", error);
//     return NextResponse.json(
//       {
//         error: "Internal server error",
//         message: "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.",
//       },
//       { status: 500 }
//     );
//   }
// }

// // GET method for testing the API
// export async function GET() {
//   try {
//     const { db } = await connectToDatabase();

//     return NextResponse.json({
//       message: "Chat API is working!",
//       timestamp: new Date().toISOString(),
//       database: db ? "Connected" : "Mock mode",
//     });
//   } catch (error) {
//     return NextResponse.json({
//       message: "Chat API is working (with errors)!",
//       timestamp: new Date().toISOString(),
//       database: "Mock mode",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// }
