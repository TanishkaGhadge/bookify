import UploadArea from "../components/upload/UploadArea";

export default function Dashboard() {
  return (
    <div className="min-h-screen pt-28 px-8 pb-12 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-main)] mb-4">
          Convert your PDFs or EPUB files <br/> into <span className="font-serif italic text-[var(--accent-primary)]">beautiful audiobooks.</span>
        </h1>
        <p className="text-[var(--text-muted)] mb-12 text-lg font-medium max-w-2xl mx-auto">
          Upload your document below and let our AI engine create your listening experience instantly.
        </p>

        <UploadArea />
      </div>
    </div>
  );
}