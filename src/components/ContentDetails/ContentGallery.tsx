import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ContentGalleryItem } from "@/types/content";
import { cn } from "@/lib/utils";
import { getContentImageUrl } from "@/utils/getImageFromExternal";
import Image from "next/image";

export type ContentGalleryProps = {
  item: ContentGalleryItem;
};

const ContentGallery = ({ item }: ContentGalleryProps) => {
  const { title, body, images, orientation } = item;
  const isPortrait = orientation === "portrait";

  return (
    <div className="grid items-center gap-6 md:grid-cols-5 md:gap-10">
      <div className="flex flex-col gap-2 md:col-span-2">
        {!!title && <h3 className="text-lg font-semibold">{title}</h3>}
        {!!body && <p className="leading-7 text-muted-foreground">{body}</p>}
      </div>
      <Carousel className="min-w-0 md:col-span-3">
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image} className={cn(isPortrait && "basis-1/2 lg:basis-1/3")}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-xl border bg-muted",
                  isPortrait ? "aspect-[9/19]" : "aspect-video"
                )}
              >
                <Image
                  src={getContentImageUrl(image)}
                  alt={title ?? "Project screenshot"}
                  fill
                  sizes={isPortrait ? "(min-width: 1024px) 220px, 50vw" : "(min-width: 768px) 640px, 100vw"}
                  className="object-cover object-top"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > (isPortrait ? 2 : 1) && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default ContentGallery;
