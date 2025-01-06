import Text from "@/components/Text";
import Image from "next/image";
import MailIcon from "../../../public/svg/mail.svg";
import LinkedInCharIcon from "../../../public/svg/linkedin-character.svg";
import Supabase from "@/utils/supabase";

const contactLinkIcon = {
  email: <MailIcon className="dark:fill-secondary" height={25} width={25} />,
  linkedin: (
    <LinkedInCharIcon
      className="fill-primary dark:fill-secondary"
      height={20}
      width={20}
    />
  ),
};

export type FooterProps = {
  isDark?: boolean;
};
const Footer = async ({ isDark }: FooterProps) => {
  const { data: contactLinks } = Supabase.handleError(
    await Supabase.link.in("type", ["email", "linkedin"])
  );
  const address = await Supabase.getAddresses();

  return (
    <footer
      className={`h-full w-full justify-center relative flex ${
        isDark ? "dark" : "bg-background"
      }`}
    >
      <div className="2xl:container flex-1 relative flex flex-col gap-4 z-10 px-10 py-20">
        <div className="items-start xsm:items-start flex flex-col xsm:flex-row gap-8">
          <Image
            src={isDark ? "/svg/main-logo-dark.svg" : "/svg/main-logo.svg"}
            height={55}
            width={55}
            alt="main logo"
          />
          <div className="flex flex-col gap-4">
            <Text className="font-montserrat" size="xs">
              @2025 Vincent Lennuel Llanto All Rights Reserved.
            </Text>
            <div className="flex flex-row gap-4">
              {contactLinks.map((value, index) => {
                const type = value.type as keyof typeof contactLinkIcon;
                const icon = contactLinkIcon[type];

                if (!icon) return null;

                return (
                  <a
                    key={`${value.id}_${index}`}
                    href={value.link}
                    aria-label={type}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
            {!!address.length && (
              <div className="flex flex-col sm:flex-row gap-2">
                <Text className="font-montserrat" size="xs">
                  Donate a coffee -
                </Text>
                <div className="flex flex-col gap-4">
                  {address.map((value, index) => {
                    return (
                      <Text
                        key={`${value.id}_${index}`}
                        className="font-montserrat"
                        size="xs"
                      >
                        <b className="uppercase">{value.type}</b>:&nbsp;
                        {value.address}
                      </Text>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
