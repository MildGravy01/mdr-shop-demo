import { useEffect } from "react";

export const Page = ({title,description,keywords,children}) => {
    useEffect(() => {
        document.title = title;
        document.keywords = keywords;
        document.description = description;
    }, [title,description,keywords]);

    return children;
};