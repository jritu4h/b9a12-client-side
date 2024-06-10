import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import CallToAct from "../Call to act/CallToAct";
import ContactUs from "../Contact Us/ContactUs";
import Sub from "../Sub/Sub";
import Category from "../category/Category";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Category></Category>
           <CallToAct></CallToAct>
           <AboutUs></AboutUs>
           <ContactUs></ContactUs>
           <Sub></Sub>
        </div>
    );
};

export default Home;