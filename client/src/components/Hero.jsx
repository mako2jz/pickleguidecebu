import { Button } from "@/components/ui/button"
import logo from '../resources/pickleheaderlogo.svg';

const Hero = ({ onSubmitVenue }) => {
    return (
        <section className="hero-section">
            <img 
                src={logo} 
                alt="Pickleball Courts in Cebu"
                className="h-40 w-full"
            ></img>
            <p className="hero-description">
                Welcome to Pickle Guide Cebu! Your central hub for discovering pickleball courts across Cebu. 
                Whether you're a seasoned player or just starting out, we've got the perfect venue for you.
            </p>
            <div className="cta-buttons">
                <Button asChild variant="outline">
                    <a href="#venues">Find Courts</a>
                </Button>
                <Button onClick={onSubmitVenue} variant="outline">Submit a Venue</Button>
            </div>
        </section>
    );
};

export default Hero;
