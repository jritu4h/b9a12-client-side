
import img from "../../../assets/pets-3715733_640.jpg"
const AboutUs = () => {
    return (
        <div>
           <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={img} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">About Us</h1>
      <p className="py-6">This our pet adoption center .Here you will see difference pet.. <br /> you will adopt here Parrot,Love bird,cat,dog,Rabbit.. we will help you .Fore more update</p>
      <button className="btn ">Contact us</button>
    </div>
  </div>
</div>

            
        </div>
    );
};

export default AboutUs;