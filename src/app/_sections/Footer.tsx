import Text from "@/components/Text";
import Image from "next/image";
import MailIcon from "../../../public/svg/mail.svg";
import LinkedInCharIcon from "../../../public/svg/linkedin-character.svg";

export type FooterProps = {
  isDark?: boolean;
};
const Footer = ({ isDark }: FooterProps) => {
  return (
    <footer
      className={`h-full w-full justify-center relative flex ${
        isDark ? "dark" : "bg-background"
      }`}
    >
      <div className="2xl:container flex-1 relative flex flex-col gap-4 z-10 px-10 py-20">
        <div className="items-start xsm:items-center flex flex-col xsm:flex-row gap-8">
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
              <MailIcon
                className="dark:fill-secondary"
                height={25}
                width={25}
              />
              <LinkedInCharIcon
                className="fill-primary dark:fill-secondary"
                height={20}
                width={20}
              />
            </div>
            <Text className="font-montserrat" size="xs">
              Donate a coffee - BTC: bc1qeksvjjun7dn7hqy5u24x0ywsarnz5qszdllcma
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
