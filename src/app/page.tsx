export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">LZR App</h1>
      <p className="mt-4 text-lg text-gray-600">
        Template Next.js App Router — LZR Technologies
      </p>
      <a
        href="https://code.lzrtechnologies.com"
        className="mt-6 text-blue-600 underline hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        Engineering Handbook
      </a>
    </main>
  )
}
