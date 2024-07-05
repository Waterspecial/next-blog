import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Browse Our Collection
        </h2>
        <Link
          href={"/blogs"}
          className="text-blue-700 font-semibold py-2 px-6 rounded text-sm bg-white"
        >
          Explore Blogs
        </Link>
      </div>
    </div>
  );
}
