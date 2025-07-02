const Header = ({ setIsOpen }) => {
    return (
      <header className="flex items-center justify-between p-4 border-b">
        <button onClick={() => setIsOpen(prev => !prev)} className="text-2xl text-gray-700">
            <div class="flex items-center gap-2 text-xl font-bold mb-8">
                    <i class="fas fa-store w-5"></i>
                    <span class="text-accent">Shop</span>Admin
            </div>
        </button>
        <div className="flex items-center gap-3">
        <div className="relative">
            <i className="fas fa-bell text-gray-600 text-xl cursor-pointer"></i>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-400"></span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-blue-600 font-semibold">AD</div>
          <span className="text-gray-700 font-medium">Admin</span>
        </div>
      </header>
    );
  };
  
  export default Header;