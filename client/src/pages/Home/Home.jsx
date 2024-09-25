import Accordion from "../../components/Accordion/Accordion";
import AllSessions from "../../components/AllSessions/AllSessions";
import Hero from "../../components/Hero/Hero";
import TutorSection from "../../components/TutorSection/TutorSection";


const Home = () => {
    return (
        <div>
            <Hero />
            <AllSessions />
            <TutorSection />
            <Accordion />
        </div>
    );
};

export default Home;