/*
TODO: QnA Accordion Component
- Create a reusable Accordion component for displaying questions and answers.
- Each question should be clickable to expand/collapse the answer.
- Style the component to match the overall design of the application.
- Ensure accessibility features are included (e.g., keyboard navigation, ARIA attributes).
*/

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
            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  );
};

export default Questions;