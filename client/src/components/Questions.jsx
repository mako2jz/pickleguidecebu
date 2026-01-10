import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Questions = () => {
  return (
    <div className="w-full max-w-2xl mx-auto my-8">
        <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Frequently Asked Questions</h2>
            <p className="text-foreground/70">New to Pickleball in Cebu? Find answers to common questions here.</p>
        </div>
        <Accordion type="single" collapsible>
            <AccordionItem value="item-4">
                <AccordionTrigger>What is Reclub?</AccordionTrigger>
                <AccordionContent>
                    Reclub is a community-based pickleball platform used by players in Cebu to join 
                    open play sessions, find games, and connect with other players. It helps beginners 
                    and regular players easily get into games without organizing everything themselves.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>How do I start open play using Reclub?</AccordionTrigger>
                <AccordionContent>
                    Here’s a simple step-by-step guide:
                    <ol className="list-decimal pl-4 pt-2 pb-4">
                        <li>Create an account
                            <p className="mt-1 mb-2">Sign up on Reclub using your email or social media accounts.</p>
                        </li>
                        <li>Find a Cebu open play session
                            <p className="mt-1 mb-2">Search for pickleball open play events in Cebu City. Sessions usually include the location, time, skill level, and fee (if any).</p>
                        </li>
                        <li>Join a session
                            <p className="mt-1 mb-2">Reserve your slot directly in the app or platform.</p>
                        </li>
                        <li>Show up and play
                            <p className="mt-1 mb-2">Arrive a bit early, introduce yourself, and follow the open play rotation system.</p>
                        </li>
                        <li>Meet the community
                            <p className="mt-1 mb-2">Open play is social, don’t hesitate to ask questions or play with different partners.</p>
                        </li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
                <AccordionTrigger>What skill levels are allowed in open play?</AccordionTrigger>
                <AccordionContent>
                    Most open play sessions welcome all skill levels, especially beginners. 
                    Some sessions may be labeled as beginner, intermediate, or advanced, so 
                    check the session details before joining.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
                <AccordionTrigger>What is DUPR?</AccordionTrigger>
                <AccordionContent>
                    DUPR (Dynamic Universal Pickleball Rating) is a global rating system 
                    that measures a player’s skill level based on their performance in matches. 
                    It ranges from 2.0 (beginner) to 8.0+ (professional). Reclub may use DUPR ratings 
                    to help match players of similar skill levels during open play sessions.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>What is open play?</AccordionTrigger>
                <AccordionContent>
                    Open play is a casual playing format where players rotate in and out of games. 
                    You don’t need a fixed partner, and matches are usually short. It’s the best 
                    way to meet other players and get more court time.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
                <AccordionTrigger>What is paddle stacking?</AccordionTrigger>
                <AccordionContent>
                    Paddle stacking is a common practice in pickleball where players place their paddles 
                    in a designated area, usually on the court sidelines, when they are not in use. 
                    This helps keep the playing area organized and prevents paddles from being misplaced 
                    or damaged during games.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>What equipment do I need?</AccordionTrigger>
                <AccordionContent>
                    At minimum, you’ll need: 
                    <ul className="list-disc pl-4 pt-2 pb-4">
                        <li>A pickleball paddle</li>
                        <li>Pickleball balls</li>
                        <li>Comfortable athletic clothing</li>
                        <li>Non-marking court shoes</li>
                    </ul>
                    Some venues or open play sessions may provide paddles and balls for beginners.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
                <AccordionTrigger>What is pickleball?</AccordionTrigger>
                <AccordionContent>
                    Pickleball is a paddle sport that combines elements of tennis, 
                    badminton, and table tennis. It’s played on a smaller court using a 
                    solid paddle and a perforated plastic ball. The game is easy to learn, 
                    fun for all ages, and very popular for social and competitive play.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  );
};

export default Questions;