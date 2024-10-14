import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { getCreateTeamDictionary } from "./dictionary";
import BackBtn from "@/components/common/BackBtn";
import type { StaticPageProps } from "../interface";

export default function CreateTourStaticPage({ lang }: StaticPageProps) {
  const dictionary = getCreateTeamDictionary(lang);

  return (
    <Card
      as="section"
      id={lang === "id" ? "Tutorial-Membuat-Turnament" : "Create-Tour-Tutorial"}
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
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
          {dictionary.title}
        </CardTitle>
        <CardDescription className="text-blue-100">
          {dictionary.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6 text-neutral-900 dark:text-neutral-300">
        <p className="text-lg font-semibold">{dictionary.announcement}</p>
        <ul className="list-disc pl-6 space-y-2">
          {Object.keys(dictionary.contents).map((key: string) => (
            <li key={key}>
              <strong className="text-blue-600 font-semibold hover:opacity-75 duration-300 transition-opacity hover:shadow-sm hover:bg-opacity-0">
                {key}
              </strong>{" "}
              {dictionary.contents[key]}
            </li>
          ))}
        </ul>
        <Alert variant="destructive" className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <AlertTitle className="text-yellow-800 font-bold">
            {dictionary.important}
          </AlertTitle>
          <AlertDescription className="text-yellow-700">
            {dictionary.alertMessage}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
