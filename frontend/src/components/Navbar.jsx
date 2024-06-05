export default function Navbar() {
  return (
    <div className="max-w-screen-2xl max-auto fixed container px-6 md:px-40 shadow-lg py-4 h-16">
      <div className="flex justify-between">
        <h1 className="font-bold cursor-pointer text-2xl">
          Word<span className="text-green-500">2</span>PDF
        </h1>
        <h1 className="font-bold cursor-pointer text-2xl hover:scale-110 duration-300">
          Home
        </h1>
      </div>
    </div>
  );
}
