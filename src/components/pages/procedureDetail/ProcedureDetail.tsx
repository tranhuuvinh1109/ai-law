import { Download, FileText, AlertCircle, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
// import { useParams } from "next/navigation";

export const ProcedureDetail = () => {
  // Mock data - in real app would fetch based on procedureId
  const procedure = {
    title: "Đăng ký kinh doanh",
    desc: "Thủ tục đăng ký kinh doanh là thủ tục bắt buộc để thành lập và hoạt động hợp pháp một doanh nghiệp tại Việt Nam. Thủ tục này được thực hiện tại Phòng Đăng ký kinh doanh thuộc Sở Kế hoạch và Đầu tư cấp Tỉnh/Thành phố.",
    category: "Kinh doanh",
    time: "3-5 ngày làm việc",
    level: "Tỉnh/Thành phố",
    steps: [
      {
        title: "Chuẩn bị hồ sơ",
        desc: "Chuẩn bị đầy đủ giấy tờ theo danh mục yêu cầu",
        time: "1-2 ngày",
      },
      {
        title: "Nộp hồ sơ",
        desc: "Nộp hồ sơ trực tiếp hoặc qua dịch vụ công trực tuyến",
        time: "0.5 ngày",
      },
      {
        title: "Xử lý hồ sơ",
        desc: "Cơ quan có thẩm quyền kiểm tra và xử lý hồ sơ",
        time: "2-3 ngày",
      },
      {
        title: "Nhận kết quả",
        desc: "Nhận Giấy chứng nhận đăng ký kinh doanh",
        time: "0.5 ngày",
      },
    ],
    documents: [
      { name: "Mẫu đơn đăng ký kinh doanh", url: "#", type: "PDF" },
      { name: "Mẫu điều lệ công ty", url: "#", type: "DOCX" },
      { name: "Giấy ủy quyền (nếu có)", url: "#", type: "PDF" },
      { name: "Hướng dẫn chi tiết", url: "#", type: "PDF" },
    ],
    requirements: [
      "CMND/CCCD của người đại diện pháp luật (bản công chứng)",
      "Giấy chứng nhận đăng ký hộ kinh doanh (nếu có)",
      "Quyết định thành lập doanh nghiệp hoặc Điều lệ công ty",
      "Hợp đồng thuê địa điểm kinh doanh",
      "Giấy xác nhận vốn pháp định (nếu ngành nghề yêu cầu)",
    ],
    notes: [
      "Hồ sơ phải được nộp đầy đủ và chính xác theo quy định",
      "Thời gian xử lý có thể kéo dài nếu hồ sơ chưa đầy đủ hoặc cần bổ sung",
      "Có thể nộp hồ sơ trực tuyến qua Cổng dịch vụ công quốc gia",
      "Lệ phí: 50,000 - 100,000 VNĐ tùy theo loại hình doanh nghiệp",
    ],
    fee: "50,000 - 100,000 VNĐ",
  };

  //   const { id: procedureId } = useParams();

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-8 py-6">
          <div className="mb-4 flex items-center justify-between">
            <Link href={"/thu-tuc"} className="text-[#0A4FD5] hover:underline">
              ← Quay lại danh sách
            </Link>
            <div className="flex gap-3">
              <Link
                href={"chat"}
                className="rounded-lg border border-[#0A4FD5] px-6 py-2 text-[#0A4FD5] transition-colors hover:bg-[#0A4FD5] hover:text-white"
              >
                Hỏi AI về thủ tục này
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Title and Description */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-[#0A4FD5]/10 px-3 py-1 text-sm text-[#0A4FD5]">
                  {procedure.category}
                </div>
                <div className="flex items-center gap-1 text-sm text-[#111827] opacity-70">
                  <Clock className="h-4 w-4" />
                  {procedure.time}
                </div>
              </div>
              <h1 className="mb-4 text-[#111827]">{procedure.title}</h1>
              <p className="leading-relaxed text-[#111827] opacity-80">{procedure.desc}</p>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="text-sm text-[#111827] opacity-70">
                  <span className="opacity-50">Cấp xử lý:</span> {procedure.level}
                </div>
                <div className="mt-1 text-sm text-[#111827] opacity-70">
                  <span className="opacity-50">Lệ phí:</span> {procedure.fee}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-[#111827]">Quy trình thực hiện</h2>
              <div className="space-y-6">
                {procedure.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A4FD5] text-white">
                        {index + 1}
                      </div>
                      {index < procedure.steps.length - 1 && (
                        <div className="mt-2 h-full w-0.5 bg-gray-200"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h3 className="mb-1 text-[#111827]">{step.title}</h3>
                      <p className="mb-2 text-[#111827] opacity-70">{step.desc}</p>
                      <div className="flex items-center gap-1 text-sm text-[#111827] opacity-50">
                        <Clock className="h-4 w-4" />
                        {step.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-[#111827]">Hồ sơ cần thiết</h2>
              <ul className="space-y-3">
                {procedure.requirements.map((req, index) => (
                  <li key={index} className="flex gap-3 text-[#111827] opacity-80">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#3DDC84]" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notes */}
            <div className="rounded-xl border border-[#F59E0B]/20 bg-[#FEF3C7] p-6">
              <div className="mb-3 flex gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-[#F59E0B]" />
                <h3 className="text-[#111827]">Lưu ý quan trọng</h3>
              </div>
              <ul className="ml-8 space-y-2">
                {procedure.notes.map((note, index) => (
                  <li key={index} className="text-sm text-[#111827] opacity-80">
                    • {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Documents */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-[#111827]">Mẫu biểu & Tài liệu</h3>
              <div className="space-y-3">
                {procedure.documents.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-[#F3F4F6]"
                  >
                    <FileText className="h-5 w-5 text-[#0A4FD5]" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm text-[#111827] group-hover:text-[#0A4FD5]">
                        {doc.name}
                      </div>
                      <div className="text-xs text-[#111827] opacity-50">{doc.type}</div>
                    </div>
                    <Download className="h-4 w-4 text-[#111827] opacity-40 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-[#111827]">Hành động nhanh</h3>
              <div className="space-y-2">
                <Link
                  href={"chat"}
                  className="w-full rounded-lg bg-[#0A4FD5] py-3 text-white transition-colors hover:bg-[#083aa3]"
                >
                  Tư vấn với AI
                </Link>
                <button className="w-full rounded-lg border border-gray-300 py-3 text-[#111827] transition-colors hover:bg-[#F3F4F6]">
                  Lưu thủ tục
                </button>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-xl bg-[#F3F4F6] p-6">
              <h3 className="mb-3 text-[#111827]">Cần hỗ trợ?</h3>
              <p className="mb-4 text-sm text-[#111827] opacity-70">
                Liên hệ với bộ phận hỗ trợ để được tư vấn chi tiết
              </p>
              <button className="text-sm text-[#0A4FD5] hover:underline">Liên hệ ngay →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
