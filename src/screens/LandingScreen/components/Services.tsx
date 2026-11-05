import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@/types/supabase";
import { getContentImageUrl } from "@/utils/getImageFromExternal";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

const getFirstSentence = (text: string) => text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? text;

export type ServicesProps = {
  data: Service[];
};

const Services = ({ data }: ServicesProps) => (
  <section id="services" className="scroll-mt-14 border-b bg-muted/40">
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6">
      <SectionHeading title="Services" description="What I can build and look after for you." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((service) => (
          <Card key={service.id}>
            <CardHeader className="gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg border bg-background">
                <Image
                  src={getContentImageUrl(service.icon_url)}
                  width={22}
                  height={22}
                  alt=""
                  className="size-5 dark:invert"
                />
              </span>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription className="leading-6">{getFirstSentence(service.description)}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
