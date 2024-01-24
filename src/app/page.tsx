import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto py-40 font-mono space-y-5">
      {/* Learn more section */}

      <div className="text-center space-y-6">
        <div className="flex flex-col space-y-4">
          <p className="text-4xl md:text-5xl">Your <span className="font-semibold">Blanked</span> page</p>
          <p className="text-base md:text-lg text-muted-foreground italic">Blanked page this is your own basement. <br /> For your ideas, moodboards, plans and other more</p>
        </div>

        {/* Tooltip */}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="gap-2" variant={"default"}>Learn more <ArrowRightIcon className="w-4 h-4" /></Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Read documentation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator />
      </div>

      {/* Accordion */}

      <div className="mx-10 md:mx-40 lg:mx-60">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it helpful?</AccordionTrigger>
            <AccordionContent>
              Yes. It Helps solve problems and form ideas.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is it combo application?</AccordionTrigger>
            <AccordionContent>
              Hmm, maybe yes, maybe no. All depend on your needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Do I need to buy a subscription for this service?</AccordionTrigger>
            <AccordionContent>
              No, it's a free solution for your problems.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
export default Home;