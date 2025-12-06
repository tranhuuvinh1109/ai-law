"use client";
import { useState } from "react";
import { Plus, Trash2, Save, X } from "lucide-react";
import Link from "next/link";

interface Step {
  id: string;
  title: string;
  description: string;
  processingTime: string;
}

export const AddProcedure = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    processingLevel: "",
    fee: "",
  });

  const [steps, setSteps] = useState<Step[]>([
    { id: "1", title: "", description: "", processingTime: "" },
  ]);

  const [documents, setDocuments] = useState<string[]>([""]);

  const categories = [
    "Hộ tịch",
    "Đất đai",
    "Kinh doanh",
    "Xây dựng",
    "BHXH",
    "Thuế",
    "Giáo dục",
    "Y tế",
    "Giao thông",
    "Khác",
  ];

  const processingLevels = ["Trung ương", "Tỉnh/Thành phố", "Quận/Huyện", "Phường/Xã"];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleStepChange = (index: number, field: keyof Step, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const addStep = () => {
    const newId = (steps.length + 1).toString();
    setSteps([...steps, { id: newId, title: "", description: "", processingTime: "" }]);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps);
    }
  };

  const handleDocumentChange = (index: number, value: string) => {
    const newDocuments = [...documents];
    newDocuments[index] = value;
    setDocuments(newDocuments);
  };

  const addDocument = () => {
    setDocuments([...documents, ""]);
  };

  const removeDocument = (index: number) => {
    if (documents.length > 1) {
      const newDocuments = documents.filter((_, i) => i !== index);
      setDocuments(newDocuments);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission
    console.log("Form Data:", {
      ...formData,
      steps: steps.filter((s) => s.title || s.description || s.processingTime),
      documents: documents.filter((d) => d.trim() !== ""),
    });
    alert("Thủ tục đã được tạo thành công!");
    // onNavigate("procedures");
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-8 py-6">
          <div className="mb-4 flex items-center justify-between">
            <Link href={"/"} className="text-[#0A4FD5] hover:underline">
              ← Quay lại Admin
            </Link>
            <div className="flex gap-3">
              <Link
                href={"/"}
                className="rounded-lg border border-gray-300 px-6 py-2 text-[#111827] transition-colors hover:bg-[#F3F4F6]"
              >
                Hủy
              </Link>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-lg bg-[#0A4FD5] px-6 py-2 text-white transition-colors hover:bg-[#083aa3]"
              >
                <Save className="h-5 w-5" />
                Lưu thủ tục
              </button>
            </div>
          </div>
          <h1 className="mb-2 text-[#111827]">Thêm thủ tục mới</h1>
          <p className="text-[#111827] opacity-70">Nhập thông tin chi tiết về thủ tục hành chính</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-[#111827]">Thông tin cơ bản</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Category */}
              <div>
                <label className="mb-2 block text-[#111827]">
                  Lĩnh vực <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#0A4FD5] focus:outline-none"
                  required
                >
                  <option value="">-- Chọn lĩnh vực --</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Processing Level */}
              <div>
                <label className="mb-2 block text-[#111827]">
                  Cấp xử lý <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.processingLevel}
                  onChange={(e) => handleInputChange("processingLevel", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#0A4FD5] focus:outline-none"
                  required
                >
                  <option value="">-- Chọn cấp xử lý --</option>
                  {processingLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title */}
            <div className="mt-6">
              <label className="mb-2 block text-[#111827]">
                Tên thủ tục <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="VD: Đăng ký kinh doanh"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#0A4FD5] focus:outline-none"
                required
              />
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="mb-2 block text-[#111827]">
                Mô tả <span className="text-red-600">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Nhập mô tả chi tiết về thủ tục..."
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-[#0A4FD5] focus:outline-none"
                required
              />
            </div>

            {/* Fee */}
            <div className="mt-6">
              <label className="mb-2 block text-[#111827]">
                Lệ phí <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.fee}
                onChange={(e) => handleInputChange("fee", e.target.value)}
                placeholder="VD: 50,000 - 100,000 VNĐ"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#0A4FD5] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Execution Process */}
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[#111827]">Quy trình thực hiện</h2>
              <button
                type="button"
                onClick={addStep}
                className="flex items-center gap-2 rounded-lg bg-[#3DDC84] px-4 py-2 text-white transition-colors hover:bg-[#2bc770]"
              >
                <Plus className="h-5 w-5" />
                Thêm bước
              </button>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="relative rounded-lg border border-gray-200 p-6">
                  {/* Remove Button */}
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="group absolute top-4 right-4 rounded-lg p-2 transition-colors hover:bg-red-50"
                      title="Xóa bước này"
                    >
                      <Trash2 className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
                    </button>
                  )}

                  <div className="mb-4">
                    <div className="mb-4 inline-block rounded-full bg-[#0A4FD5] px-3 py-1 text-sm text-white">
                      Bước {index + 1}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Step Title */}
                    <div>
                      <label className="mb-2 block text-sm text-[#111827]">
                        Tiêu đề bước <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleStepChange(index, "title", e.target.value)}
                        placeholder="VD: Chuẩn bị hồ sơ"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0A4FD5] focus:outline-none"
                        required
                      />
                    </div>

                    {/* Step Description */}
                    <div>
                      <label className="mb-2 block text-sm text-[#111827]">
                        Mô tả bước <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        value={step.description}
                        onChange={(e) => handleStepChange(index, "description", e.target.value)}
                        placeholder="Mô tả chi tiết về bước này..."
                        rows={3}
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0A4FD5] focus:outline-none"
                        required
                      />
                    </div>

                    {/* Processing Time */}
                    <div>
                      <label className="mb-2 block text-sm text-[#111827]">
                        Thời gian xử lý <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={step.processingTime}
                        onChange={(e) => handleStepChange(index, "processingTime", e.target.value)}
                        placeholder="VD: 1-2 ngày"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0A4FD5] focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[#111827]">Hồ sơ cần thiết</h2>
              <button
                type="button"
                onClick={addDocument}
                className="flex items-center gap-2 rounded-lg bg-[#3DDC84] px-4 py-2 text-white transition-colors hover:bg-[#2bc770]"
              >
                <Plus className="h-5 w-5" />
                Thêm giấy tờ
              </button>
            </div>

            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={doc}
                      onChange={(e) => handleDocumentChange(index, e.target.value)}
                      placeholder={`Giấy tờ ${index + 1}: VD: CMND/CCCD (bản công chứng)`}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#0A4FD5] focus:outline-none"
                    />
                  </div>
                  {documents.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="group rounded-lg p-3 transition-colors hover:bg-red-50"
                      title="Xóa giấy tờ này"
                    >
                      <X className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg bg-[#F3F4F6] p-4">
              <p className="text-sm text-[#111827] opacity-70">
                💡 Mẹo: Nhập chi tiết đầy đủ về từng loại giấy tờ, ví dụ: "CMND/CCCD (bản công
                chứng)" hoặc "Giấy chứng nhận đăng ký hộ kinh doanh (nếu có)"
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Link
              href={"/"}
              className="rounded-lg border border-gray-300 px-8 py-3 text-[#111827] transition-colors hover:bg-[#F3F4F6]"
            >
              Hủy
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-[#0A4FD5] px-8 py-3 text-white transition-colors hover:bg-[#083aa3]"
            >
              <Save className="h-5 w-5" />
              Lưu thủ tục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
