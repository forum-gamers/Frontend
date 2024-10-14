import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import BackBtn from "@/components/common/BackBtn";
import { getParticipateDictionaryDictionary } from "./dictionary";
import type { StaticPageProps } from "../interface";

export default function ParticipateTourStaticPage({ lang }: StaticPageProps) {
  const dictionary = getParticipateDictionaryDictionary(lang);

  return (
    <Card
      as="section"
      id={lang === "id" ? "Mengikuti-Turnament" : "Participate-Tour"}
      className={cn(
        "w-full max-w-3xl mx-auto antialiased cursor-default",
        "transition-all duration-300 ease-in-out hover:shadow-xl",
        "bg-white dark:bg-[#202225]"
      )}
    >
      <CardHeader
        as="header"
        className="bg-gradient-to-l from-blue-500 to-blue-700 text-white p-6 rounded-t-lg"
      >
        <BackBtn />
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">
          {dictionary.title}
        </CardTitle>
        <CardDescription className="text-blue-100">
          {dictionary.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6 text-neutral-900 dark:text-neutral-300">
        <p className="text-lg font-semibold">{dictionary.announcement}</p>
        <ul className="space-y-4">
          {Object.keys(dictionary.contents).map((key) => (
            <li className="flex items-start space-x-2" key={key}>
              <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
              <hgroup>
                <h3 className="font-semibold text-blue-600 hover:opacity-75 duration-300 transition-opacity hover:shadow-sm hover:bg-opacity-0">
                  {key}
                </h3>
                <p>{dictionary.contents[key]}</p>
              </hgroup>
            </li>
          ))}
        </ul>
        <Alert variant="default" className="bg-blue-50 border-blue-200">
          <AlertTitle className="text-blue-800 font-bold">
            {dictionary.remember}
          </AlertTitle>
          <AlertDescription className="text-blue-700">
            {dictionary.rememberMessage}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

export const dynamic = "force-static";
