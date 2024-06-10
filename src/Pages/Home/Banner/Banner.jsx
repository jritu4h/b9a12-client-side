import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../../assets/pet-saying-text-concept.jpg"
import img2 from "../../../assets/vecteezy_a-dog-and-two-cats-are-standing-in-the-grass-ai-generated_31527682.jpg"
import img3 from "../../../assets/humberto-arellano-N_G2Sqdy9QY-unsplash.jpg"

const Banner = () => {
    return (
       <div>
         <Carousel >
                <div className=" max-h-full">
                    <img src={img1}/>
                   
                </div>
                <div>
                    <img src={img2} />
                   
                </div>
                <div>
                    <img src={img3} />
                  
                </div>
               
               
            </Carousel>
       </div>
    );
};

export default Banner;