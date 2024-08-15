"use client";

import React from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { attemptStore, chooseLanguageStore, useLanguageStore } from "@/store";
import { HiChevronDown, HiHome, HiPlus } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { HiLogin } from "react-icons/hi";
import { HiLogout } from "react-icons/hi";
import Title from "../statics/title";

interface CommonProps {
  className: string;
  children: React.ReactNode;
}

interface LinkProps extends CommonProps {
  href: string;
}

interface ButtonProps extends CommonProps {
  onClick: () => void;
}

function Header() {
  const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const { data: session } = useSession();

  const imageSrc = session?.user?.image;

  const pathname = usePathname();

  const { setLoginAttempt } = attemptStore((state) => ({
    setLoginAttempt: state.setLoginAttempt,
  }));

  const { chooseLanguages, setChooseLanguages } = chooseLanguageStore(
    (state) => ({
      chooseLanguages: state.chooseLanguage,
      setChooseLanguages: state.setChooseLanguage,
    })
  );

  const { selectedLanguage } = useLanguageStore((state) => ({
    selectedLanguage: state.selectedLanguage,
  }));

  const languageBoxToggle = () => {
    setChooseLanguages(!chooseLanguages);
  };

  const linkDestination = pathname === "/" ? "/post-type-choose" : "/";

  const router = useRouter();

  const getButtonDetails = () => {
    switch (pathname) {
      case "/":
      case "/your-profile":
      case "/recruit":
      case "/post-type-choose":
        return {
          text: "Search Musicians",
          url: "/search-musicians",
          icon: <HiSearch className="text-white text-2xl md:hidden" />,
        };
      case "/search-musicians":
        return {
          text: "Set Up Your Profile",
          url: "/your-profile",
          icon: (
            <HiOutlineBriefcase className="text-white text-2xl md:hidden" />
          ),
        };
      default:
        return null;
    }
  };

  const ChevronIcon = chooseLanguages ? HiChevronDown : HiChevronUp;

  const buttonDetails = getButtonDetails();

  const CommonComponent = session ? Link : "button";

  const secondIcon =
    pathname === "/" ? (
      <HiPlus className="text-white text-2xl md:hidden" />
    ) : (
      <HiHome className="text-white text-2xl md:hidden" />
    );

  const commonProps: CommonProps = {
    className:
      "flex flex-col justify-center bg-blue-700  items-center p-2 hover:bg-blue-800 cursor-pointer w-full md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    children: (
      <>
        <p className="text-white text-[10px] md:text-lg lg:text-xl font-medium hidden sm:block">
          {pathname === "/" ? "Recruit" : "Home Page"}
        </p>
        {secondIcon}
      </>
    ),
  };

  const specificProps = session
    ? ({ href: linkDestination } as LinkProps)
    : ({ onClick: () => setLoginAttempt(true) } as ButtonProps);

  const Component = CommonComponent as React.ElementType;

  return (
    <div className=" z-50 flex flex-row items-center justify-between w-full p-1 md:p-4 border-b-2 bg-gray-700 animate-headerDown">
      <div className="flex flex-col md:flex-row items-center gap-3 mt-2 md:mt-0">
        <Image
          src="/jamming.jpg"
          alt="sport"
          width={110}
          height={90}
          className="w-18 h-16 md:w-22 md:h-16 lg:w-40 lg:h-24 rounded-lg"
        />

        <div className="flex flex-row md:flex-col gap-12 md:gap-3 justify-start">
          <Title />
          <div className="flex flex-row items-baseline group gap-2">
            <p className="text-[14px] md:text-xl lg:text-2xl font-serif font-bold text-white hidden sm:block">
              Language
            </p>

            <div className="flex items-center">
              <img
                src={selectedLanguage.flag}
                alt={selectedLanguage.label}
                width={20}
                height={15}
                className="rounded-md "
              />
              <ChevronIcon
                className="text-white h-[30px] w-[30px]"
                onClick={languageBoxToggle}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex items-center gap-4 mr-2 md:mr-0">
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-8 items-center">
          {session ? (
            <Image
              src={imageSrc}
              alt="user"
              className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full justify-self-center"
              width={100}
              height={100}
              onClick={() => router.push("/profile")}
            />
          ) : null}

          <button
            className="flex flex-col justify-center bg-blue-700  items-center p-2 hover:bg-blue-800 cursor-pointer 
           w-full  rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => {
              if (session) {
                router.push(buttonDetails.url);
              } else {
                setLoginAttempt(true);
              }
            }}
          >
            {buttonDetails?.icon}
            <p className="text-white text-[10px] md:text-lg lg:text-xl font-medium hidden sm:block">
              {buttonDetails?.text}
            </p>
          </button>

          <Component {...commonProps} {...specificProps} />

          <button
            className={`flex  flex-col justify-center ${
              session
                ? "bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
                : "bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
            }  rounded-lg items-center  p-2 cursor-pointer w-full md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`}
            onClick={() => {
              session ? signOut() : signIn();
            }}
          >
            {session ? (
              <HiLogout className="text-white text-2xl md:hidden" />
            ) : (
              <HiLogin className="text-white text-2xl md:hidden" />
            )}
            <p className="text-white text-[10px] md:text-lg lg:text-xl font-medium hidden sm:block">
              {session ? "Sign Out" : "Sign In"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;