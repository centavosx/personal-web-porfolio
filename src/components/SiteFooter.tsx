import SocialLinks from "@/components/SocialLinks";
import Supabase from "@/utils/supabase";

const SiteFooter = async () => {
  const links = await Supabase.getLinks();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vincent Lennuel Llanto
        </p>
        <SocialLinks links={links} />
      </div>
    </footer>
  );
};

export default SiteFooter;
