
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Nav, ProductsTable } from "./components";
import { TableOrders } from "./orders";
import { Separator } from "../components/ui/separator";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


function Homepage() {
  return (
    <div className=" m-2 mx-4">
      <Nav />
      <SignedIn>
        <div className="flex w-full">
          <div className="flex flex-col gap-y-2 w-1/2">
            <div className=" border-2 p-2">
              <p className="font-sg font-bold text-xl m-2">List of top users
              </p>
              <Separator className="mb-3" />
              <TableOrders />
            </div>
            <div className="border-2 p-2">
              <p className="font-sg font-bold text-xl m-2">The list of users are as follows</p>
              <Separator className="mb-3" />
              <ProductsTable className="" />
            </div>
          </div>
          
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col m-10">
          <div className="mb-10">
            <p className="w-2/3 font-sg font-bold text-6xl mb-10">
              Online Social Media Analytics
            </p>
            <p className="w-1/2 font-sg text-3xl">
              To get Top Users Latest feed and many more
            </p>
          </div>
          <p className="font-sg font-bold text-3xl mb-4">Features</p>
          <div className="flex gap-x-3.5">
            <Card className="border-2 w-[15rem]">
              <CardHeader>
                <CardTitle className="text-sm">
                  <div className="flex justify-between">
                    <p>Top Users</p>
                    
                  </div>
                </CardTitle>
                <CardDescription>
                  <p>
                   So whatever top users we can find say who in last or latest time have used or liked a post
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 w-[15rem]">
              <CardHeader>
                <CardTitle className="text-sm">
                  <div className="flex justify-between">
                    <p className="">Trending Posts</p>
                
                  </div>
                </CardTitle>
                <CardDescription>
                  <p>
                    What post has been liked the most say an instagram post from a celebrity has come and it has been liked say a million times etc like that
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 w-[15rem]">
              <CardHeader>
                <CardTitle className="text-sm">
                  <div className="flex justify-between">
                    <p>Feed</p>
                    
                  </div>
                </CardTitle>
                <CardDescription>
                  <p>
                    Display the posts in real time with newest post appearing on top dynamic use to get say posts a contionusly updating site
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
            
            
            
          </div>
        </div>
      </SignedOut>
    </div>
  );
}

export default Homepage;


