import Users from "../components/Users";
import Chat from "../components/Chat";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="h-4/5 w-3/4 bg-green-300 flex">
        <div className="bg-[#121C24] md:w-1/2 xl:w-1/3 lg:w-1/2">
          <Users />
        </div>
        <div className="flex-1 bg-[#0D1518]">
          <Chat />
        </div>
      </div>
    </div>
  );
}
