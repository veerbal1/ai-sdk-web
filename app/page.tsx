import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import Link from 'next/link';
import { mainNavItems } from '@/shared/config/nav'; // Import the nav items
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'; // Add relevant icons

export const maxDuration = 60;

export default async function Home() {
  // Filter out any disabled/external nav items if needed for the main page list
  const examplePages = mainNavItems.filter(item => !item.disabled && !item.external);

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-primary ring-offset-background ring-offset-2">
          <AvatarImage src="/me.jpg" alt="Veerbal Singh" />
          <AvatarFallback>VS</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Veerbal Singh</h1>
        <p className="text-xl text-muted-foreground mb-6">Full Stack AI Engineer</p>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          Welcome! This project showcases various working examples from Vercel's AI SDK library,
          demonstrating different capabilities like text generation, chat interfaces, object streaming, and more.
        </p>
        {/* Social Links - Update hrefs as needed */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <a href="https://x.com/veerbal01" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X Profile">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com/veerbal1" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://linkedin.com/in/veerbal1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Examples Section */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-10">Explore the Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examplePages.map((item) => (
            <Card key={item.url} className="flex flex-col hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Add a short description for each example here if available/desired */}
                <p className="text-sm text-muted-foreground mb-4">
                  Explore the "{item.title}" feature built with the Vercel AI SDK.
                </p>
              </CardContent>
              <div className="p-6 pt-0 mt-auto"> {/* Use padding util for footer spacing */} 
                 <Button asChild variant="outline" className="w-full">
                  <Link href={item.url}>
                    View Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
