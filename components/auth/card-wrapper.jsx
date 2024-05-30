"use client";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import BackButton from "./back-button";
import Header from "./headerauth";
const CardWrapper = ({ children, backButtonHref, backButtonLabel, headerLabel, }) => {
    return (<Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel}/>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}/>
      </CardFooter>
    </Card>);
};
export default CardWrapper;
