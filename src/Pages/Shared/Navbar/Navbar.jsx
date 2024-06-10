
import { Link } from "react-router-dom";
import img1 from "../../../assets/received_830910895581844-removebg-preview-640x480.png"
import AvatarDropdown from "../../../Components/Avatar/Avatar";
import { useContext } from "react";
import { authContext } from "../../../Provider/Provider";
const Navbar = () => {
  const {user,logOut}=useContext(authContext)
  const nav=<>
        <li><Link>Home</Link></li>
      <li> <Link to='/pets-list'>Pet Listing</Link>      
      </li>
      <li><Link to='donation-camping'>Donation Campaigns</Link></li>
      {
       !user?.email&&<li><Link to='/login'>Login</Link></li>
      }
  </>
    return (
        <div>
            <div className="navbar  fixed z-10 bg-opacity-30  max-w-screen-7xl bg-black text-white h-[66px]">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
{nav}
      </ul>
    </div>
    <div className=" w-48 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={img1} />
        </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
   {nav}
    </ul>
  </div>
  <div className="navbar-end">
{
  user?.email&&<AvatarDropdown user={user} logout={logOut}></AvatarDropdown>
}
  </div>
</div>
            
        </div>
    );
};

export default Navbar;