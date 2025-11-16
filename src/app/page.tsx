import { DocumentList, Header, SearchSection, Sidebar } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:px-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <span className="text-primary">🏠</span>
            <span>/</span>
            <span>Văn bản pháp luật</span>
          </div>

          {/* Page Title */}
          <h1 className="mb-6 text-2xl font-bold text-gray-900 lg:text-3xl">
            TRA CỨU VĂN BẢN PHÁP LUẬT - VĂN BẢN MỚI CẬP NHẬT
          </h1>

          {/* Search Section */}
          <SearchSection />

          {/* Filter Help Text */}
          <p className="mt-4 mb-6 text-xs text-gray-500">
            Nhất từ khóa: Số Hiệu, Tiêu đề hoặc Nội dung ngắn gọn của Văn Bản...
          </p>

          {/* Filters */}
          <div className="mb-6 rounded border border-gray-200 bg-white p-4">
            <div className="mb-4 text-sm font-semibold text-gray-700">Tìm VB theo:</div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="search" defaultChecked className="h-4 w-4" />
                <span className="text-sm">Tất cả</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="search" className="h-4 w-4" />
                <span className="text-sm">Tiêu đề</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="search" className="h-4 w-4" />
                <span className="text-sm">Số hiệu văn bản</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                <span className="text-sm">Cụm từ chính xác</span>
              </label>
            </div>
          </div>

          {/* Document List */}
          <DocumentList />
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>

      {/* Hotline Badge */}
      <div className="fixed bottom-8 left-8 z-40 flex items-center gap-3 rounded-full bg-red-600 p-4 text-white shadow-lg">
        <div className="text-2xl">📞</div>
        <div>
          <div className="text-xs">Hotline:</div>
          <div className="text-lg font-bold">1900.6162</div>
        </div>
      </div>
    </div>
  );
}
