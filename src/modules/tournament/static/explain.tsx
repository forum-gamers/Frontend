import type { StaticPageProps } from "../interface";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getExplainTourDictionary } from "./dictionary";

export default function ExplainTourFeature({ lang }: StaticPageProps) {
  const dictionary = getExplainTourDictionary(lang);

  return (
    <section className="max-w-4xl mx-auto text-neutral-900 dark:text-neutral-300 antialiased">
      <Card className="w-full bg-white dark:bg-[#202225] cursor-default">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-blue-600">
            {dictionary.title}
          </CardTitle>
          <CardDescription className="mt-2 text-xl">
            {dictionary.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-lg text-neutral-900 dark:text-neutral-300">
            {dictionary.announcement}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(dictionary.contents).map((key) => (
              <Card
                key={key}
                className="bg-white cursor-pointer dark:bg-[#202225] shadow-md shadow-gray-200 top-32 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100 hover:shadow-xl hover:scale-105 duration-300 transition-all hover:opacity-95"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    {dictionary.contents[key].icon}
                    {key}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-900 dark:text-neutral-300">
                    {dictionary.contents[key].content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-600">
              {dictionary.navigate}
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${lang}/tournament/create`} prefetch passHref>
                <Button className="w-full sm:w-auto shadow-sm hover:shadow-lg shadow-blue-900 hover:scale-[98.5%] bg-blue-500 hover:bg-blue-600 hover:opacity-80 transition-all duration-300 cursor-pointer">
                  {dictionary.toCreate}
                </Button>
              </Link>
              <Link href={`/${lang}/tournament/participate`} prefetch passHref>
                <Button className="w-full sm:w-auto shadow-sm hover:shadow-lg shadow-blue-900 hover:scale-[98.5%] bg-blue-500 hover:bg-blue-600 hover:opacity-80 transition-all duration-300 cursor-pointer">
                  {dictionary.toJoin}
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              {dictionary.benefits.title}
            </h4>
            <ul className="list-disc list-inside space-y-2">
              {dictionary.benefits.contents.map((content) => (
                <li className="text-neutral-900 antialiased" key={content}>
                  {content}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
